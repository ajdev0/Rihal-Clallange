const config = require("config");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 55 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 7 },
  isAdmin: Boolean,
});
schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey"),
    {
      expiresIn: "7d",
    }
  );
  return token;
};
//model
const User = mongoose.model("User", schema);
//joi validation
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(user);
}
//exports
exports.User = User;
exports.validateUser = validateUser;
