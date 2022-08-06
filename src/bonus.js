class LifeBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.lifeBonus = 10;
        this.type1 = true;
    }

    drawLifeBonus(){
        circle(this.x,this.y,25);
        imageMode(CENTER);
        image(imgLife,this.x,this.y,25,25);
    }

    updateLifeBonus(i){
        this.move(0,1);
        if(this.y > 455){
            phaseControler.bonus.splice(i,1);
        }
    }

}

class VelocityShotBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.velocityShot = 5;
        this.type1 = false;
    }

    drawVelocityBonus(){
        circle(this.x,this.y,25);
        imageMode(CENTER);
        image(imgClock,this.x,this.y,25,25);
    }

    updateVelocityBonus(i){
        this.move(0,1);
        if(this.y > 455){
            phaseControler.bonus.splice(i,1);
        }
    }

}