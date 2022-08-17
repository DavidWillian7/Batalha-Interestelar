const music = new Audio('assets/songs/gameMusic.wav');
let active = true;

function sound(){
    if(active){
        document.getElementById("sound").src = "assets/active.png";
        active = false;
        music.play();
        music.loop = true;
    }else{
        document.getElementById("sound").src = "assets/mute.png";
        active = true;
        music.pause();
    }
}