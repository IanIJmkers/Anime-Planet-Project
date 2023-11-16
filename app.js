// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

require("./config/session.config.js")(app);

const bodyParser = require("body-parser");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Anime-Planet";

app.locals.appTitle = `${capitalize(
  projectName
)} created by your local animegeeks - Abdulian`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const animeRoutes = require("./routes/anime.routes.js");
app.use("/anime-library", animeRoutes);

const authRoutes = require("./routes/auth.routes.js");
app.use("/auth", authRoutes);

app.use(bodyParser.json());

app.post("/anime/create/:id", (req, res) => {
  const requiredTitle = req.body.title;
  const requiredDescription = req.body.description;
  const requiredAirDate = req.body.airDate;

  if (!requiredTitle || !requiredDescription || !requiredAirDate) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }
  res.json({ success: true });
});
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
module.exports = app;
