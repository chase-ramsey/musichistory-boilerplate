
// Var list will hold the data from song-list.json when the XHR loads

	var list = [];


// Variables holding the divs for the basic HTML containers, "options", "playlist", and "add-container"

	var $playlistDiv = $("#playlist");
	var $optionsDiv = $("#options");
	var $addFormDiv = $("#add-container");
	$addFormDiv.hide();


// Variables holding the links in the top container with event listeners to run associated functions
// Also, variable holding the add button that triggers the addMusic() function

	var $listMusicLink = $("#list-music");
	$listMusicLink.click(goToList);

	var $addMusicLink = $("#add-music");
	$addMusicLink.click(goToAdd);

	var $buttonAdd = $("#add-button");
	$buttonAdd.click(addMusic);


// Variables holding the input fields in the add form

	var $addSong = $("#song");
	var $addArtist = $("#artist");
	var $addAlbum = $("#album");
	var $setGenre = $("#genre");


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
		var newSong = new Song($addSong.val(), $addArtist.val(), $addAlbum.val(), $setGenre.val());
		list.push(newSong);
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
		var buildHTML = "";
		for (var i = 0; i < list.length; i++) {
			buildHTML += `<div class="song">
									 <span class="song-title">${list[i].title}</span>
									 <span class="song-print">${list[i].artist}</span>
									 <span class="song-print album-title">${list[i].album}</span>
									 <span class="song-print">${list[i].genre}</span>
									 <button class="delete">Delete</button>
									 </div>`;
		}
		buildHTML += `<button class="more-songs">More</button>`;
		$playlistDiv.html(buildHTML);
		$(".delete").click(deleteSong);
		$(".more-songs").click(moreSongs);
	}

// XHR Request that populates the songs array with data

	var requestSongs = new XMLHttpRequest();
	requestSongs.addEventListener("load", fillSongs);
	requestSongs.open("GET", "song-list.json");
	requestSongs.send();


// Functions/etc. for adding data from new json file

	function fillSongs() {
		data = JSON.parse(this.responseText);
		data.songs.forEach(function(song){
			list.push(song);
		});
		inputSongs($playlistDiv.html());
	}

	function moreSongs() {
		var requestMore = new XMLHttpRequest();
		requestMore.addEventListener("load", fillSongs);
		requestMore.open("GET", "song-list-2.json");
		requestMore.send();
	}


