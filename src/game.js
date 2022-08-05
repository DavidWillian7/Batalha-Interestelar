let songShotPlayer;
let songShotBoss;
let songEnemyExplosion;
let ship;
let shotPlayer;
let shotBoss;
let imgEnemys = [];
let imgMaps = [];
let imgExplosion = [];

function preload(){
    let phaseControler;
    let mapa;
    let gameSize;
    songShotPlayer = loadSound('../assets/songs/song-shot.wav');
    songEnemyExplosion = loadSound('../assets/songs/explosion.flac');
    songShotBoss = loadSound('../assets/songs/shot-boss.wav');
    shotPlayer = loadImage('../assets/shot.png');
    shotBoss = loadImage('../assets/shotBoss.png');
    ship = loadImage('../assets/ship.png');
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
    phaseControler.player.drawPlayer();
    phaseControler.player.updatePlayer()
    phaseControler.drawPlayerShots();
    phaseControler.updatePlayerShots();;
    if(phaseControler.level != 5){
        phaseControler.drawEnemys();
        phaseControler.updateEnemys();
        phaseControler.checkColisionEnemy();
        phaseControler.colisionShotEnemy();
        if(phaseControler.explosions.length > 0){
            phaseControler.explosions.forEach(explosion => {
                explosion.drawExplosion();
                explosion.updateExplosion();
            });
        }
        phaseControler.checkAmountEnemys();
    }else{
        phaseControler.drawBoss();
        phaseControler.updateBoss();
        phaseControler.checkColisionBoss();
        phaseControler.colisionShotBoss();
        phaseControler.createShotBoss();
        phaseControler.drawShotsBoss();
        phaseControler.updateBossShots();
        phaseControler.colisionBossShotPlayer();
    }
}