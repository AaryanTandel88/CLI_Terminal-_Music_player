const readline = require("readline");

const songs = [
    "Blinding Lights - The Weeknd",
    "Shape of You - Ed Sheeran",
    "Believer - Imagine Dragons",
    "Perfect - Ed Sheeran",
    "Heat Waves - Glass Animals"
];

let selectedSong = 0;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function displaySongs() {
    console.clear();

    console.log("🎵 MY MUSIC PLAYER 🎵");
    console.log("----------------------");
    console.log("Use ↑ ↓ to move and ENTER to select\n");

    for (let i = 0; i < songs.length; i++) {

        if (i === selectedSong) {
            console.log("👉 " + songs[i]);
        } else {
            console.log("   " + songs[i]);
        }
    }
}

displaySongs();

process.stdin.on("keypress", (key, data) => {

    if (data.name === "up") {

        if (selectedSong > 0) {
            selectedSong--;
        }

        displaySongs();
    }

    else if (data.name === "down") {

        if (selectedSong < songs.length - 1) {
            selectedSong++;
        }

        displaySongs();
    }

    else if (data.name === "return") {

        console.clear();

        console.log("🎵 MY MUSIC PLAYER 🎵");
        console.log("----------------------");

        console.log("\n▶️ Now Playing:");
        console.log(songs[selectedSong]);

        process.stdin.setRawMode(false);
        process.stdin.pause();
    }

    else if (data.name === "c" && data.ctrl) {
        process.stdin.setRawMode(false);
        process.stdin.pause();
    }
});