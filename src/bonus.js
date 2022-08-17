class LifeBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.lifeBonus = (10*phaseControler.level)/2;
    }

    draw(){
        circle(this.x,this.y,25);
        imageMode(CENTER);
        image(imgLife,this.x,this.y,25,25);
    }

    update(i){
        this.move(0,this.speed);
        if(this.y > 455){
            phaseControler.bonus.splice(i,1);
        }
    }

    applyBonus(player){
        if(player.hp < 100){
            player.hp += this.lifeBonus;
        }
    }

}

class VelocityShotBonus extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.velocityShot = 3;
    }

    draw(){
        circle(this.x,this.y,25);
        imageMode(CENTER);
        image(imgClock,this.x,this.y,25,25);
    }

    update(i){
        this.move(0,this.speed);
        if(this.y > 455){
            phaseControler.bonus.splice(i,1);
        }
    }

    applyBonus(player){
        if(player.valueDelay > 0){
            player.valueDelay -= this.velocityShot;
        }
    }

}