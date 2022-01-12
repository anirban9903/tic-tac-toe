function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid; //+'1' => 1
    playerConfigOverlay.style.display = 'block';
    backdropElement.style.display = 'block';
}

function closePlayerConfig() {
    playerConfigOverlay.style.display = 'none';
    backdropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorsOutputElement.textContent = '';
    formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
    event.preventDefault(); //without this the request will be sent to the server which cause page reload
    const formData = new FormData(event.target); //inbuilt object
    const enteredPlayerName = formData.get('playername').trim(); //trim removes all excess whitespace from start and end of a string
    if (!enteredPlayerName) {
        event.target.firstElementChild.classList.add('error');
        errorsOutputElement.textContent = 'Please enter a valid name!';
        return;
    }
    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

    players[editedPlayer - 1].name = enteredPlayerName;

    closePlayerConfig();
}