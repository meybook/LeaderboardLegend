const reactionStartBtn = document.getElementById('reaction-start-btn'); 
const reactionRetryBtn = document.getElementById('reaction-retry-btn'); 
const reactionTuto = document.getElementById('reaction-tuto');
const reactionResult = document.getElementById('reaction-result');
const reactionTimeDisplay = document.getElementById('reaction-time'); 
const reactionBackToMenuButton = document.getElementById('reaction-back-to-menu'); 
const HighScoress = document.getElementById('reaction-highscores'); 
const resetReactionScoresButton = document.getElementById('reset-reaction-scores-btn'); 



let reactionHighScores = []; 
let reactionStartTime, reactionEndTime, reactionTimeout; 



// fctn startbtn
function startReactionTest() {
    reactionTuto.textContent = "Préparez-vous..."; 
    reactionStartBtn.style.display = 'none'; 
    reactionResult.style.display = 'none'; 

    const random = Math.floor(Math.random() * 5000) + 1000; // genere random un nbr
    reactionTimeout = setTimeout(() => {
        reactionTuto.textContent = "Cliquez maintenant !";
        reactionTuto.style.backgroundColor = "green"; 
        reactionStartTime = new Date().getTime(); // capte le time au debut
        document.body.addEventListener('click', calculTimeReaction); // calcul le clic en focntioan du temps
    }, random);
}

// fctn pour calculer
function calculTimeReaction() {
    reactionEndTime = new Date().getTime(); 
    const reactionTime = reactionEndTime - reactionStartTime; // calcul du temps de reaction
    reactionTimeDisplay.textContent = reactionTime;

    reactionTuto.textContent = "Votre temps de réaction est mesuré."; 
    reactionTuto.style.backgroundColor = ""; 

    reactionResult.style.display = 'block'; 
    document.body.removeEventListener('click', calculTimeReaction); 

    const pseudo = localStorage.getItem('pseudo');
    saveReactionHighScore(pseudo, reactionTime); // SAVE LE SCORE POUR LEADERBOARD
}

// fctn save LEADER OARD !!!!
function saveReactionHighScore(pseudo, score) {
    const reactionScore = { pseudo, score }; 
    socket.emit('newReactionScore', reactionScore); 
}

socket.on('reactionHighScores', (scores) => {
    reactionHighScores = scores || []; 
    updateReactionHighScoresTable(); 
});



//fctn update
function updateReactionHighScoresTable() {
    HighScoress.innerHTML = '';
    reactionHighScores.forEach(score => { 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>${score.pseudo}</td>
            <td>${score.score}</td>
        `; 
        HighScoress.appendChild(row);
    });
}

// fctn reset
function resetReactionTest() {
    clearTimeout(reactionTimeout); // reset tous clean
    reactionTuto.textContent = "Cliquez sur le bouton ci-dessous pour commencer. Attendez que l'écran devienne vert, puis cliquez le plus rapidement possible."; 
    reactionTuto.style.backgroundColor = ""; 
    reactionStartBtn.style.display = 'block'; 
    reactionResult.style.display = 'none'; 
}

resetReactionScoresButton.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les meilleurs scores ?')) { 
        socket.emit('resetReactionScores');
    }
});
socket.on('reactionHighScoresReset', () => {
    reactionHighScores = []; 
    updateReactionHighScoresTable();
});

//KR POUR LE JEUX ET MENU 
reactionStartBtn.addEventListener('click', startReactionTest); 
reactionRetryBtn.addEventListener('click', resetReactionTest); 
reactionBackToMenuButton.addEventListener('click', () => {
    resetReactionTest();
    document.getElementById('reaction-time-container').style.display = 'none'; 
    document.getElementById('menu-container').style.display = 'block'; 
});



