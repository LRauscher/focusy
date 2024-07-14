import { updateHighScore, displayHighScore } from "../main.js";

export function numberSequence(container, callback) {
    const sequences = [
        { start: 1, step: 2 }, { start: 3, step: 3 }, { start: 10, step: -2 }, { start: 5, step: 5 },
        { start: 2, step: 4 }, { start: 100, step: -1 }, { start: -1, step: -3 }, { start: 0, step: 0 },
        { start: 1, step: 0 }, { start: 10, step: 1 }, { start: -5, step: -5 }, { start: 4, step: 2 },
        { start: 7, step: -3 }, { start: 2, step: 0 }, { start: -3, step: 1 }, { start: 1, step: 1 },
        { start: 0, step: 2 }, { start: 5, step: -1 }, { start: 20, step: 5 }, { start: 6, step: -2 },
        { start: 3, step: 4 }, { start: -2, step: -2 }, { start: 8, step: 3 }, { start: 1, step: -1 },
        { start: 2, step: 3 }, { start: 15, step: 0 }, { start: 3, step: -3 }, { start: 12, step: 2 },
        { start: 50, step: -5 }, { start: 0, step: -1 }, { start: 1, step: 4 }, { start: 6, step: -1 },
        { start: 8, step: 2 }, { start: -3, step: 3 }, { start: 100, step: 10 }, { start: 20, step: -3 },
        { start: 0, step: 1 }, { start: 1, step: 0.5 }, { start: 5, step: -2 }, { start: 2, step: 1 },
        { start: 7, step: -4 }, { start: 4, step: 0 }, { start: 1, step: -2 }, { start: 6, step: 3 },
        { start: 0, step: 0.1 }, { start: 9, step: -3 }, { start: 15, step: -5 }, { start: 3, step: -1 },
        { start: 4, step: 5 }, { start: 8, step: -1 }, { start: 12, step: 3 }, { start: 7, step: 2 },
        { start: 1, step: -0.5 }, { start: 10, step: 0.5 }, { start: 6, step: 4 }, { start: 2, step: -0.1 },
        { start: 5, step: 1 }, { start: 8, step: -0.5 }, { start: 3, step: 2 }, { start: 4, step: -0.5 },
        { start: 1, step: 0.1 }, { start: 2, step: 0.2 }, { start: 10, step: -0.2 }, { start: 6, step: 0.5 },
        { start: 7, step: 0 }, { start: 3, step: -0.5 }, { start: 5, step: 0.1 }, { start: 4, step: 0.2 },
        { start: 9, step: 1 }, { start: 1, step: -0.2 }, { start: 2, step: -0.5 }, { start: 3, step: 1 },
        { start: 4, step: -1 }, { start: 7, step: -2 }, { start: 5, step: -0.5 },
    ];

    let currentSequenceIndex = 0;
    let userScore = 0;

    function generateSequence() {
        const sequence = sequences[currentSequenceIndex];
        const start = sequence.start;
        const step = sequence.step;
        const length = 5;
        let currentSequence = [];

        for (let i = 0; i < length; i++) {
            currentSequence.push(start + i * step);
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
            const correctAnswer = start + length * step;

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