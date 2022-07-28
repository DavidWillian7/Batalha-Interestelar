class Background{
    constructor(){
        this.level = phaseControler.currentLevel;
        this.maps = imgMaps;
    }

    checkBackground(){
        this.level = phaseControler.currentLevel;
        if(this.level == 1){
            return this.maps[0];
        }else if(this.level == 2){
            return this.maps[1];
        }else if(this.level == 3){
            return this.maps[2];
        }else if(this.level == 4){
            return this.maps[3];
        }else{
            return this.maps[4];
        }
    }
}