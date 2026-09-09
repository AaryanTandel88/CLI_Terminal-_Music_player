const readline = require("readline");

const songs = [
    "Blinding Lights - The Weeknd",
    "Shape of You - Ed Sheeran",
    "Believer - Imagine Dragons",
    "Perfect - Ed Sheeran",
    "Heat Waves - Glass Animals"
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\n🎵 MY MUSIC PLAYER 🎵");
console.log("----------------------");

console.log("\nAvailable Songs:");

songs.forEach((song, index) => {
    console.log(`${index + 1}. ${song}`);
});

rl.question("\nEnter the song number you want to play: ", (input) => {

    const songNumber = Number(input);

    if (songNumber >= 1 && songNumber <= songs.length) {
        console.log(`\n▶️ Now Playing: ${songs[songNumber - 1]}`);
    } else {
        console.log("\n❌ Invalid song number!");
    }

    rl.close();
});