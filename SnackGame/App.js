const canvas = document.querySelector('#canvas');
const button = document.querySelector('.replay');
const scoreSpan = document.querySelector('.score'); 

let score =  0

const context = canvas.getContext('2d')

const bgImage = new Image()
bgImage.src = ''

const foodImage = new Image()
bgImage.src = 'fruit.png'

const eatAudio = new Audio()
eatAudio.src = ''

const deadAudio = new Audio()
deadAudio.src = ''

const unit = 30

let food = {
    x:Math.floor(Math.random() * 19 +1)*unit,
    y:Math.floor(Math.random() * 19 +1)*unit
}
 
const snack = []
snack[0] = {
    x:10*unit,
    y:9*unit
}

function draw (){
    context.drawImage(bgImage,0,0)
    context.drawImage(foodImage,food.x, food.y)

    for (let i = 0; i < snack.length; i++) {
        if(i === 0){
            context.fillstyle = 'white'
        }
        else{
            context.fillstyle = 'red'
        }
        
    }
}
let play = setInterval(draw, 100) 