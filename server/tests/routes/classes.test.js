const mongoose = require("mongoose");
const request = require("supertest");
const { Classe } = require("../../models/classe");
const { User } = require("../../models/user");
let server;
describe("/api/classes", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    server.close();
    await Classe.deleteMany({});
  });
  describe("GET /", () => {
    it("Should return all classes", async () => {
      await Classe.collection.insertMany([
        { name: "Class 1" },
        { name: "Class 2" },
      ]);
      const res = await request(server).get("/api/classes");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.name === "Class 1"));
      expect(res.body.some((c) => c.name === "Class 2"));
    });
  });

  describe("GET /:id", () => {
    it("Shoud return a class if valid id is passed", async () => {
      const classe = new Classe({ name: "class 1" });
      await classe.save();

      const res = await request(server).get("/api/classes/" + classe._id);
      expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty("name", "class 1");
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const res = await request(server).get("/api/classes/1");
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no class is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const classe = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .get("/api/classes/" + classe._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
  });

  //Post
  describe("POST /", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server)
        .post("/api/classes/")
        .send({ name: "class 1" });
      expect(res.status).toBe(401);
    });
    it("Should return a 400 class name is less than 3 charcter", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/classes/")
        .set("x-auth-token", token)
        .send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("Should return a 400 class name is more than 50 charcter", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");
      const res = await request(server)
        .post("/api/classes/")
        .set("x-auth-token", token)
        .send({ name: name });
      expect(res.status).toBe(400);
    });
    it("Should save the class if its valid", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/classes/")
        .set("x-auth-token", token)
        .send({ name: "class 1" });

      const classe = await Classe.find({ name: "class 1" });
      expect(classe).not.toBeNull();
    });
    it("Should return the class if its valid", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/classes/")
        .set("x-auth-token", token)
        .send({ name: "class 1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "class 1");
    });
  });
  //Put
  describe("PUT /:id", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server)
        .put("/api/classes/1")
        .send({ name: "class 1" });
      expect(res.status).toBe(401);
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .put("/api/classes/1")
        .set("x-auth-token", token)
        .send({ name: "class" });
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no class is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const classe = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .put("/api/classes/" + classe._id)
        .set("x-auth-token", token)
        .send({ name: "class" });
      expect(res.status).toBe(404);
    });
    it("Shoud return a class if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const classe = new Classe({ name: "class 1" });
      await classe.save();

      const res = await request(server)
        .put("/api/classes/" + classe._id)
        .set("x-auth-token", token)
        .send({ name: "class" });
      expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty("name", "class 1");
    });

    it("Should return a 400 class name is less than 3 charcter", async () => {
      const token = new User().generateAuthToken();
      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const res = await request(server)
        .put("/api/classes/" + classe._id)
        .set("x-auth-token", token)
        .send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("Should return a 400 class name is more than 50 charcter", async () => {
      const token = new User().generateAuthToken();
      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const name = new Array(52).join("a");
      const res = await request(server)
        .put("/api/classes/" + classe._id)
        .set("x-auth-token", token)
        .send({ name: name });
      expect(res.status).toBe(400);
    });

    it("Shoud update a class if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const classe = new Classe({ name: "class 1" });
      await classe.save();

      const res = await request(server)
        .put("/api/classes/" + classe._id)
        .set("x-auth-token", token)
        .send({ name: "class 2" });
      //expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "class 2");
      expect(classe).not.toBeNull();
    });
  });

  describe("Delete /:id", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server).delete("/api/classes/1");
      expect(res.status).toBe(401);
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .delete("/api/classes/1")
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no class is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const classe = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .delete("/api/classes/" + classe._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });

    it("Shoud return a class if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const classe = new Classe({ name: "class 1" });
      await classe.save();

      const res = await request(server)
        .delete("/api/classes/" + classe._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
  });
});
