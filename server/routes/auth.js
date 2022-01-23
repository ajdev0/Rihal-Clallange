const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const { User } = require("../models/user");
const Joi = require("joi");
const router = express.Router();

//init

//READ
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.send(user);
});

//POST
router.post("/", async (req, res) => {
  try {
    //validate input
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    //check if user exist
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "invalid email or password." });
    //check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "invalid email or password." });
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Serval Error." });
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
