const Joi = require("joi");
const mongoose = require("mongoose");
const { classSchema } = require("./classe");
const { countrySchema } = require("./country");

// SCHEMA
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    classeId: {
      type: mongoose.Types.ObjectId,
      ref: "Classe",
      required: true,
    },
    countryId: {
      type: mongoose.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
// MODEL
const Student = mongoose.model("Student", studentSchema);

// VALIDATION
function validateStudent(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    classeId: Joi.objectId().required(),
    countryId: Joi.objectId().required(),
    dateOfBirth: Joi.date().required(),
  });
  return schema.validate(student);
}
//EXPORT

exports.Student = Student;
exports.validateStudent = validateStudent;
