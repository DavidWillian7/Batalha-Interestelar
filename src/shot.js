class Shot extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.shotImg = loadImage('../assets/shot.png');
    }
}