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
let landlordBefriended = false;
let jakeBefriended = false;
let ameliaBefriended = false;
let dealerBefriended = false;
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
let playerItems = [];
let playerHealth = 100;
let playerHealthMax = 100;
let playerAttack = 10;
let playerDefense = 10;
//continueSave vars
let continueLandlordBefriended = false;
let continueJakeBefriended = false;
let continueAmeliaBefriended = false;
let continueDealerBefriended = false;
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
//for later ["sorenCombatNight.png", ["Off-Duty Hunter", "Tired Business Woman reveals herself as an Off-Duty Hunter!", 80, 15, 5, [20, 5, 5], "tiredBusinessWomanNight.png", true, 3, true, true]]
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
        "ending": [null, null, null, null, null, "Death in Combat"],
        "suspicion": [null, null, null, null, null, null],
        "interrogation": [null, null, null, null, null, null]
    },
    "intro": {
        "text": ["In this story, you play as a young vampire named Soren.", "Soren lives in a modern-world society, similar to your own, except with the existence of vampires and the organization that pursues vampires to protect the peace, the Daylight Savings Corps.", "You work a part-time job to make a salary and blend into human society.", "It is currently 5:49 PM. You’re finishing up the last order of the day, before cleaning up shop and clocking out for your part-time shift at Grill Bros.", "Today, you forgot your “lunch” at home, so you're feeling quite “hungry.”", "Sizzle sizzle...", "What a nice smell... too bad it wouldn’t really help at all, even if I ate it.", "Your stomach grumbles", "Suddenly, one of your coworkers comes up behind you and pats you on the shoulder.", "Ayy, Soren! From the looks of it, you look like you need a break.", "With that being said, do you wanna go grab a bite after our shift?"],
        "leftSprite": [null, null, null, null, null, null, "SorenGB.png", null, null, null, null],
        "rightSprite": [null, null, null, null, null, null, null, null, null, "AlanGBProud.png", "AlanGBMouthOpen.png"],
        "background": ["darkBG.png", "darkBG.png", "darkBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png"],
        "CGmode": ["off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off"],
        "speaker": ["Narrator", "Narrator", "Narrator", "Narrator", "Narrator", "Grill", "Soren", "Narrator", "Narrator", "Alan", "Alan"],
        "tagPosition": [null, null, null, null, null, "left", "left", null, null, "right", "right"],
        "combat": [null, null, null, null, null, null, null, null, null, null, null],
        "ending": [null, null, null, null, null, null, null, null, null, null, null],
        "suspicion": [null, null, null, null, null, null, null, null, null, null, null],
        "interrogation": [null, null, null, null, null, null, null, null, null, null, null]
    },
    "1A": {
        "text": ["Yeah, sure. Where are we heading?", "Oh, nice. I know this good place just down the street.", "You and Alan head down to a place down the street, not too far from Grill Bros. It's a relatively hidden joint with a wooden sign hung outside that reads “The Willow.” Sounds like a nice place.", "You both walk inside and get seated together at the bar. You both order a steak and fries combo and talk about some mundane things in life.", "So the other day, there was this girl...", "...", "You try your best to suppress your growing “hunger” and have a normal conversation, but you feel terrible."],
        "leftSprite": ["SorenGB.png", null, null, null, null , "SorenNM.png", null],
        "rightSprite": [null, "AlanGBMouthOpen.png", null, null, "AlanNMProud.png", null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "darkBG.png", "willowBG.png", "willowBG.png", "willowBG.png", "willowBG.png"],
        "CGmode": ["off", "off", "off", "off", "off", "off", "off"],
        "speaker": ["Soren", "Alan", "Narrator", "Narrator", "Alan", "Soren", "Narrator"],
        "tagPosition": ["left", "right", null, null, "right", "left", null],
        "combat": [null, null, null, null, null, null, null],
        "ending": [null, null, null, null, null, null, null],
        "suspicion": [null, null, null, null, null, null, null],
        "interrogation": [null, null, null, null, null, null, null]
    },
    "1B": {
        "text": ["Absolutely not.", " I don’t even know who you are, to be honest.", "Dang... harsh.", "Anyway, I’m going straight home after I’m done here.", "Oh, but please help clean up.", "Uh... yeah. Sure.", "You and Alan clean and close up shop. You leave Grill Bros first.", "On the way home, the hunger intensifies even further. Every step makes your stomach grumble more and more. You feel terrible.", "Ugh..."],
        "leftSprite": ["SorenGB.png", "SorenGB.png", null, "SorenGB.png", "SorenGB.png", null, null, null, "SorenNM.png"],
        "rightSprite": [null, null, "AlanGBDisappointed.png", null, null, "AlanGB.png", null, null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "darkBG.png", "streetNightBG.png", "streetNightBG.png"],
        "CGmode": ["off", "off", "off", "off", "off", "off", "off", "off", "off"],
        "speaker": ["Soren", "Soren", "Alan", "Soren", "Soren", "Alan", "Narrator", "Narrator", "Soren"],
        "tagPosition": ["left", "left", "right", "left", "left", "right", null, null, "left"],
        "combat": [null, null, null, null, null, null, null, null, null],
        "ending": [null, null, null, null, null, null, null, null, null],
        "suspicion": [null, null, null, null, null, null, null, null, null],
        "interrogation": [null, null, null, null, null, null, null, null, null]
    },
    "1C": {
        "text": ["Oh... well... you see... I’m kinda busy after this...", "Really? I always see you walk straight home, though.", "How do you know that?", "Ah... well...", "Moving on, I still think it's suspicious.", "Well, whatever you’re thinking. I’m seriously busy today, so maybe another time.", "Alright. Sure, man.", "Alan is suspicious of you. (Suspicion +20)", "You and Alan clean and close up shop. You leave Grill Bros first.", "On the way home, the hunger intensifies even further. Every step makes your stomach grumble more and more. You feel terrible.", " Ugh...",],
        "leftSprite": ["SorenGB.png", null, "SorenGB.png", null, null, "SorenGB.png", null, null, null, null, "SorenNM.png"],
        "rightSprite": [null, "AlanGBMouthOpen.png", null, "AlanGBDisappointed.png", "AlanGBMouthOpen.png", null, "AlanGBDisappointed.png", null, null, null, null],
        "background": ["GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "GrillBrosBG.png", "darkBG.png", "streetNightBG.png", "streetNightBG.png"],
        "CGmode": ["off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off"],
        "speaker": ["Soren", "Alan", "Soren", "Alan", "Alan", "Soren", "Alan", "Narrator", "Narrator", "Narrator", "Soren"],
        "tagPosition": ["left", "right", "left", "right", "right", "left", "right", null, null, null, "left"],
        "combat": [null, null, null, null, null, null, null, null, null, null, null],
        "ending": [null, null, null, null, null, null, null, null, null, null, null],
        "suspicion": [null, null, null, null, null, null, null, 20, null, null, null],
        "interrogation": [null, null, null, null, null, null, null, null, null, null, null]
    },
    "2A A": {
        "text": ["You suddenly bang your hands on the bar table and stand up out of your seat. A few eyes look to see what the commotion is, and Alan is surprised. (Suspicion +20)", "Huh? Soren? What are you doing?", "You don’t say anything as you walk out of “The Willow.” Once the door closes behind you and you are out of Alan’s sight, you start sprinting in the direction of your apartment.", "The “hunger” intensifies with every step, and you narrowly make it back to your residence before feeling like you are about to pass out.", "You burst through the door and rush to the fridge, opening it and revealing a collection of blood bags.", "You quickly snatch one, tearing it open with primal intensity, gorging it down in seconds.", "Ah... Huff...", "I thought I was gonna pass out...", "Suddenly, you notice that you left the door to the apartment open. In the doorway stands your landlord, frozen with a look of shock on his face.", "You notice that you have blood dripping down from your mouth to your chin. You also spilled some blood on your shirt. It looks like quite a scene.", "A... a vampire?!", "(Oh shoot! What should I do!?)"],
        "leftSprite": [null, null, null, null, null, null, "SorenNM.png", null, null, null, null, "SorenNM.png"],
        "rightSprite": [null, "AlanNMSurprised.png", null, null, null, null, null, null, null, null, "Landlord.png", null],
        "background": ["willowBG.png", null, null, "streetNightBG.png", "apartmentBG.png", null, null, null, null, null, null, null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator", "Alan", "Narrator", "Narrator", "Narrator", "Narrator", "Soren", "Soren", "Narrator", "Narrator", "Landlord", "Soren"],
        "tagPosition": [null, "right", null, null, null, null, "left", "left", null, null, "right", "left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [20,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "2A B": {
        "text": ["You resolute yourself to push through the “hunger” and keep conversing.", "...So anyway, what’ve you been up to recently?", "Huff... Oh, me? Nothing much really... hah...", "Uhh... are you okay? You look a little out of breath.", "Suddenly, your vision goes dark, and you pass out unconscious. You feel your body hit the wooden restaurant floor.", "H-hey?! Someone call 911!!", "As a vampire, you are unconscious, but your body’s senses still vaguely pick up the world around you. You hear sirens blare in the distance, then you feel yourself get carried onto a stretcher.", "Around twenty minutes later, you get carried onto a hospital bed, and you hear some people discussing your diagnosis. Sounds like they’re confused about what they're dealing with? Are you going to get exposed?", "Suddenly, you feel a sharp pain in your arm. You’ve been poked by a needle and linked to an IV fluid bag. You instantly feel an intense burning pain as the fluid from the bag flows into your body. It seems your body doesn’t respond well.", "Your senses begin to fade out for real this time, and you die.", "."],
        "leftSprite": [null, null, "SorenGB.png", null, null, null, null, null, null, null, null],
        "rightSprite": [null, "AlanNM.png", null, "AlanNMDisappointed.png", null, "AlanNMSurprised.png", null, null, null, null, null],
        "background": ["willowBG.png", null, null, null, "darkBG.png", null, null, null, null, null, null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator", "Alan", "Soren", "Alan", "Narrator", "Alan", "Narrator", "Narrator", "Narrator", "Narrator", "Narrator"],
        "tagPosition": [null, "right", "left", "right", null, "right", null, null, null, null, null],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,"IV Poisoning"],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "2A C": {
        "text": ["You decide to come up with an excuse to go outside and get Alan to follow you.", "H-hey… I’m not feeling too good. I’m gonna go outside for a bit…", "Huh? Oh sure. I’ll be here.", "…", "Actually… Can you come with me just in case?", "Oh, don’t worry. Take your time. I wanna eat my food before it gets cold anyway.", "(Wait… what if this guy is trying to get me to pay for everything?)", "On second thought, sure. I’ll go with you.", "(I don’t know why he changed his mind, but this works out)", "You exit “The Willow” and walk into the dark alleyway between it and the building beside it. You walk to the very back of the alleyway and start acting like you're sick.", "Bleurgh… Aah… Ugh…", "Alan walks up closer to you to check if you’re okay.", "Hey, man. Are you alright?", "You suddenly turn around, revealing that you’re completely fine, and approach Alan.", "."],
        "leftSprite": [null, "SorenGB.png", null, "SorenGB.png", "SorenGB.png", null, null, null, "SorenGB.png", null, "SorenGB.png", null, null, null, null],
        "rightSprite": [null, null, "AlanNM.png", null, null, "AlanNM.png", "AlanNMDisappointed.png", "AlanNM.png", null, null, null, null, "AlanNMDisappointed.png", null, null],
        "background": ["willowBG.png", null, null, null, null, null, null, null, null, "alleyNightBG.png", null, null, null, null, "alleyNightCombatBG.png"],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator", "Soren", "Alan", "Soren", "Soren", "Alan", "Alan", "Alan", "Soren", "Narrator", "Soren", "Narrator", "Alan", "Narrator", "Narrator"],
        "tagPosition": [null, "left", "right", "left", "left", "right", "right", "right", "left", null, "left", null, "right", null, null],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null, ["sorenCombatNight.png", ["Alan", "Alan looks confused and frightened", 5, 1, 1, [5, 1, 1], "AlanCombatNight.png", true, 1, true, true]]],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "2A C kill": {
        "text": ["After knocking Alan unconscious, you drink his blood, and you drink greedily. After a few minutes of feasting, it seems the blood loss caused him to die.", "You hide Alan’s body in a dumpster nearby. In order to avoid suspicion, you mangled it beforehand to make it seem like the result of a normal homicide.", "You leave the alleyway and comfortably stroll home.", "You make it to your apartment, open the door, and enter.", "Today was tiring… I think I’ll go straight to bed.", "As a vampire, or maybe due to personal preference, you prefer to sleep in your bat form. You transform and then make yourself comfortable on the coat rack next to your bed.", "Suddenly, you notice that you made a fatal mistake. You left the door to the apartment open. In the doorway stands your landlord, frozen with a look of shock on his face.", "The shock causes you to transform back into humanoid form, and you tumble from the top of the coat rack onto the floor.", "A… a vampire?!", "(Dang it! What do I do now?!)"],
        "leftSprite": [null, null, null, null, "SorenNM.png", null, null, null, null, "SorenNM.png"],
        "rightSprite": [null, null, null, null, null, null, null, null, "Landlord.png", null],
        "background": ["alleyNightBG.png", null, null, "apartmentBG.png", null, null, null, null, null, null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator", "Narrator", "Narrator", "Narrator", "Soren", "Narrator", "Narrator", "Narrator", "Landlord", "Soren"],
        "tagPosition": [null, null, null, null, "left", null, null, null, "right", "left"],
        "combat": [null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null]
    },
    "2A C spare": {
        "text": ["Alan flees the scene, and you are left alone.","You're breathing heavily, wondering why you let him go despite setting up that whole ploy.","You realize that you didn't manage to get the blood you needed from that encounter, and the hunger quickly begins to creep back in.","As you walk away, the “hunger” and the adrenaline from what just happened clash in your head, making your vision blur.","On the way back home, you feel like you’re about to pass out with every step.","But the adrenaline from the encounter keeps you barely conscious long enough to reach your apartment.","You stumble through the door and rush straight to the fridge, opening it and grabbing a blood bag.","You tear it open and drink it down quickly, your body finally stabilizing.","Ah… Huff… I thought I was gonna pass out…","You try to calm yourself and transform into your bat form, hoping to rest.","You settle yourself on the coat rack next to your bed.","Suddenly, you notice a fatal mistake. You left the door to your apartment open.","In the doorway stands your landlord, frozen with shock.","The shock causes you to transform back into humanoid form, and you tumble from the top of the coat rack onto the floor.","A… a vampire?!","(Dang it! What do I do now?!?)"],
        "leftSprite": [null,null,null,null,null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null,null,null,"Landlord.png",null,null],
        "background": ["alleyNightBG.png",null,null,"streetNightBG.png",null,null,"apartmentBG.png",null,null,null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Soren"],
        "tagPosition": [null,null,null,null,null,null,"left","left","left",null,null,null,null,"right","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "2B A": {
        "text": ["You approach an elderly woman who was walking on the sidewalk near you.", "."],
        "leftSprite": [null,null],
        "rightSprite": [null,null],
        "background": ["streetNightBG.png", "streetNightCombatBG.png"],
        "CGmode": ["off","off"],
        "speaker": ["Narrator","Narrator"],
        "tagPosition": [null,null],
        "combat": [null, ["sorenCombatNight.png", ["Elderly Lady", "Elderly Lady is leisurely, and slowly, walking by", 3, 1, 5, [1, 1, 1], "elderlyLadyCombat.png", true, 1, true, true]]],
        "ending": [null,null],
        "suspicion": [null,null],
        "interrogation": [null,null]
    },
    "2B A kill": {
        "text": ["You knock the elderly woman unconscious. Afterwards, you drink the seemingly little blood left that flowed in her body. Her body was already wrinkly, but it seems like you turned her into a raisin. It was a satisfactory meal.","(Guess… I should clean up here.)","In order to avoid suspicion, you mangle up the old lady’s body and steal her belongings, to make it seem like she was killed in a robbery. You leave her remains in a dark alleyway before walking the rest of the way to your residence.","You make it to your apartment, open the door, and enter.","Today was tiring… I think I’ll go straight to bed.","As a vampire, or maybe due to personal preference, you prefer to sleep in your bat form. You transform and then make yourself comfortable on the coat rack next to your bed.","Suddenly, you notice that you made a fatal mistake. You left the door to the apartment open. In the doorway stands your landlord, frozen with a look of shock on his face.","The shock causes you to transform back into humanoid form, and you tumble from the top of the coat rack onto the floor.","A… a vampire?!","(Dang it! What do I do now?!)"],
        "leftSprite": [null,"SorenNM.png",null,null,"SorenNM.png",null,null,null,null,"SorenNM.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,"Landlord.png",null],
        "background": ["streetNightBG.png",null,null,"apartmentBG.png",null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Soren","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Landlord","Soren"],
        "tagPosition": [null,"left",null,null,"left",null,null,null,"right","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null]
    },
    "2B A spare": {
        "text": ["The old lady runs away, albeit at a pace more like a very... slow walk. You are left alone.","You wonder why you let that old lady go despite resolving yourself to attacking her? Now you are still left with the \"hunger\", growing even worse.","You suddenly notice a rat sleeping nearby, and your stomach feels like its burning.","Dang it. This'll have to do...","You snatch the rat from its resting spot against the brick building wall and bite into it. It lets out a small squeak before going completely silent.","The rat seems to satisfy your hunger. It tasted terrible, but you must do what you must do when it comes to survival.","You leave the rat’s remains back in the spot on the wall where you took it from.","As you begin heading home, the aftertaste lingers and your stomach churns slightly.","On the way back, you feel a bit lightheaded, but it’s nowhere near as bad as before.","You make it to your apartment, open the door, and enter.","Today was tiring… I think I’ll go straight to bed.","As a vampire, or maybe due to personal preference, you prefer to sleep in your bat form. You transform and then make yourself comfortable on the coat rack next to your bed.","Suddenly, you notice a fatal mistake. You left the door to your apartment open.","In the doorway stands your landlord, frozen with shock.","The shock causes you to transform back into humanoid form, and you tumble from the top of the coat rack onto the floor.","A… a vampire?!","(Dang it! What do I do now?!?)"],
        "leftSprite": [null,null,null,"SorenNM.png",null,null,null,null,null,null,"SorenNM.png",null,null,null,null,null,"SorenNM.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"Landlord.png",null],
        "background": ["streetNightBG.png",null,null,null,null,null,null,null,null,"apartmentBG.png",null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Landlord","Soren"],
        "tagPosition": [null,null,null,"left",null,null,null,null,null,null,"left",null,null,null,null,"right","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "2B B": {
        "text": ["You make the decision to start sprinting home.","As you run past at almost Olympic sprinter level speeds, you definitely turn a couple of heads. (Suspicion +20)","You narrowly make it back to your residence before feeling like you are about to pass out.","You burst through the door and rush to the fridge, opening it and revealing a collection of blood bags.","You quickly snatch one, tearing it open with primal intensity, gorging it down in seconds.","Ah… Huff…","I thought I was gonna pass out…","Suddenly, you notice that you left the door to the apartment open. In the doorway stands your landlord, frozen with a look of shock on his face.","You notice that you have blood dripping down from your mouth to your chin. You also spilled some blood on your shirt. It looks like quite a scene.","A… a vampire?!","(Oh shoot! What should I do!?)"],
        "leftSprite": [null,null,null,null,null,"SorenNM.png","SorenNM.png",null,null,null,"SorenNM.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,"Landlord.png",null],
        "background": ["streetNightBG.png",null,null,"apartmentBG.png",null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Soren","Narrator","Narrator","Landlord","Soren"],
        "tagPosition": [null,null,null,null,null,"left","left",null,null,"right","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,20,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "2B C": {
        "text": ["You resolve yourself to endure through the “hunger” and keep walking.","With each step, your body gets heavier, and the pain in your stomach grows. A black vignette begins to close in on your vision as your apartment enters your view far in the distance.","Your vision completely blacks out for a moment, and you trip on your own feet.","Your whole body falls and collapses onto the floor. You feel the cold concrete and asphalt kiss and sting your body. The impact of hitting the ground causes you to be knocked unconscious.","As a vampire, you are unconscious, but your body’s senses still vaguely pick up the world around you.","You lie in wait for hours until you hear sirens blare in the distance.","It seems that someone spotted your body and called the ambulance. How nice of them.","You feel yourself being carried onto a stretcher.","Around twenty minutes later, you get carried onto a hospital bed, and you hear some people discussing your diagnosis. Sounds like they’re confused about what they're dealing with? Are you going to get exposed?","Suddenly, you feel a sharp pain in your arm. You’ve been poked by a needle and linked to an IV fluid bag. You instantly feel an intense burning pain as the fluid from the bag flows into your body. It seems your body doesn’t respond well.","Your senses begin to fade out for real this time, and you die.","Ending 5: IV Poisoning"],
        "leftSprite": [null,null,null,null,null,null,null,null,null,null,null,null],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,"darkBG.png",null,null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator"],
        "tagPosition": [null,null,null,null,null,null,null,null,null,null,null,null],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,"IV Poisoning"],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3A": {
        "text": ["Don’t say a word about this… or I’ll kill you!","AAAAAAAAAAHHHHHHHHHHH!!!","Some lights in other apartments seem to flick on. This scene is causing quite the commotion. (Suspicion +20).","(Damn! I made it worse!)"],
        "leftSprite": ["SorenNM.png",null,null,"SorenNM.png"],
        "rightSprite": [null,"Landlord.png",null,null],
        "background": ["apartmentBG.png",null,null,null],
        "CGmode": ["off","off","off","off"],
        "speaker": ["Soren","Landlord","Narrator","Soren"],
        "tagPosition": ["left","right",null,"left"],
        "combat": [null,null,null,null],
        "ending": [null,null,null,null],
        "suspicion": [null,null,20,null],
        "interrogation": [null,null,null,null]
    },
    "3A A": {
        "text": ["."],
        "leftSprite": ["null"],
        "rightSprite": [null],
        "background": ["apartmentCombatBG.png"],
        "CGmode": ["off","off","off","off"],
        "speaker": ["Narrator"],
        "tagPosition": [null],
        "combat": [["sorenCombatNight.png", ["Landlord", "Landlord seems frozen in fear", 5, 1, 1, [5, 1, 1], "LandlordCombatNight.png", true, 1, true, true]]],
        "ending": [null],
        "suspicion": [null],
        "interrogation": [null]
    },
    "3A A kill":{
        "text":["You pounce onto the landlord, landing and grabbing onto his shirt. You bite down on his throat aggressively, and blood gushes into your mouth.","AHH… ahh…","His screams start to die down, and his knees buckle due to the pain and your weight, causing the Landlord’s body to collapse to the floor with you still on him. You continue drinking.","Five minutes later, you finally get off the poor Landlord. His body is shriveled up. It’s pale, lifeless, and dead.","…","It’s not safe here anymore… I have to leave.","You grab an insulated bag that you store in your closet and hastily stuff it with the blood bags you had stored in your fridge.","You shapeshift into your bat transformation and fly out the open apartment door.","You make your way to a nearby forest before you notice that there is some sort of presence following you.","You fly into an open patch of the forest, uncovered by the trees, before shifting back to your humanoid form.","Hey! Come out! I know there’s someone following me!","A figure wearing a hooded black cloak emerges from the shadows.","Hello, young one.","The cloaked figure removes their hood. He has pure white hair and red eyes, just like you. His eyes are a shade browner compared to yours, though. You realize that this man is also a vampire, though a much older one.","So… who are you?","Who am I…","It isn’t important. I’ve taken on many identities over the years.","What is important, however… is that I sense an ancient power in you. I noticed your encounter earlier, but you are still too young…","Huh? What are you talking about?","…Nothing that you need to concern yourself with yet. Please take these with you.","The vampire’s hand shuffles under his cloak, and he reaches it out. He offers you a leather pouch full of Premium Blood Vials. You take the pouch from his hand and stuff it into your pocket.","What are these?","These will help you in your future perils. Whenever you face a major injury, try drinking one of these. It will soothe your body and accelerate the regeneration process.","Eh? Really? And you’re just giving it to me?","Yes. It's nothing suspicious. If you really want to imagine it in a materialistic manner, think of it like an investment that I’ve put into you.","I will take my leave now. I won’t openly associate with you due to the risks of being discovered, but just know that I will be watching from the shadows.","Thank you, Mister Vampire, sir.","Yes, good luck to you, young one.","The vampire flips back on the hood of his cloak, and he vanishes into the shadows with a swarm of fleeing bats taking his place.","What an interesting encounter.","Now, as you wander the forest, you reflect on recent events.","I really have to find a new home, huh. Where can I even go now?","As you walk, you stumble upon an open and wet area of the forest. It is a wetland, with ponds and shrubs all around.","The midnight moonlight beams down on the area and refracts off the many ponds. The moonlight and the many fireflies around the ponds light up the whole area in shades of white and yellow.","It's a beautiful sight, really, paralleling your sorrowful situation.", ".", "You notice your reflection on the water of a pond next to you.","I feel like… It's time to change things up.","You decide that it is time to renew your identity. Who will you become?"],
        "leftSprite":[null,null,null,null,"SorenNM.png","SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,"SorenNM.png",null,null,null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null,null],
        "rightSprite":[null,"Landlord.png",null,null,null,null,null,null,null,null,null,null,"seniorVampireCloaked.png","seniorVampire.png",null,"seniorVampire.png","seniorVampire.png","seniorVampire.png",null,"seniorVampire.png",null,null,"seniorVampire.png",null,"seniorVampire.png","seniorVampire.png",null,"seniorVampire.png",null,null,null,null,null,null,null,null,null,null,null],
        "background":["apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","wetlandBG.png",null,null, "sorenWetlandCG.png", null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off", "on", "off","off","off"],
        "speaker":["Narrator","Landlord","Narrator","Narrator","Soren","Soren","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","???","Narrator","Soren","Senior Vampire","Senior Vampire","Senior Vampire","Soren","Senior Vampire","Narrator","Soren","Senior Vampire","Soren","Senior Vampire","Senior Vampire","Soren","Senior Vampire","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition":[null,"right",null,null,"left","left",null,null,null,null,"left",null,"right",null,"left","right","right","right","left","right",null,"left","right","left","right","right","left","right",null,null,null,"left",null,null,null,null,null,null,null],
        "combat":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3A A spare":{
        "text":["Given the opportunity of being spared, the landlord, realizing the danger of staying on his spot in the doorway any longer, dashes away in a sprint.","You reflect on the situation for a few moments.","I seriously messed up. What can I do now?","As the landlord’s footsteps fade into the distance, you hear another pair of footsteps approaching your still-open apartment door.","(What could this possibly be now?!)","A man dressed in casual clothing and an odd hat with an odd robe walks into the room. He seems eccentric, but he exudes a powerful, dangerous aura that humans shouldn’t normally have.","Hmm… a vampire, huh.","Who are you?","Just someone passing by. It looks like you spared that guy, right?","…What do you mean?","Well, you had the chance to stop the guy who ran away just now, but you didn’t. Most other vampires wouldn’t do that, you know…","…","You amuse me…","Here, come closer. I want to give you something.","The man reaches into his robe and takes out a bottle full of pills, reaching it out to you. You instinctively accept the offer.","What are these?","That’s a bottle of sleeping pills, one-hundred times stronger than normal. I hope you use it wisely.","Eh? It’s not like I have any trouble sleeping.","You’ll figure out what I mean eventually. Anyway, I’ll let you go for now.","I hope you are different.","The eccentric man walks back out of the apartment through the front door.","Wait! I’m not done talking to you!","You run out the door and look around, but the odd man is already gone.","Dang it, who even was that guy?","You reflect on recent events and realize that you probably shouldn’t spend any more time at your apartment than necessary.","It’s not safe here anymore… I have to leave.","You grab an insulated bag that you store in your closet and hastily stuff it with the blood bags you had stored in your fridge.","Then, you walk out of the apartment complex and wander the streets.","You eventually find yourself traversing through a nearby forest.","You reflect on the magnitude of the situation you suddenly found yourself in.","I really have to find a new home, huh. Where can I even go now?","As you walk, you stumble upon an open and wet area of the forest. It is a wetland, with ponds and shrubs all around.","The midnight moonlight beams down on the area and refracts off the many ponds. The moonlight and the many fireflies around the ponds light up the whole area in shades of white and yellow.","It's a beautiful sight, really, paralleling your sorrowful situation.",".","You notice your reflection on the water of a pond next to you.","I feel like… It's time to change things up.","You decide that it is time to renew your identity. Who will you become?"],
        "leftSprite":[null,null,"SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,"SorenNM.png",null,null,null,"SorenNM.png",null,"SorenNM.png",null,null,null,"SorenNM.png",null,"SorenNM.png",null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null],
        "rightSprite":[null,null,null,null,null,"kisukeHidden.png","kisukeHidden.png",null,"kisukeHidden.png",null,"kisukeHidden.png",null,"kisukeHidden.png","kisukeHidden.png",null,null,"kisukeHidden.png",null,"kisukeHidden.png","kisukeHidden.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "background":["apartmentBG.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"forestBG.png",null,null,"wetlandBG.png",null,null,"sorenWetlandCG.png",null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","on","off","off","off"],
        "speaker":["Narrator","Narrator","Soren","Narrator","Soren","Narrator","???","Soren","???","Soren","???","Soren","???","???","Narrator","Soren","???","Soren","???","???","Narrator","Soren","Narrator","Soren","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition":[null,null,"left",null,"left",null,"right","left","right","left","right","left","right","right",null,"left","right","left","right","right",null,"left",null,"left",null,"left",null,null,null,null,"left",null,null,null,null,null,null,null],
        "combat":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3A B":{
        "text":["You quickly sprint around the landlord before he can even react and give him a swift chop on the back of the neck. You don’t know where you learned that maneuver from, but it seemed to be very effective!","Agh-","He falls unconscious and collapses onto the floor.","…","It’s not safe here anymore… I have to leave.","You grab an insulated bag that you store in your closet and hastily stuff it with the blood bags you had stored in your fridge.","You shapeshift into your bat transformation and fly out the open apartment door.","You make your way to a nearby forest before you notice that there is some sort of presence following you.","You fly into an open patch of the forest, uncovered by the trees, before shifting back to your humanoid form.","Hey! Come out! I know there’s someone following me!","A figure wearing a hooded black cloak emerges from the shadows.","Hello, young one.","The cloaked figure removes their hood. He has pure white hair and red eyes, just like you. His eyes are a shade browner compared to yours, though. You realize that this man is also a vampire, though a much older one.","So… who are you?","Who am I…","It isn’t important. I’ve taken on many identities over the years.","What is important, however… is that I sense an ancient power in you. I noticed your encounter earlier, but you are still too young…","Huh? What are you talking about?","…Nothing that you need to concern yourself with yet. Please take these with you.","The vampire’s hand shuffles under his cloak, and he reaches it out. He offers you a leather pouch full of Premium Blood Vials. You take the pouch from his hand and stuff it into your pocket.","What are these?","These will help you in your future perils. Whenever you face a major injury, try drinking one of these. It will soothe your body and accelerate the regeneration process.","Eh? Really? And you’re just giving it to me?","Yes. It's nothing suspicious. If you really want to imagine it in a materialistic manner, think of it like an investment that I’ve put into you.","I will take my leave now. I won’t openly associate with you due to the risks of being discovered, but just know that I will be watching from the shadows.","Thank you, Mister Vampire, sir.","Yes, good luck to you, young one.","The vampire flips back on the hood of his cloak, and he vanishes into the shadows with a swarm of fleeing bats taking his place.","What an interesting encounter.","Now, as you wander the forest, you reflect on recent events.","I really have to find a new home, huh. Where can I even go now?","As you walk, you stumble upon an open and wet area of the forest. It is a wetland, with ponds and shrubs all around.","The midnight moonlight beams down on the area and refracts off the many ponds. The moonlight and the many fireflies around the ponds light up the whole area in shades of white and yellow.","It's a beautiful sight, really, paralleling your sorrowful situation.", ".", "You notice your reflection on the water of a pond next to you.","I feel like… It's time to change things up.","You decide that it is time to renew your identity. Who will you become?"],
        "leftSprite":[null,null,null,"SorenNM.png","SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,"SorenNM.png",null,null,null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null,null],
        "rightSprite":[null,"Landlord.png",null,null,null,null,null,null,null,null,null,"seniorVampireCloaked.png","seniorVampire.png",null,"seniorVampire.png","seniorVampire.png","seniorVampire.png",null,"seniorVampire.png",null,null,"seniorVampire.png",null,"seniorVampire.png","seniorVampire.png",null,"seniorVampire.png",null,null,null,null,null,null,null,null,null,null,null],
        "background":["apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","apartmentBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","wetlandBG.png",null,null, "sorenWetlandCG.png", null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off", "on", "off","off","off"],
        "speaker":["Narrator","Landlord","Narrator","Soren","Soren","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","???","Narrator","Soren","Senior Vampire","Senior Vampire","Senior Vampire","Soren","Senior Vampire","Narrator","Soren","Senior Vampire","Soren","Senior Vampire","Senior Vampire","Soren","Senior Vampire","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition":[null,"right",null,"left","left",null,null,null,null,"left",null,"right",null,"left","right","right","right","left","right",null,"left","right","left","right","right","left","right",null,null,null,"left",null,null,null,null,null,null,null],
        "combat":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3A C":{
        "text":["You grab an insulated bag that you store in your closet and hastily stuff it with the blood bags you had stored in your fridge.","You shapeshift into your bat transformation and fly out the open apartment door.","Hey! Where are you going?","The landlord's voice fades into the distance as you fly further away.","You make your way to a nearby forest before you notice that there is some sort of presence following you.","You fly into an open patch of the forest, uncovered by the trees, before shifting back to your humanoid form.","Hey! Come out! I know there’s someone following me!","A figure wearing a hooded black cloak emerges from the shadows.","Hello, young one.","The cloaked figure removes their hood. He has pure white hair and red eyes, just like you. His eyes are a shade browner compared to yours, though. You realize that this man is also a vampire, though a much older one.","So… who are you?","Who am I…","It isn’t important. I’ve taken on many identities over the years.","What is important, however… is that I sense an ancient power in you. I noticed your encounter earlier, but you are still too young…","Huh? What are you talking about?","…Nothing that you need to concern yourself with yet. Please take these with you.","The vampire’s hand shuffles under his cloak, and he reaches it out. He offers you a leather pouch full of Premium Blood Vials. You take the pouch from his hand and stuff it into your pocket.","What are these?","These will help you in your future perils. Whenever you face a major injury, try drinking one of these. It will soothe your body and accelerate the regeneration process.","Eh? Really? And you’re just giving it to me?","Yes. It's nothing suspicious. If you really want to imagine it in a materialistic manner, think of it like an investment that I’ve put into you.","I will take my leave now. I won’t openly associate with you due to the risks of being discovered, but just know that I will be watching from the shadows.","Thank you, Mister Vampire, sir.","Yes, good luck to you, young one.","The vampire flips back on the hood of his cloak, and he vanishes into the shadows with a swarm of fleeing bats taking his place.","What an interesting encounter.","Now, as you wander the forest, you reflect on recent events.","I really have to find a new home, huh. Where can I even go now?","As you walk, you stumble upon an open and wet area of the forest. It is a wetland, with ponds and shrubs all around.","The midnight moonlight beams down on the area and refracts off the many ponds. The moonlight and the many fireflies around the ponds light up the whole area in shades of white and yellow.","It's a beautiful sight, really, paralleling your sorrowful situation.", ".", "You notice your reflection on the water of a pond next to you.","I feel like… It's time to change things up.","You decide that it is time to renew your identity. Who will you become?"],
        "leftSprite":[null,null,null,null,null,null,"SorenNM.png",null,null,null,"SorenNM.png",null,null,null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null],
        "rightSprite":[null,null,"Landlord.png",null,null,null,null,null,"seniorVampireCloaked.png","seniorVampire.png",null,"seniorVampire.png","seniorVampire.png","seniorVampire.png",null,"seniorVampire.png",null,null,"seniorVampire.png",null,"seniorVampire.png","seniorVampire.png",null,"seniorVampire.png",null,null,null,null,null,null,null,null,null,null,null],
        "background":["apartmentBG.png","apartmentBG.png","apartmentBG.png","darkBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","forestBG.png","wetlandBG.png",null,null, "sorenWetlandCG.png", null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off", "on", "off","off","off"],
        "speaker":["Narrator","Narrator","Landlord","Narrator","Narrator","Narrator","Soren","Narrator","???","Narrator","Soren","Senior Vampire","Senior Vampire","Senior Vampire","Soren","Senior Vampire","Narrator","Soren","Senior Vampire","Soren","Senior Vampire","Senior Vampire","Soren","Senior Vampire","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition":[null,null,"right",null,null,null,"left",null,"right",null,"left","right","right","right","left","right",null,"left","right","left","right","right","left","right",null,null,null,"left",null,null,null,null,null,null,null],
        "combat":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3B":{
        "text":["W-wait! Let me say something!","If you pretend you didn’t see anything, then… I’ll give you a reward.","The landlord seems to allow himself to breathe again, but he still seems very weary","A reward…? Like what?"],
        "leftSprite":["SorenNM.png","SorenNM.png",null,null],
        "rightSprite":[null,null,null,"Landlord.png"],
        "background":["apartmentBG.png",null,null,null],
        "CGmode":["off","off","off","off"],
        "speaker":["Soren","Soren","Narrator","Landlord"],
        "tagPosition":["left","left",null,"right"],
        "combat":[null,null,null,null],
        "ending":[null,null,null,null],
        "interrogation":[null,null,null,null],
        "suspicion":[null,null,null,null]
    },
    "3B A":{
        "text":["I’ll give you money! Wealth that you could barely even imagine!","Eh?! You expect me to believe that?","You always turn in your rent late! Even I know vampires can’t just make money appear from thin air.","The landlord looks ready to dash away."],
        "leftSprite":["SorenNM.png",null,null,null],
        "rightSprite":[null,"Landlord.png","Landlord.png",null],
        "background":["apartmentBG.png",null,null,null],
        "CGmode":["off","off","off","off"],
        "speaker":["Soren","Landlord","Landlord","Narrator"],
        "tagPosition":["left","right","right",null],
        "combat":[null,null,null,null],
        "ending":[null,null,null,null],
        "interrogation":[null,null,null,null],
        "suspicion":[null,null,null,null]
    },
    "3BA C":{
        "text":["sigh...","(I give up… I’ll just let him leave)","The landlord dashes away.","You reflect on the situation for a few moments.","I seriously messed up. What can I do now?","As the landlord’s footsteps fade into the distance, you hear another pair of footsteps approaching your still-open apartment door.","(What could this possibly be now?!)","A man dressed in casual clothing and an odd hat with an odd robe walks into the room. He seems eccentric, but he exudes a powerful, dangerous aura that humans shouldn’t normally have.","Hmm… a vampire, huh.","Who are you?","Just someone passing by. It looks like you spared that guy, right?","…What do you mean?","Well, you had the chance to stop the guy who ran away just now, but you didn’t. Most other vampires wouldn’t do that, you know…","…","You amuse me…","Here, come closer. I want to give you something.","The man reaches into his robe and takes out a bottle full of pills, reaching it out to you. You instinctively accept the offer.","What are these?","That’s a bottle of sleeping pills, one-hundred times stronger than normal. I hope you use it wisely.","Eh? It’s not like I have any trouble sleeping.","You’ll figure out what I mean eventually. Anyway, I’ll let you go for now.","I hope you are different.","The eccentric man walks back out of the apartment through the front door.","Wait! I’m not done talking to you!","You run out the door and look around, but the odd man is already gone.","Dang it, who even was that guy?","You reflect on recent events and realize that you probably shouldn’t spend any more time at your apartment than necessary.","It’s not safe here anymore… I have to leave.","You grab an insulated bag that you store in your closet and hastily stuff it with the blood bags you had stored in your fridge.","Then, you walk out of the apartment complex and wander the streets.","You eventually find yourself traversing through a nearby forest.","You reflect on the magnitude of the situation you suddenly found yourself in.","I really have to find a new home, huh. Where can I even go now?","As you walk, you stumble upon an open and wet area of the forest. It is a wetland, with ponds and shrubs all around.","The midnight moonlight beams down on the area and refracts off the many ponds. The moonlight and the many fireflies around the ponds light up the whole area in shades of white and yellow.","It's a beautiful sight, really, paralleling your sorrowful situation.",".","You notice your reflection on the water of a pond next to you.","I feel like… It's time to change things up.","You decide that it is time to renew your identity. Who will you become?"],
        "leftSprite":["SorenNM.png","SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,"SorenNM.png",null,null,null,"SorenNM.png",null,"SorenNM.png",null,null,null,"SorenNM.png",null,"SorenNM.png",null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null],
        "rightSprite":[null,null,null,null,null,null,null,"kisukeHidden.png","kisukeHidden.png",null,"kisukeHidden.png",null,"kisukeHidden.png",null,"kisukeHidden.png","kisukeHidden.png",null,null,"kisukeHidden.png",null,"kisukeHidden.png","kisukeHidden.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "background":["apartmentBG.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"forestBG.png",null,null,"wetlandBG.png",null,null,"sorenWetlandCG.png",null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","on","off","off","off"],
        "speaker":["Soren","Soren","Narrator","Narrator","Soren","Narrator","Soren","Narrator","???","Soren","???","Soren","???","Soren","???","???","Narrator","Soren","???","Soren","???","???","Narrator","Soren","Narrator","Soren","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition":["left","left",null,null,"left",null,"left",null,"right","left","right","left","right","left","right","right",null,"left","right","left","right","right",null,"left",null,"left",null,"left",null,null,null,null,"left",null,null,null,null,null,null,null],
        "combat":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3B B":{
        "text":["I’ll grant you power! Power that could conquer entire nations!","The landlord seems to consider your offer.","Is that so? What would I need to do?","The landlord seems to be open to accepting your proposal. However, you don’t know how to grant vampiric powers to a human. It can only be done by experienced vampires, unlike yourself, who understand and are powerful enough to complete the ritual that turns a human into a familiar. Now what do you do?"],
        "leftSprite":["SorenNM.png",null,null,null],
        "rightSprite":[null,null,"Landlord.png",null],
        "background":["apartmentBG.png",null,null,null],
        "CGmode":["off","off","off","off"],
        "speaker":["Soren","Narrator","Landlord","Narrator"],
        "tagPosition":["left",null,"right",null],
        "combat":[null,null,null,null],
        "ending":[null,null,null,null],
        "interrogation":[null,null,null,null],
        "suspicion":[null,null,null,null]
    },
    "3BB C":{
        "text":["Oh… uhm… Well, the thing is…","…What?","I lied. I can’t give you any power.","Huh?!","The landlord seems to get visibly frustrated and looks ready to run away.","W-wait! Don’t go just yet!","Before you can say another word, the landlord dashes away in a sprint.","You reflect on the situation for a few moments.","I seriously messed up. What can I do now?","As the landlord’s footsteps fade into the distance, you hear another pair of footsteps approaching your still-open apartment door.","(What could this possibly be now?!)","A man dressed in casual clothing and an odd hat with an odd robe walks into the room. He seems eccentric, but he exudes a powerful, dangerous aura that humans shouldn’t normally have.","Hmm… a vampire, huh.","Who are you?","Just someone passing by. It looks like you spared that guy, right?","…What do you mean?","Well, you had the chance to stop the guy who ran away just now, but you didn’t. Most other vampires wouldn’t do that, you know…","…","You amuse me…","Here, come closer. I want to give you something.","The man reaches into his robe and takes out a bottle full of pills, reaching it out to you. You instinctively accept the offer.","What are these?","That’s a bottle of sleeping pills, one-hundred times stronger than normal. I hope you use it wisely.","Eh? It’s not like I have any trouble sleeping.","You’ll figure out what I mean eventually. Anyway, I’ll let you go for now.","I hope you are different.","The eccentric man walks back out of the apartment through the front door.","Wait! I’m not done talking to you!","You run out the door and look around, but the odd man is already gone.","Dang it, who even was that guy?","You reflect on recent events and realize that you probably shouldn’t spend any more time at your apartment than necessary.","It’s not safe here anymore… I have to leave.","You grab an insulated bag that you store in your closet and hastily stuff it with the blood bags you had stored in your fridge.","Then, you walk out of the apartment complex and wander the streets.","You eventually find yourself traversing through a nearby forest.","You reflect on the magnitude of the situation you suddenly found yourself in.","I really have to find a new home, huh. Where can I even go now?","As you walk, you stumble upon an open and wet area of the forest. It is a wetland, with ponds and shrubs all around.","The midnight moonlight beams down on the area and refracts off the many ponds. The moonlight and the many fireflies around the ponds light up the whole area in shades of white and yellow.","It's a beautiful sight, really, paralleling your sorrowful situation.",".","You notice your reflection on the water of a pond next to you.","I feel like… It's time to change things up.","You decide that it is time to renew your identity. Who will you become?"],
        "leftSprite":["SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,null,"SorenNM.png",null,"SorenNM.png",null,"SorenNM.png",null,null,null,"SorenNM.png",null,"SorenNM.png",null,null,null,"SorenNM.png",null,"SorenNM.png",null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null],
        "rightSprite":[null,"Landlord.png",null,"Landlord.png",null,null,null,null,null,null,null,"kisukeHidden.png","kisukeHidden.png",null,"kisukeHidden.png",null,"kisukeHidden.png",null,"kisukeHidden.png","kisukeHidden.png",null,null,"kisukeHidden.png",null,"kisukeHidden.png","kisukeHidden.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "background":["apartmentBG.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"forestBG.png",null,null,"wetlandBG.png",null,null,"sorenWetlandCG.png",null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","on","off","off","off"],
        "speaker":["Soren","Landlord","Soren","Landlord","Narrator","Soren","Narrator","Narrator","Soren","Narrator","Soren","Narrator","???","Soren","???","Soren","???","Soren","???","???","Narrator","Soren","???","Soren","???","???","Narrator","Soren","Narrator","Soren","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Soren","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition":["left","right","left","right",null,"left",null,null,"left",null,"left",null,"right","left","right","left","right","left","right","right",null,"left","right","left","right","right",null,"left",null,"left",null,"left",null,null,null,null,"left",null,null,null,null,null,null,null],
        "combat":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3C":{
        "text":["H-hold on! Can we just calm down!","The landlord seems to relax slightly, allowing himself to breathe.","I promise I won’t hurt you.","Just please, don’t run.","…","He doesn’t seem fully convinced."],
        "leftSprite":["SorenNM.png",null,"SorenNM.png","SorenNM.png",null,null],
        "rightSprite":[null,null,null,null,"Landlord.png",null],
        "background":["apartmentBG.png",null,null,null,null,null],
        "CGmode":["off","off","off","off","off","off"],
        "speaker":["Soren","Narrator","Soren","Soren","Landlord","Narrator"],
        "tagPosition":["left",null,"left","left","right",null],
        "combat":[null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null]
    },
    "3C A":{
        "text":["Please! I really can’t have anyone know about this.","I beg you not to say a word.","You prostrate yourself towards the landlord, getting on your hands and knees while also putting your forehead against the cold wood floorboards.","???","(Interesting…)","What’s in it for me?","You lift yourself back up to respond.","Oh… well…"],
        "leftSprite":["SorenNM.png","SorenNM.png",null,null,null,null,null,"SorenNM.png"],
        "rightSprite":[null,null,null,"Landlord.png","Landlord.png","Landlord.png",null,null],
        "background":["apartmentBG.png",null,null,null,null,null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off"],
        "speaker":["Soren","Soren","Narrator","Landlord","Landlord","Landlord","Narrator","Soren"],
        "tagPosition":["left","left",null,"right","right","right",null,"left"],
        "combat":[null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null]
    },
    "3CA A":{
        "text":["If I’m being completely honest… I don’t really have anything to give you.","Heh heh… sorry.","The atmosphere feels tense, like it's crushing you for being so petty. The landlord stands there for a few moments before responding.","sigh","You look really pathetic right now, you know that.","What a pitiful sight for a vampire.","I know that you're not really a bad person… even if you pay your rent late.","So… why don’t you tell me more about yourself?"],
        "leftSprite":["SorenNM.png","SorenNM.png",null,null,null,null,null,null],
        "rightSprite":[null,null,null,"Landlord.png","Landlord.png","Landlord.png","Landlord.png","Landlord.png"],
        "background":["apartmentBG.png",null,null,null,null,null,null,null],
        "CGmode":["off","off","off","off","off","off","off","off"],
        "speaker":["Soren","Soren","Narrator","Landlord","Landlord","Landlord","Landlord","Landlord"],
        "tagPosition":["left","left",null,"right","right","right","right","right"],
        "combat":[null,null,null,null,null,null,null,null],
        "ending":[null,null,null,null,null,null,null,null],
        "interrogation":[null,null,null,null,null,null,null,null],
        "suspicion":[null,null,null,null,null,null,null,null]
    },
    "3CAA A": {
        "text": ["How do I start…","Well, as you can tell, I’m actually a vampire, and…","You tell the landlord about your life story. How you randomly came into consciousness and being in the middle of the woods one day, and how you observed and eventually acclimated to human society.","You also talk about your part-time job at Grill Bros and how you’re barely scraping by to pay rent, not really related to your story as a vampire, but important nonetheless.","Interesting. I don’t know much about vampires, but your story definitely isn’t something I think you’d usually expect.","The city’s been getting more cautious about vampires lately, so I was surprised that there was one just under my nose this whole time.","Just know, I’m obligated to report seeing you to the Daylight Savings Corps so they don’t think I’m suspicious.","I’ll let you stay here in another apartment, but I recommend you change your identity somehow if vampires have some way to do that.","(Not sure if every vampire can do it, but I can shapeshift…)","Also, before I forget.","The landlord rips off a Post-it note from a stack he kept in his jacket pocket and scribbles something down. He hands it to you.","Here, this is my phone number. You can call me if you ever need help.","You’re different than what the Corp's been saying about vampires, so I hope we can help each other out from now on.","Right, thank you for keeping my secret.","I’ll be taking my leave. I’ll handle the situation with your new apartment tomorrow. You know where to find me, and remember to call.","You nod in affirmation before the landlord leaves the apartment, closing the front door behind him.","You reflect on the events that just transpired.","It would probably be useful to take the landlord’s advice.","You walk into the bathroom and take a good look at yourself in the mirror.",".","(The landlord is right. It’s time to take on a new identity, and plus, it feels like I’ve opened the page to a new chapter in my life.)","Who will you become?"],
        "leftSprite": ["SorenNM.png","SorenNM.png",null,null,null,null,null,null,"SorenNM.png",null,null,null,null,"SorenNM.png",null,null,null,null,null,null,null,null],
        "rightSprite": [null,null,null,null,"Landlord.png","Landlord.png","Landlord.png","Landlord.png",null,"Landlord.png",null,"Landlord.png","Landlord.png",null,"Landlord.png",null,null,null,null,null,null,null],
        "background": ["apartmentBG.png",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"darkBG.png","sorenMirrorCG.png",null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","on","off","off"],
        "speaker": ["Soren","Soren","Narrator","Narrator","Landlord","Landlord","Landlord","Landlord","Soren","Landlord","Narrator","Landlord","Landlord","Soren","Landlord","Narrator","Narrator","Narrator","Narrator","Narrator","Soren","Narrator"],
        "tagPosition": ["left","left",null,null,"right","right","right","right","left","right",null,"right","right","left","right",null,null,null,null,null,"left",null],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "3C B": {
        "text": ["H-how about this!","If you don’t tell anyone a word about this, then I’ll reward you!","A reward? Like what?"],
        "leftSprite": ["SorenNM.png","SorenNM.png",null],
        "rightSprite": [null,null,"Landlord.png"],
        "background": ["apartmentBG.png",null,null],
        "CGmode": ["off","off","off"],
        "speaker": ["Soren","Soren","Landlord"],
        "tagPosition": ["left","left","right"],
        "combat": [null,null,null],
        "ending": [null,null,null],
        "suspicion": [null,null,null],
        "interrogation": [null,null,null]
    },
    "4A A": {
        "text": ["You begin shapeshifting your form to something more akin to your liking.","You feel your hair grow out, and your body become slightly smaller.",".","Hm… this form will do. It feels more like me.","Oddly enough, I feel more friendly than I did before.","You spend a few days wandering the outskirts of the city, lurking in the edges of the forest while trying to find a new place to call home.","Eventually, you find an abandoned house in a… shabby neighborhood to say the least. It’s a place a decent amount further from the center of the city, unlike before. It seems like the previous residents had just moved out.","This place actually seems pretty nice.","It looks bad from the outside, but the inside is actually well-maintained. You could even say it’s an upgrade compared to that old apartment.","I guess its safe to say I’ve found a new home.","As a few weeks pass by, you eventually incorporate yourself back into society as your new identity, Alice. Lately, however, you’ve been hearing rumors of a new vampire having been discovered in the city lately.","This vampire is likely you, and those rumors must have been spreading due to your situation with your previous Landlord. (Suspicion +20)","Now, a month into your new life, a recurring problem arises.","Ah. This is the last of my blood bags...","Wow. This isn’t a fun situation to be in.","I should deal with this tonight, but the question is how…"],
        "leftSprite": [null,null,null,null,null,null,null,"alice.png","alice.png","aliceHappy.png",null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "background": ["darkBG.png",null,"aliceWetlandCG.png",null,null,"forestBG.png","darkBG.png","houseBG.png",null,null,"darkBG.png",null,null,"houseBG.png",null,null],
        "CGmode": ["off","off","on","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Alice","Alice","Narrator","Narrator","Alice","Alice","Alice","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,"left","left",null,null,"left","left","left",null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "4A B": {
        "text": ["You begin shapeshifting your form to something more akin to your liking.","You feel your hair get shorter, and your shoulders become broader..",".","Hm… this form will do. It feels more like me.","For some reason, I suddenly feel tired.","You spend a few days wandering the outskirts of the city, lurking in the edges of the forest while trying to find a new place to call home.","Eventually, you find an abandoned house in a… shabby neighborhood to say the least. It’s a place a decent amount further from the center of the city, unlike before. It seems like the previous residents had just moved out.","This place doesn’t seem too bad.","It looks ugly from the outside, but the inside is pretty furnished. You could even say it’s an upgrade compared to that trashy apartment I used to live in.","Guess I can settle down here for now.","As a few weeks pass by, you eventually incorporate yourself back into society as your new identity, Aaron. Lately, however, you’ve been hearing rumors of a new vampire having been discovered in the city lately.","This vampire is likely you, and those rumors must have been spreading due to your situation with your previous Landlord. (Suspicion +20)","Now, a month into your new life, a recurring problem arises.","This is my last blood bag, huh.","I never really thought about what I would do after I ran out.","I should deal with this tonight, but the question is how…"],
        "leftSprite": [null,null,null,null,null,null,null,"aaron.png","aaron.png","aaron.png",null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "background": ["darkBG.png",null,"aaronWetlandCG.png",null,null,"forestBG.png","darkBG.png","houseBG.png",null,null,"darkBG.png",null,null,"houseBG.png",null,null],
        "CGmode": ["off","off","on","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Aaron","Aaron","Narrator","Narrator","Aaron","Aaron","Aaron","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,null,null,"left","left",null,null,"left","left","left",null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "4A C": {
        "text": ["You make the decision to not fix yourself to a certain identity.",".","Maybe I don’t wanna decide yet. I’ll just be whoever I want, whenever I want.","Yeah… that sounds more like me.","It feels like, due to your unstable identity, your actions won’t garner you as much suspicion.","You spend a few days wandering the outskirts of the city, lurking in the edges of the forest while trying to find a new place to call home.","Eventually, you find an abandoned house in a… shabby neighborhood to say the least. It’s a place a decent amount further from the center of the city, unlike before. It seems like the previous residents had just moved out.","Hm… not a bad place.","It looks pretty beat up from the outside, but the inside is pretty alright I guess. You could even say it’s an upgrade compared to that apartment I used to live in.","I’ll call this place my home for the time being.","As a few weeks pass by, you eventually incorporate yourself back into society. Lately, however, you’ve been hearing rumors of a new vampire having been discovered in the city lately.","This vampire is likely you, and those rumors must have been spreading due to your situation with your previous Landlord. (Suspicion +10)","Now, a month into your new life, a recurring problem arises.","Oof. this is the last blood bag.","I didn’t think about what to do when I run out.","I should deal with this tonight, but the question is how…"],
        "leftSprite": [null,null,"ghost.png","ghost.png",null,null,null,"ghost.png","ghost.png","ghost.png",null,null,null,"ghost.png","ghost.png","ghost.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "background": ["darkBG.png","ghostWetlandCG.png",null,null,null,"forestBG.png","darkBG.png","houseBG.png",null,null,"darkBG.png",null,null,"houseBG.png",null,null],
        "CGmode": ["off","on","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Soren?","Soren?","Narrator","Narrator","Narrator","Soren?","Soren?","Soren?","Narrator","Narrator","Narrator","Soren?","Soren?","Soren?"],
        "tagPosition": [null,null,"left","left",null,null,null,"left","left","left",null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,10,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5 A": {
        "text": ["Now that I think about it, I’m pretty sure that there was a hospital not too far from here.","I suppose I’ll have to give that place a visit.","That night, you break into a local hospital, and steal a whole cooler full of bloodbags.","It was fairly easy for you to infiltrate the place despite security at night due to the use of your bat transformation.","Despite what many may think. Vampires actually retain the same physical strength that they normally have even in bat form, so flying the cooler out the hospital’s window was no problem for you.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": ["alice.png","alice.png",null,null,null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["houseBG.png",null,"darkBG.png",null,null,null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Alice","Alice","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": ["left","left",null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5 B": {
        "text": ["Well, I think its time to give the Black Market another visit.","I’m not that familiar with the area around here yet, but I know that the Market finds its way everywhere.","That night, you search all the dark alleyways around the neighborhood and around your area of the city.","You eventually come across a figure in a brown cloak. He wears a big hood that causes his face to be completely hidden.","Are you the “Dealer” in this area?","Yes… yes I am…","Have you come to seek my wares…?","Why do you talk like that? The other dealer I used to know talked normal.","…It’s for the effect. Now, don’t say anymore or you’ll ruin it.","Alright… well anyway, I’m here to buy some blood bags. Like the ones you find in the hospital.","Hm… I see… I have just what you need, but you need to pay me 20% of your vitality.","Eh? Not cash?","You see… every dealer decides their payment method. This one is mine…","Now… are you going to hand over your vitality or not?","Hm… should I really accept this offer?"],
        "leftSprite": ["aliceHappy.png","alice.png",null,null,"alice.png",null,null,"aliceSad.png",null,"alice.png",null,"alice.png",null,null,"aliceSad.png"],
        "rightSprite": [null,null,null,null,null,"dealer.png","dealer.png",null,null,null,"dealer.png",null,"dealer.png","dealer.png",null],
        "background": ["houseBG.png",null,"alleyNightBG.png",null,null,null,null,null,null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Alice","Alice","Narrator","Narrator","Alice","Dealer","Dealer","Alice","Dealer","Alice","Dealer","Alice","Dealer","Dealer","Alice"],
        "tagPosition": ["left","left",null,null,"left","right","right","left","right","left","right","left","right","right","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5B A": {
        "text": ["Sorry, but I don’t think I can pay your price.","I’ll just have to take those blood bags forcefully.","Another… unwilling client… so be it.","The Dealer takes out a dagger from one of the pockets within his cloak and stands ready for your attack.","."],
        "leftSprite": ["alice.png","aliceHappy.png",null,null,null],
        "rightSprite": [null,null,"dealer.png",null,null],
        "background": ["alleyNightBG.png",null,null,null,"alleyNightCombatBG.png"],
        "CGmode": ["off","off","off","off","off"],
        "speaker": ["Alice","Alice","Dealer","Narrator","Narrator"],
        "tagPosition": ["left","left","right",null,null],
        "combat": [null,null,null,null,["aliceCombatNight.png", ["Dealer", "The Dealer stands ready with his dagger, prepared to attack", 70, 10, 5, [10, 3, 3], "dealerCombatNight.png", true, 3, false, false]]],
        "ending": [null,null,null,null,null],
        "suspicion": [null,null,null,null,null],
        "interrogation": [null,null,null,null,null]
    },
    "AliceNL5B A kill": {
        "text": ["You finish off the dealer with a blow to the head. He collapses to the floor, lifeless and unmoving.","He was tougher than he looked…","Anyway, lets get these blood bags.","You search the Dealer’s body for blood bags. He carried a wide assortment of items, much more than what it looked like his cloak would fit, but then you finally find what you were looking for.","Perfect! Just what I was looking for.","You leave the Dealer’s body on the floor as you make your way back to your residence. The Black Market does its best to keep itself hidden, so you aren’t worried about the clean-up.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,"aliceSad.png","alice.png",null,"aliceHappy.png",null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Alice","Alice","Narrator","Alice","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,"left","left",null,"left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5B A spare": {
        "text": ["You stand there and tank all of the Dealer’s hits without doing anything.","What are you doing?! Didn’t you say that you were going to take my wares forcefully?","What are you doing just standing there?! Are you an idiot?","You wonder yourself why you resolved yourself to kill this guy, but ended up not doing anything in the end.","Well… I just had a change of heart if you know what I mean.","Tee hee.","Oh my god. You actually must be stupid.","Just take the blood bags and go. The blood you dripped yourself onto the floor has more than enough vitality than I initially asked for.","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Oh, thank you. I’ll go now.","Yes, please! Many say that I am eccentric, but you are borderline crazy! Please just go!","You leave the Dealer in the alley as he collects your blood off the floor. The stabs from his dagger really did hurt, but you played it off really well.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,null,"alice.png","aliceHappy.png",null,null,null,"aliceHappy.png",null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,"dealer.png","dealer.png",null,null,null,"dealer.png","dealer.png",null,null,"dealer.png",null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Dealer","Dealer","Narrator","Alice","Alice","Dealer","Dealer","Narrator","Alice","Dealer","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,"right","right",null,"left","left","right","right",null,"left","right",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5B B": {
        "text": ["Okay. I’ll give you 20% of my vitality.","Perfect… please reach your arm out.","You do as the dealer says and reach out your arm. He takes out a syringe and pricks it into one of your veins, drawing out blood.","After he is done, your arm feels cold momentarily, but the feeling quickly goes away.","Thank you for your business…","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Now go… stay any longer and we could be discovered…","Yes, thank you for your service.","The Dealer seems to like you. You have befriended the Dealer.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": ["alice.png",null,null,null,null,null,null,"aliceHappy.png",null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,"dealer.png",null,null,"dealer.png",null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Alice","Dealer","Narrator","Narrator","Dealer","Narrator","Dealer","Alice","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": ["left","right",null,null,"right",null,"right","left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5B C": {
        "text": ["You attempt to haggle with the Dealer in order to lower the price. You attempt to make yourself look pleasant.","Come on… can’t you lower the price a little bit for me?","Pleeeaaase, Mr. Dealer Sir. I know you want to…","It seems to be… very effective?","Ehem… well… this isn’t usually part of my protocol…","But just for you, I can lower the price to just 5% of your vitality.","Nice!","This guy… is too easy to please."],
        "leftSprite": [null,"aliceBlush.png","aliceBlush.png",null,null,null,"aliceHappy.png",null],
        "rightSprite": [null,null,null,null,"dealer.png","dealer.png",null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Alice","Alice","Narrator","Dealer","Dealer","Alice","Narrator"],
        "tagPosition": [null,"left","left",null,"right","right","left",null],
        "combat": [null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null]
    },
    "AliceNL5BC B": {
        "text": ["Okay. I’ll give you 5% of my vitality.","Perfect… please reach your arm out.","You do as the dealer says and reach out your arm. He takes out a syringe and pricks it into one of your veins, drawing out blood.","After he is done, your arm feels cold momentarily, but the feeling quickly goes away.","Thank you for your business…","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Now go… stay any longer and we could be discovered…","Yes, thank you for your service.","The Dealer seems to like you. You have befriended the Dealer.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": ["alice.png",null,null,null,null,null,null,"aliceHappy.png",null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,"dealer.png",null,null,"dealer.png",null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Alice","Dealer","Narrator","Narrator","Dealer","Narrator","Dealer","Alice","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": ["left","right",null,null,"right",null,"right","left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5BC C": {
        "text": ["You attempt to haggle the Dealer further.","Thank you Mr. Dealer, but can you lower it just a little… more…","Okay okay… I see whats going on here…","I’m not that stupid, alright. 10% of your vitality. Take it or leave it…","Aww…"],
        "leftSprite": [null,"aliceBlush.png",null,null,"aliceSad.png"],
        "rightSprite": [null,null,"dealer.png","dealer.png",null],
        "background": ["alleyNightBG.png",null,null,null,null],
        "CGmode": ["off","off","off","off","off"],
        "speaker": ["Narrator","Alice","Dealer","Dealer","Alice"],
        "tagPosition": [null,"left","right","right","left"],
        "combat": [null,null,null,null,null],
        "ending": [null,null,null,null,null],
        "suspicion": [null,null,null,null,null],
        "interrogation": [null,null,null,null,null]
    },
    "AliceNL5BCC B": {
        "text": ["Okay. I’ll give you 10% of my vitality.","Perfect… please reach your arm out.","You do as the dealer says and reach out your arm. He takes out a syringe and pricks it into one of your veins, drawing out blood.","After he is done, your arm feels cold momentarily, but the feeling quickly goes away.","Thank you for your business…","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Now go… stay any longer and we could be discovered…","Yes, thank you for your service.","The Dealer seems to like you. You have befriended the Dealer.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": ["alice.png",null,null,null,null,null,null,"aliceHappy.png",null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,"dealer.png",null,null,"dealer.png",null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Alice","Dealer","Narrator","Narrator","Dealer","Narrator","Dealer","Alice","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": ["left","right",null,null,"right",null,"right","left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5 C": {
        "text": ["I think its time I go on a hunt! After all, wouldn’t it taste best if it came straight from the source?","That night, you decide to go wander the streets for an unsuspecting victim.","The streets are mostly empty, but you manage to patrol around and find a spot where you find three enticing targets.","So… I can choose between that elderly man on the bench over there, the boy who just left the playground, or the business-woman who looks like she’s on the way to the train station.","She looks really tired. I feel bad for her. I wonder if she’s being overworked.","Now you must choose. Who will you hunt?"],
        "leftSprite": ["aliceHappy.png",null,null,"alice.png","aliceSad.png",null],
        "rightSprite": [null,null,null,null,null,null],
        "background": ["houseBG.png","darkBG.png","streetNightBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off"],
        "speaker": ["Alice","Narrator","Narrator","Alice","Alice","Narrator"],
        "tagPosition": ["left",null,null,"left","left",null],
        "combat": [null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null]
    },
    "AliceNL5C A": {
        "text": ["You approach the elderly man on the bench, bareing your fangs.","."],
        "leftSprite": [null,null],
        "rightSprite": [null,null],
        "background": ["streetNightBG.png","streetNightCombatBG.png"],
        "CGmode": ["off","off"],
        "speaker": ["Narrator","Narrator"],
        "tagPosition": [null,null],
        "combat": [null,["aliceCombatNight.png", ["Elderly Man", "The Elderly Man sits on his bench, unaware of what is happening", 5, 1, 0, [5, 1, 1], "elderlyManNight.png", true, 1, true, true]]],
        "ending": [null,null],
        "suspicion": [null,null],
        "interrogation": [null,null]
    },
    "AliceNL5C A kill": {
        "text": ["Without giving him time to think, you bite down on the elderly man’s neck, even as he is seated on the bench.","The elderly man falls unconscious from the shock coming of the bite. What a weakling, huh.","You suck the blood out of the elderly man’s body for a few minutes. You don’t stop until there is nothing left…","After you are done with him, he ends up looking a shriveled up, mummified corpse on the bench he was sitting on.","His body breaks apart like its made of ashes, so you grind it with your hands and let his dust fly by the wind into the cold night air.","A few days pass since you hunted that old man. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C A spare": {
        "text": ["For some reason, you let the old man flee. Now, you have no way to get the blood you need.","Why did I do that? Well… time for plan B then.","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,"aliceSad.png",null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Alice","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C A sleep": {
        "text": ["The old man lies sleeping on his bench after being sedated with the Sleeping Pill. You feel compelled to leave him alone, as you didn't hunt him with your own two hands.","Well… time for plan B then.","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,"aliceSad.png",null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Alice","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C B": {
        "text": ["You approach the boy, blocking him from moving past you on the sidewalk. You bare your fangs.","He looks at you oddly… almost in awe at your appearance. Not the way that a kid who is about to die should look…","."],
        "leftSprite": [null,null,null],
        "rightSprite": [null,null,null],
        "background": ["streetNightBG.png",null,"streetNightCombatBG.png"],
        "CGmode": ["off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator"],
        "tagPosition": [null,null,null],
        "combat": [null,null,["aliceCombatNight.png", ["Little Boy", "Little Boy looks at you, frozen in place due to your stunning appearance", 3, 1, 1, [5, 1, 1], "littleBoyNight.png", true, 1, true, true]]],
        "ending": [null,null,null],
        "suspicion": [null,null,null],
        "interrogation": [null,null,null]
    },
    "AliceNL5C B kill": {
        "text": ["Even in his state of being stunned you decide to bite down on the boy’s neck.","The boy falls to his knees, and he falls unconscious as you begin to draw the blood from his body.","You suck the blood out the boy’s blood for a few minutes. You don’t stop until there is nothing left…","After you are done with him, the boy’s body looks completely pale and lifeless as it lies on the ground.","You bury the boy’s body in a nearby river, but you make sure to bury it deep under the sediment to make sure nobody ever finds it.","A few days pass since you hunted that little boy. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C B spare": {
        "text": ["You step aside and leave open the path to the rest of the sidewalk. You smile at the boy and gesture him to go on.","The boy looks at you for another moment before breaking out of his trance of admiration, and he scuttles along down the sidewalk, leaving you alone.","Now, you have no way to get the blood you need.","Why did I do that? Well… time for plan B then.","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,"aliceSad.png",null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Alice","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C B sleep": {
        "text": ["The boy lies on the ground of the sidewalk after being sedated by the Sleeping Pill.","You feel compelled to leave him be, as you didn't hunt him with your own two hands. You walk away.","Now, you have no way to get the blood you need.","Well… time for plan B then.","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,"aliceSad.png",null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Alice","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C C": {
        "text": ["You approach the tired business-woman, blocking her path on the sidewalk. You bare your fangs at her.","The woman seems fairly calm despite realizing that you are a vampire, odd…","She only sighs tiredly before… taking out a katana?!","It looks like you’ve got your hands full. This lady is a hunter from the Daylight Savings Corps.","She doesn’t seem like a weak one at that.","Good luck…","."],
        "leftSprite": [null,null,null,null,null,null,null],
        "rightSprite": [null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,null,null,"streetNightCombatBG.png"],
        "CGmode": ["off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator"],
        "tagPosition": [null,null,null,null,null,null,null],
        "combat": [null,null,null,null,null,null,["aliceCombatNight.png", ["Off-Duty Hunter", "Tired Business Woman reveals herself as an Off-Duty Hunter!", 120, 15, 10, [20, 10, 10], "tiredBusinessWomanNight.png", true, 3, true, true]]],
        "ending": [null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null]
    },
    "AliceNL5C C kill": {
        "text": ["It was a tough battle, but you manage to finish off the woman with a blow to the ribcage.","The lady falls to her knees, fighting to stay conscious. She finally gives in an collapses to the floor.","You walk over a begin sucking the lady’s blood from her body, and you drink hungrily. It was a well-earned meal after all.","After you are done with her, the lady’s body is essentially skin and bones. Even when there was no blood left, you kept drinking. She doesn’t even look human anymore.","You bury the lady’s body in a nearby river, but you make sure to bury it deep under the sediment to make sure nobody ever finds it.","A few days pass since you hunted that Hunter lady. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C C spare": {
        "text": ["The Off-Duty Hunter flees to catch the train that was pulling into the train station after realizing that you don’t hold any aggression towards her.","I guess she was just too tired to deal with you, since it didn’t seem like you were hurting anybody anyway.","Now, you have no way to get the blood you need.","Why did I do that? Well… time for plan B then.","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,"aliceSad.png",null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Alice","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,20,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AliceNL5C C sleep": {
        "text": ["The Off-Duty Hunter lies on the ground after being sedated with the Sleeping Pill.","You are compelled to leave her there, alone, as you didn't defeat her with your own two hands. You leave.","Now, you have no way to get the blood you need.","Well… time for plan B then.","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… I’m kind of worried.","Everytime I leave the house recently, the neighbor looks at me weird. Could they be suspicious that I’m a vampire?","I should really do something about it, but what can I do?"],
        "leftSprite": [null,null,null,"aliceSad.png",null,null,null,null,"aliceSad.png","aliceSad.png","aliceSad.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Alice","Narrator","Narrator","Narrator","Narrator","Alice","Alice","Alice"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,20,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5 A": {
        "text": ["Now that I think about it, I’m pretty sure that there was a hospital not too far from here.","I’ll just go and get blood from there.","That night, you break into a local hospital, and steal a whole cooler full of bloodbags.","It was fairly easy for you to infiltrate the place despite security at night due to the use of your bat transformation.","Despite what many may think. Vampires actually retain the same physical strength that they normally have even in bat form, so flying the cooler out the hospital’s window was no problem for you.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": ["aaron.png","aaron.png",null,null,null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": [null,null,"darkBG.png",null,null,null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Aaron","Aaron","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": ["left","left",null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5 B": {
        "text": ["Well, I think its time to give the Black Market another visit.","I don’t know who the dealer is around here, but I bet I could find him.","That night, you search all the dark alleyways around the neighborhood and around your area of the city.","You eventually come across a figure in a brown cloak. He wears a big hood that causes his face to be completely hidden.","Are you the “Dealer” here?","Yes… yes I am…","Have you come to seek my wares…?","Why are you talking funny? Are you good?","…It’s for the effect. Now, don’t say anymore or you’ll ruin it.","Whatever. I’m here to buy blood bags. The kind you find at the hospital.","Hm… I see… I have just what you need, but you need to pay me 20% of your vitality.","Huh? Not asking for money?","You see… every dealer decides their payment method. This one is mine…","Now… are you going to hand over your vitality or not?","Hm… give me a minute to think."],
        "leftSprite": ["aaron.png","aaron.png",null,null,"aaron.png",null,null,"aaronFrustrated.png",null,"aaron.png",null,"aaron.png",null,null,"aaron.png"],
        "rightSprite": [null,null,null,null,null,"dealer.png","dealer.png",null,null,null,"dealer.png",null,"dealer.png","dealer.png",null],
        "background": ["houseBG.png",null,"alleyNightBG.png",null,null,null,null,null,null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Aaron","Aaron","Narrator","Narrator","Aaron","Dealer","Dealer","Aaron","Dealer","Aaron","Dealer","Aaron","Dealer","Dealer","Aaron"],
        "tagPosition": ["left","left",null,null,"left","right","right","left","right","left","right","left","right","right","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5B A": {
        "text": ["No way I’m paying that price.","I’ll just kill you for it.","Another… unwilling client… so be it.","The Dealer takes out a dagger from one of the pockets within his cloak and stands ready for your attack.","."],
        "leftSprite": ["aaron.png","aaron.png",null,null,null],
        "rightSprite": [null,null,"dealer.png",null,null],
        "background": ["alleyNightBG.png",null,null,null,"alleyNightCombatBG.png"],
        "CGmode": ["off","off","off","off","off"],
        "speaker": ["Aaron","Aaron","Dealer","Narrator","Narrator"],
        "tagPosition": ["left","left","right",null,null],
        "combat": [null,null,null,null,["aaronCombatNight.png", ["Dealer", "The Dealer stands ready with his dagger, prepared to attack", 70, 10, 5, [10, 3, 3], "dealerCombatNight.png", true, 3, false, false]]],
        "ending": [null,null,null,null,null],
        "suspicion": [null,null,null,null,null],
        "interrogation": [null,null,null,null,null]
    },
    "AaronNL5B A kill": {
        "text": ["You finish off the dealer with a blow to the head. He collapses to the floor, lifeless and unmoving.","He was tougher than he looked…","Anyway, lets get these blood bags.","You search the Dealer’s body for blood bags. He carried a wide assortment of items, much more than what it looked like his cloak would fit, but then you finally find what you were looking for.","Found it.","You leave the Dealer’s body on the floor as you make your way back to your residence. The Black Market does its best to keep itself hidden, so you aren’t worried about the clean-up.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": ["aaron.png","aaronFrustrated.png","aaron.png",null,null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,"darkBG.png","houseBG.png",null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Aaron","Aaron","Narrator","Alice","Narrator","Narrator","Aaron","Aaron","Aaron","Aaron"],
        "tagPosition": [null,"left","left",null,"left",null,null,"left","left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5B A spare": {
        "text": ["You stand there and tank all of the Dealer’s hits without doing anything.","What are you doing?! Didn’t you say that you were going to kill me?","What are you doing just standing there?! Are you an idiot?","You wonder yourself why you resolved yourself to kill this guy, but ended up not doing anything in the end.","Well… I changed my mind I guess.","Is there something wrong with that…?","Oh my god. You actually must be stupid.","Just take the blood bags and go. The blood you dripped yourself onto the floor has more than enough vitality than I initially asked for.","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Cool. I’m going now.","Yes, please! Many say that I am eccentric, but you are borderline crazy! Please just go!","You leave the Dealer in the alley as he collects your blood off the floor. The stabs from his dagger really did hurt, but you played it off really well.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": ["aaron.png",null,null,null,"aaron.png","aaronFrustrated.png",null,null,null,"aaron.png",null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,"dealer.png","dealer.png",null,null,null,"dealer.png",null,null,null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Dealer","Dealer","Narrator","Aaron","Alice","Dealer","Dealer","Narrator","Aaron","Dealer","Narrator","Narrator","Aaron","Aaron","Aaron","Aaron"],
        "tagPosition": [null,"right","right",null,"left","left","right","right",null,"left","right",null,null,"left","left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5B B": {
        "text": ["Fine. I’ll pay 20% of my vitality.","Perfect… please reach your arm out.","You do as the dealer says and reach out your arm. He takes out a syringe and pricks it into one of your veins, drawing out blood.","After he is done, your arm feels cold momentarily, but the feeling quickly goes away.","Thank you for your business…","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Now go… stay any longer and we could be discovered…","Yeah, I know. I’m leaving.","The Dealer seems to tolerate you. You have befriended the Dealer.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": ["aaron.png",null,null,null,null,null,null,"aaron.png",null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,"dealer.png",null,null,"dealer.png",null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Aaron","Dealer","Narrator","Narrator","Dealer","Narrator","Dealer","Aaron","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": ["left","right",null,null,"right",null,"right","left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5B C": {
        "text": ["You attempt to haggle with the Dealer in order to lower the price. You try to intimidate him.","Oi… isn’t that price a little bit too high.","Your gonna get yourself in trouble with your clients if you charge that much…","It seems to be effective.","…I’m not trying to get into any fights.","I’ll settle for 15% of your vitality…","Good.","I’m surprised that worked."],
        "leftSprite": [null,"aaron.png","aaronFrustrated.png",null,null,null,"aaron.png",null],
        "rightSprite": [null,null,null,null,"dealer.png","dealer.png",null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Aaron","Aaron","Narrator","Dealer","Dealer","Aaron","Narrator"],
        "tagPosition": [null,"left","left",null,"right","right","left",null],
        "combat": [null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null]
    },
    "AaronNL5BC B": {
        "text": ["Fine. I’ll pay 15% of my vitality.","Perfect… please reach your arm out.","You do as the dealer says and reach out your arm. He takes out a syringe and pricks it into one of your veins, drawing out blood.","After he is done, your arm feels cold momentarily, but the feeling quickly goes away.","Thank you for your business…","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Now go… stay any longer and we could be discovered…","Yeah, I know. I’m leaving.","The Dealer seems to tolerate you. You have befriended the Dealer.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": ["aaron.png",null,null,null,null,null,null,"aaron.png",null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,"dealer.png",null,null,"dealer.png",null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Aaron","Dealer","Narrator","Narrator","Dealer","Narrator","Dealer","Aaron","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": ["left","right",null,null,"right",null,"right","left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5BC C": {
        "text": ["You attempt to haggle the Dealer further.","The price is still high. It’s like you’re asking for a fight.","Okay okay… I see whats going on here…","I’m not that stupid, alright. 18% of your vitality. Take it or leave it…","Dang it…"],
        "leftSprite": [null,"aaronFrustrated.png",null,null,"aaronFrustrated.png"],
        "rightSprite": [null,null,"dealer.png","dealer.png",null],
        "background": ["alleyNightBG.png",null,null,null,null],
        "CGmode": ["off","off","off","off","off"],
        "speaker": ["Narrator","Aaron","Dealer","Dealer","Aaron"],
        "tagPosition": [null,"left","right","right","left"],
        "combat": [null,null,null,null,null],
        "ending": [null,null,null,null,null],
        "suspicion": [null,null,null,null,null],
        "interrogation": [null,null,null,null,null]
    },
    "AaronNL5BCC B": {
        "text": ["Fine. I’ll pay 18% of my vitality.","Perfect… please reach your arm out.","You do as the dealer says and reach out your arm. He takes out a syringe and pricks it into one of your veins, drawing out blood.","After he is done, your arm feels cold momentarily, but the feeling quickly goes away.","Thank you for your business…","The Dealer tosses a backpack full of blood bags on the floor in front of you.","Now go… stay any longer and we could be discovered…","Yeah, I know. I’m leaving.","The Dealer seems to tolerate you. You have befriended the Dealer.","A few days pass since your encounter with the Dealer. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": ["aaron.png",null,null,null,null,null,null,"aaron.png",null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,"dealer.png",null,null,"dealer.png",null,"dealer.png",null,null,null,null,null,null],
        "background": ["alleyNightBG.png",null,null,null,null,null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Aaron","Dealer","Narrator","Narrator","Dealer","Narrator","Dealer","Aaron","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": ["left","right",null,null,"right",null,"right","left",null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5 C": {
        "text": ["I guess its about time I hunt for once. Blood tastes best from the source after all.","That night, you decide to go wander the streets for an unsuspecting victim.","The streets are mostly empty, but you manage to patrol around and find a spot where you find three enticing targets.","So… I got between that elderly man on the bench over there, the boy who just left the playground, or the business-woman who looks like she’s on the way to the train station.","Looks like her life sucks. She looks really tired.","Now you must choose. Who will you hunt?"],
        "leftSprite": ["aaron.png",null,null,"aaron.png","aaronFrustrated.png",null],
        "rightSprite": [null,null,null,null,null,null],
        "background": ["houseBG.png","darkBG.png","streetNightBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off"],
        "speaker": ["Aaron","Narrator","Narrator","Alice","Alice","Narrator"],
        "tagPosition": ["left",null,null,"left","left",null],
        "combat": [null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null]
    },
    "AaronNL5C A": {
        "text": ["You approach the elderly man on the bench, bareing your fangs.","."],
        "leftSprite": [null,null],
        "rightSprite": [null,null],
        "background": ["streetNightBG.png","streetNightCombatBG.png"],
        "CGmode": ["off","off"],
        "speaker": ["Narrator","Narrator"],
        "tagPosition": [null,null],
        "combat": [null,["aaronCombatNight.png", ["Elderly Man", "The Elderly Man sits on his bench, unaware of what is happening", 5, 1, 0, [5, 1, 1], "elderlyManNight.png", true, 1, true, true]]],
        "ending": [null,null],
        "suspicion": [null,null],
        "interrogation": [null,null]
    },
    "AaronNL5C A kill": {
        "text": ["Without giving him time to think, you bite down on the elderly man’s neck, even as he is seated on the bench.","The elderly man falls unconscious from the shock coming of the bite. What a weakling, huh.","You suck the blood out of the elderly man’s body for a few minutes. You don’t stop until there is nothing left…","After you are done with him, he ends up looking a shriveled up, mummified corpse on the bench he was sitting on.","His body breaks apart like its made of ashes, so you grind it with your hands and let his dust fly by the wind into the cold night air.","A few days pass since you hunted that old man. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,null,null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5C A spare": {
        "text": ["For some reason, you let the old man flee. Now, you have no way to get the blood you need.","Why’d I do that? Guess its time for plan B…","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,"aaron.png",null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNight.png",null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Aaron","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5C A sleep": {
        "text": ["The old man lies sleeping on his bench after being sedated with the Sleeping Pill. You feel compelled to leave him alone, as you didn't hunt him with your own two hands.","Guess its time for plan B…","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,"aaron.png",null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNight.png",null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Aaron","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,20,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5C B": {
        "text": ["You approach the boy, blocking him from moving past you on the sidewalk. You bare your fangs.","He looks frightened, and he immediately dashes away in the other direction, much faster than you expected. You are left alone.","Now, you have no way to get the blood you need.","Guess its time for plan B…","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,null,null,"aaron.png",null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Aaron","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5C C": {
        "text": ["You approach the tired business-woman, blocking her path on the sidewalk. You bare your fangs at her.","The woman seems fairly calm despite realizing that you are a vampire, odd…","She only sighs tiredly before… taking out a katana?!","It looks like you’ve got your hands full. This lady is a hunter from the Daylight Savings Corps.","She doesn’t seem like a weak one at that.","Good luck…","."],
        "leftSprite": [null,null,null,null,null,null,null],
        "rightSprite": [null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,null,null,"streetNightCombatBG.png"],
        "CGmode": ["off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Narrator"],
        "tagPosition": [null,null,null,null,null,null,null],
        "combat": [null,null,null,null,null,null,["aaronCombatNight.png", ["Off-Duty Hunter", "Tired Business Woman reveals herself as an Off-Duty Hunter!", 120, 15, 10, [20, 10, 10], "tiredBusinessWomanNight.png", true, 3, true, true]]],
        "ending": [null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null]
    },
    "AaronNL5C C kill": {
        "text": ["It was a tough battle, but you manage to finish off the woman with a blow to the ribcage.","The lady falls to her knees, fighting to stay conscious. She finally gives in and collapses to the floor.","You walk over a begin sucking the lady’s blood from her body, and you drink hungrily. It was a well-earned meal after all.","After you are done with her, the lady’s body is essentially skin and bones. Even when there was no blood left, you kept drinking. She doesn’t even look human anymore.","You bury the lady’s body in a nearby river, but you make sure to bury it deep under the sediment to make sure nobody ever finds it.","A few days pass since you hunted that Hunter lady. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,null,null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null],
        "background": ["streetNightBG.png",null,null,null,"darkBG.png","houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,null,null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5C C spare": {
        "text": ["The Off-Duty Hunter flees to catch the train that was pulling into the train station after realizing that you don’t hold any aggression towards her.","I guess she was just too tired to deal with you, since it didn’t seem like you were hurting anybody anyway.","Now, you have no way to get the blood you need.","Why’d I do that? Guess its time for plan B…","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,null,null,"aaron.png",null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNight.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Aaron","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,20,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    },
    "AaronNL5C C sleep": {
        "text": ["The Off-Duty Hunter lies on the ground after being sedated with the Sleeping Pill.","You are compelled to leave her there, alone, as you didn't defeat her with your own two hands. You leave.","Now, you have no way to get the blood you need.","Guess its time for plan B…","Since you failed in your hunt, you decided to break into the local hospital that night instead.","It seems, though, that the hospital’s CCTV managed to record your break-in, and the incident was reported to the Daylight Savings Corp’s.","The city is now on higher alert against vampires. (Suspicion +20)","A few days pass since your break-in at the hospital. You recently have begun to notice the neighbor peeking out their house’s window, watching you, every time you leave for your new part time job at Pyramid Pizza.","Hm… its kinda annoying.","Everytime I’ve been leaving the house, the neighbor looks at me weird. Do they think I’m a vampire or something?","What should I do…"],
        "leftSprite": [null,null,null,"aaron.png",null,null,null,null,"aaronFrustrated.png","aaron.png","aaron.png"],
        "rightSprite": [null,null,null,null,null,null,null,null,null,null,null],
        "background": ["streetNight.png",null,null,null,"darkBG.png",null,null,"houseBG.png",null,null,null],
        "CGmode": ["off","off","off","off","off","off","off","off","off","off","off"],
        "speaker": ["Narrator","Narrator","Narrator","Aaron","Narrator","Narrator","Narrator","Narrator","Aaron","Aaron","Aaron"],
        "tagPosition": [null,null,null,"left",null,null,null,null,"left","left","left"],
        "combat": [null,null,null,null,null,null,null,null,null,null,null],
        "ending": [null,null,null,null,null,null,null,null,null,null,null],
        "suspicion": [null,null,null,null,null,20,null,null,null,null,null],
        "interrogation": [null,null,null,null,null,null,null,null,null,null,null]
    }
}
let choices = {
    "intro": {
        "text": ["Sure", "Absolutely not", "I'm busy"],
        "nextPath": ["1A", "1B", "1C"]
    },
    "1A": {
        "text": ["Get up and leave", "Endure the hunger", "Lure them outside and attack"],
        "nextPath": ["2A A", "2A B", "2A C"]
    },
    "1B": {
        "text": ["Attack an elderly woman nearby", "Start sprinting home", "Try to endure"],
        "nextPath": ["2B A", "2B B", "2B C"]
    },
    "1C": {
        "text": ["Attack an elderly woman nearby", "Start sprinting home", "Try to endure"],
        "nextPath": ["2B A", "2B B", "2B C"]
    },
    "2A A": {
        "text": ["Threaten them", "Attempt to bribe them", "Try to calm them down"],
        "nextPath": ["3A", "3B", "3C"]
    },
    "2A C kill": {
        "text": ["Threaten them", "Attempt to bribe them", "Try to calm them down"],
        "nextPath": ["3A", "3B", "3C"]
    },
    "2A C spare": {
        "text": ["Threaten them", "Attempt to bribe them", "Try to calm them down"],
        "nextPath": ["3A", "3B", "3C"]
    },
    "2B A kill": {
        "text": ["Threaten them", "Attempt to bribe them", "Try to calm them down"],
        "nextPath": ["3A", "3B", "3C"]
    },
    "2B A spare": {
        "text": ["Threaten them", "Attempt to bribe them", "Try to calm them down"],
        "nextPath": ["3A", "3B", "3C"]
    },
    "2B B": {
        "text": ["Threaten them", "Attempt to bribe them", "Try to calm them down"],
        "nextPath": ["3A", "3B", "3C"]
    },
    "3A": {
        "text": ["Kill them", "Knock them out", "Run"],
        "nextPath": ["3A A", "3A B", "3A C"]
    },
    "3A A kill": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4A A", "4A B", "4A C"]
    },
    "3A A spare": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4A A", "4A B", "4A C"]
    },
    "3A B": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4A A", "4A B", "4A C"]
    },
    "3A C": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4A A", "4A B", "4A C"]
    },
    "3B": {
        "text": ["Promise him money", "Promise him power", "Knock him out"],
        "nextPath": ["3B A", "3B B", "3A B"]
    },
    "3B A": {
        "text": ["Kill him", "Knock him out", "Let him leave"],
        "nextPath": ["3A A", "3A B", "3BA C"]
    },
    "3BA C": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4A A", "4A B", "4A C"]
    },
    "3B B": {
        "text": ["Kill him", "Knock him out", "Tell him you lied"],
        "nextPath": ["3A A", "3A B", "3BB C"]
    },
    "3BB C": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4A A", "4A B", "4A C"]
    },
    "3C": {
        "text": ["Plead with him to keep quiet", "Attempt to bribe him", "Knock him out"],
        "nextPath": ["3C A", "3C B", "3A B"]
    },
    "3C A": {
        "text": ["Say that you’ve got nothing to give him", "Knock him out"],
        "nextPath": ["3CA A", "3A B"]
    },
    "3CA A": {
        "text": ["Tell him how you’ve been living life", "Knock him out"],
        "nextPath": ["3CAA A", "3A B"]
    },
    "3CAA A": {
        "text": ["Become Alice", "Become Aaron", "Stay Undecided"],
        "nextPath": ["4B A", "4B B", "4B C"]
    },
    "3C B": {
        "text": ["Promise him money", "Promise him power", "Knock him out"],
        "nextPath": ["3B A", "3B B", "3A B"]
    },
    "4A A": {
        "text": ["Steal from a hospital blood bank", "Buy from the Black Market Dealer", "Hunt a human"],
        "nextPath": ["AliceNL5 A", "AliceNL5 B", "AliceNL5 C"]
    },
    "4A B": {
        "text": ["Steal from a hospital blood bank", "Buy from the Black Market Dealer", "Hunt a human"],
        "nextPath": ["AaronNL5 A", "AaronNL5 B", "AaronNL5 C"]
    },
    "4A C": {
        "text": ["Steal from a hospital blood bank", "Buy from the Black Market Dealer", "Hunt a human"],
        "nextPath": ["GhostNL5 A", "GhostNL5 B", "GhostNL5 C"]
    },
    "AliceNL5 A": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5 B": {
        "text": ["Kill him and steal the blood", "Pay 20% of your health", "Haggle"],
        "nextPath": ["AliceNL5B A", "AliceNL5B B", "AliceNL5B C"]
    },
    "AliceNL5B A kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5B A spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5B B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5B C": {
        "text": ["Kill him and steal the blood", "Pay 5% of your health", "Haggle further"],
        "nextPath": ["AliceNL5B A", "AliceNL5BC B", "AliceNL5BC C"]
    },
    "AliceNL5BC B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5BC C": {
        "text": ["Kill him and steal the blood", "Pay 10% of your health"],
        "nextPath": ["AliceNL5B A", "AliceNL5BCC B"]
    },
    "AliceNL5BCC B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5 C": {
        "text": ["The Elderly Man", "The Boy", "The Tired Business-Woman"],
        "nextPath": ["AliceNL5C A", "AliceNL5C B", "AliceNL5C C"]
    },
    "AliceNL5C A kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C A spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C A sleep": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C B kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C B spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C B sleep": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C C kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C C spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AliceNL5C C sleep": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AliceNL6 A", "AliceNL6 B", "AliceNL6 C"]
    },
    "AaronNL5 A": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5 B": {
        "text": ["Kill him and steal the blood", "Pay 20% of your health", "Haggle"],
        "nextPath": ["AaronNL5B A", "AaronNL5B B", "AaronNL5B C"]
    },
    "AaronNL5B A kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5B A spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5B B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5B C": {
        "text": ["Kill him and steal the blood", "Pay 5% of your health", "Haggle further"],
        "nextPath": ["AaronNL5B A", "AaronNL5BC B", "AaronNL5BC C"]
    },
    "AaronNL5BC B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5BC C": {
        "text": ["Kill him and steal the blood", "Pay 10% of your health"],
        "nextPath": ["AaronNL5B A", "AaronNL5BCC B"]
    },
    "AaronNL5BCC B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5 C": {
        "text": ["The Elderly Man", "The Boy", "The Tired Business-Woman"],
        "nextPath": ["AaronNL5C A", "AaronNL5C B", "AaronNL5C C"]
    },
    "AaronNL5C A kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5C A spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5C A sleep": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5C B": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5C C kill": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5C C spare": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
    "AaronNL5C C sleep": {
        "text": ["Kill them at night", "Knock on their door and ask about their behavior", "Leave them alone"],
        "nextPath": ["AaronNL6 A", "AaronNL6 B", "AaronNL6 C"]
    },
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
    if (storyStage === "2A C" && kills > continueKills) {
        storyStage = "2A C kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "2A C" && enemySpared === true) {
        storyStage = "2A C spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "2B A" && kills > continueKills) {
        storyStage = "2B A kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "2B A" && enemySpared === true) {
        storyStage = "2B A spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "3A A" && kills > continueKills) {
        playerItems.push("Premium Blood Vial");
        playerItems.push("Premium Blood Vial");
        playerItems.push("Premium Blood Vial");
        storyStage = "3A A kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "3A A" && enemySpared === true) {
        playerItems.push("Sleeping Pill");
        playerItems.push("Sleeping Pill");
        playerItems.push("Sleeping Pill");
        storyStage = "3A A spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "3A B") {
        playerItems.push("Premium Blood Vial");
        playerItems.push("Premium Blood Vial");
        playerItems.push("Premium Blood Vial");
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "3BA C" || storyStage === "3BB C") {
        playerItems.push("Sleeping Pill");
        playerItems.push("Sleeping Pill");
        playerItems.push("Sleeping Pill");
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "3CAA A") {
        playerItems.push("Landlord's Number");
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AliceNL5B A" && kills > continueKills) {
        storyStage = "AliceNL5B A kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5B A" && enemySpared === true) {
        storyStage = "AliceNL5B A spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5B B") {
        playerHealth = playerHealth - Math.floor(playerHealth * 0.2);
        if (playerHealth <= 0) {
            playerHealth = 1;
        }
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AliceNL5BC B") {
        playerHealth = playerHealth - Math.floor(playerHealth * 0.05);
        if (playerHealth <= 0) {
            playerHealth = 1;
        }
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AliceNL5BCC B") {
        playerHealth = playerHealth - Math.floor(playerHealth * 0.1);
        if (playerHealth <= 0) {
            playerHealth = 1;
        }
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AliceNL5C A" && kills > continueKills) {
        storyStage = "AliceNL5C A kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C A" && enemySpared === true) {
        storyStage = "AliceNL5C A spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C B" && kills > continueKills) {
        storyStage = "AliceNL5C B kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C B" && enemySpared === true) {
        storyStage = "AliceNL5C B spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C B" && enemySlept === true) {
        storyStage = "AliceNL5C B sleep";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C C" && kills > continueKills) {
        storyStage = "AliceNL5C C kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C C" && enemySpared === true) {
        storyStage = "AliceNL5C C spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AliceNL5C C" && enemySlept === true) {
        storyStage = "AliceNL5C C sleep";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5B A" && kills > continueKills) {
        storyStage = "AaronNL5B A kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5B A" && enemySpared === true) {
        storyStage = "AaronNL5B A spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5B B") {
        playerHealth = playerHealth - Math.floor(playerHealth * 0.2);
        if (playerHealth <= 0) {
            playerHealth = 1;
        }
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AaronNL5BC B") {
        playerHealth = playerHealth - Math.floor(playerHealth * 0.15);
        if (playerHealth <= 0) {
            playerHealth = 1;
        }
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AaronNL5BCC B") {
        playerHealth = playerHealth - Math.floor(playerHealth * 0.18);
        if (playerHealth <= 0) {
            playerHealth = 1;
        }
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } else if (storyStage === "AaronNL5C A" && kills > continueKills) {
        storyStage = "AaronNL5C A kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5C A" && enemySpared === true) {
        storyStage = "AaronNL5C A spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5C C" && kills > continueKills) {
        storyStage = "AaronNL5C C kill";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5C C" && enemySpared === true) {
        storyStage = "AaronNL5C C spare";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else if (storyStage === "AaronNL5C C" && enemySlept === true) {
        storyStage = "AaronNL5C C sleep";
        dialogueTracker = -1;
        currentPage = "dialogue";
        setPage();
        advanceStory();
    } else {
        setUpChoices();
        choiceOverlay.style = "display: flex";
    } 
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
        leftSprite.src = `assets/${storyObject[storyStage].leftSprite[dialogueTracker]}`;
        leftSprite.style = "visibility: visible;";
    } else {
        leftSprite.style = "visibility: hidden;";
    }
    if (storyObject[storyStage].rightSprite[dialogueTracker]) {
        rightSprite.src = `assets/${storyObject[storyStage].rightSprite[dialogueTracker]}`;
        rightSprite.style = "visibility: visible;";
    } else {
        rightSprite.style = "visibility: hidden;";
    }
    if (storyObject[storyStage].CGmode[dialogueTracker] === "on") {
        backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.0);";
        dialogueAndSprites.style = "visibility: hidden;";
    } else if (storyObject[storyStage].CGmode[dialogueTracker] === "off") {
        backgroundOverlay.style = "background-color: rgba(37, 32, 28, 0.4);";
        dialogueAndSprites.style = "visibility: visible;";
    }
    if (storyObject[storyStage].speaker[dialogueTracker] === "Narrator") {
        speakerTag.style = "visibility: hidden;";
    } else {
        speakerName.innerHTML = storyObject[storyStage].speaker[dialogueTracker];
        speakerTag.style = "visibility: visible;";
    }
    if (storyObject[storyStage].tagPosition[dialogueTracker] === "left") {
        speakerTag.style = "left: 0;";
    } else if (storyObject[storyStage].tagPosition[dialogueTracker] === "right") {
        speakerTag.style = "right: 0;";
    }
    if (storyObject[storyStage].suspicion[dialogueTracker]) {
        suspicion += storyObject[storyStage].suspicion[dialogueTracker];
    }
    if (storyObject[storyStage].interrogation[dialogueTracker]) {
        interrogation += storyObject[storyStage].interrogation[dialogueTracker];
    }
    if (storyObject[storyStage].background[dialogueTracker]) {
        dialogueScreen.style = `background-image: url("assets/${storyObject[storyStage].background[dialogueTracker]}");`;
    }
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
    if (choices[storyStage].text[0]) {
        choice1.style = "display: block";
        choice1.innerHTML = choices[storyStage].text[0];
    } else {
        choice1.style = "display: none";
    }
    if (choices[storyStage].text[1]) {
        choice2.style = "display: block";
        choice2.innerHTML = choices[storyStage].text[1];
    } else {
        choice2.style = "display: none";
    }
    if (choices[storyStage].text[2]) {
        choice3.style = "display: block";
        choice3.innerHTML = choices[storyStage].text[2];
    } else {
        choice3.style = "display: none";
    }
}

function choicePressed(choiceNumber) {
    saveStateForContinue();
    let chosenChoice = choiceButtons[choiceNumber].innerHTML;
    choiceLog.push(chosenChoice);
    setTimeout(() => choosingChoice = false, 50);
    dialogueSkip = false;
    dialogueTracker = -1;
    storyStage = choices[storyStage].nextPath[choiceNumber];
    advanceStory();
}

function saveStateForContinue() {
    continueLandlordBefriended = landlordBefriended;
    continueJakeBefriended = jakeBefriended;
    continueAmeliaBefriended = ameliaBefriended;
    continueDealerBefriended = dealerBefriended;
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
    landlordBefriended = continueLandlordBefriended;
    jakeBefriended = continueJakeBefriended;
    ameliaBefriended = continueAmeliaBefriended;
    dealerBefriended = continueDealerBefriended;
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
    continuePlayerHealthMax = 100;
    continuePlayerAttack = 10;
    continuePlayerDefense = 10;
    continuePlayerItems = [];
    chatLogArray = [];
    suspicion = 0;
    interrogation = 0;
    kills = 0;
    InterrogationMode = false;
    playerHealth = 100;
    playerHealthMax = 100;
    playerAttack = 10;
    playerDefense = 10;
    playerItems = [];
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
        if (event.target.closest('#itemsBox')) {
            if (event.target.innerHTML === "Premium Blood Vial") {
                usedPremiumBloodVial(event.target);
            } else if (event.target.innerHTML === "Landlord's Number") {
                usedLandlordNumber();
            } else if (event.target.innerHTML === "Sleeping Pill") {
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
    addToCombatLog(`You take out a Sleeping Pill and hurl it at ${currentEnemy.name}`);
    if (currentEnemy.canSleep === true) {
        setTimeout(() => {
            enemySlept = true;
            addToCombatLog(`${currentEnemy.name} is hit with the pill! It breaks open and lets out its contents on impact. They tumble around before falling asleep and collapsing onto the floor.`);
        }, 3000);
        setTimeout(() => {
            checkCombatStatus();
        }, 6000);
    } else if (currentEnemy.canSleep === false) {
        setTimeout(() => {
            turnInProgress = false;
            addToCombatLog(`${currentEnemy.name} is hit with the pill and it's contents... but it doesn't seem to have any effect.`);
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

function testDialogue(stage) {
    storyStage = stage;
    dialogueTracker = -1;
    currentPage = "dialogue";
    setPage();
    advanceStory();
}