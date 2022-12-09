const c = document.getElementById("MyCanvas");
const ctx = c.getContext('2d');

class Corpocobra {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let vel = 7;

let espaco = 20;
let tamanho = c.width / espaco - 2;

let cabecaX = 1;
let cabecay = 1;
const Corpo = [];
let rabo = 1;

let macaX = Math.floor(Math.random() * espaco);
let macaY = Math.floor(Math.random() * espaco)

let velx = 0;
let vely = 0;

let control = true;
let control2 = 0;

const somcomeu = new Audio('Soundeffect/comeu.mp3')
const somfim = new Audio('Soundeffect/fimdejogo.mp3')

function jogo(){
    corbapos();
    
    let fim = fimdejogo();
    if(fim){
        return;
    }
    

    limpatela();
    
    comeu();
    corba();
    maca();
    pontuacao();

    if(control){
        console.log("AEHO");
        if(((rabo)%5) == 0){
            console.log("OPA")
            vel += 2;
            control = false;
            control2 = rabo;
        }
    }
    if(control2+2 == rabo){
        console.log("BAO")
        control = true;
    }


    setTimeout(jogo, 1000/vel);
}

function fimdejogo(){
    let Fimdejogo = false;

    if(velx === 0 && vely === 0){
        return false;
    }

    if(cabecaX < 0 || cabecay < 0 || cabecaX === espaco || cabecay === espaco){
        Fimdejogo = true;
    }
    for(let i =0; i< Corpo.length; i++){
        let part = Corpo[i];
        if(part.x == cabecaX && part.y === cabecay){
            Fimdejogo = true;
            break;
        }
    
    }


    if(Fimdejogo){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("FIM DE JOGO!", c.width/20, c.height/2);

        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        somfim.play();
    }
    return Fimdejogo;
}

function pontuacao(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana"
    ctx.fillText("score: " + (rabo-1), c.width-50, 10)
}

function limpatela(){

    
    ctx.fillStyle = '#8da259'
    ctx.fillRect(0, 0, c.width, c.height)
}

function corba(){

    ctx.fillStyle = 'gray';
    for(let i = 0; i < Corpo.length; i++){
        let part = Corpo[i];
        ctx.fillRect(part.x * espaco, part.y * espaco, tamanho, tamanho)
    }

    Corpo.push(new Corpocobra(cabecaX, cabecay));
    if(Corpo.length > rabo){
        Corpo.shift();
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(cabecaX * espaco , cabecay * espaco ,tamanho ,tamanho);
}

function corbapos(){
    cabecaX = cabecaX + velx;
    cabecay = cabecay + vely;
}

function maca(){
    ctx.fillStyle = "red";
    ctx.fillRect(macaX * espaco, macaY * espaco, tamanho, tamanho)
}

function comeu(){
    if(macaX === cabecaX && macaY == cabecay){
        macaX = Math.floor(Math.random() * espaco);
        macaY = Math.floor(Math.random() * espaco)
        rabo++;
        somcomeu.play();
    }
}

window.onkeydown = function(event){
    if (event.key == "d" || event.key == "ArrowRight"){
        if(velx == -1) return;
        velx = 1;
        vely = 0;     
        
    } else if(event.key == "a" || event.key == "ArrowLeft"){
        if(velx == 1) return;
        velx = -1;
        vely = 0;

    } else if(event.key =="w" || event.key == "ArrowUp"){
        if(vely == 1) return;
        velx = 0;
        vely = -1;

    } else if(event.key == "s" || event.key == "ArrowDown"){
        if(vely == -1) return;
        velx = 0;
        vely = 1;
    }
}


jogo();