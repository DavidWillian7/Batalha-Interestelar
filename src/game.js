let songShotPlayer;
let songEnemyExplosion;
let shotSongBoss;
let imgEnemys = [];
let imgMaps = [];
let imgExplosion = [];

function preload(){
    let phaseControler;
    let mapa;
    let gameSize;
    songShotPlayer = loadSound('../assets/songs/song-shot.wav');
    songEnemyExplosion = loadSound('../assets/songs/explosion.flac');
    shotSongBoss = loadSound('../assets/songs/shot-boss.wav');
    for(let i = 1;i <= 5;i++){
        imgEnemys.push(loadImage('../assets/enemy'+i+'.png'));
    }
    for(let i = 1;i <= 5;i++){
        imgMaps.push(loadImage('../assets/map'+i+'.png'));
    }
    for(let i = 1;i <= 48;i++){
        imgExplosion.push(loadImage('../assets/imgExplosion/img_'+i+'.png')); 
    }
}

function setup(){
    gameSize = 450;
    createCanvas(gameSize,gameSize);
    phaseControler = new PhaseControler();
    phaseControler.createEnemys(phaseControler.level*10);
    mapa = new Background();
}

function draw(){
    clear();
    imageMode(CORNER);
    image(mapa.checkBackground(),0,0,gameSize,gameSize);
    phaseControler.drawHud();
    phaseControler.player.setPlayer();
    phaseControler.player.updatePlayer()
    phaseControler.updateplayerShots();;
    if(phaseControler.level != 5){
        phaseControler.updateEnemys();
        phaseControler.checkColisionEnemy();
        phaseControler.checkShotEnemy();
        phaseControler.checkPlayerPoints();
    }else{
        phaseControler.updateEnemys();
        phaseControler.checkColisionEnemy();
        phaseControler.checkShotEnemy();
        //phaseControler.checkPlayerPoints();
        phaseControler.updateBossShots();
    }
}