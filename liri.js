// to access .env to hide keys//
require("dotenv").config();

// Project variables
var fs = require("fs"); //reads and writes files
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

// User imput variable to determine where the input data will reside in node (need to add prompt)

var liriReturn = process.argv[2];
var movieName = process.argv[3];

// variables to pull the keys. You must have your own unique .env file for this to work
var importKeys = require('./keys.js');
var spotifyKey = new Spotify(importKeys.spotify);
var twitterKey = new Twitter(importKeys.twitter);

// Limit Twitter callback function to show a max of 20 tweets//
var tweetLimit  = 20;


/*  switches for various commands*/
switch(liriReturn) {
    case 'my-tweets':
        console.log('my tweets');
        myTweets();
        break;

    case 'spotify-this-song':
        console.log('spotify my song');
        spotifyThisSong();
        break;

    case 'movie-this':
        console.log('my movie');
        movieThis();
        break;

    case 'do-what-it-says':
        console.log('obey my command');
        // No function here as no call or request is being made to an api//
        break;

        //instructions for first-time user hanging around the command line

    default: console.log("\n" + "Sorry, I don't recognize that input. Please try one of the following commands after 'node liri.js': " + "\n" +
    "my-tweets" + "\n" +
    "spotify-this-song 'any song title' " + "\n" +
    "movie-this 'any movie title' " + "\n" +
    "do-what-it-says " + "\n" +
    "Use quotes for multiword titles!");
};

//========================THE FUNCTIONS=====================
 
//Twitter API (show last 20 tweets.) defines the parameters of the function. Then use .get to access the Twitter API
// Command 1 my-tweets

function myTweets() {
    var params = { screen_name: '@devWears6inchHeels', count: tweetLimit};
    twitterKey.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            };
        } else  {
         console.log("error: " + JSON.stringify(error));
         return;
        };
    });
};

// Command 2 spotify this song
// needed are artist, song name, preview, album
function spotifyThisSong(trackName)
//console.log(trackName);
 {
    var trackName = process.argv[3];
        if (!trackName) {
            trackName = "Thriller";
        };
        songChoice = trackName;
        spotifyKey.search({
            type: 'track',
            query: songChoice,
        },
            function(err, data) {
                if (!err) {
                    var trackInfo = data.tracks.items;
                    for (var i = 0; i < 5; i++) {
                        if (trackInfo[i] != undefined) {
                            //console.log(JSON.stringify(trackInfo[i]));
                            var spotifyResults = 
                            //https"//developer.spotify.com/web-api/object-model/
                            "Artists " + trackInfo[i].artists[0].name + "\n" + 
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name +"\n"

                            console.log(spotifyResults);
                            console.log(' ');
                        };
                    };
                } else {
                    console.log('error' + err);
                    return;
                };
            });
        };

//command 3 movie this
// run a request to the OMBD API with the movie specified

function movieThis() {
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    }
    // use movieName from list of varible at begining of code
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function (error, response, body) {
        // If request is successful
        if (!error && response.statusCode === 200) {
    
            // Pull request data in readable format
            var myMovieData = JSON.parse(body);
            console.log(myMovieData)
            var queryUrlResults = 
            "Title: " + myMovieData.Title + "\n" +
            "Year: " + myMovieData.Year + "\n" +
            "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
            "Rotten Tomatoes Rating " + myMovieData.Ratings[1].Value + "\n" +
            "Country of Origin " + myMovieData.Country + "\n" +
            "Language " + myMovieData.Language + "\n" +
            "Plot " + myMovieData.Plot + "\n" +
            "Actors " + myMovieData.Actors + "\n"
            
            console.log(queryUrlResults);
                
        } else {
            console.log("error: " + err);
            return;
        };
    });
};

//command 4 do-what-it-says
// This code block creates a file called "random.txt"
// It also adds the spotify command
function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song, "I Want it That Way"', function (err) {
        var song = "spotify-this-song 'I Want it That Way'"
        // If code has errors it will log error to the console
        if (err) {
            return console.log(err);
        };
        // Otherwise, it will console:
        console.log(song);
        });
    };

        
       

















