class Animation{
    constructor(text){
        this.alpha = 0;
        this.text = text;
        this.disappearing = false;
    }

    draw(){
        fill(`rgba(102,102,104, ${this.alpha})`);
        rect(0,gameSize/2,gameSize,50);
        fill(`rgba(255,255,255, ${this.alpha})`);
        textSize(32);
        textFont('Pixel');
        textAlign(CENTER);
        text(this.text, gameSize/2, gameSize/2+35);
    }
    
    update(){
        if(this.disappearing){
            this.alpha -= 0.009;
            if(this.alpha <= 0){
                phaseControler.animation = undefined;
            }
        }else{
            this.alpha += 0.009;
            if(this.alpha >= 1){
                this.disappearing = true;
            }
        }
    }
    
}