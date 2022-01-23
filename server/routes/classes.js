const express = require("express");
const { Classe, validateClasse } = require("../models/classe");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();
//GET
router.get("/", async (req, res) => {
  const classe = await Classe.find();
  res.send(classe);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });
  const classe = await Classe.findById(id);
  if (!classe)
    return res
      .status(404)
      .send({ message: "No Class Found with the asocited Id" });
  res.send(classe.name);
});
//POST
router.post("/", auth, async (req, res) => {
  const { error } = validateClasse(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let classe = new Classe({
    name: req.body.name,
  });

  classe = await classe.save();
  res.send(classe);
});

//UPDATE
router.put("/:id", auth, async (req, res) => {
  const { error } = validateClasse(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });

  const classe = await Classe.findById(id);
  if (!classe)
    return res
      .status(404)
      .send({ message: "No Class Found with the asocited Id" });
  classe.name = req.body.name;

  await classe.save();

  res.send(classe);
});

//DELETE
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Invalid Id!" });

  const classe = await Classe.findByIdAndDelete(id);
  if (!classe)
    res.status(404).send({ message: "No Class Found with the asocited Id" });

  res.send(classe);
});
module.exports = router;
