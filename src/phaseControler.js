class PhaseControler{
    constructor(){
        this.player = new Player(225,390,3);
        this.enemys = [];
        this.boss;
        this.playerShots = [];
        this.bossShots = [];
        this.explosions = [];
        this.bonus = [];
        this.level = 1;
        this.animation;
        this.delayShotBoss = false;
    }
    
    changeHpcolor(){
        if (this.player.hp < 40){
            return '#FF0000';
        }else{
            return '#FFFFFF';
        }
    }
    
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

    changeBackground(){
        if(this.level == 1){
            return imgMaps[this.level-1];
        }else if(this.level == 2){
            return imgMaps[this.level-1];
        }else if(this.level == 3){
            return imgMaps[this.level-1];
        }else if(this.level == 4){
            return imgMaps[this.level-1];
        }else{
            return imgMaps[this.level-1];
        }
    }
    
    createEnemys(amount){
        for(let i = 0; i < amount; i++){
            let randomX = parseInt(random(40,410));
            let randomY = parseInt(random(-200,-1000));
            this.enemys.push(new Enemy(randomX,randomY,2));
            this.enemys[i].shipEnemy = imgEnemys[0];
            if(this.level == 2 && i%2 == 0){
                this.enemys[i].speed = 2.5;
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = imgEnemys[this.level-1];
            }else if(this.level == 3 && i%3 == 0){
                this.enemys[i].speed = 2.7;
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = imgEnemys[this.level-1];
            }else if(this.level == 4 && i%4 == 0){
                this.enemys[i].speed = 2.9;
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = imgEnemys[this.level-1];
            }
        }
    }

    createBoss(){
        let randomX = parseInt(random(0,400));
        let randomY = parseInt(random(60,90));
        this.boss = new Enemy(randomX,randomY,2);
        this.boss.shipEnemy = imgEnemys[this.level-1];
        this.boss.hp = 1000;
    }

    createShotBoss(){
        if(this.delayShotBoss == false){
            this.bossShots.push(new Shot(this.boss.x+37, this.boss.y+50,25,"BOSS_SHOT"));
            this.bossShots.push(new Shot(this.boss.x-37, this.boss.y+50,25,"BOSS_SHOT"));
            songShotBoss.play();
            songShotBoss.setVolume(0.3);
            songShotBoss.rate(1.0);
            this.delayShotBoss = true;
            this.delay(70);
        }
    }

    playExplosion(){
        songEnemyExplosion.play();
        songEnemyExplosion.setVolume(0.3);
    }

    checkColisionEnemy(){
        if(this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                if(dist(this.enemys[i].x, this.enemys[i].y,this.player.x,this.player.y) < 45){
                    this.player.hp -= (10*this.level);
                    this.playExplosion();
                    songEnemyExplosion.rate(1.0);
                    this.explosions.push(new Explosion(this.enemys[i].x,this.enemys[i].y,70));
                    this.enemys.splice(i,1);

                    if(this.enemys.length == 0){
                        this.level++;
                        this.playerShots.splice(0,this.playerShots.length);
                        this.animation = new Animation(`Nível: ${this.level}`);
                    }

                    break;
                }
            }
        }
    }
    
    checkColisionBoss(){
        if(dist(this.boss.x, this.boss.y,this.player.x,this.player.y) < 82.5){
            this.player.hp -= (10*this.level);
        }
    }

    colisionShotEnemy(){
        if(this.playerShots.length > 0 && this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                for(let j = 0;j < this.playerShots.length;j++){
                    if(dist(this.enemys[i].x, this.enemys[i].y,this.playerShots[j].x,this.playerShots[j].y) < 30){
                        this.enemys[i].hp -= 10;

                        if(this.enemys[i].hp > 0){
                            this.playExplosion();
                            songEnemyExplosion.rate(4.0);
                            this.explosions.push(new Explosion(this.playerShots[j].x,this.playerShots[j].y,20));
                        }

                        if(this.enemys[i].hp == 0){
                            this.playExplosion();
                            songEnemyExplosion.rate(1.0);
                            this.explosions.push(new Explosion(this.enemys[i].x,this.enemys[i].y,70));
                            this.checkDropChance(0.3,this.enemys[i].x,this.enemys[i].y,1.5);
                            this.enemys.splice(i,1);
                            this.player.points += 102;
                            if(this.enemys.length == 0){
                                this.level++;
                                this.playerShots.splice(0,this.playerShots.length);
                                this.animation = new Animation(`Nível: ${this.level}`);
                            }
                        }
                        this.playerShots.splice(j,1);
                        break;
                    }
                }
            }
        }
    }

    colisionShotBoss(){
        if(this.playerShots.length > 0){
            for(let i = 0;i < this.playerShots.length;i++){
                if(dist(this.playerShots[i].x,this.playerShots[i].y,this.boss.x,this.boss.y) < 67.5){
                    this.playExplosion();
                    songEnemyExplosion.rate(4.0);
                    this.explosions.push(new Explosion(this.playerShots[i].x,this.playerShots[i].y,40));
                    this.boss.hp -= 10;
                    if(this.boss.hp == 0){
                        this.player.points += 10000;
                    }
                    this.playerShots.splice(i,1);
                    break;
                }
            }
        }
    }

    colisionBossShotPlayer(){
        if(this.bossShots.length > 0){
            for(let i = 0;i < this.bossShots.length;i++){
                if(dist(this.bossShots[i].x,this.bossShots[i].y,this.player.x,this.player.y) < 30){
                    this.playExplosion();
                    songEnemyExplosion.rate(4.0);
                    this.explosions.push(new Explosion(this.bossShots[i].x,this.bossShots[i].y,20));

                    this.player.hp -= 15;
                    this.bossShots.splice(i,1);
                }
            }
        }
    }

    checkAmountEnemys(){
        if(this.enemys.length == 0){
            if(this.level >= 1 && this.level <= 4){
                this.createEnemys(this.level*10);
            }else if(this.boss == undefined){
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

    checkDropChance(dropChance,x,y,speed){
        if(Math.random() <= dropChance){
            this.bonus.push(this.dropBonus(x,y,speed));
        }
    }
    
    dropBonus(x,y,speed){
        if(Math.random() < 0.5){
            return new LifeBonus(x,y,speed);
        }
        else{
            return new VelocityShotBonus(x,y,speed);
        }
    }

    checkColisionPlayerBonus(){
        if(this.bonus.length > 0){
            for(let i = 0;i < this.bonus.length;i++){
                if(dist(this.bonus[i].x, this.bonus[i].y,this.player.x,this.player.y) < 35){
                    this.bonus[i].applyBonus(this.player);
                    this.bonus.splice(i,1);
                     break;
                }
            }
        }
    }

    checkLifePlayer(){
        if(this.player.hp > 100){
            this.player.hp = 100;
        }
    }

}