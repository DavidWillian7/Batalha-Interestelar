class Background{
    constructor(){
        this.level = phaseControler.level;
        this.maps = imgMaps;
    }

    checkBackground(){
        this.level = phaseControler.level;
        if(this.level == 1){
            return this.maps[this.level-1];
        }else if(this.level == 2){
            return this.maps[this.level-1];
        }else if(this.level == 3){
            return this.maps[this.level-1];
        }else if(this.level == 4){
            return this.maps[this.level-1];
        }else{
            return this.maps[this.level-1];
        }
    }
}