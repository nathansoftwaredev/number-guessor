// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBTN = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message')

// Assign UI min and max
minNum.textContent = min
maxNum.textContent = max

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload()
    }
})


// Listen for Guess
guessBTN.addEventListener('click', function(){
    let guess = parseInt(guessInput.value)
    console.log(guess)

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    // Check if won
    if(guess === winningNum){

        // Game over - won
        gameOver(true, `${winningNum} is correct!`)

    } else {
        // Wrong Number
        guessesLeft = guessesLeft - 1

        if(guessesLeft === 0){

            // Game over - lost
            gameOver(false, `You lost. The correct number was ${winningNum}`)

        } else {
            // Game continues - answer wrong

            // Clear input
            guessInput.value = ''
            // Change border color
            guessInput.style.borderColor = 'red'
            // Tell user it's the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses remaining`, 'red')

        }
    }
})

// Game over
function gameOver(won, msg){
    let color
    won === true ? color = 'green' : color = 'red'

    // Disable input
    guessInput.disabled = true
    // Change border color
    guessInput.style.borderColor = color
    // Change text color
    message.style.color = color
    // Set message
    setMessage(msg)

    // Play again?
    guessBTN.value = 'Play Again'
    guessBTN.className += 'play-again'
}

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// Set Message
function setMessage(msg, color){
    message.style.color = color
    message.textContent = msg
}