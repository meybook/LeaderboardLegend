const spacebarStartBtn = document.getElementById('spacebar-start-btn'); 
const spacebarRetryBtn = document.getElementById('spacebar-retry-btn'); 
const spacebarBackToMenuButton = document.getElementById('spacebar-back-to-menu'); 
const spacebarTime = document.getElementById('spacebar-time'); 
const spacebarComptage = document.getElementById('spacebar-comptage'); 
const HighScoreSpacebar = document.getElementById('spacebar-highscores'); 



let spacebarNbrcomptage = 0;
let spacebarTimeLeft = 5; 
let spacebarTimer; 
let spacebarstart = false; 
let spacebarHighScores = []; 




// fctn start
function startSpacebarCounter() {
    resetSpacebarCounter(); 
    spacebarStartBtn.style.display = 'none'; 
    spacebarRetryBtn.style.display = 'none'; 
    spacebarstart = true; 

    document.addEventListener('keyup', compte); 

    spacebarTimer = setInterval(() => { 
        spacebarTimeLeft--; // -1s 
        spacebarTime.textContent = spacebarTimeLeft; 

        if (spacebarTimeLeft <= 0) { // si plus de time alors ca fini
            clearInterval(spacebarTimer); 
            fin(); 
        }
    }, 1000);
}

// fctn compte
function compte(event) {
    if (event.code === 'Space' && spacebarstart) { 
        spacebarNbrcomptage++;
        spacebarComptage.textContent = spacebarNbrcomptage; 
    }
}

// fctn fin
function fin() {
    spacebarstart = false;
    document.removeEventListener('keyup', compte); 
    spacebarRetryBtn.style.display = 'block'; 

    const pseudo = localStorage.getItem('pseudo');
    saveSpacebarHighScore(pseudo, spacebarNbrcomptage);
}

// fctn SAVE LEADERBOARD !!!!
function saveSpacebarHighScore(pseudo, presses) { 
    const spacebarScore = { pseudo, presses }; 
    socket.emit('newSpacebarScore', spacebarScore); 
}
socket.on('spacebarHighScores', (scores) => {
    spacebarHighScores = scores || []; 
    updateSpacebarHighScoresTable(); 
});

// fctn update leaderboard
function updateSpacebarHighScoresTable() {
    HighScoreSpacebar.innerHTML = '';

    spacebarHighScores.forEach(score => { 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>${score.pseudo}</td>
            <td>${score.presses}</td>
        `; 
        HighScoreSpacebar.appendChild(row);
    });
}

// fctn reset scores
document.getElementById('reset-spacebar-scores-btn').addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les meilleurs scores ?')) { 
        socket.emit('resetSpacebarScores');
    }
});
socket.on('spacebarHighScoresReset', () => {
    spacebarHighScores = [];
    updateSpacebarHighScoresTable(); // Met à jour l'affichage
});




//kr pour le jeux 
spacebarStartBtn.addEventListener('click', startSpacebarCounter); 
// Réessayer après un premier essai
spacebarRetryBtn.addEventListener('click', () => {
    resetSpacebarCounter(); 
    startSpacebarCounter(); 
});


//reset et retour au menu
spacebarBackToMenuButton.addEventListener('click', () => {
    clearInterval(spacebarTimer); 
    spacebarstart = false; 
    resetSpacebarCounter(); 
    document.getElementById('spacebar-counter-container').style.display = 'none'; 
    document.getElementById('menu-container').style.display = 'block'; 

});

// Réinitialiser le compteur de la barre d'espace
function resetSpacebarCounter() {
    spacebarNbrcomptage = 0; // Réinitialise le compteur de pressions à 0.
    spacebarTimeLeft = 5; // Réinitialise le temps restant à 5 secondes.
    spacebarComptage.textContent = spacebarNbrcomptage; // Met à jour l'affichage du compteur de pressions.
    spacebarTime.textContent = spacebarTimeLeft; // Met à jour l'affichage du temps restant.
    spacebarStartBtn.style.display = 'block'; // Affiche le bouton de démarrage.
    spacebarRetryBtn.style.display = 'none'; // Cache le bouton de réessai.
}




// KR  pour le mENU PRIINCIPAL
document.getElementById('spacebar-counter-lien').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('menu-container').style.display = 'none'; 
    document.getElementById('spacebar-counter-container').style.display = 'block'; 
    resetSpacebarCounter();
});


