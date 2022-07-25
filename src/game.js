function preload(){
    let phaseControler;
}

function setup(){
    let gameSize = 450;
    createCanvas(gameSize,gameSize);
    phaseControler = new PhaseControler();
    phaseControler.setEnemys(phaseControler.currentLevel*10);
}

function draw(){
    clear();
    phaseControler.drawHud();
    phaseControler.player.setPlayer();
    phaseControler.updateEnemys();
    phaseControler.updateShots();
    phaseControler.checkColisionEnemy();
    phaseControler.checkShotEnemy();
    phaseControler.checkPlayerPoints();
}