import { updateHighScore, displayHighScore } from "../main.js";

export function numberSequence(container, callback) {
    const sequences = [
        { start: 2, step1: 2, step2: 3 }, { start: 1, step1: 1, step2: 2 }, 
        { start: 5, step1: 3, step2: 2 }, { start: 10, step1: 2, step2: 3 }, 
        { start: 3, step1: 2, step2: 1 }, { start: 7, step1: 3, step2: 2 }, 
        { start: -1, step1: 2, step2: 3 }, { start: 0, step1: 1, step2: 2 }, 
        { start: 4, step1: 2, step2: 3 }, { start: 6, step1: 1, step2: 2 }, 
        { start: 8, step1: 3, step2: 2 }, { start: 2, step1: 1, step2: 3 },
        { start: -2, step1: 2, step2: 1 }, { start: 3, step1: 3, step2: 2 }, 
        { start: 9, step1: 2, step2: 1 }, { start: 1, step1: 2, step2: 3 }, 
        { start: 4, step1: 3, step2: 1 }, { start: 5, step1: 1, step2: 2 },
        { start: -3, step1: 3, step2: 2 }, { start: 0, step1: 2, step2: 3 }, 
        { start: 7, step1: 1, step2: 2 }, { start: 6, step1: 2, step2: 3 }, 
        { start: 2, step1: 3, step2: 2 }, { start: 1, step1: 1, step2: 3 },
        { start: -1, step1: 2, step2: 1 }, { start: 4, step1: 3, step2: 2 },
        { start: 3, step1: 1, step2: 3 }, { start: 8, step1: 2, step2: 3 }, 
        { start: 0, step1: 3, step2: 1 }, { start: 5, step1: 2, step2: 3 },
        { start: 7, step1: 3, step2: 2 }, { start: -2, step1: 1, step2: 3 }, 
        { start: 6, step1: 2, step2: 1 }, { start: 10, step1: 1, step2: 2 }
    ];

    let currentSequenceIndex = 0;
    let userScore = 0;

    function getRandomSequence() {
        const randomIndex = Math.floor(Math.random() * sequences.length);
        return sequences[randomIndex];
    }

    function generateSequence() {
        const sequence = getRandomSequence();
        const start = sequence.start;
        const step1 = sequence.step1;
        const step2 = sequence.step2;
        const length = 5;
        let currentSequence = [];

        // Generate the sequence with two alternating steps
        for (let i = 0; i < length; i++) {
            if (i % 2 === 0) {
                currentSequence.push(start + Math.floor(i / 2) * step1);
            } else {
                currentSequence.push(start + Math.floor(i / 2) * step2);
            }
        }

        container.innerHTML = "";
        container.id = "number-sequence-game";

        const sequenceText = document.createElement("div");
        sequenceText.innerHTML = currentSequence.join(", ");
        container.appendChild(sequenceText);

        const input = document.createElement("input");
        input.type = "text";
        input.id = "sequence-input";
        container.appendChild(input);

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        submitButton.id = "submit-sequence";
        container.appendChild(submitButton);

        const result = document.createElement("div");
        result.id = "sequence-result";
        container.appendChild(result);

        submitButton.addEventListener("click", () => {
            const userAnswer = parseFloat(input.value);
            // Calculate the correct answer based on two steps
            const correctAnswer = start + Math.floor(length / 2) * step1 + Math.floor(length / 2) * step2;

            if (userAnswer === correctAnswer) {
                result.innerHTML = "Correct!";
                userScore++;
                updateHighScore('NumberGame', userScore);
                currentSequenceIndex++;
                setTimeout(() => {
                    if (currentSequenceIndex < sequences.length) {
                        generateSequence();
                    } else {
                        callback();
                    }
                }, 1000);
            } else {
                updateHighScore('NumberGame', userScore);
                const highScore = displayHighScore('NumberGame');
                result.innerHTML = `Incorrect. The correct answer was ${correctAnswer}.<br>
                                    You scored ${userScore} points.<br>
                                    High Score: ${highScore}`;
                setTimeout(() => {
                    callback(true);
                }, 3000);
            }
        });
    }

    generateSequence();
}