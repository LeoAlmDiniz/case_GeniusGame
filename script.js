//VARIÁVEIS GLOBAIS:
var order = [];
var clickedOrder = [];
var score = 0;
var somClick=document.getElementById("somClick");
var somLose=document.getElementById("somLose");
var somNewElement=document.getElementById("somNewElement");
var somVictory=document.getElementById("somVictory");
var clickable = false;
var difficulty = 1000;
//Música em loop
//0 = verde;
//1 = vermelho;
//2 = amarelo;
//3 = azul
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');


//FUNCÇÕES DO JOGO
//cria ordem aleatória de cores
let shuffleOrder = () => {
    clickedOrder = []; // reset player clicked buttons
    //adiciona mais um botão na rodada atual (mantendo todos os outros das rodadas anteriores)
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    //roda a animação pro conjunto ordenado
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i)+1, (Number(i) == (order.length-1)));
    }
}
//acende a próxima or
let lightColor = (element, n, allow_click) => {
    setTimeout(() => {
        somNewElement.play()
        element.classList.add('selected');
    }, n*difficulty);
    setTimeout(() => {
        element.classList.remove('selected');
        clickable = allow_click;
    }, 0.9*(n+1)*difficulty);
}
//checa se bateu
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            somLose.play()
            lose();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        somVictory.play()
        alert("Pontuação: " + score + "!\n" + "Você acertou! Iniciando próximo nível.");
        nextLevel();
    }
}
//função para o clique do usuário
let click = (color) => {
    if (clickable) {
        somClick.play()
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');
        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
            checkOrder();
        }, 250)
    }
}
//função que retorna a cor
let createColorElement = (color) => {
    switch (color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            return;
    }
}
//win
let nextLevel = () => {
    score++;
    shuffleOrder();
}
//lose
let lose = () => {
    alert("Pontuação: " + score + "!\n" + "Você perdeu o jogo! Clique em OK para iniciar uma nova partida.");
    order = [];
    clickedOrder = [];
    playGame();
}
//função de início do jogo
let playGame = () => {
    score = 0;
    alert('Bem vindo ao Genius! Iniciadno novo jogo.')
    difficulty*=0.9;
    nextLevel();
}

//RODANDO A PÁGINA: 
//eventos de clique as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//chama o play game a primeira vezz assim que carrega a página
playGame();