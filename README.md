# Project Title

Bamazon

How does it works?

LIRI Bot is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

How can I use it?

You can use the following commands:

concert-this [artist/band name here] - Gives you information about concerts
spotify-this-song [song name] - Gives you information about song name
movie-this [movie name] - Gives you information about that movie
do-what-it-says - Reads from random.txt and gets the command and the value and executes the command
Built With

Javascript
Jquery
NodeJs
Node-Spotify-API
Axios
OMDB API
Bands In Town API
Moment
DotEnv
Working proof

concert-this

The user is searching for concert information about Ariana Grande. alt text

The user inputs an artist but although the artist is found, the response came back empty. alt text

The user gave no argument after the command. alt text

spotify-this-song

The user is searching for information about any song that matches the name that the user input, in this case, any song with the name bellyache will be printed. alt text

The user gave no argument after the command, so it will print information about the song of Ace of Base "The Sign". alt text

If the user inputs nonesense after the command, it will simply exit the program.

movie-this

The user is searching for information about the movie Battle Angel. alt text

The user gave no argument after the command, so it will print information about the movie "Mr. Nobody". alt text

Note: The user needs to input the complete name of the movie to guarantee the correct movie information is printed. This is because when dealing with sagas or movies with similar titles, only the last movie that matched will be printed. For example, if I were to look for The Lord of The Rings' first movie "The Fellowship of the Ring", but only wrote "The lord of the rings", you would get the movie which name is exactly just that, which in this case is a 1978 movie, instead of the newer ones. To find this particular movie, I would have to input "the lord of the rings: the fellowship of the ring" or "the fellowship of the ring"

do-what-it-says

When the random.txt file has 'movie-this,"the lion king" it will input:
alt text alt text

When the random.txt file has 'concert-this,"jonas brothers" it will input:
alt text alt text

When the random.txt file has 'spotify-this-song,"bad romance" it will input:
alt text alt text

Log.txt

All the results from the user searches are addded into a document called "log.txt". At first, the document doesn't exists but it's creater after the first result is delivered.
alt text alt text

We can check the results of all the requests that the user has input.
alt text

Authors

Débora Helena Madrid Morales - HelenaMadrid
URLS

Github project
