const AnimeModel = require("../models/Anime.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/anime/create", (req, res) => {
    res.render("anime/anime.hbs");
});

router.post("/anime/create/:id", (req, res) => {
    const requiredTitle = req.body.title;
    const requiredDescription = req.body.description;
    const requiredAirDate = req.body.airDate;

    if (!requiredTitle  || !requiredDescription || !requiredAirDate) {
        return res.status(400).json({ error: "Please fill in all required fields"} )
    }
    res.json({ success: true });
});

// External API Route
router.get("/anime/anime-library", async (req, res) => {
    try {
        //console.log("Anime Route")
        // ask API for Anime
        const animes = await fetch(
            "https://api.jikan.moe/v4/anime"
        );
        const parsedAnimes = await animes.json();
        const animeData = parsedAnimes.data
        //Variable that maps all of the animes and returns new array of 10 animes
        const firstTen = animeData.map((anime) => {
                return {
                    name: anime.titles[0].title,
                    image: anime.images.jpg.image_url,
                    episodes: anime.episodes,
                    aired: anime.aired.from.slice(0, 10),
                    genre: anime.genres[0].name,
                };
            })
            console.log(firstTen)
            res.render('anime/anime-library.hbs', {animes: firstTen})
    } catch(error) {
        console.log(error)
    }
})


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