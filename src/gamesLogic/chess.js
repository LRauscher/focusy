export function chessGame(container, callback) {
  const chess = new chess();
  const board = Chessboard(container, {
    draggable: true,
    position: 'start',
    onDrop: (source, target) => {
      const move = chess.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to a queen for simplicity
      });

      if (move === null) return 'snapback';

      // Check for game end conditions
      if (chess.in_checkmate()) {
        alert('Checkmate! Game over.');
      } else if (chess.in_draw()) {
        alert('Draw! Game over.');
      } else if (chess.in_stalemate()) {
        alert('Stalemate! Game over.');
      } else if (chess.in_threefold_repetition()) {
        alert('Threefold repetition! Game over.');
      } else if (chess.insufficient_material()) {
        alert('Insufficient material! Game over.');
      }

      // Call the callback function if provided
      if (callback) callback();
    }
  });

  // Reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Game';
  resetButton.addEventListener('click', () => {
    chess.reset();
    board.start();
  });

  container.appendChild(resetButton);
}