class Enemy extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 10;
        this.shipEnemy;
        this.type =1;
        this.moveRigth = true;
        this.enemyExplosionSong = songEnemyExplosion;
        this.explosionImg = imgExplosion;
    }

    explosionEnemy(x,y){
        for(let i = 0;i < this.explosionImg.length;i++){
            imageMode(CENTER);
            image(this.explosionImg[i],x,y,40,40);
        }
    }
};