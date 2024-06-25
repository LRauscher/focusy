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
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
  
    cardElements.forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('matched') || card === firstCard || card === secondCard) return;
  
        card.textContent = card.dataset.symbol;
  
        if (!firstCard) {
          firstCard = card;
        } else if (!secondCard) {
          secondCard = card;
  
          if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
  
            if (matchedPairs === symbols.length) {
              gameFinishedCallback(true);
            }
  
            firstCard = null;
            secondCard = null;
          } else {
            setTimeout(() => {
              firstCard.textContent = '';
              secondCard.textContent = '';
              firstCard = null;
              secondCard = null;
            }, 1000);
          }
        }
      });
    });
  }