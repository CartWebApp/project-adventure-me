const startButton = document.getElementById('startButton');
const continueButton = document.getElementById('continueButton');
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
const backgroundOverlay = document.querySelector('#backgroundOverlay');
const optionsButtons = document.querySelectorAll('.optionsButton');
const optionsMenus = document.querySelectorAll('.optionsMenu');
const homeButtons = document.querySelectorAll('.homeButton');
const logsButtons = document.querySelectorAll('.logsButton');
const chatLog = document.querySelector('.chatLog');
const statusButtons = document.querySelectorAll('.statusButton');
const choice1 = document.querySelector('#choice1');
const choice2 = document.querySelector('#choice2');
const choice3 = document.querySelector('#choice3');
const choiceButtons = [choice1, choice2, choice3];
let choiceLog = [];
const statusBars = document.querySelector('#statusBars');
const statusBarsCtx = statusBars.getContext('2d');
const screens = [titleScreen, dialogueScreen, combatScreen, endingScreen];
let storyObject = {
    "intro": {
        "text": ["Testing tesing, I am Soren", "Hi, I'm Alan qrgwegwggeegwqwejefoipq3jfoipq3jfiopjfop4i3fjpo34f3iqfjq4fo q3ifijo3pfj34 jfo4jfop34i fjo4p fopij 4po fipo jf4poif j4fpoi243fjo 4jpo234j poi34jf po32i4 jfp32io4j f3o24i jfpoi342j f3o42 fi", "This is a test of the dialogue system.", "I am the narrator", ".", "That was a CG"],
        "leftSprite": ["SorenGB.png", null, null, null, null, null],
        "rightSprite": [null, "AlanGB.png", null, null, null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "sorenMirrorCG.png", "sorenMirrorCG.png"],
        "CGmode": ["off", "off", "off", "off", "on", "off"],
        "speaker":  ["Soren", "Alan", "Narrator", "Narrator", "Narrator", "Narrator"],
        "tagPosition": ["left", "right", null, null, null, null],
        "combat": [null, null, ]
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
let chatLogArray = [];
let continueChatLogArray = [];
let currentPage = "title";
let storyStage = "intro";
let dialogueTracker = -1;
let typeWrite = 0;
let dialogueSkip = false;
let skipTimeout;
let choosingChoice = false;
let optionsOpen = false;
let suspicion = 0;
let interrogation = 0;
let kills = 0;
let interrogationMode = false;
let showStatusBars = true;

function setStartPage() {
    if (storyStage === "intro" && dialogueTracker === -1) {
        continueButton.style = "display: none";
    } else {
        continueButton.style = "display: block";
    }
}

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
        clearTimeout(skipTimeout);
        choiceOverlay.style = "display: none";
        dialogueTracker++;
        dialogueText.innerHTML = "";
        typeWrite = 0;
        typeWriter(storyObject[storyStage].text[dialogueTracker], 50);
        if (!(storyObject[storyStage].text[dialogueTracker] === '.')) {
            let temp = `${storyObject[storyStage].speaker[dialogueTracker]}: ${storyObject[storyStage].text[dialogueTracker]}`;
            chatLogArray.push(temp);
        }
        if (storyObject[storyStage].leftSprite[dialogueTracker]) {
            leftSprite.style = "visibility: visible;";
            leftSprite.src = `assets/${storyObject[storyStage].leftSprite[dialogueTracker]}`;
        } else {
            leftSprite.style = "visibility: hidden;";
        }
        if (storyObject[storyStage].rightSprite[dialogueTracker]) {
            rightSprite.style = "visibility: visible;";
            rightSprite.src = `assets/${storyObject[storyStage].rightSprite[dialogueTracker]}`;
        } else {
            rightSprite.style = "visibility: hidden;";
        }
        if (storyObject[storyStage].CGmode[dialogueTracker] === "on") {
            dialogueAndSprites.style = "visibility: hidden;";
            backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.0);";
        } else if (storyObject[storyStage].CGmode[dialogueTracker] === "off") {
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
        updateStatusCanvas();
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
    choosingChoice = true;
    leftSprite.style = "visibility: hidden;";
    rightSprite.style = "visibility: hidden;";
    dialogueAndSprites.style = "visibility: hidden;";
    choice1.innerHTML = choices[storyStage].text[0];
    choice2.innerHTML = choices[storyStage].text[1];
    choice3.innerHTML = choices[storyStage].text[2];
}

function choicePressed(choiceNumber) {
    continueChatLogArray = [...chatLogArray];
    choosingChoice = false;
    let chosenChoice = choiceButtons[choiceNumber].innerHTML;
    choiceLog.push(chosenChoice);
    setTimeout(() => choosingChoice = false, 50);
    dialogueSkip = false;
    console.log("clicked");
    dialogueTracker = -1;
    storyStage = choices[storyStage].nextPath[choiceNumber];
    advanceStory();
}

function setUpOptionsButtons() {
    for (i = 0; i < optionsButtons.length; i++) {
        let index = i;
        optionsButtons[i].addEventListener('click', () => {
            optionsPressed(index);
        });
    }
    for (button of homeButtons) {
        button.addEventListener('click', () => {
            setUpOptionsMenus();
            setTimeout(() => resetDialogueState(), 50);
            currentPage = 'title';
            setStartPage();
            setPage();
        });
    }
    for (button of statusButtons) {
        button.addEventListener('click', () => {
            if (showStatusBars === true) {
                showStatusBars = false;
                statusBars.style = "visibility: hidden;";
            } else if (showStatusBars === false) {
                showStatusBars = true;
                statusBars.style = "visibility: visible;";
            }
        });
    }
    for (button of logsButtons) {
        button.addEventListener('click', () => {
            updateChatLog();
        });
    }
}

function resetDialogueState() {
    choosingChoice = false;
    optionsOpen = false;
}

function updateChatLog() {
    chatLog.style = "display: flex";
    let chatLogHTML = "";
    for (line of chatLogArray) {
        chatLogHTML += `<p>${line}</p>`;
    }
    chatLog.innerHTML = chatLogHTML;
}

function setUpOptionsMenus() {
    if (backgroundOverlay.classList.contains('z-index1')) {
        backgroundOverlay.classList.remove('z-index1');
    }
    for (menu of optionsMenus) {
        menu.style = "display: none";
        document.body.addEventListener('click', (event) => {
            if (!event.target.closest('.optionsMenu') && !event.target.closest('.chatLog') && !event.target.closest('.optionsButton')) {
                console.log(event.target);
                console.log(!event.target.closest('.optionsMenu'));
                console.log(!event.target.closest('.chatLog'));
                console.log(!event.target.closest('.optionsButton'));
                hideOptions();
            }
        });

    }
}

function optionsPressed(index) {
    optionsOpen = true;
    backgroundOverlay.classList.add("z-index1");
    backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.6);";
    optionsMenus[index].style = "display: flex;";
}

function hideOptions() {
    optionsOpen = false;
    if (backgroundOverlay.classList.contains('z-index1')) {
        backgroundOverlay.classList.remove('z-index1');
    }
    if (storyObject[storyStage].CGmode[dialogueTracker] === "on") {
        backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.0);";
    } else if (storyObject[storyStage].CGmode[dialogueTracker] === "off") {
        backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.4);";
    }
    chatLog.style = "display: none";
    for (menu of optionsMenus) {
        menu.style = "display: none";
    }
}

function updateStatusCanvas() {
    statusBarsCtx.fillStyle = "#BD9745";
    statusBarsCtx.fillRect(20, 20, 280, 25);
    statusBarsCtx.fillStyle = "#25201C";
    statusBarsCtx.fillRect(23, 23, 274, 19);
    statusBarsCtx.fillStyle = "#BDBDBD";
    statusBarsCtx.fillRect(26, 26, 268, 13);
    statusBarsCtx.fillStyle = "#755498";
    statusBarsCtx.fillRect(26, 26, (suspicion * 2.68), 13);
    if (interrogationMode === true) {
        statusBarsCtx.fillStyle = "#BD9745";
        statusBarsCtx.fillRect(20, 55, 280, 25);
        statusBarsCtx.fillStyle = "#25201C";
        statusBarsCtx.fillRect(23, 58, 274, 19);
        statusBarsCtx.fillStyle = "#BDBDBD";
        statusBarsCtx.fillRect(26, 61, 268, 13);
        statusBarsCtx.fillStyle = "#0BCCC2";
        statusBarsCtx.fillRect(26, 61, (interrogation * 2.68), 13);
    }
}

function resetStory() {
    kills = 0;
    suspicion = 0;
    interrogation = 0;
    chatLogArray = [];
    continueChatLogArray = [];
    choiceLog = [];
    dialogueTracker = -1;
    storyStage = 'intro';
}

function Enemy(name, health, attack, sprite, canSpare, sparesNeeded, canSleep, canDistract) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.sprite = sprite;
    this.canSpare = canSpare;
    this.sparesNeeded = sparesNeeded;
    this.canSleep = canSleep;
    this.canDistract = canDistract;
}

startButton.addEventListener('click', () => {
    resetStory();
    currentPage = "dialogue";
    setPage();
    advanceStory();
});

continueButton.addEventListener('click', () => {
    chatLogArray = [...continueChatLogArray];
    currentPage = "dialogue";
    dialogueTracker = -1;
    setPage();
    advanceStory();
});

choice1.addEventListener('click', () => {
    choicePressed(0);
});

choice2.addEventListener('click', () => {
    choicePressed(1);
});

choice3.addEventListener('click', () => {
    choicePressed(2);
});

dialogueScreen.addEventListener('click', () => {
    console.log('click')
    if (optionsOpen === false) {
        if (choosingChoice === false) {
            if (typeWrite < storyObject[storyStage].text[dialogueTracker].length) {
                dialogueSkip = true;
            } else {
                advanceStory();
            }
        }
    }
});

setUpOptionsButtons();
setUpOptionsMenus();
updateStatusCanvas();
setStartPage();