const music = new Audio('../assets/songs/gameMusic.wav');
let sound2 = false;

function sound(){
    if(sound2){
        music.pause();
        document.getElementById("sound").src = "../assets/sound.png";
        sound2 = false;
    }else{
        music.play();
        music.loop =true;
        document.getElementById("sound").src = "../assets/sound2.png";
        sound2 = true;
    }
}