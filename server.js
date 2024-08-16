//CONECTION AU SOCKET 
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const highScoresFilePath = path.join(__dirname, 'highScores.json');
const cpsHighScoresFilePath = path.join(__dirname, 'cpsHighScores.json');
const reactionHighScoresFilePath = path.join(__dirname, 'reactionHighScores.json');
const drawCircleHighScoresFilePath = path.join(__dirname, 'drawCircleHighScores.json');
const spacebarHighScoresFilePath = path.join(__dirname, 'spacebarHighScores.json');
const memoryLoopHighScoresFilePath = path.join(__dirname, 'memoryLoopHighScores.json');

// fctn pour creer un fichier json pour des prochain jeux au cas ou
function initializeScoreFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
}
initializeScoreFile(highScoresFilePath);
initializeScoreFile(cpsHighScoresFilePath);
initializeScoreFile(reactionHighScoresFilePath);
initializeScoreFile(drawCircleHighScoresFilePath);
initializeScoreFile(spacebarHighScoresFilePath);
initializeScoreFile(memoryLoopHighScoresFilePath);
// les charger 
function loadScores(filePath) {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return [];
}

let highScores = loadScores(highScoresFilePath);
let cpsHighScores = loadScores(cpsHighScoresFilePath);
let reactionHighScores = loadScores(reactionHighScoresFilePath);
let drawCircleHighScores = loadScores(drawCircleHighScoresFilePath);
let spacebarHighScores = loadScores(spacebarHighScoresFilePath);
let memoryLoopHighScores = loadScores(memoryLoopHighScoresFilePath);


function saveScores(filePath, scores) {
    fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
}


app.use(express.static('public'));


io.on('connection', (socket) => {


    socket.emit('highScores', highScores);
    socket.emit('cpsHighScores', cpsHighScores);
    socket.emit('reactionHighScores', reactionHighScores);
    socket.emit('drawCircleHighScores', drawCircleHighScores);
    socket.emit('spacebarHighScores', spacebarHighScores);
    socket.emit('memoryLoopHighScores', memoryLoopHighScores);

    socket.on('newScore', (score) => {
        highScores.push(score);

//MAX 10 SCORES ET TRIAGE POUR CHAQUE JEUX ET ENVOIE AU CLIENT 
        highScores.sort((a, b) => b.wpm - a.wpm);
        if (highScores.length > 10) {
            highScores.pop();
        }
        saveScores(highScoresFilePath, highScores);
        io.emit('highScores', highScores);
    });
    socket.on('newCpsScore', (score) => {
        cpsHighScores.push(score);
        if (cpsHighScores.length > 10) {
            cpsHighScores.pop();
        }
        io.emit('cpsHighScores', cpsHighScores);
    });
    socket.on('newReactionScore', (score) => {
        reactionHighScores.push(score);
        reactionHighScores.sort((a, b) => a.score - b.score);
        if (reactionHighScores.length > 10) {
            reactionHighScores.pop();
        }
        saveScores(reactionHighScoresFilePath, reactionHighScores);
        io.emit('reactionHighScores', reactionHighScores);
    });
    socket.on('newDrawCircleScore', (score) => {
        drawCircleHighScores.push(score);
        drawCircleHighScores.sort((a, b) => b.score - a.score);
        if (drawCircleHighScores.length > 10) {
            drawCircleHighScores.pop();
        }
        saveScores(drawCircleHighScoresFilePath, drawCircleHighScores);
        io.emit('drawCircleHighScores', drawCircleHighScores);
    });
    socket.on('newSpacebarScore', (score) => {
        spacebarHighScores.push(score);
        spacebarHighScores.sort((a, b) => b.presses - a.presses);
        if (spacebarHighScores.length > 10) {
            spacebarHighScores.pop();
        }
        saveScores(spacebarHighScoresFilePath, spacebarHighScores);
        io.emit('spacebarHighScores', spacebarHighScores);
    });
    socket.on('newMemoryLoopScore', (score) => {
        memoryLoopHighScores.push(score);
        memoryLoopHighScores.sort((a, b) => b.level - a.level);
        if (memoryLoopHighScores.length > 10) {
            memoryLoopHighScores.pop();
        }
        saveScores(memoryLoopHighScoresFilePath, memoryLoopHighScores);
        io.emit('memoryLoopHighScores', memoryLoopHighScores);
    });
    socket.on('resetScores', () => {
        highScores = [];
        saveScores(highScoresFilePath, highScores);
        io.emit('highScoresReset');
    });

    socket.on('resetCpsScores', () => {
        cpsHighScores = [];
        saveScores(cpsHighScoresFilePath, cpsHighScores);
        io.emit('cpsHighScoresReset');  
    });

    socket.on('resetReactionScores', () => {
        reactionHighScores = [];
        saveScores(reactionHighScoresFilePath, reactionHighScores);
        io.emit('reactionHighScoresReset'); 
    });

    socket.on('resetDrawCircleScores', () => {
        drawCircleHighScores = [];
        saveScores(drawCircleHighScoresFilePath, drawCircleHighScores);
        io.emit('drawCircleHighScoresReset');  
    });

    socket.on('resetSpacebarScores', () => {
        spacebarHighScores = [];
        saveScores(spacebarHighScoresFilePath, spacebarHighScores);
        io.emit('spacebarHighScoresReset'); 
    });

    socket.on('resetMemoryLoopScores', () => {
        memoryLoopHighScores = [];
        saveScores(memoryLoopHighScoresFilePath, memoryLoopHighScores);
        io.emit('memoryLoopHighScoresReset');  
    });

    
    socket.on('disconnect', () => {
    });
});





//GESTION DES PORTS 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
