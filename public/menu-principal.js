const pseudoForm = document.getElementById('pseudo-formulaire'); 
const Jeux = document.getElementById('jeux'); 
const menuContainer = document.getElementById('menu-container'); 
const pseudoJeux = document.getElementById('pseudo-jeux'); 
const logoutButton = document.getElementById('logout-button'); 



const jeuxLiens = {
    typing: document.getElementById('typing-lien'),
    cps: document.getElementById('cps-lien'), 
    reaction: document.getElementById('reaction-time-lien'), 
    drawCircle: document.getElementById('draw-circle-lien'), 
    spacebarCounter: document.getElementById('spacebar-counter-lien'), 
    memoryLoop: document.getElementById('memory-loop-lien') 
};


const JeuxContainers = {
    typing: document.getElementById('typing-container'), 
    cps: document.getElementById('cps-container'), 
    reaction: document.getElementById('reaction-time-container'), 
    drawCircle: document.getElementById('draw-circle-container'),
    spacebarCounter: document.getElementById('spacebar-counter-container'),
    memoryLoop: document.getElementById('memory-loop-container') 
};


const pseudoglr = {
    typing: document.getElementById('pseudo-typing'), 
    cps: document.getElementById('cps-pseudo'), 
    reaction: document.getElementById('reaction-time-pseudo'), 
    drawCircle: document.getElementById('draw-circle-pseudo'), 
    spacebarCounter: document.getElementById('spacebar-counter-pseudo'), 
    memoryLoop: document.getElementById('memory-loop-pseudo')
};

// formulaire de pseudo
pseudoForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const pseudo = document.getElementById('pseudo').value;
    if (pseudo) { 
        localStorage.setItem('pseudo', pseudo); // stock dans localstorage
        updatePseudoGlr(pseudo); 
        animateExplosion(); 
    }
});


// ANIME JS EXPLOSION ET FORM
function animateExplosion() {

    const menuContainer = document.getElementById('menu-container');


    for (let i = 0; i < 30; i++) { 
        const particle = document.createElement('div'); 
        particle.classList.add('particle'); 
        document.body.appendChild(particle); 


        anime({
            targets: particle, 
            translateX: () => anime.random(-800, 800), 
            translateY: () => anime.random(-600, 600), 
            scale: [1, 0], 
            opacity: [1, 0], 
            duration: () => anime.random(1000, 2000), 
            easing: 'easeOutExpo',
            complete: function(anim) {
                particle.remove(); 
            }
        });
    }
    anime({
        targets: menuContainer, 
        scale: [1, 0], 
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInExpo', 
        complete: function() {
            location.reload(); 
        }
    });
}
pseudoForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire.
    const pseudo = document.getElementById('pseudo').value; // Récupère le pseudonyme entré.
    if (pseudo) { // Si un pseudonyme a été entré,
        localStorage.setItem('pseudo', pseudo); // Stocke le pseudonyme dans le localStorage.
        updatePseudoGlr(pseudo); // Met à jour l'affichage du pseudonyme dans tous les jeux.
        animateExplosion();  // Lance l'animation d'explosion.
    }
});




// fctn pseudo updtae
function updatePseudoGlr(pseudo) {
    pseudoJeux.textContent = pseudo; 
    Object.keys(pseudoglr).forEach(game => {
        pseudoglr[game].textContent = pseudo; // pour chaque jeu
    });
}

//fctn backtomenu
document.querySelectorAll('.back-to-menu').forEach(button => {
    button.addEventListener('click', function() {
        Object.values(JeuxContainers).forEach(container => container.style.display = 'none'); // Cache tous les conteneurs de jeux.
        menuContainer.style.display = 'block'; // Affiche le conteneur du menu principal.
    });
});

// pseudo dans localstorage
document.addEventListener('DOMContentLoaded', function() {
    const storedPseudo = localStorage.getItem('pseudo');
    if (storedPseudo) { 
        updatePseudoGlr(storedPseudo); 
        pseudoForm.style.display = 'none'; 
        Jeux.style.display = 'block'; 
    }
});

// lien pour les jeux        kr global !!!
Object.keys(jeuxLiens).forEach(game => {
    jeuxLiens[game].addEventListener('click', function(event) {
        event.preventDefault(); 
        menuContainer.style.display = 'none'; 
        JeuxContainers[game].style.display = 'block';
    });
});



// logout btn
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('pseudo');
    location.reload();
});


// btn leader board
document.getElementById("typing-leaderboard-btn").addEventListener("click", function() {
    displayLeaderboard("Vitesse de Frappe", highScores);
});
document.getElementById("cps-leaderboard-btn").addEventListener("click", function() {
    displayLeaderboard("Click par Seconde (CPS)", cpsHighScores);
});
document.getElementById("reaction-leaderboard-btn").addEventListener("click", function() {
    displayLeaderboard("Temps de Réaction", reactionHighScores); 
});
document.getElementById("draw-circle-leaderboard-btn").addEventListener("click", function() {
    displayLeaderboard("Dessin de Cercle", drawCircleHighScores); 
});
document.getElementById("spacebar-leaderboard-btn").addEventListener("click", function() {
    displayLeaderboard("Spacebar Counter", spacebarHighScores); 
});
document.getElementById("memory-leaderboard-btn").addEventListener("click", function() {
    displayLeaderboard("Memory Loop", memoryLoopHighScores); 
});
document.getElementById("back-to-menu-from-leaderboard").addEventListener("click", function() {
    document.getElementById("leaderboard-container").style.display = "none"; 
    document.getElementById("menu-container").style.display = "block"; 
});




//fctn leaderboard !!!
function displayLeaderboard(title, scores) {
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("leaderboard-container").style.display = "block"; 
    document.getElementById("leaderboard-title").innerText = title; 
    const header = document.getElementById("leaderboard-header");
    const body = document.getElementById("leaderboard-body"); 


    header.innerHTML = '';//RESET
    body.innerHTML = '';


//DEBUT DE FORM POUR LES LEADERBOARD
    if (title === "Vitesse de Frappe") {
        header.innerHTML = '<tr><th>Pseudo</th><th>WPM</th><th>Précision (%)</th><th>Temps (s)</th></tr>'; 
    } else if (title === "Click par Seconde (CPS)") {
        header.innerHTML = '<tr><th>Pseudo</th><th>CPS</th><th>Temps</th></tr>'; 
    } else if (title === "Temps de Réaction") {
        header.innerHTML = '<tr><th>Pseudo</th><th>Temps de Réaction (ms)</th></tr>';
    } else if (title === "Dessin de Cercle") {
        header.innerHTML = '<tr><th>Pseudo</th><th>Score</th></tr>'; 
    } else if (title === "Spacebar Counter") {
        header.innerHTML = '<tr><th>Pseudo</th><th>Score</th></tr>'; 
    } else if (title === "Memory Loop") {
        header.innerHTML = '<tr><th>Pseudo</th><th>Niveau</th><th>Date</th></tr>';
    }


    // add les scores
    scores.forEach(score => {
        const row = document.createElement("tr"); 
        for (const key in score) { 
            const cell = document.createElement("td");
            cell.innerText = score[key]; 
            row.appendChild(cell); 
        }
        body.appendChild(row);
    });
}



// kr leaderboard pour tous masquer les dom  tout carré 
document.addEventListener('DOMContentLoaded', function() {
    const montrerLeaderboardLinksBtn = document.getElementById('montrer-leaderboard-links-btn'); 
    const pasmontrerLeaderboardLinksBtn = document.getElementById('pasmontrer-leaderboard-links-btn'); 
    const leaderboardLinks = document.getElementById('leaderboard-links');

    leaderboardLinks.style.display = 'none'; 
    pasmontrerLeaderboardLinksBtn.style.display = 'none'; 

    montrerLeaderboardLinksBtn.addEventListener('click', function() {
        leaderboardLinks.style.display = 'block';
        montrerLeaderboardLinksBtn.style.display = 'none'; 
        pasmontrerLeaderboardLinksBtn.style.display = 'inline-block'; 
    });

    pasmontrerLeaderboardLinksBtn.addEventListener('click', function() {
        leaderboardLinks.style.display = 'none'; 
        pasmontrerLeaderboardLinksBtn.style.display = 'none'; 
        montrerLeaderboardLinksBtn.style.display = 'inline-block'; 
    });
});










//ANIME JS MENU PRINCIPAL
anime({
    targets: '#menu-container', 
    translateY: [-100, 0], 
    opacity: [0, 1], 
    duration: 1500, 
    easing: 'easeOutBounce'
});

anime({
    targets: '#jeux ul li', 
    opacity: [0, 1], 
    translateX: [-30, 0], 
    delay: anime.stagger(200), 
    easing: 'easeOutExpo' 
});


anime({
    targets: 'h1', 
    translateY: [-50, 0], 
    opacity: [0, 1],
    duration: 1500, 
    elasticity: 600, 
    easing: 'easeOutBounce' 
});

anime({
    targets: '.fleche', 
    rotate: [-10, 10], 
    duration: 800, 
    direction: 'alternate', 
    easing: 'easeInOutSine', 
    loop: true 
});

anime({
    targets: '#start-btn', 
    opacity: [0.7, 1], 
    duration: 500, 
    easing: 'linear', 
    direction: 'alternate', 
    loop: true 
});
anime({
    targets: 'table', 
    translateX: [-200, 0], 
    opacity: [0, 1],
    duration: 1000, 
    easing: 'easeOutExpo' 
});
anime({
    targets: '.back-to-menu', 
    translateY: [50, 0], 
    opacity: [0, 1],
    duration: 1000, 
    delay: anime.stagger(200),
    easing: 'easeOutExpo' 
});
let waveAnimation = anime({
    targets: '.menu li',
    translateY: [
        { value: -10, duration: 500 },
        { value: 10, duration: 500 }, 
        { value: 0, duration: 500 } 
    ],
    easing: 'easeInOutSine', 
    loop: true, 
    delay: anime.stagger(100, { start: 0 }), 
    autoplay: true 
});

document.querySelectorAll('.menu li a').forEach(function(link) {
    link.addEventListener('mouseenter', function() {
        waveAnimation.pause();  
        anime({
            targets: this.parentElement, 
            translateY: 0, 
            duration: 300, 
            easing: 'easeOutSine' 
        });
    });

    link.addEventListener('mouseleave', function() {
        waveAnimation.play();
    });
});
