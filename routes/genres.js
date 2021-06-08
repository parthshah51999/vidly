const express = require("express");
const Joi = require("joi");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Horror" },
];

const genreValidation = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(genre);
  return result;
};

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const genre = id && genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("Genre not found");
  res.send(genre);
});

router.post("/", (req, res) => {
  // validate genre
  const result = genreValidation(req.body);
  if (result?.error) {
    res.status(400).send(result.error.details[0]?.message);
    return;
  }

  // create genre
  const { name } = req.body;
  const id = genres.length + 1;
  const genre = { id, name };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  const { name } = req.body;
  id = Number(id);

  // validate id
  const genre = id && genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("Genre not found");

  // validate body
  const result = genreValidation(req.body);
  if (result?.error) {
    res.status(400).send(result.error.details[0]?.message);
    return;
  }

  // update body
  genre.name = name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);

  // validate id
  const genre = id && genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("Genre not found");

  // find and delete item
  const index = genres.findIndex((g) => g.id === id);
  const deletedItem = genres.splice(index, 1);
  res.send(deletedItem);
});

module.exports = router;
