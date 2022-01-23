const express = require("express");
const countries = require("../routes/countries");
const classes = require("../routes/classes");
const students = require("../routes/students");
const users = require("../routes/users");
const auth = require("../routes/auth");
const cors = require("cors");
module.exports = function (app) {
  app.use(express.json());
  app.use(cors({ credentials: true }));
  app.use(express.urlencoded({ extended: true }));

  //routes
  app.use("/api/countries", countries);
  app.use("/api/classes", classes);
  app.use("/api/students", students);
  app.use("/api/auth", auth);
  app.use("/api/users", users);
};
