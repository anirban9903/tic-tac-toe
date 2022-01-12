function resetGameStatus() {
    activeplayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won <span id="winner-name">Player name</span>!';
    gameOverElement.style.display = 'none';
    let gameBoardindex = 0;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            gameBoardElement.children[gameBoardindex].textContent = '';
            gameBoardElement.children[gameBoardindex].classList.remove('disabled');
            gameBoardindex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names for both players');
        return;
    }
    resetGameStatus();
    activePlayerName.textContent = players[activeplayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activeplayer === 0) {
        activeplayer = 1;
    } else {
        activeplayer = 0;
    }
    activePlayerName.textContent = players[activeplayer].name;
}

function selectGameField(event) {
    if (event.target.tagName != 'LI' || gameIsOver) {
        return;
    }

    const selecctedCol = event.target.dataset.col - 1;
    const selecctedrow = event.target.dataset.row - 1;

    if (gameData[selecctedrow][selecctedCol] > 0) { //if block is to check if the field is already selected
        alert('Please select an empty piece!');
        return;
    }
    event.target.textContent = players[activeplayer].symbol;
    event.target.classList.add('disabled');

    gameData[selecctedrow][selecctedCol] = activeplayer + 1;
    console.log(gameData);
    let winnerId = checkForGameOver();
    console.log(winnerId);
    if (winnerId !== 0) {
        endGame(winnerId);
    }
    currentRound++;
    switchPlayer();

}

function checkForGameOver() {
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
            return gameData[i][0];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]) {
            return gameData[0][i];
        }
    }
    if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }
    if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];
    }
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    gameIsOver = true;
    if (winnerId > 0) {
        let winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
    }
}