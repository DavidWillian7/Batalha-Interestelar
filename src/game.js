class GenericEntity{
    constructor(x,y,speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    move(x,y){
        this.x += x;
        this.y += y;
    }
};

class Player extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 100;
        this.points = 0;
    }
    
    updatePlayer(keyPressed){
        if (keyPressed == 'ArrowUp' && player.y > 1) {
            this.move(0,-this.speed);
        }
        
        if (keyPressed == 'ArrowDown' && player.y < 400) {
            this.move(0,this.speed);
        }
        
        if (keyPressed == 'ArrowLeft' && player.x > 1) {
            this.move(-this.speed,0);
        }
        
        if (keyPressed == 'ArrowRight' && player.x < 400) {
            this.move(this.speed,0);
        }

        if(keyPressed == ' ' && player.x < 400){
            stage.shots.push(new Shot(player.x, player.y,25));
        }
    }

};

class Enemy extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
    }
};

class Stage{
    constructor(player,phase){
        this.player = player;
        this.phase = phase;
        this.enemys = [];
        this.shots = [];
    }

    setEnemys(amount){
        for(let i = 0; i < amount; i++){
            let randomX = parseInt(random(0,450));
            let randomY = parseInt(random(0,200));
            this.enemys.push(new Enemy(randomX,-randomY,1));
        }
    }

    updateEnemys(){
        for(let enemy of stage.enemys){
            if(enemy.y > 500 || enemy.x > 500){
                stage.enemys.splice(enemy,1);
            }
            else{
                enemy.move(0,2);
                rect(enemy.x,enemy.y,25,25);
            }
        }
    }

    updateShots(){
        for(let shot of stage.shots){
            if(shot.y < 0){
                stage.shots.splice(shot,1);
            }
            else{
                shot.move(0,-2);
                rect(shot.x,shot.y,10,10);
            }
        } 
    }
}

class Shot extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
    }
}

function preload(){
    let player;
    let stage;
}

function setup(){
    let gameSize = 450;
    createCanvas(gameSize,gameSize);
    player = new Player(gameSize/2,gameSize-60,10);
    stage = new Stage(player,1);
    stage.setEnemys(4);

    document.addEventListener('keydown',handleKeyDown);

    function handleKeyDown(event){
        const keyPressed = event.key;
        player.updatePlayer(keyPressed);
    }
}

function draw(){
    clear();
    rect(stage.player.x,stage.player.y,25,25);
    stage.updateEnemys();
    stage.updateShots();
}