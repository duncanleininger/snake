const gameBoard = document.getElementById("gameBoard")
const ctx = gameBoard.getContext("2d")
const foodText = document.getElementById("foodText")
const resetBtn = document.getElementById("resetBtn")
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const gameBoardBG = "white"
const snakeColor = "green"
const snakeBorder = "black"
const foodColor = "red"
const unitSize = 25
let gameOn = false
let velocityX = unitSize
let velocityY = 0
let foodXpos
let foodYpos
let foodScore = 0
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener('keydown', changeDir)
resetBtn.addEventListener('click', resetGame)

gameStart()

function gameStart() {
    gameOn = true
    foodText.textContent = foodScore
    resetBtn.classList.add("hide")
    generateFood()
    drawFood()
    nextTick()
}

function nextTick() {
    if(gameOn) {
        setTimeout(()=>{
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            isGameOver()
            nextTick()
        }, 75)
    }
    else {
        displayGameOver()
    }
}

function clearBoard() {
    ctx.fillStyle = gameBoardBG
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}

function generateFood() {
    function randomFood(min, max) {
        const randomNr = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randomNr
    }
    foodXpos = randomFood(0, gameWidth - unitSize)
    foodYpos = randomFood(0, gameWidth - unitSize)
}

function drawFood() {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodXpos, foodYpos, unitSize, unitSize)
}

function moveSnake() {
    const head = {x: snake[0].x + velocityX, 
                    y: snake[0].y + velocityY}
    snake.unshift(head)
    if(snake[0].x == foodXpos && snake[0].y == foodYpos) {
        foodScore+=1
        foodText.textContent = foodScore
        generateFood()
    }
    else {
        snake.pop()
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
}

function changeDir(event) {
    const keyPressed = event.keyCode
    // console.log(keyPressed)

    const keyW = 87
    const keyA = 65
    const keyS = 83
    const keyD = 68

    const goingUp = (velocityY == -unitSize)
    const goingDown = (velocityY == unitSize)
    const goingLeft = (velocityX == -unitSize)
    const goingRight = (velocityX == unitSize)

    switch(true) {
        case(keyPressed ==  keyA && !goingRight):
            velocityX = -unitSize
            velocityY = 0
            break

            case(keyPressed == keyW && !goingDown):
            velocityX = 0
            velocityY = -unitSize
            break

            case(keyPressed == keyD && !goingLeft):
            velocityX = unitSize
            velocityY = 0
            break

            case(keyPressed == keyS && !goingUp):
            velocityX = 0
            velocityY = unitSize
            break
    }
}

function isGameOver() {
    switch(true) {
        case (snake[0].x < 0):
            gameOn = false
            break

        case (snake[0].x > gameWidth):
            gameOn = false
            break

        case (snake[0].y < 0):
            gameOn = false
            break

        case (snake[0].y > gameHeight):
            gameOn = false
            break
    }
    for (let i=1; i<snake.length; i+=1) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            gameOn = false
        }
    }
}

function displayGameOver() {
    ctx.font = "50px Fantasy"
    ctx.fillStyle = "red"
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight /2)
    gameOn = false
    resetBtn.classList.remove("hide")
}

function resetGame() {
    foodScore = 0
    velocityX = unitSize
    velocityY = 0
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ]
    gameStart()
}