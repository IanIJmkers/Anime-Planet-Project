const express = require('express');
const router = express.Router();
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");
const {isLoggedIn} = require("../middleware/route-guard")
const uploader = require("../middleware/cloudinary.config.js");

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
    console.log("Hello World", response);
  
  res.render("anime/anime-library", { anime: response });
  })
  .catch((error) => {
    console.error(error);
  });
});


///////////////////////// USER ANIME LIBRARY ///////////////////////////////////

// GET
router.get("/anime/user-anime-library", (req, res,) => {
  Anime.find({owner: req.session.currentUser._id})
  .then((response) => {
    console.log(response);
  
  res.render("anime/user-anime-library", { anime: response });
  })
  .catch((error) => {
    console.log(error);
  });
});


/////////////////////// CREATE ANIME ///////////////////////////////////
// Create an anime

// GET

router.get('/anime/create', (req, res) => {
  res.render("anime/add-anime");
  // ^^^syntax important 
});

// POST
router.post('/anime/create', uploader.single("image"),(req, res) => {
  const newAnime = req.body;
  console.log(req.file);
  Anime.create({...newAnime, owner: req.session.currentUser._id, image: req.file.path})
  .then((response) => {
    console.log(response);
    res.redirect("/anime/user-anime-library");
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
    res.render("anime/anime.hbs", { anime: response })
  }).catch((error) => {
    console.log(error);
  });
});

/////////////////////// UPDATE ANIME ///////////////////////////////////

// GET
router.get("/anime/update/:id", (req, res) => {
  const animeId = req.params.id;
  Anime.findById(animeId)
  .then((response) => {
    console.log(response);
    res.render("anime/update.hbs", { anime: response })
  }).catch((error) => { 
    console.log(error); 
  });
});
// PUT (modify)
router.post("/anime/update/:id", (req, res) => {
  const animeId = req.params.id;
  const updatedAnime = req.body;
  
  Anime.findByIdAndUpdate(animeId, updatedAnime)
  .then((response) => {
    console.log(response)
    res.redirect("/anime/user-anime-library")
  })
  .catch((error) => {
    console.log(error);
  });
});
////////////////////// DELETE ANIME ////////////////////////////////////
router.get("/anime/delete/:id", (req, res) => {
  const animeId = req.params.id;
  Anime.findByIdAndDelete(animeId)
 .then(() => {
  res.redirect("/anime/user-anime-library");
})
.catch((error) => {
    console.log(error);
    });
  });

/////////////////////// PROFILE/////////////////////
// GET route
router.get("/profile", isLoggedIn, (req, res) => {
  const loggedInUser = req.session.currentUser
  res.render("profile.hbs", {loggedInUser})
})
router.post("/anime/update/:id", (req, res) => {
  const animeId = req.params.id;
  const updatedAnime = req.body;
  Anime.findByIdAndUpdate(animeId, updatedAnime)
  .then((response) => {
    console.log(response)
    res.redirect("/anime/user-anime-library")
  })
  .catch((error) => {
    console.log(error);
  });
});
////////////////////// DELETE ANIME ////////////////////////////////////
router.get("/anime/delete/:id", (req, res) => {
  const animeId = req.params.id;
  Anime.findByIdAndDelete(animeId)
 .then(() => {
  res.redirect("/anime/user-anime-library");
})
.catch((error) => {
    console.log(error);
    });
  });

module.exports = router;