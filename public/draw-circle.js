//variavles
const canvas = document.getElementById('drawingZONE'); 
const ctx = canvas.getContext('2d'); 
const drawCircleRetry = document.getElementById('draw-circle-retry'); 
const drawCircleBackToMenu = document.getElementById('draw-circle-back-to-menu'); 
const drawCircleHighScoresLEADER = document.getElementById('draw-circle-high-scores-LEADER'); 
const resetDrawCircleScores = document.getElementById('reset-draw-circle-scores'); 


let drawCircleHighScores = []; 
let drawing = false; 
let points = []; 

// detecte comportement souris
canvas.addEventListener('mousedown', startDrawing); 
canvas.addEventListener('mousemove', draw); 
canvas.addEventListener('mouseup', stopDrawing);



// fctn start
function startDrawing(event) {
    drawing = true; 
    points = []; 
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canva
    points.push({ x: event.offsetX, y: event.offsetY }); 
}

// fctn draw
function draw(event) {
    if (!drawing) return; // ca clear le canva quand c plus mousedown
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    points.push({ x: event.offsetX, y: event.offsetY }); 

    ctx.beginPath(); 
    ctx.moveTo(points[0].x, points[0].y); 
    for (let i = 1; i < points.length; i++) { 
        ctx.lineTo(points[i].x, points[i].y); 
    }
    ctx.closePath(); 
    ctx.stroke();
}

// fctn stopdrawing
function stopDrawing() {
    drawing = false;
    calculScore(); 
}

// fctn calculscore
function calculScore() {
    if (points.length < 45) { // pour la triche t obligé de faire plus que 45point
        document.getElementById('score').textContent = 'Please draw a circle!';
        return; 
    }




//CALCUL DES RAYONS POUR LE SCORES MAIS JSP COMMENT CA FONCTIONNE
    let sumX = 0, sumY = 0; 
    for (let i = 0; i < points.length; i++) {
        sumX += points[i].x; 
        sumY += points[i].y;
    }
    const centerX = sumX / points.length; 
    const centerY = sumY / points.length;

    let sumR = 0; 
    for (let i = 0; i < points.length; i++) { 
        sumR += Math.sqrt(Math.pow(points[i].x - centerX, 2) + Math.pow(points[i].y - centerY, 2)); 
    }
    const avgR = sumR / points.length; 

    let variance = 0; 
    for (let i = 0; i < points.length; i++) { 
        const radius = Math.sqrt(Math.pow(points[i].x - centerX, 2) + Math.pow(points[i].y - centerY, 2));
        variance += Math.abs(radius - avgR); 
    }
    variance /= points.length;




    // RECUP DU SCORE
    const score = Math.max(10 - variance / 5, 0).toFixed(2); 
    document.getElementById('score').textContent = 'Your score: ' + score + '/10'; 

    const pseudo = localStorage.getItem('pseudo');
    saveDrawCircleHighScore(pseudo, parseFloat(score)); 
}



// fctn save POUR LEADERBOARD IMPORTANT COMME CELLE DU HAUT
function saveDrawCircleHighScore(pseudo, score) {
    const drawCircleScore = { pseudo, score }; 
    socket.emit('newDrawCircleScore', drawCircleScore); // cote serveur
}

// fctn update leaderboard meme que les autres
function updateDrawCircleHighScoresTable() {
    drawCircleHighScoresLEADER.innerHTML = '';

    drawCircleHighScores.forEach(score => { 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>${score.pseudo}</td>
            <td>${score.score}</td>
        `; 
        drawCircleHighScoresLEADER.appendChild(row); 
    });
}


// fctn reset 
function resetDrawCircleTest() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    document.getElementById('score').textContent = ''; 
    points = []; 
}


// uodate leaderboard
socket.on('drawCircleHighScores', (scores) => {
    drawCircleHighScores = scores || []; 
    updateDrawCircleHighScoresTable(); 
});

// reset des higscores
resetDrawCircleScores.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les meilleurs scores ?')) { 
        socket.emit('resetDrawCircleScores'); 
    }
});
socket.on('drawCircleHighScoresReset', () => {
    drawCircleHighScores = []; 
    updateDrawCircleHighScoresTable(); 
});



// reset le draw 
drawCircleRetry.addEventListener('click', resetDrawCircleTest); 
//bcktomenu
drawCircleBackToMenu.addEventListener('click', () => {
    resetDrawCircleTest();
    document.getElementById('draw-circle-container').style.display = 'none'; 
    document.getElementById('menu-container').style.display = 'block'; 
});


// kr pour le menu principal
document.getElementById('draw-circle-lien').addEventListener('click', (event) => { 
    event.preventDefault(); 
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('draw-circle-container').style.display = 'block'; 
    resetDrawCircleTest(); 
});




