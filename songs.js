var list;

// Variables holding the divs for the basic HTML containers, "options", "playlist", and "add-container"
var playlistDiv = document.getElementById("playlist");
var optionsDiv = document.getElementById("options");
var addFormDiv = document.getElementById("add-container");

// Variables holding the links in the top container with event listeners to run associated functions
// Also, variable holding the add button that triggers the addMusic() function
var listMusicLink = document.getElementById("list-music");
listMusicLink.addEventListener("click", goToList);

var addMusicLink = document.getElementById("add-music");
addMusicLink.addEventListener("click", goToAdd);

var buttonAdd = document.getElementById("add-button");
buttonAdd.addEventListener("click", addMusic);


// Variables holding the input fields in the add form
var addSong = document.getElementById("song");
var addArtist = document.getElementById("artist");
var addAlbum = document.getElementById("album");
var setGenre = document.getElementById("genre");

// songs[songs.length] = {
// 												title: "\"Heaven or Las Vegas\"",
// 												artist: "Cocteau Twins",
// 												album: "Heaven or Las Vegas",
// 												genre: "Pop"
// 											};
// songs[songs.length] = {
// 												title: "\"I Would Die 4 U\"",
// 												artist: "Prince",
// 												album: "Purple Rain",
// 												genre: "Pop"
// 											};
// songs[songs.length] = {
// 												title: "\"When the Levee Breaks\"",
// 												artist: "Led Zeppelin",
// 												album: "IV",
// 												genre: "Rock"
// 											};
// songs[songs.length] = {
// 												title: "\"Once in a Lifetime\"",
// 												artist: "Talking Heads",
// 												album: "Remain in Light",
// 												genre: "Pop"
// 											};
// songs[songs.length] = {
// 												title: "\"Borderline\"",
// 												artist: "Madonna",
// 												album: "Madonna",
// 												genre: "Pop"
// 											};
// songs[songs.length] = {
// 												title: "\"Re:Definition\"",
// 												artist: "Black Star",
// 												album: "Mos Def and Talib Kweli are Black Star",
// 												genre: "Hip Hop"
// 											};
// songs[songs.length] = {
// 												title: "\"Foreigner\"",
// 												artist: "Pallbearer",
// 												album: "Sorrow and Extinction",
// 												genre: "Metal"
// 											};

// songs[songs.length] = {
// 												title: "\"Ain't That Easy\"",
// 												artist: "D'Angelo",
// 												album: "Black Messiah",
// 												genre: "R&B"
// 											};

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

function Song(title, artist, album, genre) {
	this.title = title;
	this.artist = artist;
	this.album = album;
	this.genre = genre;
}

function addMusic() {
	var newSong = new Song(addSong.value, addArtist.value, addAlbum.value, setGenre.value)
	songs.push(newSong);
	inputSongs();
}

function addDeleteListener() {
	var buttonDelete = document.getElementsByClassName("delete");
	for (var i = 0; i < list.songs.length; i++) {
		buttonDelete.item(i).addEventListener("click", deleteSong);
	}
}

function deleteSong(clickEvent) {
	playlist.removeChild(clickEvent.target.parentNode);
}

// Define function that formats songs and inputs them in the DOM
function inputSongs() {
	playlistDiv.innerHTML = "";
	for (var i = 0; i < list.songs.length; i++) {
		playlistDiv.innerHTML += "<div class='song'>" +
														 "<span class='song-title'>" + list.songs[i].title + "</span>" +
														 "<span class='song-print'>" + list.songs[i].artist + "</span>" +
														 "<span class='song-print album-title'>" + list.songs[i].album + "</span>" +
														 "<span class='song-print'>" + list.songs[i].genre + "</span>" +
														 "<button class='delete'>Delete</button>" +
														 "</div>";
	}
	addDeleteListener();
}

// XHR Request that populates the songs array with data

var requestSongs = new XMLHttpRequest();
requestSongs.addEventListener("load", fillSongs);
requestSongs.open("GET", "song-list.json");
requestSongs.send();

function fillSongs() {
	list = JSON.parse(this.responseText);
	console.log("list after JSON: ", list);
	inputSongs();
}
