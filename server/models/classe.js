const Joi = require("joi");
const mongoose = require("mongoose");

// SCHEMA
const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
  },
  { timestamps: true }
);
// MODEL
const Classe = mongoose.model("Classe", classSchema);

// VALIDATION
function validateClasse(classe) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(classe);
}
//EXPORT

exports.Classe = Classe;
exports.classSchema = classSchema;
exports.validateClasse = validateClasse;
