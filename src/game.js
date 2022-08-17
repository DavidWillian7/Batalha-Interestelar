let songShotPlayer;
let songShotBoss;
let songEnemyExplosion;
let ship;
let shotPlayer;
let shotBoss;
let imgEnemys = [];
let imgMaps = [];
let imgExplosion = [];
let imgLife;
let imgClock;

function preload(){
    let phaseControler;
    let gameSize;
    songShotPlayer = loadSound('../assets/songs/song-shot.wav');
    songEnemyExplosion = loadSound('../assets/songs/explosion.flac');
    songShotBoss = loadSound('../assets/songs/shot-boss.wav');
    shotPlayer = loadImage('../assets/shot.png');
    shotBoss = loadImage('../assets/shotBoss.png');
    ship = loadImage('../assets/ship.png');
    imgLife = loadImage('../assets/heart.png');
    imgClock = loadImage('../assets/clock.png');
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
}

function draw(){
    clear();
    imageMode(CORNER);
    image(phaseControler.changeBackground(),0,0,gameSize,gameSize);
    phaseControler.checkAmountEnemys();
    endGame(phaseControler);
    phaseControler.drawHud();
    phaseControler.player.drawPlayer();
    phaseControler.player.updatePlayer();
    phaseControler.checkLifePlayer();
    
    if(phaseControler.animation){
        phaseControler.animation.draw();
        phaseControler.animation.update();
    }

    if(phaseControler.playerShots.length > 0){
        phaseControler.playerShots.forEach(shot => {
            shot.drawPlayerShot();
            shot.updatePlayerShot();
        });
    }
    
    if(phaseControler.level >= 1 && phaseControler.level <= 4){
        if(phaseControler.enemys.length > 0){
            phaseControler.enemys.forEach(enemy => {
                enemy.drawEnemy();
                enemy.updateEnemy();
            });
        }

        if(phaseControler.bonus.length > 0){
            for(let i = 0;i < phaseControler.bonus.length;i++){
                phaseControler.bonus[i].draw();
                phaseControler.bonus[i].update(i);
            }
        }

        phaseControler.checkColisionPlayerBonus();
        phaseControler.checkColisionEnemy();
        phaseControler.colisionShotEnemy();

    }else{
        phaseControler.bonus.splice(0,phaseControler.bonus.length);

        phaseControler.boss.drawBoss();
        phaseControler.boss.updateBoss();
        phaseControler.checkColisionBoss();
        phaseControler.colisionShotBoss();
        phaseControler.createShotBoss();
        
        if(phaseControler.bossShots.length > 0){
            phaseControler.bossShots.forEach(bossShot => {
                bossShot.drawShotBoss();
                bossShot.updateBossShot();
            });
        }

        phaseControler.colisionBossShotPlayer();
    }

    if(phaseControler.explosions.length > 0){
        phaseControler.explosions.forEach(explosion => {
            explosion.drawExplosion();
            explosion.updateExplosion();
        });
    }

}