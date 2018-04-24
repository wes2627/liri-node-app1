require('dotenv').config();

var selection = process.argv[2];
var userQuery = process.argv[3];



var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var movieName = "";

var keys = require('./keys');



if (selection == 'my-tweets') {
    tweetReturn();
} else if (selection == 'spotify-this-song') {
    spotifyReturn(userQuery);
} else if (selection == 'movie-this') {
    movieReturn(userQuery);
} else if (selection == 'do-what-it-says') {

    doWhatItSays();

} else {
    console.log('no thanks');
}


function tweetReturn() {
    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'wesliri1', count: 20 };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            var data = [];
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            console.log(data);
            console.log('----------------');
        }
    });
};

function spotifyReturn(songChosen) {

    var spotify = new Spotify(keys.spotify);
    var spotSearch = userQuery.split(' ').join('+');



    spotify.search({ type: 'track', query: userQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (!data) {
            console.log("Invalid input");
            return;
        }
        if (userQuery === '') {
            spotSearch = "Ace of Base"
            spotifyReturn();

        }

        var spotifyCheck = data.tracks.items;

        for (var i = 0; i < spotifyCheck.length; i++) {
            console.log('Song: ' + spotifyCheck[i].name);
            console.log('Artist: ' + spotifyCheck[i].artists[0].name);
            console.log('Url: ' + spotifyCheck[i].external_urls.spotify);
            console.log('Album: ' + spotifyCheck[i].album.name);
            console.log('------');



        }


    });
}

function movieReturn(movieChosen) {

    request("http://www.omdbapi.com/?t=" + movieChosen + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            //console.log("Rotten Tomatoes Score : " + JSON.parse(body).omdb.Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Starring: " + JSON.parse(body).Actors);
        }
        if (userQuery === '') {
            movieChosen = "Mr.Nobody";
            movieReturn();
        }

    });
}

//do what it says function
function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };
        console.log(data);
        var returnText = data.split(',')

        function spotifyCheck(returnText) {
        };


    });

}
