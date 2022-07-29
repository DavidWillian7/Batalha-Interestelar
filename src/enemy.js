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
        let aux = this.explosionImg;
        for(let i = 0;i < aux.length;i++){
            imageMode(CENTER);
            image(aux[i],x,y,40,40);
        }
    }
};