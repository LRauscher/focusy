import { updateHighScore, displayHighScore } from "../main.js";

export function hangmanGame (container, callback) {
    container.innerHTML = ''; // Clear container
    // Hangman game implementation
    const words = ['javascript', 'hangman', 'coding', 'game'];
    const word = words[Math.floor(Math.random() * words.length)];
    let guessedLetters = [];
    let remainingAttempts = 6;
    let score = 0;
  
    const renderGame = () => {
      container.innerHTML = `<div>Attempts left: ${remainingAttempts}</div>`;
      const wordContainer = document.createElement('div');
      word.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.innerText = guessedLetters.includes(letter) ? letter : '_';
        wordContainer.appendChild(letterSpan);
      });
      container.appendChild(wordContainer);
      const input = document.createElement('input');
      input.maxLength = 1;
      input.addEventListener('input', () => {
        const letter = input.value.toLowerCase();
        input.value = '';
        if (!guessedLetters.includes(letter) && /^[a-z]$/.test(letter)) {
          guessedLetters.push(letter);
          if (!word.includes(letter)) {
            remainingAttempts--;
          }
          if (word.split('').every(letter => guessedLetters.includes(letter))) {
            alert('You win!');
            score = remainingAttempts;
            callback(score);
          } else if (remainingAttempts <= 0) {
            alert(`You lose! The word was: ${word}`);
            callback(score);
          }
          renderGame();
        }
      });
      container.appendChild(input);
      input.focus();
    };
  
    renderGame();
  };