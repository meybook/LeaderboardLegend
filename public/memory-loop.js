const fleches = document.querySelectorAll('.fleche'); 
const startBtn = document.getElementById('memory-start-btn');
const message = document.getElementById('message');
const memoryBackToMenuButton = document.getElementById('memory-back-to-menu'); 
const memoryHighScores = document.getElementById('memory-loop-highscores');
const socket = io();


let sequence = []; 
let playerSequence = []; 
let level = 0; 
let memoryLoopHighScores = [];


// fctn start
function startGame() {
    message.textContent = ''; 
    sequence = []; 
    playerSequence = [];
    level = 0; 
    nextRound(); 
}

// fctn next round
function nextRound() {
    level++; // +1 au level
    message.textContent = `Niveau ${level}`; 
    playerSequence = []; 
    sequence.push(Math.floor(Math.random() * 4) + 1); // add de la fleche aleatoire 
    SequenceF();
}

// fctn sequenceFleche
function SequenceF() {
    fleches.forEach(fleche => fleche.classList.add('hidden')); // cache les fleche

    sequence.forEach((flecheId, index) => { //ca fais la sequence pour chaque fleche
        setTimeout(() => {
            document.getElementById(`fleche-${flecheId}`).classList.remove('hidden'); // ca montre la flche avec un delai
        }, (index + 1) * 1000); 

        setTimeout(() => {
            document.getElementById(`fleche-${flecheId}`).classList.add('hidden'); // ca recache la fleche avec un delai pour pas que ca soit trop dure
        }, (index + 1) * 1000 + 500); 
    });

    setTimeout(() => {
        fleches.forEach(fleche => fleche.classList.remove('hidden')); // ca reset les fleche 
        user(); 
    }, (sequence.length + 1) * 1000); // ppour que il y ai un delai en plus entre chaque manche
}

// fctn verif user 
function user() {
    fleches.forEach(fleche => {
        fleche.addEventListener('click', clicUser); 
    });
}

// fctn clic user 
function clicUser(event) {
    const flecheId = parseInt(event.target.id.split('-')[1]); // recup id fleche 
    playerSequence.push(flecheId); 
    if (!chekPlayerSequence()) { // check si c ok sinon erreur
        message.textContent = 'Erreur! Vous avez perdu!'; 
        saveMemoryLoopHighScore(); 
        resetGame();

    } else if (playerSequence.length === sequence.length) { // si c ok alors next round
        fleches.forEach(fleche => fleche.removeEventListener('click', clicUser)); 
        setTimeout(nextRound, 1000); // manche suivante après delai
    }
}

// fctn chek de la sequence
function chekPlayerSequence() {
    for (let i = 0; i < playerSequence.length; i++) { // pour chaque fleche si c pas la bonne alors erreur
        if (playerSequence[i] !== sequence[i]) { 
            return false; 
            
        }
    }
    return true; // vrai c tout est ok
}



// fctn save hightscore IMPORTANT POUR LE LEADERBOARD !!!!
function saveMemoryLoopHighScore() {
    const pseudo = document.getElementById('memory-loop-pseudo').textContent;
    const score = {
        pseudo: pseudo,
        level: level,
    };
    socket.emit('newMemoryLoopScore', score);
}




// fctn update scores
function updateMemoryHighScores() {
    memoryHighScores.innerHTML = ''; 

    memoryLoopHighScores.forEach(score => { 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>${score.pseudo}</td>
            <td>${score.level}</td>
        `;
        memoryHighScores.appendChild(row);
    });
}
socket.on('memoryLoopHighScores', (scores) => {
    memoryLoopHighScores = scores || []; 
    updateMemoryHighScores(); 
});



// fctn reset scores
document.getElementById('reset-memory-loop-scores-btn').addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les meilleurs scores ?')) { 
        socket.emit('resetMemoryLoopScores'); 
    }
});
socket.on('memoryLoopHighScoresReset', () => {
    memoryLoopHighScores = [];
    updateMemoryHighScores(); 
});


startBtn.addEventListener('click', startGame); //startbtn


// Kr pour le menu 
memoryBackToMenuButton.addEventListener('click', () => { 
    fleches.forEach(fleche => fleche.removeEventListener('click', clicUser));
    message.textContent = ''; 
    resetGame(); 
    document.getElementById('memory-loop-container').style.display = 'none'; 
    document.getElementById('menu-container').style.display = 'block'; 
});