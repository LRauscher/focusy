import { updateHighScore, displayHighScore } from "../main.js";

export function memoryMatchGame(gamesContainer, gameFinishedCallback) {
  const symbols = ['🍎', '🍌', '🍇', '🍒', '🍓', '🍉', '🍍', '🥝', '🍊'];
  let cards = [...symbols, ...symbols];
  cards = cards.sort(() => Math.random() - 0.5); // Shuffle cards

  gamesContainer.innerHTML = `
    <div id="memoryMatchGame">
      ${cards.map(symbol => `<div class="card" data-symbol="${symbol}"></div>`).join('')}
    </div>
  `;

  const cardElements = Array.from(document.getElementsByClassName('card'));
  let guess = 0;
  let firstCard = null;
  let secondCard = null;
  let matchedPairs = 0;
  let isChecking = false; // Flag to prevent multiple clicks

  function handleCardClick(card) {
    if (isChecking || card.classList.contains('matched') || card === firstCard || card === secondCard) return;

    card.textContent = card.dataset.symbol;
    guess++;

    if (!firstCard) {
      firstCard = card;
    } else if (!secondCard) {
      secondCard = card;
      isChecking = true;

      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === symbols.length) {
          let score = guess;
          updateHighScore('Memory', score);
          const highscore = displayHighScore('Memory');
          gamesContainer.innerHTML = `
          <p>Congratulations! You matched all pairs in ${guess} guesses!</p>
          <p>Highscore: ${highscore}</p>
          `;
          setTimeout(() => {
            gameFinishedCallback(true);
          }, 3000);
        }

        resetCards();
      } else {
        setTimeout(() => {
          firstCard.textContent = '';
          secondCard.textContent = '';
          resetCards();
        }, 1000);
      }
    }
  }

  function resetCards() {
    firstCard = null;
    secondCard = null;
    isChecking = false;
  }

  cardElements.forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
  });
}