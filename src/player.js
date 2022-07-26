class Player extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 100;
        this.points = 0;
        this.delayShot = false;
        this.canonRigth = true;
        this.valueDelay = 65;
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
        if(keyIsDown(UP_ARROW)  && this.y > 20) {
            this.move(0,-this.speed);
        }else if(keyIsDown(DOWN_ARROW) && this.y < 410) {
            this.move(0,this.speed);
        }
        
        if (keyIsDown(LEFT_ARROW) && this.x > 20) {
            this.move(-this.speed,0);
        }else if (keyIsDown(RIGHT_ARROW) && this.x < 430) {
            this.move(this.speed,0);
        }
        if(keyIsDown(90) && this.delayShot == false){
            if(this.canonRigth){
                phaseControler.playerShots.push(new Shot(this.x+12, this.y-10,3,"PLAYER_SHOT"));
                this.canonRigth = false;
            }else{
                phaseControler.playerShots.push(new Shot(this.x-12, this.y-10,3,"PLAYER_SHOT"));
                this.canonRigth = true;
            }
            songShotPlayer.rate(1.0);
            songShotPlayer.play();
            songShotPlayer.setVolume(0.3);
            this.delayShot = true;
            this.delay(this.valueDelay);
        }
    }

    drawPlayer(){
        noStroke();
        noFill();
        circle(this.x,this.y,45);
        imageMode(CENTER);
        image(ship,this.x,this.y,45,40);
    }
};