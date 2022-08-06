class Shot extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
    }

    updatePlayerShot(){
        this.move(0,-2);
        if(this.y < 0){
            phaseControler.playerShots.splice(this,1);
        }
    }

    drawPlayerShot(){
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
        circle(this.x,this.y,15);
        imageMode(CENTER);
        image(shotBoss,this.x,this.y,15,15);
    }

}