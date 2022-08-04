class PhaseControler{
    constructor(){
        this.player = new Player(225,390,3);
        this.enemys = [];
        this.playerShots = [];
        this.bossShots = [];
        this.level = 1;
        this.enemysImg = imgEnemys;
        this.songShotBoss = shotBoss;
        this.delayShotBoss = false;
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
        text("Nível: "  + this.level, 400, 440);

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
    
    createEnemys(amount){
        for(let i = 0; i < amount; i++){
            let randomX = parseInt(random(40,410));
            let randomY = parseInt(random(-200,-1000));
            this.enemys.push(new Enemy(randomX,randomY,1));
            this.enemys[i].shipEnemy = this.enemysImg[0];
            if(this.level == 2 && i%2 == 0){
                this.enemys[i].type = 2;
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = this.enemysImg[this.level-1];
            }else if(this.level == 3 && i%3 == 0){
                this.enemys[i].type = 3;
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = this.enemysImg[this.level-1];
            }else if(this.level == 4 && i%4 == 0){
                this.enemys[i].type = 4;
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = this.enemysImg[this.level-1];
            }
        }
    }

    createBoss(){
        let randomX = parseInt(random(0,400));
        let randomY = parseInt(random(60,90));
        this.enemys.push(new Enemy(randomX,randomY,1));
        this.enemys[0].shipEnemy = this.enemysImg[this.level-1];
        this.enemys[0].type = 5;
        this.enemys[0].hp = 2000;
    }

    updateEnemys(){
        if(this.level != 5){
            for(let enemy of this.enemys){
                if(enemy.y > 500 || enemy.x > 500){
                    enemy.x = parseInt(random(40,410));
                    enemy.y = parseInt(random(-100,-1000));
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
            if(this.delayShotBoss == false){
                this.bossShots.push(new Shot(this.enemys[0].x, this.enemys[0].y+50,25));
                this.songShotBoss.play();
                this.songShotBoss.setVolume(0.3);
                this.delayShotBoss = true;
                this.delay(70);
            }
        }
    }

    updateplayerShots(){
        for(let shot of this.playerShots){
            if(shot.y < 0){
                this.playerShots.splice(shot,1);
            }
            else{
                shot.move(0,-2);
                circle(shot.x,shot.y,15);
                imageMode(CENTER);
                image(shot.shotImg,shot.x,shot.y,6,15);
            }
        } 
    }

    updateBossShots(){
        for(let shot of this.bossShots){
            if(shot.y > 450){
                this.bossShots.splice(shot,1);
            }
            else{
                shot.move(0,2);
                fill(255,255,255);
                circle(shot.x,shot.y,15);
            }
        }
    }

    checkColisionEnemy(){
        if(this.level != 5){
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
        }else{
            if(dist(this.enemys[0].x, this.enemys[0].y,this.player.x,this.player.y) < 82.5){
                this.player.hp -= (10*this.enemys[0].type);
            }
        }
    }

    checkShotEnemy(){
        if(this.level != 5){
            if(this.playerShots.length > 0 && this.enemys.length > 0){
                for(let i = 0;i < this.enemys.length;i++){
                    for(let j = 0;j < this.playerShots.length;j++){
                        if(dist(this.enemys[i].x, this.enemys[i].y,this.playerShots[j].x,this.playerShots[j].y) < 30){
                            this.enemys[i].hp -= 10;
                            if(this.enemys[i].hp == 0){
                                this.enemys[i].move(0,0);
                                this.enemys[i].enemyExplosionSong.play();
                                this.enemys[i].enemyExplosionSong.setVolume(0.3);
                                this.enemys[i].explosionEnemy(this.enemys[i].x,this.enemys[i].y);
                                this.enemys.splice(i,1);
                                this.player.points += 10;
                            }
                            this.playerShots.splice(j,1);
                            break;
                        }
                    }
                }
            }
        }else{
            if(this.playerShots.length > 0){
                for(let i = 0;i < this.playerShots.length;i++){
                    if(dist(this.playerShots[i].x,this.playerShots[i].y,this.enemys[0].x,this.enemys[0].y) < 67.5){
                        this.enemys[0].hp -= 10;
                        if(this.enemys[0].hp == 0){
                            this.enemys[0].enemyExplosionSong.play();
                            this.enemys.splice(0,1);
                            this.player.points += 10;
                        }
                        this.playerShots.splice(i,1);
                        break;
                    }
                }
            }
        }
    }

    checkPlayerPoints(){
        if(this.player.points == this.level*100){
            this.player.points = 0; 
            this.level++;
            if(this.level != 5){
                this.createEnemys(this.level*10);
            }else{
                this.createBoss();
            }
        }
    }

    delay(t){
        setTimeout(
            () => {
                this.delayShotBoss = false;
            },
            t * 10
        );
    }
}