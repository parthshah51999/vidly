// external imports
const debug = require("debug")("app:test_debugger");
const config = require("config");
// check usage of morgan & helmet
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");

// mongoose connect to db
const mongoose = require("mongoose");
mongoose.connect(config.get("MONGO_KEY"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo db...");
});

mongoose.connection.on("error", (error) => {
  console.log("error when connecting mongo db...", error);
});

// route imports
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const home = require("./routes/home");
// middleware imports
const logger = require("./middleware/logger");

const app = express();

// return html markup if needed
app.set("view engine", "pug");
app.set("views", "./views");

// parses json request and populates req.body
app.use(express.json());
// if data is in url encoded format (for example some form data submission) that could be accepted as well
app.use(express.urlencoded({ extended: true }));
// serve static content
app.use(express.static("public"));

// check these middleware
app.use(helmet());

// custom middleware demo
// app.use(logger);

// routes
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/", home);

// logs only in case of development mode
if (app.get("env") === "development") app.use(morgan("tiny"));

// decides based on DEBUG environment variable whether to log this statement demo
// debug("hello");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
