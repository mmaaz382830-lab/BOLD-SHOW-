// Pong Game - JavaScript Implementation

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game Objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    velocityX: 5,
    velocityY: 5,
    speed: 5
};

const paddleWidth = 10;
const paddleHeight = 80;

const player = {
    x: 20,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    velocityY: 0,
    speed: 6
};

const computer = {
    x: canvas.width - paddleWidth - 20,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    velocityY: 0,
    speed: 5
};

let playerScore = 0;
let computerScore = 0;
let gameRunning = false;
let gameStarted = false;

// Input Handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // Start game with spacebar
    if (e.key === ' ') {
        e.preventDefault();
        if (!gameRunning) {
            gameRunning = true;
            gameStarted = true;
            resetBall();
            updateGameStatus();
        }
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse tracking for player paddle control
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Move paddle smoothly to mouse position
    const targetY = mouseY - paddleHeight / 2;
    player.y = Math.max(0, Math.min(targetY, canvas.height - paddleHeight));
});

// Update game status
function updateGameStatus() {
    const statusElement = document.getElementById('gameStatus');
    if (!gameRunning) {
        statusElement.textContent = 'Press SPACE to start';
    } else {
        statusElement.textContent = 'Game Running...';
    }
}

// Update scores
function updateScores() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = 5 * (Math.random() - 0.5);
}

// Handle player input (arrow keys for paddle movement)
function handleInput() {
    if (keys['ArrowUp'] || keys['w']) {
        player.y = Math.max(0, player.y - player.speed);
    }
    if (keys['ArrowDown'] || keys['s']) {
        player.y = Math.min(canvas.height - paddleHeight, player.y + player.speed);
    }
}

// AI for computer paddle
function updateComputerAI() {
    const computerCenter = computer.y + paddleHeight / 2;
    const ballCenter = ball.y;
    
    // Simple AI: follow the ball with some reaction time
    if (computerCenter < ballCenter - 35) {
        computer.y = Math.min(canvas.height - paddleHeight, computer.y + computer.speed);
    } else if (computerCenter > ballCenter + 35) {
        computer.y = Math.max(0, computer.y - computer.speed);
    }
}

// Collision detection: ball vs paddle
function checkPaddleCollision(paddle) {
    if (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y
    ) {
        return true;
    }
    return false;
}

// Update ball position and physics
function updateBall() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // Wall collision (top and bottom)
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }
    
    // Paddle collision (player)
    if (checkPaddleCollision(player) && ball.velocityX < 0) {
        ball.velocityX = -ball.velocityX;
        ball.x = player.x + player.width + ball.radius;
        
        // Add spin based on where ball hits the paddle
        const deltaY = ball.y - (player.y + paddleHeight / 2);
        ball.velocityY = deltaY * 0.1;
    }
    
    // Paddle collision (computer)
    if (checkPaddleCollision(computer) && ball.velocityX > 0) {
        ball.velocityX = -ball.velocityX;
        ball.x = computer.x - ball.radius;
        
        // Add spin based on where ball hits the paddle
        const deltaY = ball.y - (computer.y + paddleHeight / 2);
        ball.velocityY = deltaY * 0.1;
    }
    
    // Score points
    if (ball.x - ball.radius < 0) {
        computerScore++;
        updateScores();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        updateScores();
        resetBall();
    }
}

// Draw functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = 'rgba(0, 255, 136, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'transparent';
}

function drawBall() {
    ctx.fillStyle = '#ff00ff';
    ctx.shadowColor = 'rgba(255, 0, 255, 0.6)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function clearCanvas() {
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Main game loop
function gameLoop() {
    clearCanvas();
    drawCenterLine();
    
    if (gameRunning) {
        handleInput();
        updateComputerAI();
        updateBall();
    }
    
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();
    
    requestAnimationFrame(gameLoop);
}

// Initialize
updateGameStatus();
updateScores();
gameLoop();
