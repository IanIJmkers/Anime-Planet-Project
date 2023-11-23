const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const animeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    episodes: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: false,
    },
    aired: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const APIAnime = model("APIAnime", animeSchema);

module.exports = APIAnime;