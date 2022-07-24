class GenericEntity{
    constructor(x,y,speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    move(x,y){
        this.x += x;
        this.y += y;
    }
};