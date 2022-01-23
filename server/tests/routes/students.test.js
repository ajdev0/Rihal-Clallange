const mongoose = require("mongoose");
const request = require("supertest");
const { Student } = require("../../models/student");
const { Classe } = require("../../models/classe");
const { Country } = require("../../models/country");
const { User } = require("../../models/user");
let server;
describe("/api/students", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    server.close();
    await Student.deleteMany({});
  });
  describe("GET /", () => {
    it("Should return all students", async () => {
      await Student.collection.insertMany([
        {
          name: "std 1",
          classeId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        },
        {
          name: "std 2",
          classeId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        },
      ]);
      const res = await request(server).get("/api/students");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.name === "std 1"));
      expect(res.body.some((c) => c.name === "std 2"));
    });
  });
  //POST
  describe("POST", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server).post("/api/students/").send({
        name: "std 1",
        classeId: new mongoose.Types.ObjectId().toHexString(),
        countryId: new mongoose.Types.ObjectId().toHexString(),
        dateOfBirth: new Date(),
      });
      expect(res.status).toBe(401);
    });
    it("Should return a 400 student name is less than 3 charcter", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/students/")
        .set("x-auth-token", token)
        .send({
          name: "12",
          lassId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(400);
    });
    it("Should return a 400 student name is more than 50 charcter", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");
      const res = await request(server)
        .post("/api/students/")
        .set("x-auth-token", token)
        .send({
          name: name,
          lassId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(400);
    });
    describe("GET class /:id", () => {
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
    describe("GET country /:id", () => {
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

    it("Should save the student if its valid", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/students/")
        .set("x-auth-token", token)
        .send({
          name: "std 1",
          classeId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        });

      const student = await Student.find({ name: "std 1" });
      expect(student).not.toBeNull();
    });
    it("Should return the student if its valid", async () => {
      const token = new User().generateAuthToken();
      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const country = new Country({ name: "country 1" });
      await country.save();
      const res = await request(server)
        .post("/api/students/")
        .set("x-auth-token", token)
        .send({
          name: "std 1",
          classeId: classe._id,
          countryId: country._id,
          dateOfBirth: new Date(),
        });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "std 1");
    });
  });

  //PUT
  describe("PUT /:id", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server).put("/api/students/1").send({
        name: "std 1",
        classeId: new mongoose.Types.ObjectId().toHexString(),
        countryId: new mongoose.Types.ObjectId().toHexString(),
        dateOfBirth: new Date(),
      });
      expect(res.status).toBe(401);
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .put("/api/students/1")
        .set("x-auth-token", token)
        .send({
          name: "std 1",
          classeId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no student is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const student = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .put("/api/students/" + student._id)
        .set("x-auth-token", token)
        .send({
          name: "std 1",
          classeId: new mongoose.Types.ObjectId().toHexString(),
          countryId: new mongoose.Types.ObjectId().toHexString(),
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(404);
    });
    describe("GET class /:id", () => {
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
    describe("GET country /:id", () => {
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
          id: new mongoose.Types.ObjectId().toHexString(),
        };
        const res = await request(server)
          .get("/api/countries/" + country.id)
          .set("x-auth-token", token);
        expect(res.status).toBe(404);
      });
    });

    it("Should return a 400 student name is less than 3 charcter", async () => {
      const token = new User().generateAuthToken();

      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const country = new Country({ name: "country 1" });
      await country.save();
      const student = new Student({
        name: "std 1",
        classeId: classe._id,
        countryId: country._id,
        dateOfBirth: new Date(),
      });
      await student.save;
      const res = await request(server)
        .put("/api/students/" + student._id)
        .set("x-auth-token", token)
        .send({
          name: "12",
          classeId: classe._id,
          countryId: country._id,
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(400);
    });
    it("Should return a 400 student name is more than 50 charcter", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");
      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const country = new Country({ name: "country 1" });
      await country.save();
      const student = new Student({
        name: "std 1",
        classeId: classe._id,
        countryId: country._id,
        dateOfBirth: new Date(),
      });
      await student.save;

      const res = await request(server)
        .put("/api/students/" + student._id)
        .set("x-auth-token", token)
        .send({
          name: name,
          classeId: classe._id,
          countryId: country._id,
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(400);
    });
    it("Shoud return and update a student if valid suudent ,class and country id is passed", async () => {
      const token = new User().generateAuthToken();

      const student = new Student({
        name: "std 1",
        classeId: new mongoose.Types.ObjectId().toHexString(),
        countryId: new mongoose.Types.ObjectId().toHexString(),
        dateOfBirth: new Date(),
      });
      await student.save();
      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const country = new Country({ name: "country 1" });
      await country.save();
      const res = await request(server)
        .put("/api/students/" + student._id)
        .set("x-auth-token", token)
        .send({
          name: "std 1",
          classeId: classe._id,
          countryId: country._id,
          dateOfBirth: new Date(),
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "std 1");
    });
  });

  //Delete
  describe("Delete /:id", () => {
    it("Should return a 401 if user is not logged in", async () => {
      const res = await request(server).delete("/api/students/1");
      expect(res.status).toBe(401);
    });
    it("Shoud return a 404 error if invalid id is passed", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .delete("/api/students/1")
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    it("Shoud return a 404 error if no student is assoicated with this id", async () => {
      const token = new User().generateAuthToken();
      const student = {
        _id: new mongoose.Types.ObjectId().toHexString(),
      };
      const res = await request(server)
        .delete("/api/students/" + student._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });

    it("Shoud delete a studen if valid id is passed", async () => {
      const token = new User().generateAuthToken();

      const student = new Student({
        name: "std 1",
        classeId: new mongoose.Types.ObjectId().toHexString(),
        countryId: new mongoose.Types.ObjectId().toHexString(),
        dateOfBirth: new Date(),
      });
      await student.save();

      const res = await request(server)
        .delete("/api/students/" + student._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
  });

  //Count of students per class
  describe("Students Per Class", () => {
    it("Should return students per class if valid class id is passed", async () => {
      const classe = new Classe({ name: "class 1" });
      await classe.save();
      const res = await request(server).get(
        "/api/students/class/" + classe._id
      );

      expect(res.status).toBe(200);
    });
  });
  //Count of students per country
  describe("Students Per Country", () => {
    it("Should return students per Country if valid class id is passed", async () => {
      const country = new Country({ name: "class 1" });
      await country.save();
      const res = await request(server).get(
        "/api/students/country/" + country._id
      );

      expect(res.status).toBe(200);
    });
  });
  // Average age of students
  describe("Students Average age", () => {
    it("Should return average students age", async () => {
      const std = new Student({
        name: "std 1",
        classeId: new mongoose.Types.ObjectId().toHexString(),
        countryId: new mongoose.Types.ObjectId().toHexString(),
        dateOfBirth: new Date("1995-12-17T03:24:00"),
      });
      await std.save();
      const res = await request(server).get("/api/students/ages");

      expect(res.body).toBe(25);
    });
  });
});
