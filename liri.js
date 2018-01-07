require("dotenv").config();

var keysFile = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//Arguments provided
var action = process.argv[2];
var input = process.argv[3];
var nodeArgs = process.argv;

//Switch-case statement for different commands
switch (action) {
	case "my-tweets":
		tweets();
		break;

	case "spotify-this-song":
		song();
		break;

	case "movie-this":
		movie();
		break;

	case "do-what-it-says":
		random();
		break;
};

//function for obtaining latest tweets
// function tweets() {

// 	//using the twitter API
// 	var Twitter = require("twitter");


// 	//need to fix this...
// 	var client = new Twitter({

// 	});

// 	var params = {screen_name: 'SophyDaphne'};

// 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  
// 		if (!error) {
	    	
// 	    	for (var i = 0; i < tweets.length; i++) {

// 	    		console.log(tweets[i].text);
// 	    		console.log(tweets[i].created_at);
// 	    		console.log("");

// 	    	}
// 	  	}
// 	});

// };

//function for obatining song from spotify
function song() {

	var Spotify = require("node-spotify-api");
 
	
 
	
	spotify.search({ type: 'track', query: "Hello", limit:1 }, function(err, data) {
		
		if (err) {
    		
    		return console.log('Error occurred: ' + err);
  		}

		// console.log(data); 
		console.log("Song name: " + data.tracks.items[0].name);
		console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Artist(s): " + data.tracks.items[0].artists[0].name);

	});

};



//function for obtaining movie from OMDB
function movie() {
	
	//using the request npm package
	var request = require("request");

	//assigning the input varibale to be empty
	input = "";

	//setting the default movie-this value
	if (nodeArgs.length <= 3) {

		input = "mr+nobody";
	}

	else {

		//creating a for loop to capture multiple words in the movie name and assigning it to the input
		for (var i = 3; i < nodeArgs.length; i++) {

			if (i > 3 && i < nodeArgs.length) {

				input = input + "+" + nodeArgs[i];
			}

			else {

				input += nodeArgs[i];
			};
		
		};
	};
	

	//utilizing request to access API and display output
	request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

		if (!error && response.statusCode === 200) {

			console.log("Movie Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country of Production: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);

		}
		 
	});
};


