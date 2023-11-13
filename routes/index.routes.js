const express = require('express');
const router = express.Router();
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");
/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index")
});

///////////////////////// ALL ANIME ///////////////////////////////////
//routes to anime-library page

// GET
router.get("/anime/anime-library", (req, res,) => {
  Anime.find()
  .then((response) => {
    console.log(response);
  
  res.render("anime/anime-library", { anime: response });
  })
});


/////////////////////// CREATE ANIME ///////////////////////////////////
// Create an anime

// GET

router.get('/anime/create', (req, res) => {
  res.render("anime/add-anime");
  // ^^^syntax important 
});

// POST
router.post('/anime/create', (req, res) => {
  const newAnime = req.body;
  Anime.create(newAnime)
  .then((response) => {
    console.log(response);
    res.redirect("/anime/anime-library");
  }).catch((error) => {
    console.log(error);
  });
});
/////////////////////// SINGLE ANIME ///////////////////////////////////
// GET Single Anime

// GET 
router.get("/anime/:id", (req, res) => {
  const animeId = req.params.id;
  Anime.findById(animeId)
  .then((response) => {
    console.log(response);
    res.render("anime/anime.hbs", { anime: response });
  }) .catch((error) => {
    console.log(error);
  });
})

/////////////////////// UPDATE ANIME ///////////////////////////////////
// Update an Anime

// GET

// PUT (modify)


// DELETE Anime


///////////////////////////////////////////

// LOGIN 

// SIGNUP

/////////////////////// PROFILE/////////////////////
// GET route
router.get("/profile", (req, res) => {
  res.render("profile.hbs")
})

module.exports = router;