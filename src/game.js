let songShot;
let songEnemyExplosion;
let imgEnemy1;
let imgEnemy2;
let imgEnemy3;
let imgEnemy4;
let imgBoss;

function preload(){
    let phaseControler;
    let mapa;
    let gameSize;
    songShot = loadSound('../assets/songs/song-shot.wav');
    songEnemyExplosion = loadSound('../assets/songs/explosion.flac');
    imgEnemy1 = loadImage('../assets/enemy1.png');
    imgEnemy2 = loadImage('../assets/enemy2.png');
    imgEnemy3 = loadImage('../assets/enemy3.png');
    imgEnemy4 = loadImage('../assets/enemy4.png');
    imgBoss = loadImage('../assets/boss.png');
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
    phaseControler.updateShots();
    phaseControler.checkColisionEnemy();
    phaseControler.checkShotEnemy();
    phaseControler.checkPlayerPoints();
}