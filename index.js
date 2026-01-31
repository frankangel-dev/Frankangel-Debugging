const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const belowMinMessage = document.getElementById('lower');
const aboveMaxMessage = document.getElementById('higher');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;
const minNumber = 1;
const maxNumber = 99;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  if (isNaN(guess)) {
    return;
  }
  
  hideAllMessages();

  if (guess < minNumber) {
    belowMinMessage.textContent = `Cannot guess lower than ${minNumber}.`;
    belowMinMessage.style.display = '';
    guessInput.value = '';
    return;
  } else if (guess > maxNumber) {
    aboveMaxMessage.textContent = `Cannot guess higher than ${maxNumber}.`;
    aboveMaxMessage.style.display = '';
    guessInput.value = '';
    return;
  }
  
  attempts = attempts + 1;

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = '';
  } else {
    if (guess < targetNumber) {
      if (attempts === maxNumberOfAttempts) {
        tooLowMessage.textContent = 'You guessed too low.';
      }
      tooLowMessage.style.display = '';
    } else if (guess > targetNumber) {
      if (attempts === maxNumberOfAttempts) {
        tooHighMessage.textContent = 'You guessed too high.';
      }
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    const guessText = remainingAttempts === 1 ? 'guess' : 'guesses';

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessText} remaining`;

    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
      
      maxGuessesMessage.style.display = '';
      resetButton.style.display = '';
    }
  }
  
  guessInput.value = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
  guessInput.value = '';

  tooLowMessage.textContent = 'You guessed too low. Try again.';
  tooHighMessage.textContent = 'You guessed too high. Try again.';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
