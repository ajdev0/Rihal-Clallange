const express = require("express");
const mongoose = require("mongoose");
const { Country, validateCountry } = require("../models/country");
const auth = require("../middleware/auth");

const router = express.Router();
//GET
router.get("/", async (req, res) => {
  const country = await Country.find();
  res.send(country);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });
  const country = await Country.findById(id);
  if (!country)
    return res
      .status(404)
      .send({ message: "No Country Found with the asocited Id" });
  res.send(country.name);
});
//POST
router.post("/", auth, async (req, res) => {
  const { error } = validateCountry(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let country = new Country({
    name: req.body.name,
    code: req.body.code,
  });

  country = await country.save();
  res.send(country);
});

//UPDATE

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCountry(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });

  const country = await Country.findById(id);
  if (!country)
    return res
      .status(404)
      .send({ message: "No Country Found with the asocited Id" });

  country.name = req.body.name;
  country.code = req.body.code;

  await country.save();
  res.send(country);
});

//DELETE
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid Id!");

  const country = await Country.findByIdAndDelete(id);
  if (!country)
    return res
      .status(404)
      .send({ message: "No Country Found with the asocited Id" });

  res.send(country);
});

module.exports = router;
