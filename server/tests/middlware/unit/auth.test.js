const config = require("config");
const Mongoose = require("mongoose");
const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");

describe("autg middleware", () => {
  it("should populate req.user with the payload of a valid JWT ", () => {
    const user = {
      _id: new Mongoose.Types.ObjectId().toHexString(),
    };
    const token = new User(user).generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };

    const res = {};

    const next = jest.fn();
    !config.get("requiresAuth") ? next() : "";
    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
