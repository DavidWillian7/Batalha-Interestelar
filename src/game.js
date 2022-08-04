let songShot;
let songEnemyExplosion;
let shotBoss;
let imgEnemys = [];
let imgMaps = [];
let imgExplosion = [];

function preload(){
    let phaseControler;
    let mapa;
    let gameSize;
    songShot = loadSound('../assets/songs/song-shot.wav');
    songEnemyExplosion = loadSound('../assets/songs/explosion.flac');
    shotBoss = loadSound('../assets/songs/shot-boss.wav');
    imgEnemys.push(loadImage('../assets/enemy1.png'));
    imgEnemys.push(loadImage('../assets/enemy2.png'));
    imgEnemys.push(loadImage('../assets/enemy3.png'));
    imgEnemys.push(loadImage('../assets/enemy4.png'));
    imgEnemys.push(loadImage('../assets/boss.png'));
    imgMaps.push(loadImage('../assets/map1.png'));
    imgMaps.push(loadImage('../assets/map2.png'));
    //imgMaps.push(loadImage('../assets/map3.png'));
    imgMaps.push(loadImage('../assets/map4.png'));
    imgMaps.push(loadImage('../assets/mapBoss.png'));
    for(let i = 1;i <= 48;i++){
        imgExplosion.push(loadImage('../assets/imgExplosion/img_'+i+'.png')); 
    }
}

function setup(){
    gameSize = 450;
    createCanvas(gameSize,gameSize);
    phaseControler = new PhaseControler();
    phaseControler.setEnemys(phaseControler.currentLevel*10);
    mapa = new Background();
}

function draw(){
    clear();
    imageMode(CORNER);
    image(mapa.checkBackground(),0,0,gameSize,gameSize);
    phaseControler.drawHud();
    phaseControler.player.setPlayer();
    phaseControler.player.updatePlayer();
    phaseControler.updateEnemys();
    phaseControler.updateplayerShots();
    phaseControler.checkColisionEnemy();
    phaseControler.checkShotEnemy();
    phaseControler.checkPlayerPoints();
    if(phaseControler.currentLevel == 5){
        phaseControler.updateBossShots();
    }
}