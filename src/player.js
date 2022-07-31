class Player extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 100;
        this.points = 0;
        this.delayShot = false;
        this.ship = loadImage('../assets/ship.png');
        this.songShotPlayer = songShot;
        this.canonRigth = true;
    }

    delay(t){
        setTimeout(
            () => {
                this.delayShot = false;
            },
            t * 10
        );
    }
    
    updatePlayer(){
        if(keyIsDown(UP_ARROW)  && this.y > 1) {
            this.move(0,-this.speed);
        }else if(keyIsDown(DOWN_ARROW) && this.y < 420) {
            this.move(0,this.speed);
        }
        
        if (keyIsDown(LEFT_ARROW) && this.x > 1) {
            this.move(-this.speed,0);
        }else if (keyIsDown(RIGHT_ARROW) && this.x < 420) {
            this.move(this.speed,0);
        }
        if(keyIsDown(90) && this.delayShot == false){
            if(this.canonRigth){
                phaseControler.shots.push(new Shot(this.x+12, this.y-10,25));
                this.canonRigth = false;
            }else{
                phaseControler.shots.push(new Shot(this.x-12, this.y-10,25));
                this.canonRigth = true;
            }
            this.songShotPlayer.play();
            this.songShotPlayer.setVolume(0.3);
            this.delayShot = true;
            this.delay(15);
        }
    }

    setPlayer(){
        noStroke();
        noFill();
        circle(this.x,this.y,45);
        imageMode(CENTER);
        image(this.ship,this.x,this.y,40,40);
    }
};