export function chessGame(container, callback) {
    container.innerHTML = `
      <div id="chess-game">
        <div id="board"></div>
        <button id="reset-game">Reset Game</button>
      </div>
    `;
  
    const board = document.getElementById('board');
    const resetGameBtn = document.getElementById('reset-game');
  
    const game = new Chess();
    const boardConfig = {
      draggable: true,
      position: 'start',
      onDrop: (source, target) => {
        const move = game.move({
          from: source,
          to: target,
          promotion: 'q'
        });
  
        if (move === null) return 'snapback';
  
        if (game.game_over()) {
          setTimeout(() => {
            alert('Game Over');
            callback();
          }, 200);
        }
      }
    };
  
    const chessboard = Chessboard(board, boardConfig);
  
    resetGameBtn.addEventListener('click', () => {
      game.reset();
      chessboard.start();
    });
  
    // Call callback when game is over (you need to define when that happens)
    // callback();
  }  