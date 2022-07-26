class Background{
    constructor(){
        this.level = phaseControler.currentLevel;
        this.mapa1 = loadImage('../assets/mapa1.png');
        this.mapa2 = loadImage('../assets/mapa2.jpg');
        this.mapa3 = loadImage('../assets/mapa3.jpg');
        this.mapa4 = loadImage('../assets/mapa4.jpg');
        this.mapaBoss = loadImage('../assets/mapaBoss.jpg');
    }

    checkBackground(){
        this.level = phaseControler.currentLevel;
        if(this.level == 1){
            return this.mapa1;
        }else if(this.level == 2){
            return this.mapa2;
        }else if(this.level == 3){
            return this.mapa3;
        }else if(this.level == 4){
            return this.mapa4;
        }else{
            return this.mapaBoss;
        }
    }
}