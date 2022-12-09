    
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let score = 0;
let Aux = true;

const jump = () => {
mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');

    }, 500);
}

const loop = setInterval(() => {
//dies
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ')
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 95) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${pipePosition}px`;

        mario.src = './images-mario/game-over.png';
        mario.style.width = '145px'
        mario.style.marginLeft = '50px'

        clearInterval(loop); 

       
        document.addEventListener('keydown',function(){
        location.reload();
        });
        

    }
    else{
        if(pipePosition < 57 && Aux){
            score++;
            console.log(score);
            document.getElementById("score").innerHTML = "score : " + score;
            Aux = false;
        }
        else if(pipePosition > 300){
            Aux = true;
        }
    }
    console.log(pipePosition);


}, 10);

document.addEventListener('keydown', jump);

document.addEventListener('keydown',function(){
    document.getElementById('audio').play();
  });

  