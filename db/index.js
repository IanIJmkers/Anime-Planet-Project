// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  "mongodb+srv://anime-planet-main-db-0f659d97412:g8p9F71AHnsFjcg9q1ZZHzCGNY9xrT@prod-us-central1-3.yr9so.mongodb.net/anime-planet-main-db-0f659d97412" || "mongodb://127.0.0.1:27017/Anime-Planet";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
