class Explosion{
    constructor(x,y,d){
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.frame = 0;
    }

    updateExplosion(){
        this.frame++;
		if(this.frame == imgExplosion.length){
			phaseControler.explosions.splice(this, 1);
		}
    }

    drawExplosion(){
        if(this.frame < 48){
            imageMode(CENTER);
            image(imgExplosion[this.frame],this.x, this.y, this.diameter, this.diameter);
        }
    }
};