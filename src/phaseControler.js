class PhaseControler{
    constructor(){
        this.player = new Player(225,390,10);
        this.enemys = [];
        this.shots = [];
        this.currentLevel = 1;
    }
    
    changeHpcolor(){
        if (this.player.hp < 30){
            return '#FF0000';
        }else{
            return '#42a1f4';
        }
    }

    drawHud(){
        noStroke();
        fill('#42a1f4');
        textSize(12);
        textAlign(CENTER);
        text("Nível: "  + this.currentLevel, 400, 440);

        fill('#42a1f4');
        textSize(12);
        textAlign(CENTER);
        text("Pontos: "  + this.player.points, 320, 440);
        
        fill(0,0,0,0);
        strokeWeight(1);
        stroke(255, 255, 255);
        rect(10,428,100,15);


        fill(this.changeHpcolor());
        strokeWeight(1);
        stroke(255, 255, 255);
        rect(10,428,this.player.hp,15);
        
    }
    
    setEnemys(amount){
        for(let i = 0; i < amount; i++){
            let randomX = parseInt(random(0,450));
            let randomY = parseInt(random(-200,-500));
            this.enemys.push(new Enemy(randomX,randomY,1));
            this.enemys[i].shipEnemy = loadImage('../assets/enemy1.png');
            if(this.currentLevel == 2 && i%2 == 0){
                this.enemys[i].hp *= this.currentLevel;
            }else if(this.currentLevel == 3 && i%3 == 0){
                this.enemys[i].hp *= this.currentLevel;
            }else if(this.currentLevel == 4 && i%4 == 0){
                this.enemys[i].hp *= this.currentLevel;
            }
        }
    }

    updateEnemys(){
        for(let enemy of this.enemys){
            if(enemy.y > 500 || enemy.x > 500){
                enemy.x = parseInt(random(0,450));
                enemy.y = parseInt(random(-200,-500));
            }
            else{
                enemy.move(0,2);
                circle(enemy.x,enemy.y,45);
                imageMode(CENTER);
                image(enemy.shipEnemy,enemy.x,enemy.y,40,40);
            }
        }
    }

    updateShots(){
        for(let shot of this.shots){
            if(shot.y < 0){
                this.shots.splice(shot,1);
            }
            else{
                shot.move(0,-2);
                circle(shot.x,shot.y,10);
            }
        } 
    }

    checkColisionEnemy(){
        if(this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                if(dist(this.enemys[i].x, this.enemys[i].y,this.player.x,this.player.y) < 45){
                    this.enemys[i].hp -= 10;
                    this.enemys[i].x = parseInt(random(0,450));
                    this.enemys[i].y = parseInt(random(-200,-500));
                    this.player.hp -= 10;
                    this.player.points += 10;
                    if(this.enemys[i].hp == 0){
                        this.enemys.splice(i,1);
                        i--;
                    }
                    break;
                }
            }
        }
    }

    checkShotEnemy(){
        if(this.shots.length > 0 && this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                for(let j = 0;j < this.shots.length;j++){
                    if(dist(this.enemys[i].x, this.enemys[i].y,this.shots[j].x,this.shots[j].y) < 20){
                        this.enemys[i].hp -= 10;
                        if(this.enemys[i].hp == 0){
                            this.enemys.splice(i,1);
                            this.player.points += 10;
                            i--;
                        }
                        this.shots.splice(j,1);
                        j--;
                        break;
                    }
                }
            }
        }
    }

    checkPlayerPoints(){
        if(this.player.points == this.currentLevel*100){
            this.player.points = 0; 
            this.currentLevel++;
            this.spawnEnemys(this.currentLevel);
        }
    }

    spawnEnemys(level){
        this.setEnemys(level*10);
    }
}