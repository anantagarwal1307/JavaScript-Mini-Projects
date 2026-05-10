let score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
    isAutoPlaying = true;
    } else {
        clearInterval(intervalId)
        isAutoPlaying = false;
    }
}


document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('Rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('Paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame("Scissors");
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock');
    } else if (event.key === 'p') {
        playGame('Paper');
    } else if (event.key === 's') {
        playGame('Scissors')
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    
    let result = '';

    if (playerMove === 'Rock') {
            if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'You Lose';   
        } else if (computerMove === 'Scissors') {
            result = 'You Win';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You Win';
        } else if (computerMove === 'Paper') {
            result = 'Tie';   
        } else if (computerMove === 'Scissors') {
            result = 'You Lose';
        }
    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You Lose';
        } else if (computerMove === 'Paper') {
            result = 'You Win';   
        } else if (computerMove === 'Scissors') {
            result = 'Tie';
        }
    }

    if (result === 'You Win') {
        score.Wins++;
    } else if (result === 'You Lose') {
        score.Losses++;
    } else {
        score.Ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;
    
    document.querySelector('.js-moves')
        .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;


}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.floor(Math.random() * 3);

    let computerMove = '';

    if (randomNumber == 0) {
        computerMove = 'Rock';
    } else if (randomNumber == 1) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }

    return computerMove;
}