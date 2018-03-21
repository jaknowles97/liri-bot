// Required Packages n' Files
require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");

// API Functions
var spotifyReq = function(id, secret, song) {
    var spotify = new Spotify({
        id: id,
        secret: secret
      });
       
      spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
          console.log(response);
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
//spotifyCall(keys.spotify.id, keys.spotify.secret, "highway to hell");
omdbReq();