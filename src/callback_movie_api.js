const request = require("request");
const fs = require("fs");
const path = require("path");
const scriptName = path.basename(__filename);

console.log(`Run ${scriptName}`);

request("https://ghibliapi.herokuapp.com/films", (err, res, body) => {
  if (err) {
    console.error(`Cannot call API, ${err.message}`);
    return;
  }
  if (res.statusCode != 200) {
    console.error(`Expected status code 200 but get: ${res.statusCode}`);
    return;
  }
  console.log("Successfully load movie details");
  console.log("Process response...");
  movieDetails = JSON.parse(body);
  let movieList = "";
  movieDetails.forEach((m) => {
    movieList += `"${m["title"]}","${m["director"]}",${m["release_date"]},${m["rt_score"]}\n`;
  });
  fs.writeFile("ghibli_movies.csv", movieList, (err) => {
    if (err) {
      console.error(`Cannot save file, ${err}`);
      return;
    }
    console.log("Save file completed");
  });
});
