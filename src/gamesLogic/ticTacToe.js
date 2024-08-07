import { updateHighScore, displayHighScore } from "../main.js";

export function ticTacToe(container, callback) {
    container.innerHTML = ''; // Clear container
    // Tic-Tac-Toe implementation
    // For simplicity, using a static 3x3 grid example
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    let currentPlayer = 'X';
  
    const checkWinner = () => {
      // Check rows, columns, and diagonals for a winner
      for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) return true;
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) return true;
      }
      if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) return true;
      if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) return true;
      return false;
    };
  
    const handleClick = (i, j) => {
      if (board[i][j] !== '') return;
      board[i][j] = currentPlayer;
      renderBoard();
      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        callback(1);
      } else if (board.flat().every(cell => cell !== '')) {
        alert('It\'s a tie!');
        callback(0);
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  
    const renderBoard = () => {
      container.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.className = 'ttt-row';
        for (let j = 0; j < 3; j++) {
          const cell = document.createElement('div');
          cell.className = 'ttt-cell';
          cell.innerText = board[i][j];
          cell.addEventListener('click', () => handleClick(i, j));
          row.appendChild(cell);
        }
        container.appendChild(row);
      }
    };
  
    renderBoard();
  };