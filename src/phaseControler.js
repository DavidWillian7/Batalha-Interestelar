class PhaseControler{
    constructor(){
        this.player = new Player(225,390,3);
        this.enemys = [];
        this.shots = [];
        this.currentLevel = 1;
        this.enemysImg = imgEnemys;
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
        textFont('Pixel');
        textAlign(CENTER);
        text("Nível: "  + this.currentLevel, 400, 440);

        fill(255,255,255);
        textSize(12);
        textFont('Pixel');
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
        if(this.currentLevel != 5){
            for(let i = 0; i < amount; i++){
                let randomX = parseInt(random(0,450));
                let randomY = parseInt(random(-200,-500));
                this.enemys.push(new Enemy(randomX,randomY,1));
                this.enemys[i].shipEnemy = this.enemysImg[0];
                if(this.currentLevel == 2 && i%2 == 0){
                    this.enemys[i].type = 2;
                    this.enemys[i].hp *= this.currentLevel;
                    this.enemys[i].shipEnemy = this.enemysImg[1];
                }else if(this.currentLevel == 3 && i%3 == 0){
                    this.enemys[i].type = 3;
                    this.enemys[i].hp *= this.currentLevel;
                    this.enemys[i].shipEnemy = this.enemysImg[2];
                }else if(this.currentLevel == 4 && i%4 == 0){
                    this.enemys[i].type = 4;
                    this.enemys[i].hp *= this.currentLevel;
                    this.enemys[i].shipEnemy = this.enemysImg[3];
                }
            }
        }else{
            let randomX = parseInt(random(0,450));
            let randomY = parseInt(random(70,100));
            this.enemys.push(new Enemy(randomX,randomY,1));
            this.enemys[0].shipEnemy = this.enemysImg[4];
            this.enemys[0].type = 5;
            this.enemys[0].hp = 5000;
        }
    }

    updateEnemys(){
        if(this.currentLevel != 5){
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
        }else{
            if(this.enemys[0].x <= 400 && this.enemys[0].moveRigth == true){
                this.enemys[0].move(2,0);
                if(this.enemys[0].x >= 401){
                    this.enemys[0].moveRigth = false;
                }
            }else if(this.enemys[0].x >= 50 && this.enemys[0].moveRigth == false){
                this.enemys[0].move(-2,0);
                if(this.enemys[0].x <= 49){
                    this.enemys[0].moveRigth = true;
                }
            }
            circle(this.enemys[0].x,this.enemys[0].y,120);
            imageMode(CENTER);
            image(this.enemys[0].shipEnemy,this.enemys[0].x,this.enemys[0].y,120,120);
        }
    }

    updateShots(){
        for(let shot of this.shots){
            if(shot.y < 0){
                this.shots.splice(shot,1);
            }
            else{
                shot.move(0,-2);
                circle(shot.x,shot.y,15);
                imageMode(CENTER);
                image(shot.shotImg,shot.x,shot.y,6,15);
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
                    if(dist(this.enemys[i].x, this.enemys[i].y,this.shots[j].x,this.shots[j].y) < 30){
                        this.enemys[i].hp -= 10;
                        if(this.enemys[i].hp == 0){
                            this.enemys[i].enemyExplosionSong.play();
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