let music;

function preload(){
    music = loadSound('../assets/songs/gameMusic.wav');
}

function setup(){
    music.loop();
    noCanvas();
}