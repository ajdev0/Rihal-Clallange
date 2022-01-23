const config = require("config");
const jsonwebtoken = require("jsonwebtoken");
const Mongoose = require("mongoose");
const { User } = require("../../models/user");

describe("user.generateToken", () => {
  it("should return a valid JWT ", () => {
    const payload = {
      _id: new Mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jsonwebtoken.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
