class Enemy extends GenericEntity{
    constructor(x, y, speed){
        super(x, y, speed);
        this.hp = 10;
        this.shipEnemy;
        this.moveRigth = true;
    }

    updateEnemy(){
        this.move(0, 2);
        if(this.y > 500){
            this.x = parseInt(random(40, 410));
            this.y = parseInt(random(-100, -1000));
        }
    }

    drawEnemys(){
        circle(this.x,this.y,45);
        imageMode(CENTER);
        image(this.shipEnemy,this.x,this.y,40,40);
    }

    updateBoss(){
        if(this.x <= 400 && this.moveRigth == true){
            this.move(2, 0);
            if(this.x >= 401){
                this.moveRigth = false;
            }
        }
        else if(this.x >= 50 && this.moveRigth == false){
            this.move(-2, 0);
            if(this.x <= 49){
                this.moveRigth = true;
            }
        }
    }

    drawBoss(){
        circle(this.x,this.y,120);
        imageMode(CENTER);
        image(this.shipEnemy,this.x,this.y,120,120);
    }

};