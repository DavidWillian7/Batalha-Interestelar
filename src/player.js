class Player extends GenericEntity{
    constructor(x,y,speed){
        super(x,y,speed);
        this.hp = 100;
        this.points = 0;
        this.delayShot = false;
    }

    delay(t){
        setTimeout(
            () => {
                this.delayShot = false;
            },
            t * 10
        );
    }

    handleKeyboard(){
        let keysPressed = {};
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
            this.updatePlayer(keysPressed);
        });     
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
    }
    
    updatePlayer(keysPressed){
        if (keysPressed.ArrowUp == true && player.y > 1) {
            this.move(0,-this.speed);
        }
        
        if (keysPressed.ArrowDown == true && player.y < 420) {
            this.move(0,this.speed);
        }
        
        if (keysPressed.ArrowLeft == true && player.x > 1) {
            this.move(-this.speed,0);
        }
        
        if (keysPressed.ArrowRight == true && player.x < 420) {
            this.move(this.speed,0);
        }
        if(keysPressed.z == true && this.delayShot == false){
            phaseControler.stage.shots.push(new Shot(player.x, player.y,25));
            this.delayShot = true;
            this.delay(5);
        }
    }

    setPlayer(){
        ellipse(this.x,this.y,30,30);
    }
};