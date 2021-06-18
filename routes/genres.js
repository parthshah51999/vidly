const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});

router.post("/", async (req, res) => {
  // validate genre
  const result = validate(req.body);
  if (result?.error) {
    res.status(400).send(result.error.details[0]?.message);
    return;
  }

  // create genre
  const { name } = req.body;
  let genre = new Genre({ name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  const { name } = req.body;

  // validate body
  const result = validate(req.body);
  if (result?.error) {
    res.status(400).send(result.error.details[0]?.message);
    return;
  }

  // find and update
  const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  // find and remove
  const genre = await Genre.findByIdAndRemove(id);
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});

module.exports = router;
