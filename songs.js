
// Var list will hold the data from song-list.json when the XHR loads

	var list = [];


// Variables holding the divs for the basic HTML containers, "options", "playlist", and "add-container"

	$playlistDiv = $("#playlist");
	$optionsDiv = $("#options");
	$addFormDiv = $("#add-container");
	$addFormDiv.hide();


// Variables holding the links in the top container with event listeners to run associated functions
// Also, variable holding the add button that triggers the addMusic() function

	$listMusicLink = $("#list-music");
	$listMusicLink.click(goToList);

	$addMusicLink = $("#add-music");
	$addMusicLink.click(goToAdd);

	$buttonAdd = $("#add-button");
	$buttonAdd.click(addMusic);


// Variables holding the input fields in the add form

	$addSong = $("#song");
	$addArtist = $("#artist");
	$addAlbum = $("#album");
	$setGenre = $("#genre");


// Functions for swapping in/out the add-container

	function goToList() {
		$addFormDiv.hide();
		$optionsDiv.show();
		$playlistDiv.show();
		$listMusicLink.addClass("current");
		$addMusicLink.removeClass("current");
	}

	function goToAdd() {

		$playlistDiv.hide();
		$optionsDiv.hide();
		$addFormDiv.show();
		$listMusicLink.removeClass("current");
		$addMusicLink.addClass("current");
	}


// Constructor for outlining new song objects with function for creating new song objects

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


// Delete functions

	function addDeleteListener() {
		var $buttonDelete = $(".delete");
		for (var i = 0; i < list.songs.length; i++) {
			buttonDelete.item(i).addEventListener("click", deleteSong);
		}
	}

	function deleteSong(clickEvent) {
		playlist.removeChild(clickEvent.target.parentNode);
	}


// Define function that formats songs and inputs them in the DOM

	function inputSongs() {
		// playlistDiv.innerHTML = "";
		for (var i = 0; i < list.songs.length; i++) {
			$playlistDiv.innerHTML += "<div class='song'>" +
															 "<span class='song-title'>" + list.songs[i].title + "</span>" +
															 "<span class='song-print'>" + list.songs[i].artist + "</span>" +
															 "<span class='song-print album-title'>" + list.songs[i].album + "</span>" +
															 "<span class='song-print'>" + list.songs[i].genre + "</span>" +
															 "<button class='delete'>Delete</button>" +
															 "</div>";
		}
		$(".delete").click(deleteSong);
		$("more-songs").click(moreSongs);
	}

// XHR Request that populates the songs array with data

	var requestSongs = new XMLHttpRequest();
	requestSongs.addEventListener("load", fillSongs);
	requestSongs.open("GET", "song-list.json");
	requestSongs.send();


// Functions/etc. for adding data from new json file

	function fillSongs() {
		list = JSON.parse(this.responseText);
		inputSongs();
	}

	function moreSongs() {
		console.log("click");
		var requestMore = new XMLHttpRequest();
		requestMore.addEventListener("load", fillSongs);
		requestMore.open("GET", "song-list-2.json");
		requestMore.send();
	}


