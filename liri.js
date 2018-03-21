// Required Packages n' Files
require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// API Functions
var spotifyCall = function(id, secret, song) {
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

spotifyCall(keys.spotify.id, keys.spotify.secret, "highway to hell");