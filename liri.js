// Required Packages n' Files
require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");

// getting user's command
var userParam = process.argv.splice(2).join(" ").split("-");

// API Functions
var spotifyReq = function(song) {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
      });
       
      spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            var results = response.tracks.items[0]; 
          console.log(
              "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" +
              " Artist(s): " + results.artists[0].name + "\n" +
              " Song: " + results.name + "\n" +
              " Album: " + results.album.name + " \n" +
              " song preview: " + results.preview_url + "\n" +
              "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
            );
        })
        .catch(function(err) {
          console.log(err);
        });
}

var omdbReq = function(movie) {
    var apiKey = "apikey=trilogy";
    var queryUrl = "http://www.omdbapi.com/?" + apiKey;
    var searchParam = "&t=" + movie.split(" ").join("+");

    var request = require('request');
    request(queryUrl + searchParam, function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response.statusCode);
        var movie =JSON.parse(body, null , 2); // prettify in case i want to print the whole obj in console for testing purposes

        console.log(
            "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" +
            " Title: " + movie.Title + "\n\n" +
            " Year Realeased: " + movie.Year + "\n\n" +
            " IMBD Rating: " + movie.imdbRating + " \n\n" +
            " Rotten Tomatoes: " + movie.Ratings[1].Value + "\n\n" +
            " Country Produced: " + movie.Country + "\n\n" +
            " Native Lang: " + movie.Language + "\n\n" +
            " Plot: \n  " + movie.Plot + "   \n\n" +
            " Actors: " + movie.Actors + "\n\n" +
            "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
        );
    });
}

    // Based on what command the user gave to liri, do..
    switch(userParam[0]) {
        case "spot this song":
            switch(userParam[1]) {
                case undefined || '': spotifyReq("The Sign Ace of Base"); break;
                default: spotifyReq(userParam[1]);
            }
        break;
        case "movie this":
            switch(userParam[1]) {
                case undefined || '': omdbReq("Mr.Nobody"); break;
                default: omdbReq(userParam[1].trim());
            }
        break;
        case "my tweets":

        break;
        default:
            console.log("give liri a cmd !");
    }


