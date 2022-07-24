function preload(){
    let player;
    let phaseControler;
}

function setup(){
    let gameSize = 450;
    createCanvas(gameSize,gameSize);
    player = new Player(gameSize/2,gameSize-60,10);
    phaseControler = new PhaseControler(player);
    player.handleKeyboard();
}

function draw(){
    clear();
    phaseControler.stage.checkColisionEnemy();
    phaseControler.stage.checkShotEnemy();
    phaseControler.checkPlayerPoints();
    player.setPlayer();
    phaseControler.stage.updateEnemys();
    phaseControler.stage.updateShots();
}