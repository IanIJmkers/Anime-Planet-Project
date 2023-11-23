require("./db")
const APIanimemodel = require("./models/APIanime.model")
const fetchAnime = async() => {
    try {
        //console.log("Anime Route")
        // ask API for Anime
        const animes = await fetch(
            "https://api.jikan.moe/v4/anime?page=2"
        );
        const parsedAnimes = await animes.json();
        const animeData = parsedAnimes.data
        //Variable that maps all of the animes and returns new array of 10 animes
        const firstTen = animeData.map((anime) => {
            console.log("Anime")
                return {
                    name: anime.titles[0].title,
                    image: anime.images.jpg.image_url,
                    episodes: anime.episodes,
                    aired: anime.aired.from.slice(0, 10),
                    genre: anime.genres[0].name,
                };
            })
            console.log(firstTen)
            await APIanimemodel.insertMany(firstTen)
    } catch(error) {
        console.log(error)
    }
} 
fetchAnime()