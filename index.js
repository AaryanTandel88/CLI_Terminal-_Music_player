const readline = require("readline");
const { spawn } = require("child_process");
const path = require("path");

const songs = [
    "queenClassic.mp3",
    "redbone.mp3",
    "sample-10s.mp3",
    "sample-25s.mp3",
    "sample-speech-1m.mp3",
    "sample.mp3",
    "test.mp3"
];

let selectedSong = 0;
let currentSong = 0;
let player = null;
let isPlaying = false;


// Show songs
function showSongs() {

    console.clear();

    console.log("🎵 MY MUSIC PLAYER 🎵");
    console.log("----------------------");
    console.log("Use ↑ ↓ and ENTER\n");

    for (let i = 0; i < songs.length; i++) {

        if (i === selectedSong) {
            console.log("👉 " + songs[i]);
        } else {
            console.log("   " + songs[i]);
        }
    }
}


// Show player
function showPlayer() {

    console.clear();

    console.log("🎵 MY MUSIC PLAYER 🎵");
    console.log("----------------------");

    console.log("\n🎶 " + songs[currentSong]);

    if (isPlaying) {
        console.log("▶️ Playing");
    } else {
        console.log("⏸️ Paused");
    }

    console.log("\n----------------------");
    console.log("P = Play");
    console.log("Space = Pause");
    console.log("N = Next");
    console.log("B = Previous");
    console.log("Q = Quit");
}


// Play song
function playSong() {

    if (player != null) {
        player.kill();
    }

    const songPath = path.join(
        __dirname,
        "songs",
        songs[currentSong]
    );

    player = spawn("afplay", [songPath]);

    isPlaying = true;

    showPlayer();

    player.on("error", (error) => {
        console.log("\n❌ Could not play the song.");
        console.log(error.message);
    });

    player.on("close", () => {
        player = null;
        isPlaying = false;
    });
}


// Pause
function pauseSong() {

    if (player != null) {
        player.kill();
        player = null;
    }

    isPlaying = false;

    showPlayer();
}


// Keyboard input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

showSongs();


process.stdin.on("keypress", (key, data) => {

    // UP
    if (data.name === "up") {

        if (selectedSong > 0) {
            selectedSong--;
        }

        showSongs();
    }

    // DOWN
    else if (data.name === "down") {

        if (selectedSong < songs.length - 1) {
            selectedSong++;
        }

        showSongs();
    }

    // ENTER
    else if (data.name === "return") {

        currentSong = selectedSong;

        showPlayer();
    }

    // PLAY
    else if (data.name === "p") {

        playSong();
    }

    // PAUSE
    else if (data.name === "space") {

        pauseSong();
    }

    // NEXT
    else if (data.name === "n") {

        if (currentSong < songs.length - 1) {
            currentSong++;
        } else {
            currentSong = 0;
        }

        playSong();
    }

    // PREVIOUS
    else if (data.name === "b") {

        if (currentSong > 0) {
            currentSong--;
        } else {
            currentSong = songs.length - 1;
        }

        playSong();
    }

    // QUIT
    else if (data.name === "q") {

        if (player != null) {
            player.kill();
        }

        console.clear();

        console.log("👋 Music player closed.");

        process.stdin.setRawMode(false);
        process.stdin.pause();
    }
});