
// Var list will hold the data from song-list.json when the XHR loads

	var list = {};
	var idCounter = 0;


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

	function deleteSong(clickEvent) {
		let toDeleteId = $(this).parent().attr("id");
		console.log("toDeleteId: ", toDeleteId);
		$.ajax({
			method: "DELETE",
			url: `https://cr13-music-history.firebaseio.com/songs/${toDeleteId}.json`
		}).done(fetchData);
	}


// Define function that formats songs and inputs them in the DOM

	function inputSongs() {
		var buildHTML = "";
		for (var key in list.songs) {
			buildHTML += `<div id="${key}" class="song">
									 <span class="song-title">${list.songs[key].title}</span>
									 <span class="song-print">${list.songs[key].artist}</span>
									 <span class="song-print album-title">${list.songs[key].album}</span>
									 <span class="song-print">${list.songs[key].genre}</span>
									 <button class="delete">Delete</button>
									 </div>`;
		}
		buildHTML += `<button class="more-songs">More</button>`;
		$playlistDiv.html(buildHTML);
		$(".delete").click(deleteSong);
		$(".more-songs").click(moreSongs);
	}

// XHR Request that populates the songs array with data

	// var fetchData = function() {
	// 	return new Promise((resolve, reject) => {
	// 		$.ajax({
	// 			url: "https://cr13-music-history.firebaseio.com/.json"
	// 		}).done((data) => resolve(data))
	// 			.fail((error) => reject(error));
	// 		});
	// };

	var fetchData = function() {
			$.ajax({
				url: "https://cr13-music-history.firebaseio.com/.json"
			}).done(fillSongs)
				.fail((error) => reject(error));
	};

fetchData()
// Functions/etc. for adding data from new json file

	function fillSongs(jsonData) {
		list = jsonData;
		console.log("list: ", list);
		inputSongs($playlistDiv.html());
		};

	function moreSongs() {
		fetchData()
			.then((data) => {
				fillSongs(data);
			});
	}


