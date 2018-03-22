// Required Packages n' Files
require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");

// getting user's command
var userParam = process.argv.splice(2).join(" ").split("- ");

// API Functions
var spotifyReq = function(song) {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
      });
       
      spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            var shortcut = response.tracks.items[0];
          console.log(
              "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n" +
              " Artist(s): " + shortcut.artists[0].name + "\n" +
              " Song: " + shortcut.name + "\n" +
              " Album: " + shortcut.album.name + " \n" +
              " song preview: " + shortcut.preview_url + "\n" +
              "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
            );
        })
        .catch(function(err) {
          console.log(err);
        });
}

var omdbReq = function() {
    var apiKey = "apikey=trilogy";
    var queryUrl = "http://www.omdbapi.com/?" + apiKey;

    var request = require('request');
    request(queryUrl + "&s='the+room", function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    });
}

if(userParam) {
    if(userParam[0] === "spot this song") {
        spotifyReq(userParam[1]);
    }
}
