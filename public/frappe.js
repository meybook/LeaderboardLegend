const motstyping = document.getElementById('motstyping'); 
const entrertexte = document.getElementById('entrertext'); 
const startBtnn = document.getElementById('start-btn'); 
const timeEcoule = document.getElementById('time-ecoule'); 
const retryTyping = document.getElementById('retry-typing'); 
const highScoresLEADER = document.getElementById('high-scores-LEADER'); 
const pseudoTyping = document.getElementById('pseudo-typing'); 
const resetScoresBtn = document.getElementById('reset-scores-btn'); 
const frappeBackToMenu = document.getElementById('frappe-back-to-menu');


let startTime, timerInterval; // je stock les temps
let mots = ''; 
let phraseactuelle = 0; 
let totalphrase = 10; 
let phrasecomplet = 0; 
let totallettre = 0; 
let totallettreKR = 0; 
let highScores = []; 

const texts = ['angle', 'armoire', 'banc', 'bureau', 'cabinet', 'carreau', 'chaise', 'classe', 'clef', 'coin', 'couloir', 'dossier', 'eau', 'ecole', 'entrer', 'escalier', 'etagere', 'exterieur', 'fenetre', 'interieur', 'lavabo', 'lit', 'marche', 'matelas', 'maternelle', 'meuble', 'mousse', 'mur', 'peluche', 'placard', 'plafond', 'porte', 'poubelle', 'radiateur', 'rampe', 'rideau', 'robinet', 'salle', 'salon', 'serrure', 'serviette', 'siege', 'sieste', 'silence', 'sol', 'sommeil', 'sonnette', 'sortie', 'table', 'tableau', 'tabouret', 'tapis', 'tiroir', 'toilette', 'vitre', 'aller', 'amener', 'apporter', 'appuyer', 'attendre', 'bailler', 'coucher', 'dormir', 'eclairer', 'emmener', 'emporter', 'entrer', 'fermer', 'frapper', 'installer', 'lever', 'ouvrir', 'presser', 'rechauffer', 'rester', 'sonner', 'sortir', 'venir', 'absent', 'assis', 'bas', 'haut', 'present', 'gauche', 'droite', 'debout', 'dedans', 'dehors', 'face', 'loin', 'pres', 'tard', 'tot', 'apres', 'avant', 'contre', 'dans', 'de', 'derriere', 'devant', 'du', 'sous', 'sur', 'crayon', 'stylo', 'feutre', 'mine', 'gomme', 'dessin', 'coloriage', 'rayure', 'peinture', 'pinceau', 'couleur', 'craie', 'papier', 'feuille', 'cahier', 'carnet', 'carton', 'ciseaux', 'decoupage', 'pliage', 'pli', 'colle', 'affaire', 'boite', 'casier', 'caisse', 'trousse', 'cartable', 'jeu', 'jouet', 'pion', 'domino', 'puzzle', 'cube', 'perle', 'chose', 'forme', 'carre', 'rond', 'pate', 'modeler', 'tampon', 'livre', 'histoire', 'bibliotheque', 'image', 'album', 'titre', 'conte', 'dictionnaire', 'magazine', 'catalogue', 'page', 'ligne', 'mot', 'enveloppe', 'etiquette', 'carte', 'appel', 'affiche', 'alphabet', 'appareil', 'camescope', 'cassette', 'chaine', 'chanson', 'chiffre', 'contraire', 'difference', 'doigt', 'ecran', 'ecriture', 'film', 'fois', 'foi', 'idee', 'instrument', 'intrus', 'lettre', 'liste', 'magnetoscope', 'main', 'micro', 'modele', 'musique', 'nom', 'nombre', 'orchestre', 'ordinateur', 'photo', 'point', 'poster', 'pouce', 'prenom', 'question', 'radio', 'sens', 'tambour', 'telecommande', 'telephone', 'television', 'trait', 'trompette', 'voix', 'xylophone', 'zero', 'chanter', 'chercher', 'choisir', 'chuchoter', 'coller', 'colorier', 'commencer', 'comparer', 'compter', 'construire', 'continuer', 'copier', 'couper', 'dechirer', 'decoller', 'decorer', 'decouper', 'demolir', 'dessiner', 'dire', 'discuter', 'ecouter', 'ecrire', 'effacer', 'entendre', 'entourer', 'envoyer', 'faire', 'finir', 'fouiller', 'gouter', 'imiter', 'laisser', 'lire', 'mettre', 'montrer', 'ouvrir', 'parler', 'peindre', 'plier', 'poser', 'prendre', 'preparer', 'ranger', 'reciter', 'recommencer', 'regarder', 'remettre', 'repeter', 'repondre', 'sentir', 'souligner', 'tailler', 'tenir', 'terminer', 'toucher', 'travailler', 'trier', 'ami', 'attention', 'camarade', 'colere', 'copain', 'coquin', 'dame', 'directeur', 'directrice', 'droit', 'effort', 'eleve', 'enfant', 'fatigue', 'faute', 'fille', 'garcon', 'gardien', 'madame', 'maitre', 'maitresse', 'mensonge', 'ordre', 'personne', 'retard', 'joueur', 'sourire', 'travail', 'aider', 'defendre', 'desobeir', 'distribuer', 'echanger', 'expliquer', 'gronder', 'obeir', 'obliger', 'partager', 'preter', 'priver', 'promettre', 'progres', 'progresser', 'punir', 'quitter', 'raconter', 'expliquer', 'refuser', 'separer', 'blond', 'brun', 'calme', 'curieux', 'different', 'doux', 'enerver', 'gentil', 'grand', 'handicape', 'inseparable', 'jaloux', 'moyen', 'muet', 'noir', 'nouveau', 'petit', 'poli', 'propre', 'roux', 'sage', 'sale', 'serieux', 'sourd', 'tranquille', 'arrosoir', 'assiette', 'balle', 'bateau', 'boite', 'bouchon', 'bouteille', 'bulles', 'canard', 'casserole', 'cuillere', 'cuvette', 'douche', 'entonnoir', 'gouttes', 'litre', 'moulin', 'pluie', 'poisson', 'pont', 'pot', 'roue', 'sac', 'plastique', 'saladier', 'seau', 'tablier', 'tasse', 'trous', 'verre', 'agiter', 'amuser', 'arroser', 'attraper', 'avancer', 'baigner', 'barboter', 'boucher', 'bouger', 'deborder', 'doucher', 'eclabousser', 'essuyer', 'envoyer', 'couler', 'partir', 'flotter', 'gonfler', 'inonder', 'jouer', 'laver', 'melanger', 'mouiller', 'nager', 'pleuvoir', 'plonger', 'pousser', 'pouvoir', 'presser', 'recevoir', 'remplir', 'renverser', 'secher', 'serrer', 'souffler', 'tirer', 'tourner', 'tremper', 'verser', 'vider', 'vouloir', 'amusant', 'chaud', 'froid', 'humide', 'interessant', 'mouille', 'sec', 'transparent', 'moitie', 'autant', 'beaucoup', 'encore', 'moins', 'peu', 'plus', 'trop', 'anorak', 'arc', 'bagage', 'baguette', 'barbe', 'bonnet', 'botte', 'bouton', 'bretelle', 'cagoule', 'casque', 'casquette', 'ceinture', 'chapeau', 'chaussette', 'chausson', 'chaussure', 'chemise', 'cigarette', 'col', 'collant', 'couronne', 'cravate', 'culotte', 'echarpe', 'epee', 'fee', 'fleche', 'fusil', 'gant', 'habit', 'jean', 'jupe', 'lacet', 'laine', 'linge', 'lunettes', 'magicien', 'magie', 'maillot', 'manche', 'manteau', 'mouchoir', 'moufle', 'noeud', 'paire', 'pantalon', 'pied', 'poche', 'prince', 'pyjama', 'reine', 'robe', 'roi', 'ruban', 'semelle', 'soldat', 'sociere', 'tache', 'taille', 'talon', 'tissu', 'tricot', 'uniforme', 'valise', 'veste', 'vetement', 'changer', 'chausser', 'couvrir', 'deguiser', 'deshabiller', 'enlever', 'habiller', 'lacer', 'porter', 'ressembler', 'clair', 'court', 'etroit', 'fonce', 'joli', 'large', 'long', 'multicolore', 'nu', 'use', 'bien', 'mal', 'mieux', 'presque', 'aiguille', 'ampoule', 'avion', 'bois', 'bout', 'bricolage', 'bruit', 'cabane', 'carton', 'clou', 'colle', 'crochet', 'elastique', 'ficelle', 'fil', 'marionnette', 'marteau', 'metal', 'metre', 'morceau', 'moteur', 'objet', 'outil', 'peinture', 'pinceau', 'planche', 'platre', 'scie', 'tournevis', 'vis', 'voiture', 'arracher', 'attacher', 'casser', 'coudre', 'detruire', 'ecorcher', 'enfiler', 'enfoncer', 'fabriquer', 'mesurer', 'percer', 'pincer', 'reparer', 'reussir', 'servir', 'taper', 'trouer', 'trouver', 'adroit', 'difficile', 'dur', 'facile', 'lisse', 'maladroit', 'pointu', 'tordu', 'accident', 'aeroport', 'camion', 'engin', 'feu', 'frein', 'fusee', 'garage', 'gare', 'grue', 'helicoptere', 'moto', 'panne', 'parking', 'pilote', 'pneu', 'quai', 'train', 'virage', 'vitesse', 'voyage', 'wagon', 'zigzag', 'arreter', 'atterrir', 'bouder', 'charger', 'conduire', 'demarrer', 'disparaitre', 'donner', 'ecraser', 'envoler', 'garder', 'garer', 'manquer', 'partir', 'poser', 'reculer', 'rouler', 'tendre', 'transporter', 'voler', 'abime', 'ancien', 'blanc', 'bleu', 'casse', 'cinq', 'dernier', 'deux', 'deuxieme', 'dix', 'gris', 'gros', 'huit', 'jaune', 'meme', 'neuf', 'pareil', 'premier', 'quatre', 'rouge', 'sept', 'seul', 'six', 'solide', 'trois', 'troisieme', 'un', 'vert', 'dessus', 'autour', 'vite', 'vers', 'acrobate', 'arret', 'arriere', 'barre', 'barreau', 'bord', 'bras', 'cerceau', 'chaise', 'cheville', 'chute', 'coeur'];


// load higscore
socket.on('highScores', (scores) => {
    highScores = scores || []; 
    updateHighScores(); 
});


// fctn start
function startTest() {
    phrasecomplet = 0; 
    totallettre = 0; 
    totallettreKR = 0; 
    newmots(); 
    entrertexte.value = ''; 
    entrertexte.disabled = false; 
    entrertexte.focus(); 
    startBtnn.disabled = true; 

    startTime = new Date(); // ca set le temps de depart
    timerInterval = setInterval(updateTime, 1000); // update le temps toute les 1s
}

// fctn newmots
function newmots() {
    if (phrasecomplet >= totalphrase) { // si tout est complete ca calcule les score
        calculscore(); 
        return;
    }

    mots = texts[phraseactuelle]; // recup la phrase a taper
    motstyping.textContent = mots; // affiche
    entrertexte.value = ''; // et reset
    phraseactuelle = (phraseactuelle + 1) % texts.length; // +1 pour le compteur
}

// fctn update time
function updateTime() {
    const time = new Date(); 
    const timeD = Math.floor((time - startTime) / 1000); // calcul la dif
    timeEcoule.textContent = timeD; // affiche
}

// fctn calculscore
function calculscore() {
    clearInterval(timerInterval); 
    entrertexte.disabled = true; // reset les input
    startBtnn.disabled = false; // reset le btn
    motstyping.textContent = "Test terminé !"; 
    const totalminutes = (new Date() - startTime) / 60000; // calcul en minutes
    const pseudo = pseudoTyping.textContent;
    saveHighScore(pseudo, Math.floor(totalminutes * 60)); // save le score
}

// fctn reset
function resetGame() {
    clearInterval(timerInterval); 
    motstyping.textContent = 'Appuyez sur "Commencer" pour lancer le test.'; 
    entrertexte.value = '';
    entrertexte.disabled = true; 
    timeEcoule.textContent = '0'; 
    startBtnn.disabled = false; 
    phraseactuelle = 0; 
    phrasecomplet = 0; 
    totallettre = 0; 
    totallettreKR = 0; 
}

// fctn save highscore IMPORTANT POUR LEADERBOARD
function saveHighScore(pseudo, time) {
    const score = { pseudo, time }; 
    socket.emit('newScore', score);
}

// Surlignage des erreurs de typing
entrertexte.addEventListener('input', () => {
    const inputText = entrertexte.value; 
    totallettre = inputText.length; 
    totallettreKR = 0;
    let highlightedText = ''; 

    for (let i = 0; i < inputText.length; i++) { // pour chaque lettre si c ok alors ajoute sinon surligne en rouge
        if (inputText[i] === mots[i]) { 
            highlightedText += inputText[i]; 
            totallettreKR++; // +1 au compteur de lettre correctes mais ca fonctionne pas 
        } else {
            highlightedText += `<span style="color: red;">${mots[i]}</span>`;
        }
    }

    motstyping.innerHTML = highlightedText + mots.slice(inputText.length); // affiche tout 

    if (inputText === mots) { // si ok +1 au compteur et charge
        phrasecomplet++; 
        newmots(); 
    }
});



// fctn update
function updateHighScores() {
    highScores.sort((a, b) => a.time - b.time); // trie les scores du plus petit au plus grand 
    highScoresLEADER.innerHTML = ''; 

    highScores.forEach(score => { // Pour chaque score dans le tableau trié,
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>${score.pseudo}</td>
            <td>${score.time}</td>
        `; 
        highScoresLEADER.appendChild(row); 
    });
}





retryTyping.addEventListener('click', resetGame); // btn reset 
startBtnn.addEventListener('click', startTest); // btn start



// reset higscores
resetScoresBtn.addEventListener('click', () => { 
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les meilleurs scores ?')) {
        socket.emit('resetScores'); 
    }
});
socket.on('highScoresReset', () => {
    highScores = []; 
    updateHighScores(); 
});



// Kr pour le menu principal
frappeBackToMenu.addEventListener('click', () => { 
    resetGame();
    document.getElementById('typing-container').style.display = 'none'; 
    document.getElementById('menu-container').style.display = 'block'; 
});


