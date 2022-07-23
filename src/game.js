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

    handleKeyboard(){
        let keysPressed = {};
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
            stage.player.updatePlayer(keysPressed);
        });     
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
    }
    
    updatePlayer(keysPressed){
        if (keysPressed.ArrowUp == true && player.y > 1) {
            this.move(0,-this.speed);
        }
        
        if (keysPressed.ArrowDown == true && player.y < 400) {
            this.move(0,this.speed);
        }
        
        if (keysPressed.ArrowLeft == true && player.x > 1) {
            this.move(-this.speed,0);
        }
        
        if (keysPressed.ArrowRight == true && player.x < 400) {
            this.move(this.speed,0);
        }
        if(keysPressed.z == true && player.x < 400){
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
                ellipse(shot.x,shot.y,10,10);
            }
        } 
    }

    checkColision(){

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
    player.handleKeyboard();
}

function draw(){
    clear();
    rect(stage.player.x,stage.player.y,25,25);
    stage.updateEnemys();
    stage.updateShots();
}