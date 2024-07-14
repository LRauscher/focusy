import { updateHighScore, displayHighScore } from "../main.js";

export function game2048(container, callback) {
    container.innerHTML = `
        <div id="game-2048">
            <div id="board-2048" class="board"></div>
            <button id="reset-2048">Reset Game</button>
            <div id="score-2048">Score: 0</div>
            <div id="highscore-2048">High Score: 0</div>
        </div>
    `;

    const board2048 = document.getElementById('board-2048');
    const reset2048Btn = document.getElementById('reset-2048');
    const scoreDisplay = document.getElementById('score-2048');
    const highScoreDisplay = document.getElementById('highscore-2048');

    let board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let score = 0;
    let highScore = 0;
    let moves = 0; // Track the number of moves
    const maxMoves = 100; // Set a move limit

    function initBoard() {
        board2048.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.textContent = board[i][j] === 0 ? '' : board[i][j];
                board2048.appendChild(tile);
            }
        }
        scoreDisplay.textContent = `Score: ${score}`;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }

    function addRandomTile() {
        const emptyTiles = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    emptyTiles.push({ x: i, y: j });
                }
            }
        }
        if (emptyTiles.length === 0) return false; // No space to add a new tile
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomTile.x][randomTile.y] = Math.random() < 0.8 ? 2 : 4; // 80% chance for a 2 tile
        initBoard();
        return true; // Successfully added a tile
    }

    function slide(row) {
        const arr = row.filter(val => val);
        const missing = 4 - arr.length;
        const zeros = Array(missing).fill(0);
        return arr.concat(zeros);
    }

    function combine(row) {
        for (let i = 0; i < 3; i++) {
            if (row[i] === row[i + 1] && row[i] !== 0) {
                row[i] = row[i] * 2;
                row[i + 1] = 0;
                score += row[i];
            }
        }
        return row;
    }

    function operate(row) {
        row = slide(row);
        row = combine(row);
        row = slide(row);
        return row;
    }

    function moveLeft() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            const newRow = operate(board[i]);
            if (board[i].toString() !== newRow.toString()) {
                moved = true;
            }
            board[i] = newRow;
        }
        if (moved) addRandomTile();
    }

    function moveRight() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            const reversedRow = board[i].reverse();
            const newRow = operate(reversedRow).reverse();
            if (board[i].toString() !== newRow.toString()) {
                moved = true;
            }
            board[i] = newRow;
        }
        if (moved) addRandomTile();
    }

    function moveUp() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            const row = [board[0][i], board[1][i], board[2][i], board[3][i]];
            const operatedRow = operate(row);
            for (let j = 0; j < 4; j++) {
                if (board[j][i] !== operatedRow[j]) {
                    moved = true;
                }
                board[j][i] = operatedRow[j];
            }
        }
        if (moved) addRandomTile();
    }

    function moveDown() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            const row = [board[0][i], board[1][i], board[2][i], board[3][i]].reverse();
            const operatedRow = operate(row).reverse();
            for (let j = 0; j < 4; j++) {
                if (board[j][i] !== operatedRow[j]) {
                    moved = true;
                }
                board[j][i] = operatedRow[j];
            }
        }
        if (moved) addRandomTile();
    }

    function checkGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    return false;
                }
                if (i < 3 && board[i][j] === board[i + 1][j]) {
                    return false;
                }
                if (j < 3 && board[i][j] === board[i][j + 1]) {
                    return false;
                }
            }
        }
        return true;
    }

    function endGame() {
        updateHighScore('2048', score); // Update high score if game is over
            highScore = score;
            displayHighScore(highScore);
            container.innerHTML = `
            <p>Game Over!</p>
            <p>Your Score: ${score}</p>
            <p>High Score: ${highScore}</p>
            `;
            setTimeout(() => {
              callback(true);
            }, 4000);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveLeft();
        if (e.key === 'ArrowRight') moveRight();
        if (e.key === 'ArrowUp') moveUp();
        if (e.key === 'ArrowDown') moveDown();
        moves++;
        initBoard();
        if (checkGameOver() || moves >= maxMoves) {
            endGame();
        }
    });

    reset2048Btn.addEventListener('click', () => {
        board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        score = 0;
        moves = 0;
        addRandomTile();
        addRandomTile();
    });

    addRandomTile();
    addRandomTile();
    initBoard();
}