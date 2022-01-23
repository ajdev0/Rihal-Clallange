const request = require("supertest");
const { Classe } = require("../../models/classe.js");
const { User } = require("../../models/user.js");
let server;
describe("auth middlware", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    await Classe.deleteMany({});
    server.close();
  });
  let token;
  const exec = () => {
    return request(server)
      .post("/api/classes")
      .set("x-auth-token", token)
      .send({ name: "class 1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if invalid token is provided", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 200 if valid token is provided", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
