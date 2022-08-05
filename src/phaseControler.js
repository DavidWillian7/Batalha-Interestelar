class PhaseControler{
    constructor(){
        this.player = new Player(225,390,3);
        this.enemys = [];
        this.playerShots = [];
        this.bossShots = [];
        this.level = 4;
        this.delayShotBoss = false;
        this.moveRigth = true;
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
            this.enemys[i].shipEnemy = imgEnemys[0];
            if(this.level == 2 && i%2 == 0){
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = imgEnemys[this.level-1];
            }else if(this.level == 3 && i%3 == 0){
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = imgEnemys[this.level-1];
            }else if(this.level == 4 && i%4 == 0){
                this.enemys[i].hp *= this.level;
                this.enemys[i].shipEnemy = imgEnemys[this.level-1];
            }
        }
    }

    createBoss(){
        let randomX = parseInt(random(0,400));
        let randomY = parseInt(random(60,90));
        this.enemys.push(new Enemy(randomX,randomY,1));
        this.enemys[0].shipEnemy = imgEnemys[this.level-1];
        this.enemys[0].hp = 2000;
    }

    updateEnemys(){
        for(let enemy of this.enemys){
            enemy.move(0,2);
            if(enemy.y > 500 || enemy.x > 500){
                enemy.x = parseInt(random(40,410));
                enemy.y = parseInt(random(-100,-1000));
            }
        }
    }
    
    drawEnemys(){
        for(let enemy of this.enemys){
            circle(enemy.x,enemy.y,45);
            imageMode(CENTER);
            image(enemy.shipEnemy,enemy.x,enemy.y,40,40);
        }
    }
        
    updateBoss(){
        if(this.enemys[0].x <= 400 && this.moveRigth == true){
            this.enemys[0].move(2,0);
            if(this.enemys[0].x >= 401){
                this.moveRigth = false;
            }
            }
            else if(this.enemys[0].x >= 50 && this.moveRigth == false){
                this.enemys[0].move(-2,0);
                if(this.enemys[0].x <= 49){
                    this.moveRigth = true;
                }
            }
    }

    drawBoss(){
        circle(this.enemys[0].x,this.enemys[0].y,120);
        imageMode(CENTER);
        image(this.enemys[0].shipEnemy,this.enemys[0].x,this.enemys[0].y,120,120);
    }

    createShotBoss(){
        if(this.delayShotBoss == false){
            this.bossShots.push(new Shot(this.enemys[0].x, this.enemys[0].y+50,25));
            songShotBoss.play();
            songShotBoss.setVolume(0.3);
            this.delayShotBoss = true;
            this.delay(70);
        }
    }

    updatePlayerShots(){
        for(let shot of this.playerShots){
            shot.move(0,-2);
            if(shot.y < 0){
                this.playerShots.splice(shot,1);
            }
        }
    }

    drawPlayerShots(){
        for(let shot of this.playerShots){
            circle(shot.x,shot.y,15);
            imageMode(CENTER);
            image(shotPlayer,shot.x,shot.y,6,15);
        }
    }

    updateBossShots(){
        for(let shot of this.bossShots){
            if(this.enemys[0].x <= 400 ){
                shot.move(1,2);
            }
            else if(this.enemys[0].x >= 50){
                shot.move(-1,2);
            }
            if(shot.y > 450){
                this.bossShots.splice(shot,1);
            }
        }
    }

    drawShotsBoss(){
        for(let shot of this.bossShots){
            circle(shot.x,shot.y,15);
            imageMode(CENTER);
            image(shotBoss,shot.x,shot.y,15,15);
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
                    if(this.level != 1){
                        this.player.hp -= (10*this.level);
                    }else{
                        this.player.hp -= 10;
                    }
                    this.playExplosion();
                    this.enemys.splice(i,1);
                     break;
                }
            }
        }
    }
    
    checkColisionBoss(){
        if(dist(this.enemys[0].x, this.enemys[0].y,this.player.x,this.player.y) < 82.5){
            this.player.hp -= (10*this.level);
        }
    }

    colisionShotEnemy(){
        if(this.playerShots.length > 0 && this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                for(let j = 0;j < this.playerShots.length;j++){
                    if(dist(this.enemys[i].x, this.enemys[i].y,this.playerShots[j].x,this.playerShots[j].y) < 30){
                        this.enemys[i].hp -= 10;
                        if(this.enemys[i].hp == 0){
                            this.playExplosion()
                            this.enemys[i].explosionEnemy(this.enemys[i].x,this.enemys[i].y);
                            this.enemys.splice(i,1);
                            this.player.points += 102;
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
                if(dist(this.playerShots[i].x,this.playerShots[i].y,this.enemys[0].x,this.enemys[0].y) < 67.5){
                    this.enemys[0].hp -= 10;
                    if(this.enemys[0].hp == 0){
                        songEnemyExplosion.play();
                        this.enemys.splice(0,1);
                        this.player.points += 10000;
                    }
                    this.playerShots.splice(i,1);
                    break;
                }
            }
        }
    }

    checkAmountEnemys(){
        if(this.enemys.length == 0){
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