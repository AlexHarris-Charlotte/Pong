

// Need a game over 

// Variables
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var canvasWidth = 360;
var canvasHeight = 360;
var ballRadius = 10;
var ballX = canvasWidth / 2;
var ballY = canvasHeight - 50;
var dx = 2;
var dy = -2;
var paddleY;
var paddleWidth = 75;
var paddleHeight = 20;
var paddleTop = (canvasHeight - paddleHeight);
var center = canvasWidth / 2;
var paddleX = (center - (paddleWidth / 2));
var rightPressed = false;
var leftPressed = false;
var score = document.getElementById("score");
var num = score.innerHTML;
document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)



// functions 

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, (canvasHeight - 30), paddleWidth, paddleHeight)
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

// Left Arrow: 37   Right Arrow: 39

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    } else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    } else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function wallCollision () {
    if(ballX >= (canvasWidth - ballRadius) || ballX <= 0) {
        dx = -dx;
    }

    if(ballY <= (0 + ballRadius)) {
        dy = -dy;
    }
}

function paddleCollision() {
    if(ballX >= paddleX && ballX <= (paddleX + paddleWidth) && ballY >= paddleTop - ballRadius) {
        dy = -dy;
        num++;
        score.innerHTML = num;
    }
    return num;
}

// function scoreSpeed() {
//      if(num >= 10) {
//         dx = 3;
//         dy = -3; 
//     } else if(num >= 20) {
//         dx = 5;
//         dy = -5;
//     } else if(num >= 30) {
//         dx = 7;
//         dy = -7;
//     }
// }

function paddleMovement() {
    if(rightPressed == true && (paddleX + paddleWidth) < canvasWidth) {
        paddleX += 5;
    }
 
    if(leftPressed == true && paddleX > 0) {
     paddleX -= 5;
    }
}

function gameOver() {
    if(ballY > paddleTop) {
        alert("Game Over Nerd!");
        clearInterval();
    }
}



// Game Loop
setInterval(function(){ 
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);   
    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("keyup", keyUpHandler, false) 
    drawBall();
    drawPaddle();
    // Paddle Collision Logic
    paddleCollision();
    // scoreSpeed();
    // Collision Logic
    wallCollision();
    // Paddle Movement Logic
    paddleMovement();
    gameOver();
    ballX += dx;
    ballY += dy;    
}, 10);