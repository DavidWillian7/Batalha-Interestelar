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
        this.delayShot = false;
    }

    delay(t){
        setTimeout(
            () => {
                this.delayShot = false;
            },
            t * 10
        );
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
        
        if (keysPressed.ArrowDown == true && player.y < 420) {
            this.move(0,this.speed);
        }
        
        if (keysPressed.ArrowLeft == true && player.x > 1) {
            this.move(-this.speed,0);
        }
        
        if (keysPressed.ArrowRight == true && player.x < 420) {
            this.move(this.speed,0);
        }
        if(keysPressed.z == true && this.delayShot == false){
            stage.shots.push(new Shot(player.x, player.y,25));
            this.delayShot = true;
            this.delay(5);
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
                enemy.move(0,0.7);
                ellipse(enemy.x,enemy.y,30,30);
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

    checkColisionEnemy(){
        if(this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                if(dist(this.enemys[i].x, this.enemys[i].y,this.player.x,this.player.y) < 20){
                    this.enemys.splice(i,1);
                    i--;
                    this.player.hp -= 1;
                    break;
                }
            }
        }
    }

    checkShotEnemy(){
        if(this.shots.length > 0 && this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                for(let j = 0;j < this.shots.length;j++){
                    if(dist(this.enemys[i].x, this.enemys[i].y,this.shots[j].x,this.shots[j].y) < 20){
                        this.enemys.splice(i,1);
                        i--;
                        this.shots.splice(j,1);
                        j--;
                        stage.player.points += 1;
                        break;
                    }
                }
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