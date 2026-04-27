const startButton = document.getElementById('startButton');
const titleScreen = document.getElementById('titleScreen');
const dialogueScreen = document.getElementById('dialogueScreen');
const combatScreen = document.getElementById('combatScreen');
const endingScreen = document.getElementById('endingScreen');
const leftSprite = document.querySelector('#playerSprite');
const rightSprite = document.querySelector('#otherSprite');
const dialogueText = document.querySelector('#dialogueText');
const dialogueAndSprites = document.querySelector('#dialogueAndSprites');
const speakerName = document.querySelector('#speakerName');
const speakerTag = document.querySelector('#speakerTag');
const screens = [titleScreen, dialogueScreen, combatScreen, endingScreen];
let storyObject = {
    "intro": {
        "text": ["Testing tesing, I am Soren", "Hi, I'm Alan qrgwegwggeegw", "This is a test of the dialogue system.", "I am the narrator", ".", "That was a CG"],
        "leftSprite": ["SorenGB.png", null, null, null, null, null],
        "rightSprite": [null, "AlanGB.png", null, null, null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "sorenMirrorCG.png", "sorenMirrorCG.png"],
        "CGmode": ["off", "off", "off", "off", "on", "off"],
        "speaker":  ["Soren", "Alan", "Narrator", "Narrator", "Narrator", "Narrator"],
        "tagPosition": ["left", "right", null, null, null, null]
    },
    "1A": {
        "text": [],
        "leftSprite": [],
        "rightSprite": [],
        "background": [],
        "CGmode": [],
        "speaker":  [],
        "tagPosition": []
    },
    "1B": {
        "text": [],
        "leftSprite": [],
        "rightSprite": [],
        "background": [],
        "CGmode": [],
        "speaker":  [],
        "tagPosition": []
    }
}
let choices = {
    "1": {
        "text": []
        "nextPath": []
    }
}
let currentPage = "title";
let storyStage = storyObject.intro;
let dialogueTracker = -1;
let typeWrite = 0;
let dialogueSkip = false;
let skipTimeout;

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

function advanceStory() {
    if (storyStage.text[dialogueTracker + 1]) {
        dialogueTracker++;
        dialogueText.innerHTML = "";
        typeWriter(storyStage.text[dialogueTracker], 50);
        if (storyStage.leftSprite[dialogueTracker]) {
            leftSprite.style = "visibility: visible;";
            leftSprite.src = `assets/${storyStage.leftSprite[dialogueTracker]}`;
        } else if (leftSprite.style = "visibility: visible;") {
            leftSprite.style = "visibility: hidden;";
        }
        if (storyStage.rightSprite[dialogueTracker]) {
            rightSprite.style = "visibility: visible;";
            rightSprite.src = `assets/${storyStage.rightSprite[dialogueTracker]}`;
        } else if (rightSprite.style = "visibility: visible;") {
            rightSprite.style = "visibility: hidden;";
        }
        if (storyStage.CGmode[dialogueTracker] === "on") {
            dialogueAndSprites.style = "visibility: hidden;";
        } else if (dialogueAndSprites.style = "visibility: hidden;") {
            dialogueAndSprites.style = "visibility: visible;";
        }
        if (storyStage.speaker[dialogueTracker] === "Narrator") {
            speakerTag.style = "visibility: hidden;";
        } else {
            speakerTag.style = "visibility: visible;";
            speakerName.innerHTML = storyStage.speaker[dialogueTracker];
        }
        if (storyStage.tagPosition[dialogueTracker] === "left") {
            speakerTag.style = "left: 0;";
        } else if (storyStage.tagPosition[dialogueTracker] === "right") {
            speakerTag.style = "right: 0;";
        }
        dialogueScreen.style = `background-image: url("assets/${storyStage.background[dialogueTracker]}");`;
    } else {

    }
}

//taken from https://www.w3schools.com/howto/howto_js_typewriter.asp and mofified to fit my needs
function typeWriter(txt, speed) {
    if (typeWrite < txt.length) {
        dialogueText.innerHTML += txt.charAt(typeWrite);
        typeWrite++;
        skipTimeout = setTimeout(() => typeWriter(txt, speed), speed);
    }
    if (dialogueSkip === true) {
        clearTimeout(skipTimeout);
        dialogueText.innerHTML = txt;
        typeWrite = txt.length;
        dialogueSkip = false;
    }
}

function setUpChoices() {

}

startButton.addEventListener('click', () => {
    currentPage = "dialogue";
    setPage();
    advanceStory();
});

dialogueScreen.addEventListener('click', () => {
    if (typeWrite < storyStage.text[dialogueTracker].length) {
        dialogueSkip = true;
    } else {
        typeWrite = 0;
        clearTimeout(skipTimeout);
        advanceStory();
    }
});

