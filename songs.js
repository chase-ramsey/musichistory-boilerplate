var songs = [];

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

var playlistDiv = document.getElementById("playlist");

function inputSongs() {
	for (var i = 0; i < songs.length; i++) {
		playlistDiv.innerHTML += "<song>" + songs[i] + "</song>";
	}
}

inputSongs();

