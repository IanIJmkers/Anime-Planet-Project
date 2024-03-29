// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

module.exports = {

    content: [
        "./node_modules/flowbite/**/*.js"
    ]
};
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

require("./config/session.config.js")(app);

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");



const bodyParser = require("body-parser");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Anime-Planet";

app.locals.appTitle = `${capitalize(projectName)} created by your local animegeeks - Abdulian`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const animeRoutes = require("./routes/anime.routes.js");
app.use("/anime-library", animeRoutes);

const authRoutes = require("./routes/auth.routes.js");
app.use("/auth", authRoutes);

app.use(bodyParser.json());



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);
module.exports = app;
