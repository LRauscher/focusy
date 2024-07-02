export function minesweeperGame(container, callback) {
    container.innerHTML = `
      <div id="minesweeper-game">
        <table id="minesweeper-board"></table>
        <button id="reset-minesweeper">Reset Game</button>
      </div>
    `;
  
    const minesweeperBoard = document.getElementById('minesweeper-board');
    const resetMinesweeperBtn = document.getElementById('reset-minesweeper');
    
    const boardSize = 9;
    const mineCount = 10;
    let board = [];
    let minePositions = [];
  
    function initBoard() {
      minesweeperBoard.innerHTML = '';
      board = [];
      minePositions = [];
  
      for (let i = 0; i < boardSize; i++) {
        const row = [];
        const tr = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
          const cell = document.createElement('td');
          cell.addEventListener('click', () => revealCell(i, j));
          tr.appendChild(cell);
          row.push({ revealed: false, mine: false, count: 0 });
        }
        minesweeperBoard.appendChild(tr);
        board.push(row);
      }
  
      addMines();
      calculateMineCounts();
    }
  
    function addMines() {
      let addedMines = 0;
      while (addedMines < mineCount) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (!board[row][col].mine) {
          board[row][col].mine = true;
          minePositions.push({ row, col });
          addedMines++;
        }
      }
    }
  
    function calculateMineCounts() {
      const directions = [
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 },                    { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
      ];
  
      for (const { row, col } of minePositions) {
        for (const { row: dRow, col: dCol } of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
            board[newRow][newCol].count++;
          }
        }
      }
    }
  
    function revealCell(row, col) {
      if (board[row][col].revealed) return;
  
      board[row][col].revealed = true;
      const cell = minesweeperBoard.rows[row].cells[col];
      cell.classList.add('revealed');
  
      if (board[row][col].mine) {
        cell.textContent = '💣';
        alert('Game Over');
        callback();
        return;
      }
  
      if (board[row][col].count > 0) {
        cell.textContent = board[row][col].count;
      } else {
        const directions = [
          { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
          { row: 0, col: -1 },                    { row: 0, col: 1 },
          { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
        ];
        for (const { row: dRow, col: dCol } of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
            revealCell(newRow, newCol);
          }
        }
      }
    }
  
    resetMinesweeperBtn.addEventListener('click', initBoard);
  
    initBoard();
    // Call callback when game is over (you need to define when that happens)
    // callback();
  }  