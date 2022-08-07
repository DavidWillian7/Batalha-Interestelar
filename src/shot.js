class Shot extends GenericEntity{
    constructor(x,y,speed,type){
        super(x,y,speed);
        if(type == "PLAYER_SHOT"){
            noStroke()
            fill('#FDE926');
            ellipse(this.x, this.y, 20,20);
            ellipse(this.x, this.y, 10,10);
        }
    }

    updatePlayerShot(){
        this.move(0,-2);
        if(this.y < 0){
            phaseControler.playerShots.splice(this,1);
        }
    }

    drawPlayerShot(){
        noStroke();
        noFill();
        circle(this.x,this.y,15);
        imageMode(CENTER);
        image(shotPlayer,this.x,this.y,6,15);
    }

    updateBossShot(){
        this.move(0,2);
        if(this.y > 450){
            phaseControler.bossShots.splice(this,1);
        }
    }

    drawShotBoss(){
        noStroke();
        noFill();
        circle(this.x,this.y,15);
        imageMode(CENTER);
        image(shotBoss,this.x,this.y,15,15);
    }

}