class PhaseControler{
    constructor(){
        this.player = new Player(225,390,3);
        this.enemys = [];
        this.shots = [];
        this.currentLevel = 1;
    }
    
    changeHpcolor(){
        if (this.player.hp < 40){
            return '#FF0000';
        }else{
            return '#FFFFFF';
        }
    }
    //#42a1f4
    drawHud(){
        noStroke();
        fill(255,255,255);
        textSize(12);
        textAlign(CENTER);
        text("Nível: "  + this.currentLevel, 400, 440);

        fill(255,255,255);
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
                this.enemys[i].type = 2;
                this.enemys[i].hp *= this.currentLevel;
                this.enemys[i].shipEnemy = loadImage('../assets/enemy2.png');
            }else if(this.currentLevel == 3 && i%3 == 0){
                this.enemys[i].type = 3;
                this.enemys[i].hp *= this.currentLevel;
                this.enemys[i].shipEnemy = loadImage('../assets/enemy3.png');
            }else if(this.currentLevel == 4 && i%4 == 0){
                this.enemys[i].type = 4;
                this.enemys[i].hp *= this.currentLevel;
                this.enemys[i].shipEnemy = loadImage('../assets/enemy4.png');
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
                fill(230,230,230);
                circle(shot.x,shot.y,10);
            }
        } 
    }

    checkColisionEnemy(){
        if(this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                if(dist(this.enemys[i].x, this.enemys[i].y,this.player.x,this.player.y) < 45){
                    if(this.enemys[i].type != 1){
                        this.player.hp -= (10*this.enemys[i].type);
                    }else{
                        this.player.hp -= 10;
                    }
                    this.player.points += 10;
                    this.enemys.splice(i,1);
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
                        }
                        this.shots.splice(j,1);
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