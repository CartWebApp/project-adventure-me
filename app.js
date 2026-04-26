const startButton = document.getElementById('startButton');
const titleScreen = document.getElementById('titleScreen');
const dialogueScreen = document.getElementById('dialogueScreen');
const combatScreen = document.getElementById('combatScreen');
const endingScreen = document.getElementById('endingScreen');
const screens = [titleScreen, dialogueScreen, combatScreen, endingScreen];
let storyObject = {
    "intro": {
        "text": ["Testing tesing, I am Soren", "Hi, I'm Alan", "This is a test of the dialogue system.", "I am the narrator", "", "That was a CG"],
        "leftSprite": ["SorenGB.png", null, null, null, null, null],
        "rightSprite": [null, "AlanGB.png", null, null, null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "sorenMirrorCG.png", "sorenMirrorCG.png"],
        "CGmode": ["off", "off", "off", "off", "on", "off"]
    }
}
let currentPage = "title";

function setPage() {
    for (let screen of screens) {
        if (screen.classList.contains('active')) {
            screen.classList.remove('active');
        }
    }
    if (currentPage === "title") {
        titleScreen.classList.add('active');
    } else if (currentPage === "dialogue") {
        dialogueScreen.classList.add('active');
    } else if (currentPage === "combat") {
        combatScreen.classList.add('active');
    } else if (currentPage === "ending") {
        endingScreen.classList.add('active');
    }
}

startButton.addEventListener('click', () => {
    currentPage = "dialogue";
    setPage();
});