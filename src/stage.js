class Stage{
    constructor(player,phase){
        this.player = player;
        this.phase = phase;
        this.enemys = [];
        this.shots = [];
    }

    setEnemys(amount){
        for(let i = 0; i < amount; i++){
            let randomX = parseInt(random(0,450));
            let randomY = parseInt(random(0,200));
            this.enemys.push(new Enemy(randomX,-randomY,1));
        }
    }

    updateEnemys(){
        for(let enemy of stage.enemys){
            if(enemy.y > 500 || enemy.x > 500){
                stage.enemys.splice(enemy,1);
            }
            else{
                enemy.move(0,0.7);
                ellipse(enemy.x,enemy.y,30,30);
            }
        }
    }

    updateShots(){
        for(let shot of stage.shots){
            if(shot.y < 0){
                stage.shots.splice(shot,1);
            }
            else{
                shot.move(0,-2);
                ellipse(shot.x,shot.y,10,10);
            }
        } 
    }

    checkColisionEnemy(){
        if(this.enemys.length > 0){
            for(let i = 0;i < this.enemys.length;i++){
                if(dist(this.enemys[i].x, this.enemys[i].y,this.player.x,this.player.y) < 20){
                    this.enemys.splice(i,1);
                    i--;
                    this.player.hp -= 1;
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
                        this.enemys.splice(i,1);
                        i--;
                        this.shots.splice(j,1);
                        j--;
                        stage.player.points += 1;
                        break;
                    }
                }
            }
        }
    }
}