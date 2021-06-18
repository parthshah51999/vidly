const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});
const Genre = mongoose.model("Genre", genreSchema);

const genreValidation = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  const result = schema.validate(genre);
  return result;
};

exports.Genre = Genre;
exports.validate = genreValidation;
