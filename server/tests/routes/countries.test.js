const mongoose = require("mongoose");
const request = require("supertest");
const { Country } = require("../../models/country");
const { User } = require("../../models/user");
let server;
describe("/api/countries", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    server.close();
    await Country.deleteMany({});
  });
  describe("GET /", () => {
    it("Should return all countries", async () => {
      await Country.collection.insertMany([
        { name: "country 1" },
        { name: "country 2" },
      ]);
      const res = await request(server).get("/api/countries");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.name === "Class 1"));
      expect(res.body.some((c) => c.name === "Class 2"));
    });
  });
  describe("GET /:id", () => {
    it("Shoud return a country if valid id is passed", async () => {
      const country = new Country({ name: "country 1" });
      await country.save();

      const res = await request(server).get("/api/countries/" + country._id);
      expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty("name", "country 1");
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const res = await request(server).get("/api/countries/1");
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no country is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const country = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .get("/api/countries/" + country._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
  });
  //Post
  describe("POST /", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server)
        .post("/api/countries/")
        .send({ name: "country 1" });
      expect(res.status).toBe(401);
    });
    it("Should return a 400 country name is less than 3 charcter", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/countries/")
        .set("x-auth-token", token)
        .send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("Should return a 400 country name is more than 50 charcter", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");
      const res = await request(server)
        .post("/api/countries/")
        .set("x-auth-token", token)
        .send({ name: name });
      expect(res.status).toBe(400);
    });
    it("Should save the country if its valid", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/countries/")
        .set("x-auth-token", token)
        .send({ name: "country 1" });

      const country = await Country.find({ name: "country 1" });
      expect(country).not.toBeNull();
    });
    it("Should return the country if its valid", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/countries/")
        .set("x-auth-token", token)
        .send({ name: "country 1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "country 1");
    });
  });
  //Put
  describe("PUT /:id", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server)
        .put("/api/countries/1")
        .send({ name: "country 1" });
      expect(res.status).toBe(401);
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .put("/api/countries/1")
        .set("x-auth-token", token)
        .send({ name: "country" });
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no country is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const country = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .put("/api/countries/" + country._id)
        .set("x-auth-token", token)
        .send({ name: "country" });
      expect(res.status).toBe(404);
    });
    it("Shoud return a country if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const country = new Country({ name: "country 1" });
      await country.save();

      const res = await request(server)
        .put("/api/countries/" + country._id)
        .set("x-auth-token", token)
        .send({ name: "country" });
      expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty("name", "country 1");
    });

    it("Should return a 400 country name is less than 3 charcter", async () => {
      const token = new User().generateAuthToken();
      const country = new Country({ name: "country 1" });
      await country.save();
      const res = await request(server)
        .put("/api/countries/" + country._id)
        .set("x-auth-token", token)
        .send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("Should return a 400 country name is more than 50 charcter", async () => {
      const token = new User().generateAuthToken();
      const country = new Country({ name: "country 1" });
      await country.save();
      const name = new Array(52).join("a");
      const res = await request(server)
        .put("/api/countries/" + country._id)
        .set("x-auth-token", token)
        .send({ name: name });
      expect(res.status).toBe(400);
    });

    it("Shoud update a country if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const country = new Country({ name: "country 1" });
      await country.save();

      const res = await request(server)
        .put("/api/countries/" + country._id)
        .set("x-auth-token", token)
        .send({ name: "country 2" });
      //expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "country 2");
      expect(country).not.toBeNull();
    });
  });

  describe("Delete /:id", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server).delete("/api/countries/1");
      expect(res.status).toBe(401);
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .delete("/api/countries/1")
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no country is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const country = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .delete("/api/countries/" + country._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });

    it("Shoud return a country if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const country = new Country({ name: "country 1" });
      await country.save();

      const res = await request(server)
        .delete("/api/countries/" + country._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
  });
});
