class PhaseControler{
    constructor(player){
        this.player = player;
        this.level = 1;
        this.stage = this.setStage();
    }

    setStage(){
        let stage = new Stage(this.player,this.level);
        for(let enemy of stage.enemys){
            enemy.y *= -1;
        }
        return stage;
    }

    checkPlayerPoints(){
        let points = this.player.points;
        if(points == this.level*100){
            this.level++;
            this.player.points = 0;
            this.stage = this.setStage();
        }
    }
}