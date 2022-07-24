function preload(){
    let player;
    let stage;
}

function setup(){
    let gameSize = 450;
    createCanvas(gameSize,gameSize);
    player = new Player(gameSize/2,gameSize-60,10);
    stage = new Stage(player,1);
    stage.setEnemys(14);
    player.handleKeyboard();
}

function draw(){
    clear();
    stage.checkColisionEnemy();
    stage.checkShotEnemy();
    ellipse(stage.player.x,stage.player.y,30,30);
    stage.updateEnemys();
    stage.updateShots();
}