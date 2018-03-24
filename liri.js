// Required Packages n' Files
require("dotenv").config();
var Twitter = require("twitter");
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

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

var twitterReq = function() {
    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) throw error;
        var tweets = tweets;
        console.log("---------------------MY RECENT TWEETS-------------------------");
        
        for(var i=0; i < tweets.length && i < 20; i++) {
            console.log("\Tweet no." + parseInt(i + 1) + "-   *   -   *   -   *   -   *   -   *   -   *\n"+
            "Date posted: " + tweets[i].created_at +
            "content: " + tweets[i].text +
            "\n***************************************************\n");
        }
       // console.log(response);  // Raw response object. 
    });
}

var logHistory = function(item) {
    fs.appendFile('random.txt', item, function(err) {
        if(err) throw err;
    })
}

var readFile = function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if(err) throw err;
        userParam = data.split("-");
        cmdHandler(userParam[0], userParam[1]);

    })
}

var cmdHandler = function(userParam, userParam1) {
    // Based on what command the user gave to liri, do..
    switch(userParam) {
        
        case "spot this song":
            switch(userParam1) {
                case undefined || '': spotifyReq("The Sign Ace of Base"); break;
                default: spotifyReq(userParam1);
            }
            break;
        case "movie this":
            switch(userParam1) {
                case undefined || '': omdbReq("Mr.Nobody"); break;
                default: omdbReq(userParam1.trim());
            }
            break;
        case "my tweets":
            twitterReq();
            break;
        case "do what it says":
            readFile();
            break;
        default:
            console.clear();
            console.log(
                "                           ---     ---   -------    ---\n" +
                "                           | |     | |   |      \\   | |\n" +
                "                           | |     | |   |      /   | |\n" +
                "                           | |     | |   | | \\ \\    | |\n" +
                "                           |  ---  | |   | |   \\ \\  | |\n" +
                "                           ------  ---   ---    --- ---\n" +
                "                        ===================================\n" 
            );
            console.log('                      " LIRI\u2122, at the mercy of your command "');
            console.log('________________________________________________________________________________________________\n');
            console.log('    \u21D3 Type the commands below EXACTLY as seen below to get the default result for each \u21D3\n')
            console.log('                               node liri spot this song-');
            console.log('                               node liri movie this-');
            console.log('                               node liri my tweets');
            console.log('                               node liri do what it says');
            console.log('________________________________________________________________________________________________\n');
            console.log("cmds that end with '-' are search tools, simply type what you want to search after the cmd\n");
            console.log("                    ex. node liri spot this song- Highway to hell");
            console.log('________________________________________________________________________________________________\n');
            console.log("if typo or invalid cmd this screen will appear for easy ref to cmds bc who likes big red errors\n");
            console.log('               "We don\'t make mistakes, just happy little accidents."  -Bob Ross\n');
            console.log('___________________________________________coded by____________________________________________\n');
            console.log("                                     Andrew Knowles 2018");
            console.log("                               https://github.com/jaknowles97\n");


    }
}

//this is the starting point of my program
    // get user input and return an array with 2 items in it.
    var userParam = process.argv.splice(2).join(" ").split("-");
    cmdHandler(userParam[0], userParam[1]);