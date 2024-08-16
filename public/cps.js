// VARIABLES
const clickBtn = document.getElementById('click-btn'); 
const cpsTime = document.getElementById('cps-temps'); 
const cpsCount = document.getElementById('cps-count'); 
const cpsRate = document.getElementById('cps-rate'); 
const cpsBackToMenu = document.getElementById('cps-back-to-menu'); 
const retryCps = document.getElementById('retry-cps'); 
const cpsHighScoresLEADER = document.getElementById('cps-high-scores-LEADER'); 
const cpsPseudo = document.getElementById('cps-pseudo'); 
const resetCpsScoresButton = document.getElementById('reset-cps-scores-btn'); 
// INITIALISE 
let cpsClicks = 0; 
let cpsTimer; // je stock dedans le timer
let cpsTimeRestant = 10; 
let cpsSTART = false; 
let cpsHighScores = []; 


// fctn pour démarrer
function startCpsGame() {
    cpsClicks = 0; 
    cpsTimeRestant = 10; 
    cpsCount.textContent = cpsClicks; // affichage nombre clic MISE A JOUR
    cpsRate.textContent = '0'; // affichage du taux de clic par seconde MISE A JOUR
    cpsTime.textContent = cpsTimeRestant; // affichage du temps restant MISE A JOUR

    clickBtn.disabled = false; // pour commencer au click sur le btn 
    clickBtn.focus(); // ca focus sur bouton clic.
    cpsSTART = false; // reinitialise le demarage au cas ou 
}


// fctn pour update le time et le nbr de clic
function updateCpsTime() {
    cpsTimeRestant--; // ca enleve 1s 
    cpsTime.textContent = cpsTimeRestant; // ca met bien le temps restant  MISE A JOUR



// si le time est fini ca arrete le timer et desactive btn clic calcule le cps et affiche le cps
    if (cpsTimeRestant <= 0) { 
        clearInterval(cpsTimer); 
        clickBtn.disabled = true; 
        const cps = cpsClicks / 10; 
        cpsRate.textContent = cps.toFixed(2); 

        // sauvegarder le scor
        const pseudo = cpsPseudo.textContent; // ca recup le pseudo 
        //POUR LE LEADERBOARD SCORES 
        saveCpsHighScore(pseudo, cps.toFixed(2), 10); // save les info pour leaderboard 
    }
}

// fctn pour compter les clics update 
clickBtn.addEventListener('click', () => { 
    if (!cpsSTART) { // si c first clic alors ca demarre et ca update le timer
        cpsSTART = true; 
        cpsTimer = setInterval(updateCpsTime, 1000); 
    }

    if (cpsTimeRestant > 0 && cpsSTART) { 
        cpsClicks++; // +1 au clic
        cpsCount.textContent = cpsClicks; 
    }
});

// fctn back to menu
cpsBackToMenu.addEventListener('click', () => {
    clearInterval(cpsTimer); //clear timer
    resetCpsGame(); 
    document.getElementById('cps-container').style.display = 'none'; 
    document.getElementById('menu-container').style.display = 'block'; 
});

// fctn retry
retryCps.addEventListener('click', () => {
    clearInterval(cpsTimer); 
    resetCpsGame(); 
    startCpsGame();
});

// fctn reset
function resetCpsGame() {
    cpsClicks = 0; 
    cpsTimeRestant = 10; 
    cpsCount.textContent = cpsClicks; 
    cpsRate.textContent = '0'; 
    cpsTime.textContent = cpsTimeRestant; 
    cpsSTART = false; 
}

// fctn pour save IMPORTANT LEADERBOARD
function saveCpsHighScore(pseudo, cps, time) {
    const score = { pseudo, cps, time }; // save les info 
    socket.emit('newCpsScore', score); // send les info au serveur
}
// fctn pour leaderboard
socket.on('cpsHighScores', (scores) => {
    cpsHighScores = scores || []; // recup les scores serveur
    updateCpsHighScoresTable(); //update tableau 
});

// fctn pour update le leaderboard
function updateCpsHighScoresTable() {
    cpsHighScoresLEADER.innerHTML = ''; // empty

    // Ajouter chaque score dans le tableau HTML
    cpsHighScores.forEach(score => { 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>${score.pseudo}</td>
            <td>${score.cps}</td>
            <td>${score.time}</td>
        `; 
        cpsHighScoresLEADER.appendChild(row); // add les lignes au tableau bien 
    });
}

// fctn reset score
resetCpsScoresButton.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les meilleurs scores CPS ?')) { 
        socket.emit('resetCpsScores');
    }
});
//requete vers serveur
socket.on('cpsHighScoresReset', () => {
    cpsHighScores = []; // empty
    updateCpsHighScoresTable(); 
});




// lancer le jeu mieux 
document.getElementById('cps-lien').addEventListener('click', (event) => {
    event.preventDefault(); 
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('cps-container').style.display = 'block'; 
    startCpsGame(); 
});
