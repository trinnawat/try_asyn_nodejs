const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const scriptName = path.basename(__filename);

console.log(`Run ${scriptName}`);

async function saveMovieDetails() {
  try {
    let res = await axios.get("https://ghibliapi.herokuapp.com/films");
    console.log("Successfully load movie details");
    console.log("Process response...");
    let movieList = "";
    res.data.forEach((m) => {
      movieList += `"${m["title"]}","${m["director"]}",${m["release_date"]},${m["rt_score"]}\n`;
    });
    await fs.writeFile("ghibli_movies.csv", movieList);
    console.log("Save file completed");
  } catch (err) {
    console.error(`Cannot save file, ${err}`);
  }
}

saveMovieDetails();
