let songShot;
let songEnemyExplosion;
let imgEnemys = [];

function preload(){
    let phaseControler;
    let mapa;
    let gameSize;
    songShot = loadSound('../assets/songs/song-shot.wav');
    songEnemyExplosion = loadSound('../assets/songs/explosion.flac');
    imgEnemys.push(loadImage('../assets/enemy1.png'));
    imgEnemys.push(loadImage('../assets/enemy2.png'));
    imgEnemys.push(loadImage('../assets/enemy3.png'));
    imgEnemys.push(loadImage('../assets/enemy4.png'));
    imgEnemys.push(loadImage('../assets/boss.png'));
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