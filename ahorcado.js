const words = [];
let secretWord;
let attemptsLeft = 6;
let lettersGuessed = [];

// Function to choose a secret word from the list of words
function chooseSecretWord() {
  secretWord = words[Math.floor(Math.random() * words.length)];
}

// Function to display the word with underscores
function displayWord() {
  let word = '';
  for (let i = 0; i < secretWord.length; i++) {
    if (lettersGuessed.includes(secretWord[i])) {
      word += secretWord[i] + ' ';
    } else {
      word += '_ ';
    }
  }
  return word;
}

// Function to check if the letter has been guessed correctly
function checkLetter(letter) {
  if (!lettersGuessed.includes(letter) && secretWord.includes(letter)) {
    lettersGuessed.push(letter);
    return true;
  } else {
    if (!lettersGuessed.includes(letter)) {
      attemptsLeft--;
      lettersGuessed.push(letter);
    }
    return false;
  }
}

// Function to check if the game is won
function checkWin() {
  for (let i = 0; i < secretWord.length; i++) {
    if (!lettersGuessed.includes(secretWord[i])) {
      return false;
    }
  }
  return true;
}

// Function to add a new word to the list of words
function addWord() {
  let newWord = document.getElementById('newWord').value;
  if (newWord.length > 0 && newWord.match(/^[A-Z]+$/)) {
    words.push(newWord.toUpperCase());
  }
}

// Function to start the game
function startGame() {
  chooseSecretWord();
  attemptsLeft = 6;
  lettersGuessed = [];
  document.getElementById('word').innerHTML = displayWord();
  document.getElementById('attempts').innerHTML = attemptsLeft;
  document.getElementById('letters').innerHTML = '';
}

// Function to play the game
function playGame() {
  let letter = document.getElementById('letter').value.toUpperCase();
  if (letter.length === 1 && letter.match(/^[A-Z]+$/)) {
    let correct = checkLetter(letter);
    if (correct) {
      document.getElementById('word').innerHTML = displayWord();
      if (checkWin()) {
        document.getElementById('result').innerHTML = '¡Ganaste, Felicidades!';
      }
    } else {
      document.getElementById('attempts').innerHTML = attemptsLeft;
      document.getElementById('letters').innerHTML += letter + ' ';
      if (attemptsLeft === 0) {
        document.getElementById('result').innerHTML = 'Fin del juego';
      }
    }
  }
  document.getElement
