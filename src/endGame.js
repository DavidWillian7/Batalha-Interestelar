let points;
let win;

function endGame(phaseControler){
    if(phaseControler.player.hp <= 0){
        localStorage.setItem('points',phaseControler.player.points);
        localStorage.setItem('win',0);
        window.location.href = "../endGame.html";
    }

    if(phaseControler.level == 5 && phaseControler.boss.hp <= 0){
        localStorage.setItem('points',phaseControler.player.points);
        localStorage.setItem('win',1);
        window.location.href = "../endGame.html";
    }
}

function writeMessage(){
    points = localStorage.getItem('points');
    win = localStorage.getItem('win')
    let mensagem = document.getElementById('mensagem');
    let resultado = document.getElementById('resultado');
    if(win == 1){
        mensagem.innerHTML = "Congratulations";
        resultado.innerHTML = `Score: ${points}`;
    }
    else{
        mensagem.innerHTML = "Game Over";
        resultado.innerHTML = `Score: ${points}`;
    }
}