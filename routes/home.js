const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Movie", message: "Genre" });
});

module.exports = router;
