class Enemy extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 10;
        this.shipEnemy;
    }

    explosionEnemy(x,y){
        for(let i = 0;i < imgExplosion.length;i++){
            imageMode(CENTER);
            image(imgExplosion[i],x,y,40,40);
        }
    }
};