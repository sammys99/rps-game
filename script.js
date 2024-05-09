const gameWords = ['ROCK', 'PAPER', 'SCISSOR'];
let currentWordIndex = 0;
let gameInterval;

function startGameSequence() {
    const wordElement = document.querySelector('.rock-word');
    gameInterval = setInterval(() => {
        wordElement.textContent = gameWords[currentWordIndex];
        currentWordIndex = (currentWordIndex + 1) % gameWords.length;
        if (currentWordIndex === 0) {
            clearInterval(gameInterval);
            finalizeGame();
        }
    }, 500);
}

document.getElementById('startButton').addEventListener('click', function() {
    if (this.textContent === 'Start') {
        startGameSequence();
        startComputerChoiceAnimation();
    } else if (this.textContent === 'Restart') {
        resetGame();
        startGameSequence();
        startComputerChoiceAnimation();
    }
});

const choices = ['rock', 'paper', 'scissor'];
let computerChoiceInterval;

function startComputerChoiceAnimation() {
    const computerChoiceImage = document.querySelector('.comp-choice');
    computerChoiceInterval = setInterval(() => {
        let choice = choices[Math.floor(Math.random() * choices.length)];
        computerChoiceImage.src = `img/${choice}.png`;
        computerChoiceImage.alt = choice;
    }, 200);
}


let playerChoice = '';
document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', function() {
        document.querySelectorAll('.choice').forEach(c => c.style.opacity = '1'); // Resetea la opacidad de todas las imágenes
        this.style.opacity = '0.5'; // Oscurece la elección del jugador
        playerChoice = this.alt;
    });
});
function finalizeGame() {
    clearInterval(computerChoiceInterval);
    if (playerChoice) {
        checkResults();
    } else {
        console.log("El jugador no hizo una elección a tiempo.");
    }
}

function checkResults() {
    const computerChoice = document.querySelector('.comp-choice').alt;
    console.log(`Player Choice: ${playerChoice}, Computer Choice: ${computerChoice}`);

    if (playerChoice === computerChoice) {
        console.log("It's a tie.");
    } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
               (playerChoice === "paper" && computerChoice === "rock") ||
               (playerChoice === "scissors" && computerChoice === "paper")) {
        console.log("Player wins.");
        updateLives('.playerName-secondary .life');  // Actualizar vidas de la computadora
    } else {
        console.log("Computer wins.");
        updateLives('.playerName-primary .life');  // Actualizar vidas del jugador
    }
}



function updateLives(livesSelector) {
    let lives = document.querySelectorAll(livesSelector);
    console.log(`Updating lives for selector: ${livesSelector}, found ${lives.length} lives.`);

    let updated = false;
    for (let i = 0; i < lives.length; i++) {
        if (lives[i].style.opacity !== '0') {
            lives[i].style.opacity = '0';
            updated = true;
            console.log(`Life at index ${i} opacity changed to 0.`);
            break;
        }
    }

    if (!updated) {
        console.log("No lives were updated, check initial opacity settings.");
    }

    checkGameOver();
}



function checkGameOver() {
    const playerLives = Array.from(document.querySelectorAll('.playerName-primary .life')).filter(life => life.style.opacity === '0').length;
    const computerLives = Array.from(document.querySelectorAll('.playerName-secondary .life')).filter(life => life.style.opacity === '0').length;
    const totalPlayerLives = document.querySelectorAll('.playerName-primary .life').length;
    const totalComputerLives = document.querySelectorAll('.playerName-secondary .life').length;

    if (playerLives === totalPlayerLives || computerLives === totalComputerLives) {
        let resultMessage = playerLives === totalPlayerLives ? "Has perdido!" : "Has ganado!";
        alert(resultMessage);
        document.getElementById('startButton').textContent = 'Restart';  // Cambia el texto del botón a 'Restart'
    }
}
function resetGame() {
    // Restablece todas las vidas a opacidad completa
    document.querySelectorAll('.life').forEach(life => life.style.opacity = '1');

    // Restablece las variables necesarias
    playerChoice = '';
    // Restablece cualquier otra variable o estado del juego si es necesario

    // Cambia el texto del botón de nuevo a 'Start'
    document.getElementById('startButton').textContent = 'Start';
}


