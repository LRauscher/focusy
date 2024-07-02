export function sudokuGame(container, callback) {
    container.innerHTML = `
      <div id="sudoku-game">
        <table id="sudoku-board"></table>
        <button id="check-solution">Check Solution</button>
      </div>
    `;
  
    const sudokuBoard = document.getElementById('sudoku-board');
    const checkSolutionBtn = document.getElementById('check-solution');
  
    const initialBoard = [
      [5, 3, '', '', 7, '', '', '', ''],
      [6, '', '', 1, 9, 5, '', '', ''],
      ['', 9, 8, '', '', '', '', 6, ''],
      [8, '', '', '', 6, '', '', '', 3],
      [4, '', '', 8, '', 3, '', '', 1],
      [7, '', '', '', 2, '', '', '', 6],
      ['', 6, '', '', '', '', 2, 8, ''],
      ['', '', '', 4, 1, 9, '', '', 5],
      ['', '', '', '', 8, '', '', 7, 9],
    ];
  
    function createSudokuBoard(board) {
      for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement('td');
          if (board[i][j] !== '') {
            cell.textContent = board[i][j];
          } else {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('maxlength', '1');
            input.addEventListener('input', (e) => {
              e.target.value = e.target.value.replace(/[^1-9]/g, '');
            });
            cell.appendChild(input);
          }
          if (i % 3 === 2 && i !== 8) cell.classList.add('subgrid-border-bottom');
          if (j % 3 === 2 && j !== 8) cell.classList.add('subgrid-border-right');
          row.appendChild(cell);
        }
        sudokuBoard.appendChild(row);
      }
    }
  
    function checkSolution() {
      const inputs = document.querySelectorAll('#sudoku-board input');
      const userBoard = Array.from({ length: 9 }, () => Array(9).fill(''));
      
      inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        userBoard[row][col] = input.value;
      });
      
      if (validateBoard(userBoard)) {
        sudokuBoard.textContent= 'Congratulations! You solved the Sudoku.';
      } else {
        sudokuBoard.textContent= 'There are errors in your solution. Please try again.';
      }
    }
  
    function validateBoard(board) {
      const isValidRow = (row) => {
        const set = new Set();
        for (const num of row) {
          if (num !== '' && set.has(num)) return false;
          set.add(num);
        }
        return true;
      };
  
      const isValidCol = (board, colIndex) => {
        const set = new Set();
        for (let row = 0; row < 9; row++) {
          const num = board[row][colIndex];
          if (num !== '' && set.has(num)) return false;
          set.add(num);
        }
        return true;
      };
  
      const isValidBox = (board, startRow, startCol) => {
        const set = new Set();
        for (let row = startRow; row < startRow + 3; row++) {
          for (let col = startCol; col < startCol + 3; col++) {
            const num = board[row][col];
            if (num !== '' && set.has(num)) return false;
            set.add(num);
          }
        }
        return true;
      };
  
      for (let i = 0; i < 9; i++) {
        if (!isValidRow(board[i]) || !isValidCol(board, i)) return false;
      }
  
      for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
          if (!isValidBox(board, row, col)) return false;
        }
      }
  
      return true;
    }
  
    createSudokuBoard(initialBoard);
    checkSolutionBtn.addEventListener('click', checkSolution);
    // Call callback when game is over (you need to define when that happens)
     callback();
  }  