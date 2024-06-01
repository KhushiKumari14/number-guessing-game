const randomNumber = parseInt(Math.random() * 100 + 1);

const playbtn = document.querySelector('#playGame');
const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.attempts');
const lowOrHigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.resultPara');

const p = document.createElement('p');

let numGuess = 1;

let playGame = true;

if(playGame){
    playbtn.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector('.section1').style.display = "none";
        document.querySelector('.section2').style.display = "block";
        submission();
    })
}

function submission() {
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if(isNaN(guess)){
        alert('Please enter a valid number !');
    }else if(guess < 1){
        alert('Please enter a number greater than 1 !');
    }else if(guess > 100) {
        alert('Please enter a number less than 100 !');
    }else {
        if(numGuess === 10){
            cleanUpGuess(guess);
            displayMessage(`Game Over !\nRandom Number was ${randomNumber}`);
            endGame();
        } else {
            cleanUpGuess(guess);
            checkGuess(guess);
        }
    }
}

function cleanUpGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function checkGuess(guess) {
    if(guess < randomNumber){
        displayMessage(`Number is TOOO low! Try again.`);
    }else if(guess > randomNumber){
        displayMessage(`Number is TOOO High! Try again.`);
    }else if(guess === randomNumber){
        displayMessage(`Congratulations, you guessed it!🥳`);
        endGame();
    }
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h2>${message}</h2>` ;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.innerHTML = `<h2 id="newGame">Click Here to start a new game</h2>`;
    startOver.appendChild(p);
    playGame = false;

    newGame();
}

function newGame(){
    const newGame = document.querySelector('#newGame')
    newGame.addEventListener('click', function(e){
        const randomNumber = parseInt(Math.random() * 100 + 1);
        userInput.removeAttribute('disabled')
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        startOver.removeChild(p)

        playGame = true;
    })
}