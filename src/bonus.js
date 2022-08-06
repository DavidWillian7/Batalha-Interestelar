class LifeBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.lifeBonus = 10;
    }
}

class VelocityShotBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.velocityShot = 1;
    }
}