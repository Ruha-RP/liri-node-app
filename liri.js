require("dotenv").config();

console.log(" \n Hi, I'm Liri! What do you want to do today? \n Choose from the following: 'my-tweets', 'movie-this', 'spotify-this-song' or 'do-what-it-says'");

//======================================VARIABLES=====================================================

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//Arguments provided
var action = process.argv[2];
var input = process.argv[3];
var nodeArgs = process.argv;

console.log("Command chosen: " + action);

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


//=====================================COMMAND FUNCTIONS====================================================

//==============TWITTER=======================

// function for obtaining latest tweets
function tweets() {

	//using the twitter API
	var Twitter = require("twitter");


	//need to fix this...
	var client = new Twitter(

		keys.twitter

	);

	input = "";

	var params = {screen_name: 'SophyDaphne'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  
		if (!error) {
	    	
	    	for (var i = 0; i < tweets.length; i++) {

	    		console.log(tweets[i].text);
	    		console.log(tweets[i].created_at);
	    		console.log("");

	    	}
	  	}
	});

};

//======================SPOTIFY====================================

//allows multiple words in the input
	input = "";

	if (nodeArgs.length <= 3) {

		input = "ace of base";
	}


	else {

		for (var i = 3; i < nodeArgs.length; i++) {

			if (i > 3 && i < nodeArgs.length) {

				input = input + "+" + nodeArgs[i];
			}

			else {

				input += nodeArgs[i];
			};
	
		};

	}
// function for obatining song from spotify
function song(input) {

	var Spotify = require("node-spotify-api");
 
	var spotify = new Spotify(
		keys.spotify
		
	);

	

	
	 

	//utilizing the spotify package, limits search to 3 results
	spotify.search({ type: 'track', query: input, limit:3 }, function(err, data) {
		
		if (err) {
    		
    		return console.log('Error occurred: ' + err);
  		}

		// console.log(data); 

		//creating a for loop to loop through the array:
		for (var i = 0; i < data.tracks.items.length; i++) {

			// console.log("Artist(s): " + data.tracks.items[i].artists[0].name);//This displayed only one artist
			// console.log(data.tracks.items[i]);
			for (var j = 0; j < data.tracks.items[i].artists.length; j++ ) {

				console.log("Artist(s): " + data.tracks.items[i].artists[j].name);

			}
			console.log("Song name: " + data.tracks.items[i].name);
			console.log("Preview link: " + data.tracks.items[i].external_urls.spotify);
			console.log("Album: " + data.tracks.items[i].album.name);			
			console.log("");

		}

	});

};


//==========================OMDB==================================

//using the request npm package
	var request = require("request");

	//assigning the input varibale to be empty
	input = "";

	//setting the default movie-this value
	if (nodeArgs.length <= 3) {

		input = "mr nobody";
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
	
//function for obtaining movie from OMDB
function movie(input) {
	
	

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

//=======================DO WHAT IT SAYS=======================

function random() {

	var fs = require("fs");

	fs.readFile("random.txt", "utf8",  (err, data, input) => {
  		
  		if (err){

  			throw err;
  		} 

  		else {

	  		// console.log(data);
			//splits the string at the comma to two different strings, in an array
	 		var res = data.split(",");
	 		// console.log(res);

	 		//accessing the strings in the array and assigning the values to variables action and input
	 		action = res[0];
	 		console.log(action);
	 		 
	 		input = res[1];
	 		console.log(input);

	 		 //Switch-case statement for different commands, depending on what's in the random.txt file
			switch (action) {
				case "my-tweets":
					tweets();
					break;

				case "spotify-this-song":
					song(input);
					break;

				case "movie-this":
					movie(input);
					break;
			};

  		};

	});

};

//===================================================DATA LOGGING====================================================

var fs = require("fs");

//creating a log function
function log() {

	fs.appendFile('log.txt', 'Command requested: ' + action + ' ' + input + ". \n" , (err) => {

		if (err) throw err;
		
		console.log('The "data to append" was appended to file!');
	});
}

log();







