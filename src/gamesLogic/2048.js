export function game2048(container, callback) {
    container.innerHTML = `
      <div id="game-2048">
        <div id="board-2048"></div>
        <button id="reset-2048">Reset Game</button>
      </div>
    `;
  
    const board2048 = document.getElementById('board-2048');
    const reset2048Btn = document.getElementById('reset-2048');
  
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  
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
      const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      board[randomTile.x][randomTile.y] = Math.random() < 0.9 ? 2 : 4;
      initBoard();
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
      for (let i = 0; i < 4; i++) {
        board[i] = operate(board[i]);
      }
      addRandomTile();
    }
  
    function moveRight() {
      for (let i = 0; i < 4; i++) {
        board[i] = board[i].reverse();
        board[i] = operate(board[i]);
        board[i] = board[i].reverse();
      }
      addRandomTile();
    }
  
    function moveUp() {
      for (let i = 0; i < 4; i++) {
        const row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        const operatedRow = operate(row);
        for (let j = 0; j < 4; j++) {
          board[j][i] = operatedRow[j];
        }
      }
      addRandomTile();
    }
  
    function moveDown() {
      for (let i = 0; i < 4; i++) {
        const row = [board[0][i], board[1][i], board[2][i], board[3][i]].reverse();
        const operatedRow = operate(row).reverse();
        for (let j = 0; j < 4; j++) {
          board[j][i] = operatedRow[j];
        }
      }
      addRandomTile();
    }
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'ArrowUp') moveUp();
      if (e.key === 'ArrowDown') moveDown();
      initBoard();
    });
  
    reset2048Btn.addEventListener('click', () => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          board[i][j] = 0;
        }
      }
      addRandomTile();
      addRandomTile();
    });
  
    addRandomTile();
    addRandomTile();
    initBoard();
    // Call callback when game is over (you need to define when that happens)
    // callback();
  }  