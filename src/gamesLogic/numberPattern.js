import { updateHighScore, displayHighScore } from "../main.js";

export function numberSequence(container, callback) {
    const sequences = [
        { start: 1, step1: 2, step2: 3 }, { start: 3, step1: 3, step2: 2 }, 
        { start: 10, step1: -2, step2: 2 }, { start: 5, step1: 5, step2: -3 },
        { start: 2, step1: 4, step2: -1 }, { start: 100, step1: -1, step2: 1 }, 
        { start: -1, step1: -3, step2: 3 }, { start: 0, step1: 0, step2: 1 },
        { start: 1, step1: 0, step2: 1 }, { start: 10, step1: 1, step2: -1 },
        { start: -5, step1: -5, step2: 5 }, { start: 4, step1: 2, step2: -2 },
        { start: 7, step1: -3, step2: 1 }, { start: 2, step1: 0, step2: 2 },
        // More sequences can be added here
    ];

    let currentSequenceIndex = 0;
    let userScore = 0;

    function generateSequence() {
        const sequence = sequences[currentSequenceIndex];
        const start = sequence.start;
        const step1 = sequence.step1;
        const step2 = sequence.step2;
        const length = 5;
        let currentSequence = [];
        
        // Generate the sequence with two steps
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