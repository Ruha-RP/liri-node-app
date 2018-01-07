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
	

	//utilizing request
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


