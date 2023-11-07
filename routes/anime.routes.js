const AnimeModel = require("../models/Anime.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/anime/create", (req, res) => {
    res.render("anime/anime.hbs");
});

// router.post("/create", async (req, res) => {
//     try {
//     const newAnime = await AnimeModel.create(req.body);
//     console.log(newAnime);
//     res.redirect("/celeb/celebrities");
//     } catch (err) {
//         console.log(err);
//     }
// });
// router.get("/celebrities", async (req, res) => {
//     try {
//         const allCelebs = await CelebModel.find();
//         console.log(allCelebs);
//         res.render("celebrities/celebrities.hbs", { allCelebs });
//     } catch (err) {
//         console.log(err);
//     }
// })
module.exports = router;