import confetti from '../node_modules/canvas-confetti/dist/confetti.module.mjs';

import { memoryMatchGame } from './gamesLogic/memory.js';
import { wordle } from './gamesLogic/wordle.js';
import { catchObjects } from './gamesLogic/catchObjects.js';
import { speedtestGame } from './gamesLogic/typingGame.js';
import { minesweeperGame } from './gamesLogic/minesweeper.js';
import { snakeGame } from './gamesLogic/snake.js';
import { hangmanGame } from './gamesLogic/hangman.js';
import { ticTacToe } from './gamesLogic/ticTacToe.js';
import { numberSequence } from './gamesLogic/numberPattern.js';

// Get references to HTML elements
const headerEl = document.getElementById('header');
const timerContainer = document.getElementById('timerContainer');
const timerDisplay = document.getElementById('timerDisplay');
const focusButtons = document.querySelectorAll('.focus-button');
const btnDivEl = document.querySelector('.start-buttons'); 
const durationInput = document.getElementById('timeInput');
const durationInputEl = document.getElementById('timeInputEl');
const durationRangeLabel = document.getElementById('labelRange');
const durationInputBtn = document.getElementById('timeInputBtn');
const progressBar = document.getElementById('progressBar');
const timerDivEl = document.getElementById('timerButtons');
const quitDiv = document.getElementById('quitDiv');
const quitBtn = document.getElementById('btn3');
const submitQuit = document.getElementById('quitBtn');
const quitInput = document.getElementById('quitInput');
const breakBtn = document.getElementById('btn2');
const breakDivEl = document.getElementById('breakDiv');
const breakDisplayEl = document.getElementById('breakDisplay');
const breakMsg = document.getElementById('breakMsg');
const loseFocus = document.getElementById('loseFocus');
const loseFocusBtn = document.getElementById('btn1');
const returnYesBtn = document.getElementById('returnYes');
const FocusTextEl = document.getElementById('whyEl');
const counterDivs = document.querySelectorAll('.counter');
const completeFocusEl = document.getElementById('focusTimeDisplay');
const totalFocusEl = document.getElementById('totalTimeDisplay');
const returnGameFocusBtn = document.getElementById('returnFocusGameBtn');
const minimizeBtn = document.getElementById('minimizeButton');
const mainEl = document.getElementById('main');
const miniMain = document.getElementById('miniMain');
const windowEl = document.getElementById('window');
const miniTimerDisplay = document.getElementById('miniTimerDisplay');

if (!timerDisplay || !btnDivEl || focusButtons.length === 0) {
  console.error("One or more key elements not found in the DOM.");
}

// Variables to manage the timer
let timerInterval;
let timeRemaining;
let initialDuration;
let randomTimes;
let breakMessageInterval;
let durationValue = durationInputEl.value;
const quitText = 'i want to give up!';
let progressWidth = 0;
let totalFocusTime = 0;
let allTimeFocus = 0;
let interuption = false;
let minimized = false;

// mini timer

minimizeBtn.setAttribute('disabled', 'true');

minimizeBtn.addEventListener('click', () => {
  minimized = true;
  miniCountdown(timeRemaining);
});

miniMain.addEventListener('click', () => {
  minimized = false;
  interuptionBackground();
});

function interuptionBackground() {
  if (interuption && minimized) {
    windowEl.style.backgroundColor = '#fff89470';
  } else {
    windowEl.style.backgroundColor = '';
  }
}

// function for mini countdown

let miniInterval;

function updateMiniDisplay(time) {
  const minutes = Math.floor(time / 60) + 1;
  return String(minutes);
}

function miniCountdown(timeRemaining) {
  // Clear any existing interval to prevent multiple timers running simultaneously
  if (miniInterval) {
    clearInterval(miniInterval);
  }

  miniTimerDisplay.textContent = `${updateMiniDisplay(timeRemaining)}'`;

  miniInterval = setInterval(() => {
    timeRemaining--;

    // Update display only if the time has changed to avoid unnecessary DOM updates
    const newDisplay = `${updateMiniDisplay(timeRemaining)}'`;
    if (miniTimerDisplay.textContent !== newDisplay) {
      miniTimerDisplay.textContent = newDisplay;
    }

    if (timeRemaining <= 0) {
      clearInterval(miniInterval);
      miniTimerDisplay.textContent = '0';
      minimizeBtn.setAttribute('disabled', 'true');
      // Add any actions you want to perform when the timer finishes
    } else if (timeRemaining <= 10) {
      window.electron.ipcRenderer.send('restore-window');
      minimized = false;
      interuptionBackground();
      minimizeBtn.setAttribute('disabled', 'true');
    }
  }, 1000);
}

// Function to make the 20-second timer
function counter(counterDivs) {
  let countdown = 19;
  
  // Clear any previous interval to prevent multiple intervals running
  if (counter.interval) {
    clearInterval(counter.interval);
  }

  counter.interval = setInterval(() => {
    if (counterDivs.length > 0) {
      counterDivs.forEach(counterDiv => {
        counterDiv.textContent = countdown;
      });
    } else {
      console.error("counterDiv is not defined");
    }
    countdown--;
    console.log(countdown);

    if (countdown < 0) {
      clearInterval(counter.interval);
      quitDiv.style.display = 'none';
      breakDivEl.style.display = 'none';
      loseFocus.style.display = 'none';
      timerContainer.style.display = 'block';
      timerDivEl.style.display = 'flex';
      gamesContainer.style.display = 'none';
      interuption = false;
      interuptionBackground(interuption);
      resumeTimer();
      counterDivs.forEach(counterDiv => {
        counterDiv.textContent = 20;
      });
    }
  }, 1000);
}

function stopCounter() {
  clearInterval(counter.interval);
}

// Function to format time into mm:ss
function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  console.log(`Formatting time: ${minutes}:${secs}`);
  return `${minutes}:${secs}`;
}

// Function to start a timer with a given duration
function startTimer(durationValue) {
  console.log(`Starting timer with duration: ${durationValue} seconds`);
  timeRemaining = durationValue;
  initialDuration = durationValue; // Use the original duration value
  if (!randomTimes) {
    randomTimes = generateRandomTimes(initialDuration);
    console.log('The Random times: ' + randomTimes);
  }
  updateDisplay(initialDuration); // Update the initial display
  
  timerInterval = setInterval(() => {
    timeRemaining--; // Decrease the time remaining
    totalFocusTime++;
    allTimeFocus++;
    updateDisplay(initialDuration); // Update the timer display
    if (randomTimes.includes(timeRemaining)) {
      triggerRandomEvent(); // Trigger your random event here
    }
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval); // Stop the timer when it reaches zero
      clearInterval(miniInterval);
            confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }, // Start the animation from the top
      });
      headerEl.style.maxHeight = '15vh';
      btnDivEl.style.display = 'flex';
      timerContainer.style.display = 'none';
      timerDivEl.style.display = 'none';
      console.log("Timer ended");
      saveTotalFocusTime();
    }
  }, 1000); // Update every second
}

function saveTotalFocusTime() {
  const focusData = {
    date: new Date().toDateString(),
    time: totalFocusTime,
    allTime: allTimeFocus,
  };
  localStorage.setItem('totalFocusTime', JSON.stringify(focusData));
}

function loadTotalFocusTime() {
  const savedData = localStorage.getItem('totalFocusTime');
  if (savedData) {
    const { date, time, allTime } = JSON.parse(savedData);
    const today = new Date().toDateString();
    if (date === today) {
      totalFocusTime = time;
    } else {
      totalFocusTime = 0;
    }
    allTimeFocus = allTime || 0;
  }
}

function displayTotalFocusTime() {
  const hours = Math.floor(totalFocusTime / 3600);
  const minutes = Math.floor((totalFocusTime % 3600) / 60);
  const seconds = totalFocusTime % 60;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  completeFocusEl.textContent = `${formattedTime}`;
}

function displayAllFocusTime() {
  const hours = Math.floor(allTimeFocus / 3600);
  const minutes = Math.floor((allTimeFocus % 3600) / 60);
  const seconds = allTimeFocus % 60;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  totalFocusEl.textContent = `${formattedTime}`;
}

// Function to update the timer display
function updateDisplay(initialDuration) {
  console.log(`Updating display: ${formatTime(timeRemaining)}`);
  timerDisplay.textContent = formatTime(timeRemaining);

  const progressPercentage = ((initialDuration - timeRemaining) / initialDuration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  console.log(`Progress: ${progressPercentage}%`);
  progressWidth = progressPercentage;

  displayTotalFocusTime();
  displayAllFocusTime();
}

function resetTimer() {
  console.log("Resetting the timer");
  stopTimer();
  timerDisplay.textContent = '00:00';
  timeRemaining = 0;
  initialDuration = 0;
  
  progressBar.style.width = '0%';
  progressWidth = 0;
}

function keepFocus() {
  gamesContainer.style.display = 'none';
  timerContainer.style.display = 'block';
  timerDivEl.style.display = 'flex';
  resumeTimer();
}

// Function to stop the timer
function stopTimer() {
  console.log("Stopping the timer");
  if (timerInterval) {
    clearInterval(timerInterval);
    clearInterval(miniInterval);
    timerInterval = null;
  }
}

// Function to pause timer
function pauseTimer () {
  console.log('Pausing timer');
  if (timerInterval) {
    clearInterval(timerInterval);
    clearInterval(miniInterval);
    timerInterval = null;
    miniInterval = null;
  }
}

// Function to resume the timer
function resumeTimer() {
  console.log("Resuming timer");
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeRemaining--; // Decrease the time remaining
      totalFocusTime++;
      allTimeFocus++;
      updateDisplay(initialDuration); // Update the timer display
      if (randomTimes.includes(timeRemaining)) {
        triggerRandomEvent(); // Trigger your random event here
      }

      if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches zero
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }, // Start the animation from the top
        });
        headerEl.style.maxHeight = '30vh';
        btnDivEl.style.display = 'flex';
        timerContainer.style.display = 'none';
        timerDivEl.style.display = 'none';
        loseFocus.style.display = 'none';
        console.log("Timer ended");
        saveTotalFocusTime();
      }
    }, 1000); // Update every second
  }
}

// Update the label when the input changes
durationInputEl.addEventListener('input', (event) => {
  durationValue = durationInputEl.value;
  durationRangeLabel.textContent = `${durationValue}:00`;

  const value = (timeInputEl.value - timeInputEl.min) / (timeInputEl.max - timeInputEl.min) * 100;
    timeInputEl.style.background = `linear-gradient(to right, var(--accent-primary) ${value}%, #fff89470 ${value}%)`;
});

timeInputEl.dispatchEvent(new Event('input'));

// Add event listeners to each button to start the timer
focusButtons.forEach((button, index) => {

  durationValue = durationValue * 60;
  console.log(durationValue);

  console.log(`Adding click listener to button ${index + 1}`);

    button.addEventListener('click', () => { // Entferne den Parameter durationValue hier
      console.log(`Button ${index + 1} clicked`);
      resetTimer(); // Reset the timer before starting a new one
      btnDivEl.style.display = 'none';
      durationInput.style.display = 'flex';
      headerEl.style.maxHeight = '15vh';
    
      durationInputBtn.addEventListener('click', () => {
        minimizeBtn.removeAttribute('disabled');
        durationInput.style.display = 'none';
        timerContainer.style.display = 'block'; // Show the timer
        timerDivEl.style.display = 'flex';
    
// Get the current value from the input and convert it to seconds
const durationInMinutes = parseInt(durationInputEl.value, 10);
const durationInSeconds = durationInMinutes * 60; // Convert minutes to seconds

// Check if the value is valid
if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
  console.error("Invalid duration");
  return;
}

startTimer(durationInSeconds); // Start the timer with the correct duration
}, { once: true });
});  
    });    

// Function to quit timer
function quitTimer() {
  console.log('quitting');
  stopTimer();
  resetTimer();
  saveTotalFocusTime();
  quitDiv.style.display = 'none';
  timerContainer.style.display = 'none';
  timerDivEl.style.display = 'none';
  headerEl.style.maxHeight = '30vh';
  btnDivEl.style.display = 'flex';
  quitInput.value = '';
}

quitBtn.addEventListener('click', () => {
  pauseTimer();
  quitDiv.style.display = 'block';
  timerContainer.style.display = 'none';
  timerDivEl.style.display = 'none';
  counter(counterDivs);
  console.log('quitting');
  getQuitValue();
});

function getQuitValue() {
  quitInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      console.log('clicked quit btn');
      let quitValueEl = quitInput.value;
      if (quitText === quitValueEl) {
        quitTimer();
        stopCounter();
      } else {
        quitDiv.style.display = 'none';
        timerContainer.style.display = 'block';
        timerDivEl.style.display = 'flex';
        quitInput.value = ''; // Clear the text input value
        counterDivs.textContent = '20'; // Reset the counter display
        stopCounter();
        resumeTimer();
      }
    }
  });
}

// take a break
breakBtn.addEventListener('click', () => {
  console.log('taking break...');
  minimizeBtn.setAttribute('disabled', true);
  pauseTimer()
  breakTimer()
}
);

let breakTime;
let msgArray = [
  'Taking a break can make you more productive',
  'Recharging',
  'Resting to boost your energy',
  'Stretch your legs and relax',
  'A short break can spark creativity',
  'Clear your mind for a fresh start',
  'Relax and refresh yourself',
  'Take a deep breath and unwind',
  'You deserve a break!',
  'Time to recharge your batteries',
  'Enjoy a moment of peace',
  'Use this time to rejuvenate',
  'Step away for a mental reset',
  'Refresh your focus with a break',
  'Pause and reset your mind',
  'Relax, you’ve earned it',
  'Take a moment to yourself',
  'Re-energize for better productivity',
  'A break now, better focus later'
];

function getBreakTime(duration) {
 
  switch (duration) {
    case 3600: // 1 Stunde
      breakTime = 300; // 10 Minuten Pause
      break;
    case 1800: // 2 Stunden
      breakTime = 180; // 20 Minuten Pause
      break;
    case 900: // 3 Stunden
      breakTime = 120; // 30 Minuten Pause
      break;
    default: // Für andere Dauer
      breakTime = 60; // Standardmäßig 5 Minuten Pause
      break;
  }

  return breakTime;
}

// Function to handle taking a break
function breakTimer() {
  // Hide timer elements and display break elements
  breakDivEl.style.display = 'flex';
  timerDivEl.style.display = 'none';
  timerContainer.style.display = 'none';

  getBreakTime();
  breakDisplay(); // Initial break display
  activateLights(6000, breakLights);

  // Start a timer for the break period
  const breakInterval = setInterval(() => {
    breakTime--;
    breakDisplay(); // Update break display

    if (breakTime <= 0) {
      clearInterval(breakInterval); // Stop the break timer when it reaches zero
      clearInterval(breakMessageInterval);
      breakMessageInterval = null;
      breakDivEl.style.display = 'none';
      timerDivEl.style.display = 'flex';
      timerContainer.style.display = 'block';
      minimizeBtn.removeAttribute('disabled');

      // Resume the main timer after the break
      resumeTimer();
    }
  }, 1000); // Update every second
}

// const lights = document.querySelectorAll('.light');
const lightEl = document.getElementById('lightContainer');
const lightEl2 = document.getElementById('lightContainer2');
const breakLights = document.getElementById('breakLights');
let lightInterval;  // Move lightInterval outside the function to keep track globally

// Function to activate lights one by one
function activateLights(interval, container) {
  console.log('lights are activating...');
  let currentLight = 0;
  const lights = container.querySelectorAll('.light');

  // Clear any existing interval
  if (lightInterval) {
    clearInterval(lightInterval);
  }
  lights.forEach(light => light.classList.remove('on'));

  // Function to turn on the next light
  function turnOnNextLight() {
    if (currentLight < lights.length) {
      lights[currentLight].classList.add('on');
      currentLight++;
    } else {
      // Reset lights and counter when all lights are on
      lights.forEach(light => light.classList.remove('on'));
      currentLight = 0;
    }
  }

  // Start the interval to turn on lights every `interval` milliseconds
  lightInterval = setInterval(turnOnNextLight, interval);
}

function breakDisplay() {
  if (!breakMessageInterval) {
    setBreakMessage();
    breakMessageInterval = setInterval(setBreakMessage, 10000); // Change message every 30 seconds
  }

  breakDisplayEl.textContent = formatTime(breakTime); // Zeigt die verbleibende Zeit an
}

function setBreakMessage() {
  // Select a random message from msgArray
  const randomIndex = Math.floor(Math.random() * msgArray.length);
  breakMsg.textContent = msgArray[randomIndex];
}

loseFocusBtn.addEventListener('click', () => {
  pauseTimer()
  loseFocus.style.display = 'flex';
  FocusTextEl.style.display = 'block';
  headerEl.style.maxHeight = '15vh';
  timerContainer.style.display = 'none';
  timerDivEl.style.display = 'none';
  minimizeBtn.setAttribute('disabled', 'true');
  activateLights(500, lightEl);
  showQuestions();
});

function showQuestions() {
  const questions = [
    // Purpose and Meaning
    'What is the bigger goal behind this task?',
    'How does completing this task align with your long-term goals?',
    'Who will benefit from this work, and how?',
    // Personal Connection
    'What do you enjoy most about this kind of work?',
    'Have you ever done something similar that you felt proud of? What made it enjoyable?',
    'How can this task help you develop skills or knowledge you care about?',
    // Creativity and Fun
    'How could you make this work more fun or interesting?',
    'What is a small reward you could give yourself once you finish this task?',
    'Is there a way to gamify this task, perhaps setting small challenges or time limits?',
    // Efficiency and Strategy
    'What steps can you take to make this task easier or quicker?',
    'Are there tools or resources that could help you complete this task more efficiently?',
    'Can you break this task into smaller, more manageable parts?',
    // Support and Collaboration
    'Who can you ask for help or advice to make this task easier?',
    'Is there someone you can collaborate with to make this task more enjoyable?',
    'Can you delegate parts of this task to others?',
    // Mindset and Perspective
    'What will you feel once this task is completed?',
    'How can you shift your perspective to see this task in a more positive light?',
    'What challenges have you overcome before that you can apply to this task?',
    // Progress and Milestones
    'What is the first small step you can take right now to get started?',
    'How can you track your progress to stay motivated?',
    'Can you set specific milestones and celebrate when you reach them?'
];

  // Shuffle and select 2 random questions from the array
  const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 2);

  const questionContainer = document.getElementById('questionContainer');
  const questionText = document.getElementById('questionText');
  const continueButton = document.querySelector('.nextQuestion');
  const finishFocus = document.getElementById('finishFocus');

  let currentQuestionIndex = 0;
  lightEl.style.display = 'flex';

  questionContainer.style.display = 'none';
  // Initial setup
  setTimeout(() => {
    FocusTextEl.style.display = 'none';
    questionContainer.style.display = 'flex';
    lightEl.style.display = 'none';
    questionText.textContent = selectedQuestions[currentQuestionIndex];
  }, 4000);

  // Event listener for the "Continue" button
  continueButton.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < selectedQuestions.length) {
      // Show the next question
      questionText.textContent = selectedQuestions[currentQuestionIndex];
    } else {
      // All questions answered, show the finish section
      questionContainer.style.display = 'none';
      finishFocus.style.display = 'flex';

      activateLights(3200, lightEl2);
      setTimeout(() => {
        console.log("User is ready to return to the task");
        loseFocus.style.display = 'none';
        timerContainer.style.display = 'block';
        timerDivEl.style.display = 'flex';
        minimizeBtn.removeAttribute('disabled');
        resumeTimer();
      }, 18000);
    }
  });

  finishFocus.style.display = 'none';
}

// Games
const gamesContainer = document.getElementById('gamesContainer');

const games = [
  {
    name: 'Wordle',
    explanation: "Guess the searched word within six attempts. The color of the tiles will change to show how close your guess was to the word. Green means right character at the right place. Yellow means right character but wrong position",
    play: (callback) => wordle(gamesContainer, (score) => {
      updateHighScore('Wordle', score);
      displayHighScore(score);
      callback(score);
    })
  }, 
  {
    name: 'Memory',
    explanation: 'Memory Match is a fun game where you find and match pairs of cards with identical symbols on a 4x4 grid. Flip and match all pairs to win, testing and improving your memory skills!',
    play: (callback) => memoryMatchGame(gamesContainer, (score) => {
      updateHighScore("Memory", score);
      displayHighScore(score);
      callback(score);
    })
  },
  {
    name: 'Catch the Objects',
    explanation: 'Control a player at the bottom of the screen using the arrow keys to catch falling objects. Increase your score by catching as many objects as possible while avoiding the black obstacles.',
    play: (callback) => catchObjects(gamesContainer, (score) => {
      updateHighScore('Catch the Objects', score);
      displayHighScore(score);
      callback(score);
    })
  },
  {
    name: 'Speedtest',
    explanation: 'Type the displayed words as quickly as you can within 60 seconds. Press the spacebar to submit your word. Correct letters will be highlighted in green and incorrect letters in red. Try to get as many words right as possible!',
    play: (callback) => speedtestGame(gamesContainer, (score) => {
      updateHighScore('Speedtest', score);
      displayHighScore(score);
      callback(score);
    })
  },
  /*
  {
    name: 'Tic-Tac-Toe',
    explanation: 'Play a classic game of Tic-Tac-Toe against an AI opponent. Try to get three in a row before your opponent does!',
    play: (callback) => ticTacToe(gamesContainer, (score) => {
      updateHighScore('Tic-Tac-Toe', score);
      displayHighScore(score);
      callback(score);
    })
  },
  */
  {
    name: 'Minesweeper',
    explanation: 'Reveal all the cells that do not contain mines without triggering any mines. Use the numbers to deduce the locations of the mines.',
    play: (callback) => minesweeperGame(gamesContainer, (score) => {
      updateHighScore('Minesweeper', score);
      displayHighScore(score);
      callback(score);
    })
  },
  /*
  {
    name: 'Snake Game',
    explanation: 'Control the snake to eat the food and grow longer. Avoid running into the walls or the snake\'s own body.',
    play: (callback) => snakeGame(gamesContainer, (score) => {
      updateHighScore('Snake Game', score);
      displayHighScore(score);
      callback(score);
    })
  }, */
  {
    name: 'Hangman',
    explanation: 'Guess the letters in the hidden word. You have a limited number of incorrect guesses before the game is over.',
    play: (callback) => hangmanGame(gamesContainer, (score) => {
      updateHighScore('Hangman', score);
      displayHighScore(score);
      callback(score);
    })
  },
  {
    name: 'Number Sequence',
    explanation: 'Guess the next number in the sequence correctly to win.',
    play: (callback) => numberSequence(gamesContainer, (score) => {
      updateHighScore('Number Sequence', score);
      displayHighScore(score);
      callback(score);
    }),
  }, 
];

// Display the high score
export const displayHighScore = (gameName) => {
  const highScore = parseInt(localStorage.getItem(`${gameName}HighScore`), 10);
  if (!isNaN(highScore)) {
    return highScore;
  } else {
    return 'no highscore yet';
  }
}

// Update the high score
export const updateHighScore = (gameName, score) => {
  const highScore = localStorage.getItem(`${gameName}HighScore`, 10) || 0;
  if (score > highScore) {
      localStorage.setItem(`${gameName}HighScore`, score);
  }
};

// Function to determine the number of random events based on duration
function getEventCount(duration) {
  if (duration >= 3600) { // 1 hour or more
    return 5;
  } else if (duration >= 1800) { // 30 minutes to 1 hour
    return 4;
  } else if (duration >= 900) { // 15 to 30 minutes
    return 3;
  } else if (duration >= 600) { // 10 to 15 minutes
    return 2;
  } else { // Less than 10 minutes
    return 1;
  }
}

// Function to generate random times
function generateRandomTimes(duration) {
  const eventCount = getEventCount(duration);
  const times = [];
  
  // Calculate the valid range for random times
  const startTime = Math.floor(duration * 0.1);
  const endTime = Math.floor(duration * 0.9);

  for (let i = 0; i < eventCount; i++) {
    let randomTime;
    do {
      randomTime = Math.floor(Math.random() * (endTime - startTime)) + startTime;
    } while (times.includes(randomTime));
    times.push(randomTime);
  }

  return times;
}

// Function to trigger a random event
function triggerRandomEvent() {
  console.log('Random event triggered');
  showInteruption(); // Call your function here
  interuption = true;
  interuptionBackground(interuption);
}

function showInteruption() {
  pauseTimer();
  timerContainer.style.display = 'none';
  timerDivEl.style.display = 'none';
  gamesContainer.style.display = 'block';
  minimizeBtn.setAttribute('disabled', 'true');
  gamesContainer.id = 'gamesContainer';

  gamesContainer.innerHTML = `
    <div id="gameBreak">
      <p id="textEl">Do you want to complete a short task to help stay focused?</p>
      <div id="gameBreakFlex">
        <button id="breakAccept">Yes</button>
        <button id="breakDecline">No</button>
      </div>
      <div class="counter">20</div>
    </div>
  `;
  const counterDivs = document.querySelectorAll('.counter');
  const gameBreakDiv = document.getElementById('gameBreak');
  const breakAccept = document.getElementById('breakAccept');
  const breakDecline = document.getElementById('breakDecline');

  counter(counterDivs);
  breakAccept.addEventListener('click', () => {
    displayRandomGame()
    stopCounter()
    });
  breakDecline.addEventListener('click', keepFocus);
}

let previousGameIndex = -1;

function displayRandomGame() {
  let randomGameIndex;

  // Ensure the new game index is different from the previous one
  do {
    randomGameIndex = Math.floor(Math.random() * games.length);
  } while (randomGameIndex === previousGameIndex);

  const selectedGame = games[randomGameIndex];
  previousGameIndex = randomGameIndex;

  gamesContainer.id = 'gamesContainer';

  gamesContainer.innerHTML = `
    <div id="instructionDiv">
      <h2 id="gameName">${selectedGame.name}</h2>
      <p id="explainText">${selectedGame.explanation}</p>
      <button id="skipGameBtn">Skip</button>
      <button id="skipExplainBtn">Play</button>
    </div>
  `;

  const instructionDiv = document.getElementById('instructionDiv');
  const gameName = document.getElementById('gameName');
  const explainText = document.getElementById('explainText');

  instructionDiv.id = 'instructionDiv';
  gameName.id = 'gameName';
  explainText.id = 'explainText';

  const skipGameBtn = document.getElementById('skipGameBtn');
  skipGameBtn.addEventListener('click', () => {
    displayRandomGame();
  });

  returnGameFocusBtn.addEventListener('click', () => {
          timerContainer.style.display = 'block';
          timerDivEl.style.display = 'flex';
          gamesContainer.style.display = 'none';
          returnGameFocusBtn.style.display = 'none';
          resumeTimer();
          minimizeBtn.removeAttribute('disabled');
  });

  const skipExplainBtn = document.getElementById('skipExplainBtn');
  skipExplainBtn.addEventListener('click', () => {
    returnGameFocusBtn.style.display = 'block';
    gamesContainer.innerHTML = "";
    selectedGame.play((gameFinished) => {
      if (gameFinished) {
        returnGameFocusBtn.style.display = 'none';
        gamesContainer.id = 'gamesContainer';
        // Handle game finished logic here
        gamesContainer.innerHTML = `
          <div id="afterGame">
            <p id="textEl">The task has finished. Do you want to complete another?</p>
            <div id="afterGameBtnEl">
              <button id="playAnotherBtn">Complete Task</button>
              <button id="declineAnotherPlayBtn">Return to focus</button>
            </div>
            <div class="counter">20</div>
          </div>
        `;

        const afterGameDiv = document.getElementById('afterGame');
        afterGameDiv.id = 'afterGame';

        const counterDivs = document.querySelectorAll('.counter');
        counter(counterDivs);
        const playBtn = document.getElementById('playAnotherBtn');
        const declinePlay = document.getElementById('declineAnotherPlayBtn');

        playBtn.addEventListener('click', () => {
          displayRandomGame();
          stopCounter();
        });

        declinePlay.addEventListener('click', () => {
          timerContainer.style.display = 'block';
          timerDivEl.style.display = 'flex';
          gamesContainer.style.display = 'none';
          minimizeBtn.removeAttribute('disabled');
          resumeTimer();
        });
      }
    });
  });
}

window.addEventListener('load', () => {
  loadTotalFocusTime();
  displayTotalFocusTime();
  displayAllFocusTime();
});