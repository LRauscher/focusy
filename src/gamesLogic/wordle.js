import { updateHighScore, displayHighScore } from "../main.js";

export function wordle(gamesContainer, gameFinishedCallback) {
    let gameFinished = false;
    const words = [
        "Cat", "Dog", "Fish", "Bird", "Sun", "Moon", "Star", "Sky", "Blue", "Red", "Green",
        "Happy", "Joy", "Smile", "Fun", "Game", "Play", "Fast", "Slow", "Run", "Walk", "Jump",
        "Book", "Tree", "Ball", "Food", "Drink", "Rain", "Snow", "Wind", "Fire", "Rock",
        "King", "Queen", "Boy", "Girl", "Man", "Woman", "Baby", "Child", "Toy", "Bike",
        "Hat", "Shoes", "Dress", "Shirt", "Pants", "Coat", "Cup", "Fork", "Spoon", "Plate",
        "Apple", "Bread", "Chair", "Dance", "House", "Lemon", "Night", "Peach", "Quiet", "River",
        "Story", "Tiger", "Value", "Water", "Zebra", "Angel", "Brave", "Dream", "Earth",
        "Field", "Giant", "Heart", "Light", "Music", "Olive", "Plane", "Queen", "Shine", 
        "Thumb", "Voice", "Wheat", "Young", "Bloom", "Clear", "Drift", "Every", "Ghost",
        "Happy", "Joint", "Magic", "Oasis", "Peace", "Share", "Throw", "Unity", "Vivid",
        "Yearn", "Zesty", "Alert", "Batch", "Clean", "Eager", "Great", "Index", "Joker", 
        "Layer", "Mirth", "Onset", "Prawn", "Ridge", "Trend", "Upper", "Whale", "Youth",
        "Brick", "Craft", "Depth", "Equip", "Feast", "Glory", "Hotel", "Jumpy"
    ];
    const correctWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    const wordLength = correctWord.length;

    gamesContainer.innerHTML = `
    <div id="game">
        <div id="board" style="grid-template-columns: repeat(${wordLength}, 1fr);">
            <!-- Rows and cells are dynamically generated by JavaScript -->
        </div>
        <input type="text" id="guess-input" maxlength="${wordLength}" autofocus>
        <button id="submit-guess" disabled>Submit Guess</button>
        <p id="hint"></p>
    </div>
    `;

    let currentRow = 0;

    // Generate the board
    const board = document.getElementById('board');
    for (let i = 0; i < wordLength * 6; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        board.appendChild(cell);
    }

    const submitButton = document.getElementById('submit-guess');
    const guessInput = document.getElementById('guess-input');
    const hintElement = document.getElementById('hint');

    function validateInput() {
        if (guessInput.value.length === wordLength) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    
    function handleGuess() {
        const guess = guessInput.value.toLowerCase();
        
        const rowStartIndex = currentRow * wordLength;
        for (let i = 0; i < wordLength; i++) {
            const cell = board.children[rowStartIndex + i];
            cell.textContent = guess[i];

            if (guess[i] === correctWord[i]) {
                cell.classList.add('correct');
            } else if (correctWord.includes(guess[i])) {
                cell.classList.add('present');
            } else {
                cell.classList.add('absent');
            }
        }

        if (guess === correctWord) {
            submitButton.disabled = true;
            updateHighScore('wordle', currentRow + 1);
            gamesContainer.innerHTML = `<p id="correctGuess">Congratulations! You guessed the right word in ${currentRow + 1} attempts!</p>`;
            gameFinished = true;
            setTimeout(() => {
                gameFinishedCallback(gameFinished);
            }, 2000);
        } else if (currentRow === 5) {
            submitButton.disabled = true;
            gamesContainer.innerHTML = `<p id="wrongGuess">Game over!
             The right word was ${correctWord}
             Highscore: ${displayHighScore('Wordle')}</p>`;
            gameFinished = true;
            setTimeout(() => {
            gameFinishedCallback(gameFinished);
            }, 2000);
        } else {
            const correctLetterIndex = correctWord.split('').findIndex((letter, index) => letter === guess[index]);
            if (correctLetterIndex !== -1) {
                hintElement.textContent = `Hint: Letter ${correctLetterIndex + 1} is correct.`;
            } else {
                hintElement.textContent = `Hint: No correct letters in the right position.`;
            }
        }

        currentRow++;
        guessInput.value = '';
        guessInput.focus();
        validateInput();
    }

    guessInput.addEventListener('input', validateInput);
    submitButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && !submitButton.disabled) {
            handleGuess();
        }
    });

    return gameFinished;
}