import { updateHighScore, displayHighScore } from "../main.js";

export function speedtestGame(container, callback) {
    // Clear the container
    container.innerHTML = '';

    const gameDiv = document.createElement('div');
    gameDiv.id = 'speedtestGame';

    const prompt = document.createElement('p');
    prompt.textContent = 'Type the displayed words as fast as you can:';

    const wordDisplay = document.createElement('h2');
    const words = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
        'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
        'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
        'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
        'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
        'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
        'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
        'is', 'are', 'was', 'were', 'been', 'has', 'had', 'did', 'made', 'said',
        'might', 'must', 'shall', 'should', 'may', 'can', 'could', 'would', 'should', 'ought',
        'have', 'has', 'does', 'did', 'being', 'been', 'out', 'many', 'each', 'some',
        'such', 'more', 'much', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
        'eight', 'nine', 'ten', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
        'eighth', 'ninth', 'tenth', 'last', 'best', 'next', 'other', 'both', 'all', 'either',
        'neither', 'several', 'few', 'more', 'less', 'few', 'many', 'some', 'any', 'most',
        'each', 'every', 'none', 'most', 'few', 'any', 'all', 'both', 'several', 'any',
        'each', 'none', 'neither', 'either', 'this', 'that', 'these', 'those', 'my', 'your',
        'his', 'her', 'its', 'our', 'their', 'some', 'any', 'every', 'no', 'one',
        'first', 'second', 'last', 'each', 'other', 'another', 'one', 'some', 'any', 'all',
        'both', 'each', 'every', 'one', 'other', 'another', 'some', 'each', 'every', 'any'
    ];
    let randomWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = randomWord;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'speedtestInput';

    const timerDisplay = document.createElement('p');
    const timeLimit = 60; // time limit in seconds
    let timeRemaining = timeLimit;
    timerDisplay.textContent = `Time remaining: ${timeRemaining} seconds`;

    const scoreDisplay = document.createElement('p');
    let score = 0;
    let wrongWords = 0;
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
            updateHighScore('Speedtest', score);
            const highscore = displayHighScore('Speedtest');
            container.innerHTML = `<p id="endScore">Time's up! You managed ${score} words! 
            ${wrongWords} words were incorrect. </ br>
            Highscore: ${highscore}</p>`;

            // Display the score for a few seconds before clearing it
            setTimeout(() => {
                callback(true); // Indicate the game is finished
            }, 5000); // Display the score for 3 seconds
        }
    }, 1000);

    input.addEventListener('keyup', (event) => {
        const inputChars = input.value.trim().split('');
        const randomWordChars = randomWord.split('');

        // Create a new string with colored characters
        let displayText = '';
        for (let i = 0; i < randomWord.length; i++) {
            if (inputChars[i] && inputChars[i] === randomWordChars[i]) {
                displayText += `<span style="color: green;">${randomWordChars[i]}</span>`;
            } else if (inputChars[i]) {
                displayText += `<span style="color: red;">${randomWordChars[i]}</span>`;
            } else {
                displayText += `<span>${randomWordChars[i]}</span>`;
            }
        }
        wordDisplay.innerHTML = displayText;

        if (event.key === ' ') {
            event.preventDefault();
            if (input.value.trim() === randomWord) {
                score += 1;
            } else {
                wrongWords += 1;
            }
            scoreDisplay.textContent = `Score: ${score}`;
            input.value = '';
            randomWord = words[Math.floor(Math.random() * words.length)];
            wordDisplay.textContent = randomWord;
        }
    });

    // Focus the input to start typing immediately
    input.focus();
}