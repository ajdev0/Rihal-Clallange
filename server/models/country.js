const Joi = require("joi");
const mongoose = require("mongoose");

// SCHEMA
const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    code: {
      type: String,
      minlength: 2,
      maxlength: 25,
    },
  },
  { timestamps: true }
);
// MODEL
const Country = mongoose.model("Country", countrySchema);

// VALIDATION
function validateCountry(country) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    code: Joi.string().min(2).max(50),
  });
  return schema.validate(country);
}
//EXPORT

exports.Country = Country;
exports.countrySchema = countrySchema;
exports.countrySchema = countrySchema;
exports.validateCountry = validateCountry;
