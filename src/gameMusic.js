const music = new Audio('assets/songs/gameMusic.wav');
let active = false;

function sound(){
    if(active){
        document.getElementById("sound").src = "assets/mute.png";
        active = false;
        music.pause();
    }else{
        document.getElementById("sound").src = "assets/active.png";
        active = true;
        music.play();
        music.loop = true;
    }
}