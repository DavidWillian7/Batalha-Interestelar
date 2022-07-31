class Background{
    constructor(){
        this.level = phaseControler.currentLevel;
        this.maps = imgMaps;
    }

    checkBackground(){
        this.level = phaseControler.currentLevel;
        if(this.level == 1){
            return this.maps[phaseControler.currentLevel-1];
        }else if(this.level == 2){
            return this.maps[phaseControler.currentLevel-1];
        }else if(this.level == 3){
            return this.maps[phaseControler.currentLevel-1];
        }else if(this.level == 4){
            return this.maps[phaseControler.currentLevel-1];
        }else{
            return this.maps[phaseControler.currentLevel-1];
        }
    }
}