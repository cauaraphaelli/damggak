//import platform from './img/plataforma_flutuante.png'
const platform = './js/img/Base_do_jogo.png'
const background = './js/img/Background2.png'
const walkRight = './js/img/WalkRight.png'
const walkLeft = './js/img/WalkLeft.png'
const standLeft = './js/img/Idle2Left.png'
//import standRight from './img/StandRight.png'
const standRight = './js/img/Idle2.png'
const barrel1 = './js/img/Barrel1.png'
const soundTrack = './js/sound/SoundTrack..mp3'
//console.log(platform)
const canvas = document.getElementById('jogo')
const c = canvas.getContext('2d')

let pocas = 0

if(pocas == 0){
  document.getElementById("n_Score").innerText = "Score: 0"
  pocas = 1 
}

canvas.width = 900
canvas.height = 551.25

const gravidade = 0.5

let i = 0
let imagHeight = 0

function createImage(ImgSrc){
  const image = new Image()
  image.src = ImgSrc
  return image
}

class Player{
    constructor(){
        this.position = {
            x: 100,
            y:100
        }
        this.velocidade = {
            x: 0,
            y : 0
        }
        this.width = 35
        this.height = 75

        this.image = createImage(standRight)
        this.frames = 0
        this.sprites = {
          stand: {
            right: createImage(standRight),
            left: createImage(standLeft),
            cropWidth: 63
          },
          run:{
              right: createImage(walkRight),
              left: createImage(walkLeft),
              cropWidth: 99
          }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentSprite.cropWidth = 63
    }

    draw(){
      c.drawImage(
        this.currentSprite, 
        this.currentSprite.cropWidth * this.frames,
        0,
        this.currentSprite.cropWidth,
        143,
        this.position.x,
        this.position.y,
        this.width,
        this.height,)
    }

    update(){
      i += 1
      //console.log(i)
      if(i==25){
        this.frames += 1
        i=0
      }
        if(this.frames > 5) this.frames = 0
        this.draw()
        this.position.y += this.velocidade.y
        this.position.x += this.velocidade.x

        if(this.position.y + this.height +
            this.velocidade.y <= canvas.height)
            this.velocidade.y += gravidade
        else this.velocidade.y = 0
    }
}

class ObjColisao{
    constructor({x,y,image}){
      this.position = {
        x,
        y
      }
      this.velocidade = {
        x,
        y
      }
      this.width = 50
      this.height = 50

      this.image = image
    }
    draw(){
      c.drawImage(this.image, this.position.x, this.position.y)
    }
    update(){
      //console.log(j)
      if(this.position.x > 0){
          this.position.x -= 5
          this.draw()
      }
      else if(this.position.x <= 0){
        this.draw()
        scoreCount()
        this.position.x = 1200
      }
      if(score%2==0 && score != 0){
        this.position.x -= 10
      }
    }
}

class Plataforma{
    constructor({x, y, image}){
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw(){
      c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject{
  constructor({x, y, image}){
      this.position = {
          x,
          y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
  }

  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

let primeiraVez = false

function init(){
  if(primeiraVez == false){
    animado()
    primeiraVez = true
  }
  platformImag = createImage(platform)
  backgroundImg = createImage(background)
  player = new Player()
  objColisao = new ObjColisao({
    x:1000, y:0, image: barrel1
  })
  platforms = [new Plataforma({
    x:0, 
    y:510,
    image: platformImag
}), new Plataforma({
    x:480, y:510,image: platformImag})]

  objColisao = [new ObjColisao({
    x:900, y:460, image: createImage(barrel1)})]

  const genericobjects = [
    new GenericObject({
      x:0,
      y:0,
      image: createImage(background)
    }), new GenericObject({
      x:backgroundImg.width,
      y:0,
      image: createImage(background)
    }), new GenericObject({
      x:backgroundImg.width*2,
      y:0,
      image: createImage(background)
    }), new GenericObject({
      x:backgroundImg.width*3,
      y:0,
      image: createImage(background)
    })
  ]
  scrollOffset = 0
}

let platformImag = createImage(platform)
let backgroundImg = createImage(background)

let objColisao = [new ObjColisao({
    x:900, y:460, image: createImage(barrel1)})]

let player = new Player()
let platforms = [new Plataforma({
    x:0, 
    y:510,
    image: platformImag
}), new Plataforma({
    x:480, y:510,image: platformImag
})
]

let genericobjects = [
  new GenericObject({
    x:0,
    y:0,
    image: createImage(background)
  }), new GenericObject({
    x:backgroundImg.width,
    y:0,
    image: createImage(background)
  }), new GenericObject({
    x:backgroundImg.width*2,
    y:0,
    image: createImage(background)
  }), new GenericObject({
    x:backgroundImg.width*3,
    y:0,
    image: createImage(background)
  })
]

const  keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    },
    up:{
        pressed: false
    },
    down:{
        pressed: false
    },
}

let scrollOffset = 0

let j = 0

let vocePerdeu = 0
let score = 0

const background_sound = new Audio('js/sound/SoundTrack.mp3')
const jump = new Audio('js/sound/Jump_efect.wav')

function loser(){

}

function animado(){
  if(vocePerdeu == 1){
    document.getElementById("n_Score").innerText = "PERDESTE!!! " + "  ======> Score realizado: " + score
    return
  }
    background_sound.play()
    //background_sound.volume(0.2)
    //background_sound.setVolume(0.1)
    requestAnimationFrame(animado)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width, canvas.height)
    platforms.forEach((platform) => {
      platform.draw()
    })
    genericobjects.forEach(genericobjects => {
      genericobjects.draw()
    })
    objColisao.forEach(objColisao => {
      objColisao.draw()
    })
    j++
    //console.log(j)
    objColisao.forEach(objColisao =>{
      objColisao.update()
      //console.log('colisao : ' + objColisao.position.x)
    })
    player.update()
    if(keys.right.pressed && player.position.x < 350){
        player.velocidade.x = 3
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.velocidade.x = -3
    }
    else{
        player.velocidade.x = 0

        if(keys.right.pressed){
            scrollOffset += 5
            genericobjects.forEach((genericobjects) => {
              genericobjects.position.x = 0
          })
        }
        else if(keys.left.pressed){
            scrollOffset -= 5
            genericobjects.forEach((genericobjects) => {
              genericobjects.position.x = 0
          })
        }
      }
    platforms.forEach((platform) =>{
        if(player.position.y + player.height  <= platform.position.y &&
        player.position.y + player.height + player.velocidade.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width){
            player.velocidade.y = 0
        }
    })
    objColisao.forEach(objColisao =>{
      //console.log(player.position.y)
      if (player.position.x < objColisao.position.x + objColisao.width &&
        player.position.x + player.width > objColisao.position.x &&
        player.position.y < player.position.y + objColisao.height &&
        player.position.y + player.height > objColisao.position.y){
          vocePerdeu = 1
          //vocePerdeu()
        }
    })
}

function scoreCount(){
  objColisao.forEach((objcolisao)=>{
    if(vocePerdeu == 0 && objcolisao.position.x < player.position.x + player.width){
      score++
      document.getElementById("n_Score").innerText = "Score: " + score
      console.log(score)
    }

  })
}

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentSprite.cropWidth = 99
            break
        
        case 83:
            console.log('down')
            keys.down.pressed = true
            break
                
        case 68:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentSprite.cropWidth = 99
            break
            
        case 87:
          if(vocePerdeu == 1){
            vocePerdeu = 0
            score = 0
            document.getElementById("n_Score").innerText = "Score: " + score
            init()
            animado()
          }
          console.log(player.position.y)
          keys.up.pressed = true
          if(player.position.y > 404.5 && player.position.y > 300){
            if(player.velocidade.y > -60){
              jump.play()
              player.velocidade.y = -10
            }
          }
          else if(player.position.y < 300 && player.position.y < 404.5){
            player.velocidade.y = 0
            player.position.y += 30
          }
          break
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            if(keys.right.pressed == false){
              player.currentSprite = player.sprites.stand.left
              player.currentSprite.cropWidth = 63
            }
            break
        
        case 83:
            console.log('down')
            keys.down.pressed = false
            break
                
        case 68:
            console.log('right')
            keys.right.pressed = false
            if(keys.left.pressed == false){
              player.currentSprite = player.sprites.stand.right
              player.currentSprite.cropWidth = 63
            }
            break
            
        case 87:
            console.log('up')
            keys.up.pressed = false
            player.velocidade.y = 0
            break
    }
})
init()
