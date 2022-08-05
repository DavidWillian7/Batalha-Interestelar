class Background{
    constructor(){
        this.level = phaseControler.level;
    }

    checkBackground(){
        this.level = phaseControler.level;
        if(this.level == 1){
            return imgMaps[this.level-1];
        }else if(this.level == 2){
            return imgMaps[this.level-1];
        }else if(this.level == 3){
            return imgMaps[this.level-1];
        }else if(this.level == 4){
            return imgMaps[this.level-1];
        }else{
            return imgMaps[this.level-1];
        }
    }
}