class LifeBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.lifeBonus = 10;
    }

    draw(){
        circle(this.x,this.y,25);
        imageMode(CENTER);
        image(imgLife,this.x,this.y,25,25);
    }

    update(i){
        this.move(0,1);
        if(this.y > 455){
            phaseControler.bonus.splice(i,1);
        }
    }

    applyBonus(player){
        player.hp += this.lifeBonus;
    }

}

class VelocityShotBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.velocityShot = 5;
    }

    draw(){
        circle(this.x,this.y,25);
        imageMode(CENTER);
        image(imgClock,this.x,this.y,25,25);
    }

    update(i){
        this.move(0,1);
        if(this.y > 455){
            phaseControler.bonus.splice(i,1);
        }
    }

    applyBonus(player){
        player.valueDelay -= this.velocityShot;
    }

}