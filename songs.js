var songs = [];

var playlistDiv = document.getElementById("playlist");
var optionsDiv = document.getElementById("options");
var addFormDiv = document.getElementById("add-container");

var listMusicLink = document.getElementById("list-music");
listMusicLink.addEventListener("click", goToList);

var addMusicLink = document.getElementById("add-music");
addMusicLink.addEventListener("click", goToAdd);

var buttonAdd = document.getElementById("add-button");
buttonAdd.addEventListener("click", addMusic);

var addSong = document.getElementById("song");
var addArtist = document.getElementById("artist");
var addAlbum = document.getElementById("album");

songs[songs.length] = "Heaven or Las Vegas - by Cocteau Twins on the album Heaven or Las Vegas";
songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
songs[songs.length] = "Foreigner - by Pallbearer on the album Sorrow and Extinction";

for (var i = 0; i < songs.length; i++) {
	songs[i] = songs[i].replace(">", "-");
	songs[i] = songs[i].replace("*", "");
	songs[i] = songs[i].replace("@", "");
	songs[i] = songs[i].replace("!", "");
	songs[i] = songs[i].replace("(", "");
	console.log("song" + i + ": ", songs[i]);
}

function inputSongs() {
	playlistDiv.innerHTML = "";
	for (var i = 0; i < songs.length; i++) {
		playlistDiv.innerHTML += "<song>" + songs[i] + "</song>";
	}
}

function goToList() {

	addFormDiv.classList.remove("visible");
	addFormDiv.classList.add("hidden");

	optionsDiv.classList.remove("hidden");
	optionsDiv.classList.add("visible");

	playlistDiv.classList.remove("hidden");
	playlistDiv.classList.add("visible");

	listMusicLink.classList.add("current");
	addMusicLink.classList.remove("current");

}

function goToAdd() {

	playlistDiv.classList.remove("visible");
	playlistDiv.classList.add("hidden");

	optionsDiv.classList.remove("visible");
	optionsDiv.classList.add("hidden");

	addFormDiv.classList.remove("hidden");
	addFormDiv.classList.add("visible");

	listMusicLink.classList.remove("current");
	addMusicLink.classList.add("current");

}

function addMusic() {
	var song = addSong.value;
	var artist = addArtist.value;
	var album = addAlbum.value;
	var songString = "\"" + song +"\"" + " - by " + artist + " on the album " + album;
	songs.push(songString);
	inputSongs();
}

inputSongs();



