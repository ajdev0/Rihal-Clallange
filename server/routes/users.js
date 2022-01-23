const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const express = require("express");
const { User, validateUser } = require("../models/user");
const config = require("config");
const router = express.Router();

//init

//READ
router.get("/", [auth], async (req, res) => {
  const user = await User.find();
  res.send(user);
});

//POST
router.post("/", async (req, res) => {
  //validate input

  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    //check if user exist
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({ message: "User alrady registerd." });
    //add new user
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    //hash password
    const salt = await bcrypt.genSalt(config.get("salt"));
    user.password = await bcrypt.hash(user.password, salt);

    //save
    await user.save();
    res.status(201).send({ message: "User Created Successfully" });
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
