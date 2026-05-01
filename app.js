const startButton = document.getElementById('startButton');
const continueButton = document.getElementById('continueButton');
const titleScreen = document.getElementById('titleScreen');
const dialogueScreen = document.getElementById('dialogueScreen');
const choiceOverlay = document.getElementById('choiceOverlay');
const combatScreen = document.getElementById('combatScreen');
const endingScreen = document.getElementById('endingScreen');
const screens = [titleScreen, dialogueScreen, combatScreen, endingScreen];
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
const statusBars = document.querySelector('#statusBars');
const statusBarsCtx = statusBars.getContext('2d');
const playerCombatSprite = document.querySelector('#playerCombatSprite');
const enemyCombatSprite = document.querySelector('#enemyCombatSprite');
const playerHPBar = document.querySelector('#playerHPBarCanvas');
const playerHPBarCtx = playerHPBar.getContext('2d');
const enemyHPBar = document.querySelector('#enemyHPBarCanvas');
const enemyHPBarCtx = enemyHPBar.getContext('2d');
const combatLog = document.querySelector('#combatLogBox');
const itemsBox = document.querySelector('#itemsBox')
const actBox = document.querySelector('#actBox');
const attackButton = document.querySelector('#attackButton');
const itemButton = document.querySelector('#itemButton');
const actButton = document.querySelector('#actButton');
const checkSelfButton = document.querySelector('#checkSelfButton');
const checkEnemyButton = document.querySelector('#checkEnemyButton');
const spareButton = document.querySelector('#spareButton')
const endingTitle = document.querySelector('#endingTitle');
const endingBody = document.querySelector('#endingBody');
const choiceLogBox = document.querySelector('#choiceLog');
const choiceLogAndOverlay = document.querySelector('#choiceLogAndOverlay')
const viewChoicesButton = document.querySelector('#viewChoicesButton')

//misc
let turnInProgress = false;
let chatLogArray = [];
let choiceLog = [];
let currentPage = "title";
let storyStage = "intro";
let dialogueTracker = -1;
let typeWrite = 0;
let dialogueSkip = false;
let skipTimeout;
let choosingChoice = false;
let optionsOpen = false;
let showStatusBars = true;
let currentEnemy;
let currentEnemyHealthMax;
//status vars
let suspicion = 0;
let interrogation = 0;
let kills = 0;
let interrogationMode = false;
//combat vars
let combatEnded = false;
let logBoxState = "combat log"
let enemyDistracted = false;
let enemySlept = false;
let enemySpared = false;
let playerItems = ["Premium Blood Vial", "Landlord's Number", "Sleeping Potion"];
let playerHealth = 100;
let playerHealthMax = 100;
let playerAttack = 10;
let playerDefense = 10;
//continueSave vars
let continueChatLogArray = [];
let continueSuspicion = 0;
let continueInterrogation = 0;
let continueKills = 0;
let continueInterrogationMode = false;
let continuePlayerHealth = 100;
let continuePlayerHealthMax = 100;
let continuePlayerAttack = 10;
let continuePlayerDefense = 10;
let continueplayerItems = [];

let storyObject = {
    "deathByCombat": {
        "text": ["Hello there.", "It is me, the Narrator.", "Seems like you died during your journey, eh?", `That battle must've been a tough one...`, `Better luck next time.`, `.`],
        "leftSprite": [null, null, null, null, null, null],
        "rightSprite": [null, null, null, null, null, null],
        "background": ["darkBG.png", "darkBG.png", "darkBG.png", "darkBG.png", "darkBG.png", "darkBG.png"],
        "CGmode": ["off", "off", "off", "off", "off", "off"],
        "speaker": ["Narrator", "Narrator", "Narrator", "Narrator", "Narrator", "Narrator"],
        "tagPosition": [null, null, null, null, null, null],
        "combat": [null, null, null, null, null, null],
        "ending": [null, null, null, null, null, "Death in Combat"]
    },
    "intro": {
        "text": ["In this story, you play as a young vampire named Soren.", "Soren lives in a modern-world society, similar to your own, except with the existence of vampires and the organization that pursues vampires to protect the peace, the Daylight Savings Corps.", "You work a part-time job to make a salary and blend into human society.", "It is currently 5:49 PM. You’re finishing up the last order of the day, before cleaning up shop and clocking out for your part-time shift at Grill Bros.", "Today, you forgot your “lunch” at home, so you're feeling quite “hungry.”", "Sizzle sizzle…", "What a nice smell… too bad it wouldn’t really help at all, even if I ate it.", "Your stomach grumbles", "Suddenly, one of your coworkers comes up behind you and pats you on the shoulder.", "Ayy, Soren! From the looks of it, you look like you need a break.", "With that being said, do you wanna go grab a bite after our shift?"],
        "leftSprite": [null, null, null, null, null, null, "SorenGB.png", null, null, null, null],
        "rightSprite": [null, null, null, null, null, null, null, null, null, "AlanGB.png", "AlanGB.png"],
        "background": ["darkBG.png", "darkBG.png", "darkBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png"],
        "CGmode": ["off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off"],
        "speaker": ["Narrator", "Narrator", "Narrator", "Narrator", "Narrator", "Grill", "Soren", "Narrator", "Narrator", "Alan", "Alan"],
        "tagPosition": [null, null, null, null, null, "left", "left", null, null, "right", "right"],
        "combat": [null, null, null, null, null, null, null, null, null, null, null],
        "ending": [null, null, null, null, null, null, null, null, null, null, null]
    },
    "1A": {
        "text": ["Yeah, sure. Where are we heading?", ".", "How was it?"],
        "leftSprite": [null, null],
        "rightSprite": [null, null],
        "background": ["GrillBrosBG.png", "streetNightBG.png", "GrillBrosBG.png"],
        "CGmode": ["off", "off", "off", "off",],
        "speaker": ["Narrator", "Narrator", "Narrator"],
        "tagPosition": [null, null, null],
        "combat": [null, ["sorenCombatNight.png", ["Off-Duty Hunter", "Tired Business Woman reveals herself as an Off-Duty Hunter!", 80, 15, 5, [20, 5, 5], "tiredBusinessWomanNight.png", true, 3, true, true]], null],
        "ending": [null, null, null]
    },
    "1B": {
        "text": ["Now lets do an ending test", "You accidentally posion yourself and die", "."],
        "leftSprite": [null, null, null],
        "rightSprite": [null, null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png"],
        "CGmode": ["off", "off", "off"],
        "speaker": ["Narrator", "Narrator", "Narrator"],
        "tagPosition": [null, null, null],
        "combat": [null, null, null],
        "ending": [null, null, "IV Poisoning"]
    },
    "1C": {
        "text": ["You chose 1C"],
        "leftSprite": ["SorenGB.png"],
        "rightSprite": [null, null, null],
        "background": ["GrillBrosBG.png"],
        "CGmode": ["off"],
        "speaker": ["Narrator"],
        "tagPosition": [null],
        "combat": [null],
        "ending": [null]
    },
    "2A": {
        "text": [],
        "leftSprite": [],
        "rightSprite": [],
        "background": [],
        "CGmode": [],
        "speaker": [],
        "tagPosition": []
    }
}
let choices = {
    "intro": {
        "text": ["Sure", "Absolutely not", "I'm busy"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1A": {
        "text": ["Combat Test", "Ending Test", "Nothing"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1B": {
        "text": ["Combat Test", "Ending Test", "Nothing"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1C": {
        "text": ["Combat Test", "Ending Test", "Nothing"],
        "nextPath": ["1A", "1B", "1C"]
    }
}

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

function specialConditionChecker() {
    //check for special condition to branch to endings here, otherwise just set up choices
    setUpChoices();
    choiceOverlay.style = "display: flex";
}

function advanceStory() {
    if (storyObject[storyStage].text[dialogueTracker + 1]) {
        dialogueTracker++;
        clearTimeout(skipTimeout);
        choiceOverlay.style = "display: none";
        if (storyObject[storyStage].combat[dialogueTracker]) {
            setUpCombat(storyObject[storyStage].combat[dialogueTracker]);
            currentPage = "combat";
            setPage();
        } else if (storyObject[storyStage].ending[dialogueTracker]) {
            setUpEnding(storyObject[storyStage].ending[dialogueTracker]);
            currentPage = "ending";
            setPage();
        } else {
            updateDialogue();
        }
    } else {
        specialConditionChecker();
    }
}

function updateDialogue() {
    dialogueText.innerHTML = "";
    typeWrite = 0;
    typeWriter(storyObject[storyStage].text[dialogueTracker], 25);
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
    saveStateForContinue();
    let chosenChoice = choiceButtons[choiceNumber].innerHTML;
    choiceLog.push(chosenChoice);
    setTimeout(() => choosingChoice = false, 50);
    dialogueSkip = false;
    console.log("clicked");
    dialogueTracker = -1;
    storyStage = choices[storyStage].nextPath[choiceNumber];
    advanceStory();
}

function saveStateForContinue() {
    continueChatLogArray = [...chatLogArray];
    continueSuspicion = suspicion;
    continueInterrogation = interrogation
    continueKills = kills
    continueInterrogationMode = interrogationMode;
    continuePlayerHealth = playerHealth;
    continuePlayerHealthMax = playerHealthMax;
    continuePlayerAttack = playerAttack;
    continuePlayerDefense = playerDefense;
    continuePlayerItems = playerItems;
}

function loadStateForContinue() {
    chatLogArray = [...continueChatLogArray];
    suspicion = continueSuspicion;
    interrogation = continueInterrogation;
    kills = continueKills;
    interrogationMode = continueInterrogationMode;
    playerHealth = continuePlayerHealth;
    playerHealthMax = continuePlayerHealthMax;
    playerAttack = continuePlayerAttack;
    playerDefense = continuePlayerDefense;
    playerItems = continuePlayerItems;
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
    chatLog.scrollTop = chatLog.scrollHeight;
}

function setUpOptionsMenus() {
    if (backgroundOverlay.classList.contains('z-index1')) {
        backgroundOverlay.classList.remove('z-index1');
    }
    for (menu of optionsMenus) {
        menu.style = "display: none";
        document.body.addEventListener('click', (event) => {
            if (!event.target.closest('.optionsMenu') && !event.target.closest('.chatLog') && !event.target.closest('.optionsButton')) {
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

function updateHealthCanvases() {
    playerHPBarCtx.fillStyle = "#BDBDBD";
    playerHPBarCtx.fillRect(0, 0, 300, 150);
    playerHPBarCtx.fillStyle = "#00FF26";
    playerHPBarCtx.fillRect(0, 0, (playerHealth / playerHealthMax) * 300, 150);
    enemyHPBarCtx.fillStyle = "#BDBDBD";
    enemyHPBarCtx.fillRect(0, 0, 300, 150);
    enemyHPBarCtx.fillStyle = "#00FF26";
    enemyHPBarCtx.fillRect(0, 0, (currentEnemy.health / currentEnemyHealthMax) * 300, 150);
}

function resetStory() {
    continueChatLogArray = [];
    continueSuspicion = 0;
    continueInterrogation = 0;
    continueKills = 0;
    continueInterrogationMode = false;
    continuePlayerHealth = 100;
    continuePlayerHealthMax = 0;
    continuePlayerAttack = 10;
    continuePlayerDefense = 10;
    continuePlayerItems = [];
    chatLogArray = [];
    suspicion = 0;
    interrogation = 0;
    kills = 0;
    InterrogationMode = false;
    playerHealth = 100;
    playerAttack = 10;
    playerDefense = 10;
    playerItems = ["Premium Blood Vial", "Landlord's Number", "Sleeping Potion"];
    choiceLog = [];
    dialogueTracker = -1;
    storyStage = 'intro';
}

function Enemy(name, intro, health, attack, defense, givenStats, sprite, canSpare, sparesNeeded, canSleep, canDistract) {
    this.name = name;
    this.intro = intro;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.givenStats = givenStats;
    this.sprite = sprite;
    this.canSpare = canSpare;
    this.sparesNeeded = sparesNeeded;
    this.canSleep = canSleep;
    this.canDistract = canDistract;
}


function setUpCombatButtons() {
    attackButton.addEventListener('click', () => {
        if (turnInProgress === false) {
            turnInProgress = true;
            logBoxState = "combat log";
            updateDisplayedCombatBox();
            setTimeout(() => { attack(); }, 1000);
        }
    });
    itemButton.addEventListener('click', () => {
        if (turnInProgress === false) {
            logBoxState = "items";
            setUpItems();
            updateDisplayedCombatBox();
        }
    });
    actButton.addEventListener('click', () => {
        if (turnInProgress === false) {
            logBoxState = "act";
            updateDisplayedCombatBox();
        }
    });
    checkSelfButton.addEventListener('click', () => {
        logBoxState = "combat log";
        updateDisplayedCombatBox();
        addToCombatLog(`You currently have ${playerHealth}/${playerHealthMax} health, ${playerAttack} attack, ${playerDefense} defense`);
    });
    checkEnemyButton.addEventListener('click', () => {
        logBoxState = "combat log";
        updateDisplayedCombatBox();
        addToCombatLog(`${currentEnemy.name} currently has ${currentEnemy.health}/${currentEnemyHealthMax} health, ${currentEnemy.attack} attack, ${currentEnemy.defense} defense`);
    });
    spareButton.addEventListener('click', () => {
        if (turnInProgress === false) {
            logBoxState = "combat log";
            updateDisplayedCombatBox();
            sparePressed();
        }
    });
}

function sparePressed() {
    let stagedEnemyAttack = setTimeout(() => { enemyAttack(); }, 6000);
    turnInProgress = true;
    addToCombatLog(`You spare ${currentEnemy.name}`);
    if (currentEnemy.canSpare === false) {
        setTimeout(() => {
            addToCombatLog(`${currentEnemy.name} seems just as ferocious as before`);
        }, 3000);
    } else if (currentEnemy.canSpare === true && currentEnemy.sparesNeeded > 0) {
        currentEnemy.sparesNeeded -= 1;
        if (currentEnemy.sparesNeeded <= 0) {
            setTimeout(() => {
                addToCombatLog(`${currentEnemy.name} flees after seeing so signs of aggression`);
                enemySpared = true;
                clearTimeout(stagedEnemyAttack);
                setTimeout(() => {
                    checkCombatStatus();
                }, 2000);
            }, 3000);
        } else {
            setTimeout(() => {
                addToCombatLog(`${currentEnemy.name} seems to calm down slightly`);
            }, 3000);
        }
    }
}

function updateDisplayedCombatBox() {
    if (logBoxState === "combat log") {
        combatLog.style = "z-index: 1";
        itemsBox.style = "z-index: 0";
        actBox.style = "z-index: 0";
    } else if (logBoxState === "items") {
        combatLog.style = "z-index: 0";
        itemsBox.style = "z-index: 1";
        actBox.style = "z-index: 0";
    } else if (logBoxState === "act") {
        combatLog.style = "z-index: 0";
        itemsBox.style = "z-index: 0";
        actBox.style = "z-index: 1";
    }
}

function attack() {
    if (currentEnemy.sparesNeeded) {
        currentEnemy.sparesNeeded += 1;
    }
    let damage = Math.round((randomNumber((0.7 * playerAttack), (1.3 * playerAttack)) * (Math.pow(0.99, currentEnemy.defense))));
    currentEnemy.health -= damage;
    tempAddClass(enemyCombatSprite, 'blinkFadeOutIn', 1200);
    updateHealthCanvases();
    addToCombatLog(`You attack and deal ${damage} damage to ${currentEnemy.name}`);
    setTimeout(() => { checkCombatStatus(); }, 3000);
    if (currentEnemy.health > 0) {
        setTimeout(() => { enemyAttack(); }, 3000);
    }
}

function enemyAttack() {
    if (enemyDistracted === false) {
        let damage = Math.round((randomNumber((0.7 * currentEnemy.attack), (1.3 * currentEnemy.attack)) * (Math.pow(0.99, playerDefense))));
        playerHealth -= damage;
        tempAddClass(playerCombatSprite, 'blinkFadeOutIn', 1200);
        updateHealthCanvases();
        addToCombatLog(`${currentEnemy.name} attacks and deals ${damage} damage to you`);
        setTimeout(() => { checkCombatStatus(); }, 3000);
        if (playerHealth > 0) {
            turnInProgress = false;
        }
    }
    if (enemyDistracted === true) {
        addToCombatLog(`${currentEnemy.name} was distracted and unable to attack!`);
        enemyDistracted = false;
        currentEnemy.canDistract = false;
        turnInProgress = false;
    }
}

function randomNumber(min, max) {
    let number = Math.round(Math.random() * (max - min) + min);
    return number;
}

function tempAddClass(element, classToAdd, time) {
    element.classList.add(classToAdd);
    setTimeout(() => {
        element.classList.remove(classToAdd);
    }, time)
}

function setUpItems() {
    itemsBox.innerHTML = '';
    let itemsBoxHTML = ''
    for (item in playerItems) {
        itemsBoxHTML += `<p itemId="${item}">${playerItems[item]}</p>`
    }
    itemsBox.innerHTML = itemsBoxHTML;
}

function setUpItemUsage() {
    document.body.addEventListener('click', (event) => {
        console.log(event.target);
        console.log(event.target.closest('#itemsBox'));
        if (event.target.closest('#itemsBox')) {
            if (event.target.innerHTML === "Premium Blood Vial") {
                usedPremiumBloodVial(event.target);
            } else if (event.target.innerHTML === "Landlord's Number") {
                usedLandlordNumber();
            } else if (event.target.innerHTML === "Sleeping Potion") {
                usedSleepingPotion(event.target);
            }
        }
    });
}

function usedPremiumBloodVial(item) {
    playerItems.splice(item.getAttribute('itemId'), 1);
    setUpItems();
    playerHealth += 50;
    if (playerHealth > playerHealthMax) {
        playerHealth = playerHealthMax;
    }
    updateHealthCanvases();
    logBoxState = "combat log";
    updateDisplayedCombatBox();
    addToCombatLog(`You use a Premium Blood Vial and heal 50 health. Your health is now ${playerHealth}/${playerHealthMax}`);
}

function usedLandlordNumber() {
    turnInProgress = true;
    logBoxState = "combat log";
    updateDisplayedCombatBox();
    addToCombatLog(`You call the Landlord. He agrees to come by and distract ${currentEnemy.name} for a turn.`);
    setTimeout(() => {
        addToCombatLog(`You hear a loud noise in the distance, similar to a gunshot, followed by cries for help in the Landlord's voice.`);
    }, 3000);
    if (currentEnemy.canDistract === true) {
        setTimeout(() => {
            turnInProgress = false;
            enemyDistracted = true;
            addToCombatLog(`${currentEnemy.name} is alarmed by the commotion! They become distracted and unable to attack for one turn.`);
        }, 6000);
    } else if (currentEnemy.canDistract === false) {
        setTimeout(() => {
            turnInProgress = false;
            addToCombatLog(`${currentEnemy.name} is unphased by the disruption. The enemy's focus seems entirely honed onto you.`);
        }, 6000);
    }
}

function usedSleepingPotion(item) {
    playerItems.splice(item.getAttribute('itemId'), 1);
    setUpItems();
    logBoxState = "combat log";
    updateDisplayedCombatBox();
    addToCombatLog(`You take out a Sleeping Potion and hurl it at ${currentEnemy.name}`);
    if (currentEnemy.canSleep === true) {
        setTimeout(() => {
            enemySlept = true;
            addToCombatLog(`${currentEnemy.name} is splashed with the potion! They tumble around before falling asleep and collapsing onto the floor.`);
        }, 3000);
        setTimeout(() => {
            checkCombatStatus();
        }, 6000);
    } else if (currentEnemy.canSleep === false) {
        setTimeout(() => {
            turnInProgress = false;
            addToCombatLog(`${currentEnemy.name} is drenched with the potion's contents... but it doesn't seem to have any effect.`);
        }, 3000);
    }
}

function setUpCombat(combatInfo) {
    combatEnded = false;
    setUpItems();
    enemySpared = false;
    enemyDistracted = false;
    enemySlept = false;
    logBoxState = "combat log";
    updateDisplayedCombatBox();
    turnInProgress = false;
    if (enemyCombatSprite.classList.contains('fadeOut')) {
        enemyCombatSprite.classList.remove('fadeOut');
    }
    if (playerCombatSprite.classList.contains('fadeOut')) {
        playerCombatSprite.classList.remove('fadeOut');
    }
    combatLog.innerHTML = ''
    combatScreen.style = `background-image: url("assets/${storyObject[storyStage].background[dialogueTracker]}");`;
    playerCombatSprite.src = `assets/${combatInfo[0]}`;
    currentEnemy = new Enemy(...combatInfo[1]);
    currentEnemyHealthMax = currentEnemy.health;
    enemyCombatSprite.src = `assets/${currentEnemy.sprite}`;
    addToCombatLog(currentEnemy.intro);
    updateHealthCanvases();
}

function checkCombatStatus() {
    if (combatEnded === true) {
        return;
    }
    if (currentEnemy.health <= 0) {
        kills += 1;
        combatEnded = true;
        turnInProgress = true;
        enemyCombatSprite.classList.add('fadeOut');
        addToCombatLog(`You have defeated ${currentEnemy.name}`);
        playerHealth += currentEnemy.givenStats[0];
        playerHealthMax += currentEnemy.givenStats[0];
        playerAttack += currentEnemy.givenStats[1];
        playerDefense += currentEnemy.givenStats[2];
        setTimeout(() => { logRewardedStats(); }, 3000);
    } else if (playerHealth <= 0) {
        combatEnded = true;
        turnInProgress = true;
        playerCombatSprite.classList.add('fadeOut');
        addToCombatLog(`You have been defeated by ${currentEnemy.name}`);
        storyStage = "deathByCombat";
        dialogueTracker = -1;
        setTimeout(() => {
            currentPage = "dialogue";
            setPage();
            advanceStory();
        }, 5000);
    } else if (enemySlept === true || enemySpared === true) {
        combatEnded = true;
        turnInProgress = true;
        enemyCombatSprite.classList.add('fadeOut');
        addToCombatLog(`You have defeated ${currentEnemy.name} through non-violent means.`);
        setTimeout(() => { addToCombatLog(`As a result, no stats will be given.`); }, 3000);
        setTimeout(() => {
            currentPage = "dialogue";
            setPage();
            advanceStory();
        }, 6000);
    }
}

function logRewardedStats() {
    addToCombatLog(`You have gained ${currentEnemy.givenStats[0]} health`);
    setTimeout(() => { addToCombatLog(`You have gained ${currentEnemy.givenStats[1]} attack`); }, 1000);
    setTimeout(() => { addToCombatLog(`You have gained ${currentEnemy.givenStats[2]} defense`); }, 2000);
    setTimeout(() => {
        currentPage = "dialogue";
        setPage();
        advanceStory();
    }, 5000);
}

function addToCombatLog(string) {
    combatLog.innerHTML = combatLog.innerHTML + `<p>${string}</p>`;
    combatLog.scrollTop = combatLog.scrollHeight;
}

function setUpEnding(ending) {
    if (ending === "Death in Combat") {
        endingTitle.innerHTML = 'Ending 4: Death in Combat';
        endingBody.innerHTML = `You died while fighting ` + currentEnemy.name + `. You can gain higher stats by fighting stronger enemies, but don't overdo it. You already experienced what happens. Hopefully, you died valiantly. Though, that probably isn't the case.`
    } else if (ending === "IV Poisoning") {
        endingTitle.innerHTML = 'Ending 5: IV Poisoning';
        endingBody.innerHTML = `The hospital was only trying to save you. Turns out that whatever they keep in those IV bags are poisonous to vampires. How unfortunate. That seemed like a real painful way to go.`
    }
}

function updateChoiceLog() {
    choiceLogBox.style = "display: flex";
    let choiceLogHTML = "";
    for (line of choiceLog) {
        choiceLogHTML += `<p>${line}</p>`;
    }
    choiceLogBox.innerHTML = choiceLogHTML;
}

startButton.addEventListener('click', () => {
    resetStory();
    currentPage = "dialogue";
    setPage();
    advanceStory();
});

continueButton.addEventListener('click', () => {
    loadStateForContinue();
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

viewChoicesButton.addEventListener('click', () => {
    setTimeout(() => { choiceLogAndOverlay.style = "display: block"; }, 50);
    updateChoiceLog();
});

document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.choiceLog')) {
        choiceLogAndOverlay.style = "display: none";
    }
});

setUpOptionsButtons();
setUpOptionsMenus();
updateStatusCanvas();
setUpCombatButtons();
setUpItemUsage();
setStartPage();

function checkLengths() {
    console.log(storyObject[storyStage].text.length);
    console.log(storyObject[storyStage].leftSprite.length);
    console.log(storyObject[storyStage].rightSprite.length);
    console.log(storyObject[storyStage].background.length);
    console.log(storyObject[storyStage].CGmode.length);
    console.log(storyObject[storyStage].speaker.length);
    console.log(storyObject[storyStage].tagPosition.length);
    console.log(storyObject[storyStage].combat.length);
    console.log(storyObject[storyStage].ending.length);
}