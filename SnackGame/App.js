const canvas = document.querySelector('#canvas');
const button = document.querySelector('.replay');
const scoreSpan = document.querySelector('.score'); 

let score =  0

const context = canvas.getContext('2d')

const bgImage = new Image()
bgImage.src = 'rain.jpg'

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

let direction = null
document.addEventListener('keydown', (e) =>{
    if(e.keyCode == 37 && direction != 'R'){
        direction = 'L'
    }
    else if(e.keyCode == 38 && direction != 'D'){
        direction = 'U'
    }
    else if(e.keyCode == 39 && direction != 'L'){
        direction = 'R'
    }
    else if(e.keyCode == 40 && direction != 'U'){
        direction = 'D'
    }
})

const collisionBody = (head, snack) =>{
    for (let index = 0; index < snack.length; index++) {
        if(head.x == snack[index].x && head.y == snack[index].y)
            return false
    }
    return true
}

function draw (){
    context.drawImage(bgImage,0,0)
    context.drawImage(foodImage,food.x, food.y)

    for (let i = 0; i < snack.length; i++) {
        if(i === 0){
            context.fillStyle = 'white'
        }
        else{
            context.fillStyle = 'red'
        }
        context.fillRect(snack[i].x, snack[i].y,unit,unit)
        context.strokeRect(snack[i].x, snack[i].y,unit,unit)
        context.strokeStyle = 'green'
    }

    let snackX = snack[0].x
    let snackY = snack[0].y

    if(direction == 'L') snackX -= unit
    if(direction == 'U') snackY -= unit
    if(direction == 'R') snackX += unit
    if(direction == 'D') snackY += unit


    if (snackX == food.x && snackY == food.y){
        score++
        food = {
            x:Math.floor(Math.random() * 19 +1)*unit,
            y:Math.floor(Math.random() * 19 +1)*unit
        }
    }
    else{
        snack.pop()
    }
   

    let newHead = {
        x:snackX,
        y:snackY
    }

    snack.unshift(newHead)

    if (snackX <= -unit || snackX >= canvas.width || snackY <= -unit || snackY >= canvas.width || collisionBody(newHead, snack) == true) {
        clearInterval(play)
        button.style.display = 'block'
    }
}

const clickButton = () =>{
    window.location.reload()
}
let play = setInterval(draw, 100) 