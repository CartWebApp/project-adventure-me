const startButton = document.getElementById('startButton');
const titleScreen = document.getElementById('titleScreen');
const dialogueScreen = document.getElementById('dialogueScreen');
const choiceOverlay = document.getElementById('choiceOverlay');
const combatScreen = document.getElementById('combatScreen');
const endingScreen = document.getElementById('endingScreen');
const leftSprite = document.querySelector('#playerSprite');
const rightSprite = document.querySelector('#otherSprite');
const dialogueText = document.querySelector('#dialogueText');
const dialogueAndSprites = document.querySelector('#dialogueAndSprites');
const speakerName = document.querySelector('#speakerName');
const speakerTag = document.querySelector('#speakerTag');
const choice1 = document.querySelector('#choice1');
const choice2 = document.querySelector('#choice2');
const choice3 = document.querySelector('#choice3');
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
        "text": ["You chose 1A"],
        "leftSprite": ["SorenGB.png"],
        "rightSprite": [null],
        "background": ["GrillBrosBG.png"],
        "CGmode": ["off"],
        "speaker":  ["Soren"],
        "tagPosition": ["left"]
    },
    "1B": {
        "text": ["You chose 1B"],
        "leftSprite": [null],
        "rightSprite": ["AlanGB.png"],
        "background": ["GrillBrosBG.png"],
        "CGmode": ["off"],
        "speaker":  ["Alan"],
        "tagPosition": ["right"]
    },
    "1C": {
        "text": ["You chose 1C"],
        "leftSprite": [null],
        "rightSprite": [null],
        "background": ["GrillBrosBG.png"],
        "CGmode": ["off"],
        "speaker":  ["Narrator"],
        "tagPosition": [null]
    },
    "2A": {
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
    "intro": {
        "text": ["Run", "Hide", "Fight"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1A": {
        "text": ["Run", "Hide", "Fight"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1B": {
        "text": ["Run", "Hide", "Fight"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1C": {
        "text": ["Run", "Hide", "Fight"],
        "nextPath": ["1A", "1B", "1C"]
    }
}
let currentPage = "title";
let storyStage = "intro";
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
    if (storyObject[storyStage].text[dialogueTracker + 1]) {
        choiceOverlay.style = "display: none";
        dialogueTracker++;
        dialogueText.innerHTML = "";
        typeWriter(storyObject[storyStage].text[dialogueTracker], 50);
        if (storyObject[storyStage].leftSprite[dialogueTracker]) {
            leftSprite.style = "visibility: visible;";
            leftSprite.src = `assets/${storyObject[storyStage].leftSprite[dialogueTracker]}`;
        } else if (leftSprite.style = "visibility: visible;") {
            leftSprite.style = "visibility: hidden;";
        }
        if (storyObject[storyStage].rightSprite[dialogueTracker]) {
            rightSprite.style = "visibility: visible;";
            rightSprite.src = `assets/${storyObject[storyStage].rightSprite[dialogueTracker]}`;
        } else if (rightSprite.style = "visibility: visible;") {
            rightSprite.style = "visibility: hidden;";
        }
        if (storyObject[storyStage].CGmode[dialogueTracker] === "on") {
            dialogueAndSprites.style = "visibility: hidden;";
            backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.0);";
        } else if (dialogueAndSprites.style = "visibility: hidden;") {
            dialogueAndSprites.style = "visibility: visible;";
            backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.4);";
        }
        if (storyObject[storyStage].speaker[dialogueTracker] === "Narrator") {
            speakerTag.style = "visibility: hidden;";
        } else {
            speakerTag.style = "visibility: visible;";
            speakerName.innerHTML = storyObject[storyStage].speaker[dialogueTracker];
        }
        if (storyObject[storyStage].tagPosition[dialogueTracker] === "left") {
            speakerTag.style = "left: 0;";
        } else if (storyObject[storyStage].tagPosition[dialogueTracker] === "right") {
            speakerTag.style = "right: 0;";
        }
        dialogueScreen.style = `background-image: url("assets/${storyObject[storyStage].background[dialogueTracker]}");`;
    } else {
        setUpChoices();
        choiceOverlay.style = "display: flex";
    }
}

//taken from https://www.w3schools.com/howto/howto_js_typewriter.asp and mofified to fit my needs
function typeWriter(txt, speed) {
    if (typeWrite < txt.length) {
        dialogueText.innerHTML += txt.charAt(typeWrite);
        typeWrite++;
        skipTimeout = setTimeout(() => typeWriter(txt, speed), speed);
    }
    //added to check if player skips dialogue, and instantly display text if so
    if (dialogueSkip === true) {
        //stop recursion by clearing the previous setTimeout
        clearTimeout(skipTimeout);
        dialogueText.innerHTML = txt;
        typeWrite = txt.length;
        dialogueSkip = false;
    }
}

function setUpChoices() {
    leftSprite.style = "visibility: hidden;";
    rightSprite.style = "visibility: hidden;";
    dialogueAndSprites.style = "visibility: hidden;";
    choice1.innerHTML = choices[storyStage].text[0];
    choice2.innerHTML = choices[storyStage].text[1];
    choice3.innerHTML = choices[storyStage].text[2];
}

startButton.addEventListener('click', () => {
    currentPage = "dialogue";
    setPage();
    advanceStory();
});

choice1.addEventListener('click', () => {
    console.log("clicked");
    dialogueTracker = -1;
    storyStage = choices[storyStage].nextPath[0];
    advanceStory();
});

choice2.addEventListener('click', () => {
    dialogueTracker = -1;
    storyStage = choices[storyStage].nextPath[1];
    advanceStory();
});

choice3.addEventListener('click', () => {
    dialogueTracker = -1;
    storyStage = choices[storyStage].nextPath[2];
    advanceStory();
});

dialogueScreen.addEventListener('click', () => {
    if (typeWrite < storyObject[storyStage].text[dialogueTracker].length) {
        dialogueSkip = true;
    } else {
        typeWrite = 0;
        clearTimeout(skipTimeout);
        advanceStory();
    }
});

