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
    }

    setEnemys(amount){
        for(let i = 0; i < amount; i++){
            let valor = parseInt(random(50,100));
            this.enemys.push(new Enemy(valor,40,1));
        }
    }
}

function preload(){
    let player;
    let stage;
}

function setup(){
    createCanvas(500,500);
    player = new Player(100,100,1);
    stage = new Stage(player,1);
    stage.setEnemys(4);
}

function draw(){
    clear();
    rect(player.x,player.y,5,5);
}