class Enemy extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 10;
        this.shipEnemy;
        this.type = 1;
    }
};