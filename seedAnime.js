require("./db")
const APIanimemodel = require("./models/APIanime.model")
const fetchAnime = async() => {
    try {
        //console.log("Anime Route")
        // ask API for Anime
        const animes = await fetch(
            "https://api.jikan.moe/v4/anime"
        );
        const parsedAnimes = await animes.json();
        const animeData = parsedAnimes.data
        //Variable that maps all of the animes and returns new array of 10 animes
        const insertData = animeData.map((anime) => {
                return {
                    name: anime.titles[0].title,
                    image: anime.images.jpg.image_url,
                    aired: anime.aired.from.slice(0, 10),
                    genre: anime.genres[0].name,
                };
            })
            
        const insertResult = await APIanimemodel.insertMany(insertData);
            console.log(insertResult)
    } catch(error) {
        console.log(error)
    }
} 
fetchAnime()
