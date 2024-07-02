export function speedtestGame(container, callback) {
    // Clear the container
    container.innerHTML = '';

    const gameDiv = document.createElement('div');
    gameDiv.id = 'speedtestGame';

    const prompt = document.createElement('p');
    prompt.textContent = 'Type the displayed words as fast as you can:';

    const wordDisplay = document.createElement('h2');
    const words = [
        'focus', 'productivity', 'concentration', 'efficiency', 'attention',
        'cat', 'dog', 'fish', 'bird', 'sun', 'moon', 'star', 'sky', 'blue', 'red', 'green',
        'happy', 'joy', 'smile', 'fun', 'game', 'play', 'fast', 'slow', 'run', 'walk', 'jump',
        'apple', 'banana', 'grape', 'orange', 'pear', 'peach', 'berry', 'lemon', 'lime', 'mango'
    ];
    let randomWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = randomWord;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'speedtestInput';

    const timerDisplay = document.createElement('p');
    const timeLimit = 30; // time limit in seconds
    let timeRemaining = timeLimit;
    timerDisplay.textContent = `Time remaining: ${timeRemaining} seconds`;

    const scoreDisplay = document.createElement('p');
    let score = 0;
    scoreDisplay.textContent = `Score: ${score}`;

    gameDiv.appendChild(prompt);
    gameDiv.appendChild(wordDisplay);
    gameDiv.appendChild(input);
    gameDiv.appendChild(timerDisplay);
    gameDiv.appendChild(scoreDisplay);
    container.appendChild(gameDiv);

    const intervalId = setInterval(() => {
        timeRemaining -= 1;
        timerDisplay.textContent = `Time remaining: ${timeRemaining} seconds`;

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            input.disabled = true;
            container.innerHTML = `<p id="endScore">Time's up! You managed ${score} words!</p>`;

            // Display the score for a few seconds before clearing it
            setTimeout(() => {
                container.innerHTML = '';
                callback(true); // Indicate the game is finished
            }, 3000); // Display the score for 3 seconds
        }
    }, 1000);

    input.addEventListener('input', () => {
        if (input.value === randomWord) {
            score += 1;
            scoreDisplay.textContent = `Score: ${score}`;
            input.value = '';
            randomWord = words[Math.floor(Math.random() * words.length)];
            wordDisplay.textContent = randomWord;
        }
    });

    // Focus the input to start typing immediately
    input.focus();
}