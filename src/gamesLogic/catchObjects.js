export function catchObjects(gamesContainer, gameFinishedCallback) {
    const canvasHTML = `<canvas id="gameCanvas" width="400px" height="250px"></canvas>`;
    gamesContainer.innerHTML = canvasHTML;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const player = {
        width: 40,
        height: 40,
        x: canvas.width / 2 - 25,
        y: canvas.height - 60,
        speed: 6,
        dx: 0
    };

    const fallingObjects = [];
    const obstacles = [];
    const powerUps = [];
    const objectSize = 30;
    const obstacleSize = 20;
    const powerUpSize = 20;
    const goalScore = 20;
    let score = 0;
    let objectSpeed = 1.5;
    let obstacleSpeed = 1;
    let gameInterval;
    let createObjectInterval;
    let createObstacleInterval;
    let createPowerUpInterval;
    let lives = 3;

    const sounds = {
        catch: new Audio('./audios/catch.wav'),
        collision: new Audio('./audios/hit.wav'),
        powerUp: new Audio('./audios/bonus.wav'),
        background: new Audio('./audios/music.wav')
    };

    sounds.background.loop = true;
    sounds.background.play();

    function drawPlayer() {
        ctx.fillStyle = '#3f8efc';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function createFallingObject() {
        const x = Math.random() * (canvas.width - objectSize);
        fallingObjects.push({ x, y: 0 });
    }

    function createObstacle() {
        let x;
        do {
            x = Math.random() * (canvas.width - obstacleSize);
        } while (fallingObjects.some(obj => Math.abs(obj.x - x) < objectSize));
        obstacles.push({ x, y: 0 });
    }

    function createPowerUp() {
        const x = Math.random() * (canvas.width - powerUpSize);
        powerUps.push({ x, y: 0 });
    }

    function drawFallingObjects() {
        ctx.fillStyle = '#e53935';
        fallingObjects.forEach(obj => {
            ctx.fillRect(obj.x, obj.y, objectSize, objectSize);
        });
    }

    function drawObstacles() {
        ctx.fillStyle = '#000000';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacleSize, obstacleSize);
        });
    }

    function drawPowerUps() {
        ctx.fillStyle = '#fbc02d';
        powerUps.forEach(powerUp => {
            ctx.fillRect(powerUp.x, powerUp.y, powerUpSize, powerUpSize);
        });
    }

    function moveFallingObjects() {
        fallingObjects.forEach(obj => {
            obj.y += objectSpeed;
        });
    }

    function moveObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.y += obstacleSpeed;
        });
    }

    function movePowerUps() {
        powerUps.forEach(powerUp => {
            powerUp.y += objectSpeed;
        });
    }

    function detectCollision() {
        fallingObjects.forEach((obj, index) => {
            if (obj.y + objectSize > player.y && obj.x < player.x + player.width && obj.x + objectSize > player.x) {
                fallingObjects.splice(index, 1);
                score++;
                sounds.catch.play();
                if (score >= goalScore) {
                    endGame('win');
                }
            } else if (obj.y > canvas.height) {
                fallingObjects.splice(index, 1);
                lives--;
                if (lives <= 0) {
                    endGame('lose');
                }
            }
        });

        obstacles.forEach((obstacle, index) => {
            if (obstacle.y + obstacleSize > player.y && obstacle.x < player.x + player.width && obstacle.x + obstacleSize > player.x) {
                obstacles.splice(index, 1);
                lives--;
                sounds.collision.play();
                if (lives <= 0) {
                    endGame('lose');
                }
            } else if (obstacle.y > canvas.height) {
                obstacles.splice(index, 1);
            }
        });

        powerUps.forEach((powerUp, index) => {
            if (powerUp.y + powerUpSize > player.y && powerUp.x < player.x + player.width && powerUp.x + powerUpSize > player.x) {
                powerUps.splice(index, 1);
                score += 2; // Bonus score for power-ups
                sounds.powerUp.play();
                if (score >= goalScore) {
                    endGame('win');
                }
            } else if (powerUp.y > canvas.height) {
                powerUps.splice(index, 1);
            }
        });
    }

    function updatePlayerPosition() {
        player.x += player.dx;

        if (player.x < 0) {
            player.x = 0;
        }

        if (player.x + player.width > canvas.width) {
            player.x = canvas.width - player.width;
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawScore() {
        ctx.fillStyle = '#000';
        ctx.font = '16px Inter';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Lives: ${lives}`, 10, 40);
    }

    function update() {
        clearCanvas();
        drawPlayer();
        drawFallingObjects();
        drawObstacles();
        drawPowerUps();
        drawScore();
        updatePlayerPosition();
        moveFallingObjects();
        moveObstacles();
        movePowerUps();
        detectCollision();

        if (score >= goalScore) {
            objectSpeed += 0.05;
            obstacleSpeed += 0.05;
        }
    }

    function startGame() {
        gameInterval = setInterval(update, 1000 / 60);
        createObjectInterval = setInterval(createFallingObject, 1000);
        createObstacleInterval = setInterval(createObstacle, 2000); // Increased interval for obstacles
        createPowerUpInterval = setInterval(createPowerUp, 5000); // Create power-ups every 5 seconds
    }

    function endGame(result) {
        clearInterval(gameInterval);
        clearInterval(createObjectInterval);
        clearInterval(createObstacleInterval);
        clearInterval(createPowerUpInterval);
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);
        sounds.background.pause();

        // Display the result
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = result === 'win' ? 'green' : 'red';
        ctx.font = '30px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(result === 'win' ? 'You Win!' : 'Game Over', canvas.width / 2, canvas.height / 2 - 20);

        // Show the score
        ctx.font = '20px Inter';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);

        // Call the callback function
        if (gameFinishedCallback) {
            setTimeout(() => {
                gameFinishedCallback(result);
            }, 3000);
        }
    }

    function keyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            player.dx = player.speed;
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            player.dx = -player.speed;
        }
    }

    function keyUp(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
            player.dx = 0;
        }
    }

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    startGame();
}