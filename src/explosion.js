class Explosion{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.frame = 0;
    }

    updateExplosion(){
		this.frame++;
		if(this.frame >= imgExplosion.length){
			phaseControler.explosion.splice(this, 1);
		}
    }

    drawExplosion(){
        imageMode(CENTER);
        image(imgExplosion[this.frame],this.x, this.y, 70, 70);
    }
};