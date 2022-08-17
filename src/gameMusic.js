const music = new Audio('assets/songs/gameMusic.wav');
let sound2 = true;

function sound(){
    if(sound2){
        document.getElementById("sound").src = "assets/sound2.png";
        sound2 = false;
        music.play();
        music.loop = true;
        music.pause();
    }else{
        document.getElementById("sound").src = "assets/sound.png";
        sound2 = true;
        music.pause();
    }
}