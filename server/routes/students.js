const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Classe } = require("../models/classe");
const { Country } = require("../models/country");
const { Student, validateStudent } = require("../models/student");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();
//GET
router.get("/", async (req, res) => {
  const std = await Student.find();
  res.send(std);
});

//POST
router.post("/", auth, async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const country = await Country.findById(req.body.countryId);
  if (!country)
    return res
      .status(404)
      .send({ message: "No Country Found with the asocited Id" });

  const classe = await Classe.findById(req.body.classeId);
  if (!classe)
    return res
      .status(404)
      .send({ message: "No Class Found with the asocited Id" });

  let student = new Student({
    name: req.body.name,
    classeId: {
      _id: classe._id,
      name: classe.name,
    },
    countryId: {
      _id: country._id,
      name: country.name,
    },
    dateOfBirth: req.body.dateOfBirth,
  });

  student = await student.save();
  res.send(student);
});
//UPDATE
router.put("/:id", auth, async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });

  const classe = await Classe.findById(req.body.classeId);
  if (!classe)
    return res
      .status(404)
      .send({ message: "No Class Found with the asocited Id" });

  const country = await Country.findById(req.body.countryId);
  if (!country)
    return res
      .status(404)
      .send({ message: "No country Found with the asocited Id" });

  const student = await Student.findById(id);
  if (!student)
    return res
      .status(404)
      .send({ message: "No Country Found with the asocited Id" });
  student.name = req.body.name;
  student.classeId = {
    _id: classe._id,
    name: classe.name,
  };
  student.countryId = {
    _id: country._id,
    name: country.name,
  };
  student.dateOfBirth = req.body.dateOfBirth;
  await student.save();
  res.send(student);
});

//DELETE
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });

  const student = await Student.findByIdAndDelete(id);
  if (!student)
    return res
      .status(404)
      .send({ message: "No student Found with the asocited Id" });

  res.send(student);
});

//Count of students per class
router.get("/class/:id", async (req, res) => {
  const std = await Student.find({ classeId: req.params.id });
  //console.log(std);
  res.send(std);
});

// async function stdPerClass(classId) {
//   const std = await Student.find({ classeId: classId });
//   console.log("students per class :", std.length);
// }
// stdPerClass("61d64af55daf85065b053956");

//Count of students per country
router.get("/country/:id", async (req, res) => {
  const std = await Student.find({ countryId: req.params.id });

  res.send(std);
});
// async function stdPerCountry(countryId) {
//   const std = await Student.find({ country: countryId }).select("name");
//   console.log("students per country :", std);
// }
// stdPerCountry("61d6488bf4111dc29ac3824a");

// Average age of students
//export for test
function getYears(x) {
  return Math.floor(x / 1000 / 60 / 60 / 24 / 365);
}

router.get("/ages", async (req, res) => {
  const std = await Student.find().select("dateOfBirth");
  let newDate = new Date();
  let ages = [];
  let stdAvgAge;
  for (const i of std) {
    let dob = new Date(i.dateOfBirth);
    let age = getYears(newDate - dob);
    ages.push(age);
  }
  let sumAges = ages.reduce((a, b) => a + b);
  stdAvgAge = sumAges / ages.length;
  const avg = Math.round(stdAvgAge);
  console.log(avg);
  res.send(avg.toString());
});
// Average age of students
// async function stdAge() {
//   const std = await Student.find().select("dateOfBirth");
//   let newDate = new Date();
//   let ages = [];
//   let stdAvgAge;
//   for (const i of std) {
//     let dob = new Date(i.dateOfBirth);
//     let age = getYears(newDate - dob);
//     ages.push(age);
//   }
//   let sumAges = ages.reduce((a, b) => a + b);
//   stdAvgAge = sumAges / ages.length;
//   console.log(stdAvgAge);
// }
//stdAge();
module.exports = router;
