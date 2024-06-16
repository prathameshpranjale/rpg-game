let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name:"Town Square",
        "button text": ["Go to store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"store\"."
    },
    {
        name: "Go store",
        "button text": ["Buy 10 health (10 gold coins)", "Buy weapon (30 gold coins)", "Go to town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You have entered the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }

    
];

// initialization 
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations){
    monsterStats.style.display = 'none';
    button1.innerText = locations['button text'][0];
    button2.innerText = locations['button text'][1];
    button3.innerText = locations['button text'][2];
    button1.onclick = locations['button functions'][0];
    button2.onclick = locations['button functions'][1];
    button3.onclick = locations['button functions'][2];

    text.innerText = locations['text']
}
function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}


function goCave() {
    update(locations[2]);
}
function buyHealth() {
    
    if(gold>=10 && health>0){
        
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;  
        text.innerText += " \nYour health is increased by 10. ";
    }else{
        // else you don have health or gold
        text.innerText += " \nYou do not have enough gold to buy health.";
    }

}

function buyWeapon() {

    if(currentWeapon<weapons.length-1){
        if (gold >= 30) {
            gold -= 30;
            currentWeapon += 1;
            goldText.innerText = gold;
            let newweapon = weapons[currentWeapon].name;
            text.innerText += " \nYou have a new " + newweapon + ".";
            inventory.push(newweapon);
            text.innerText += " \nIn your inventory you have: " + inventory + ".";
        }
        else {
            text.innerText += " \nYou do not have enough gold to buy a weapon.";
        } 
    }else{
        text.innerText = " \nYou already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellweapon;
    }
    

}

function sellweapon(){
    
    if(inventory.length>1){
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText += " \n You have sold "+currentWeapon+".";
        text.innerText += " \n In your inventory you have: "+inventory+".";
    }
    else{
        text.innerText = "Don't sell your only weapon!";
    }
}



function fightSlime() {
    fighting = 0;
    gofight();
}

function fightBeast() {
    fighting = 1;
    gofight();
}
function fightDragon(){
    fighting = 2;
    gofight();
}

function gofight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function attack() {
    text.innerText = "The "+ monsters[fighting].name + " attacks. ";
    text.innerText +=" \nYou attack it with your " + weapons[currentWeapon].name+ ".";
    if(ismonsterhit()){
        health -= getmonsterattackvalue(monsters[fighting].level);
    }
    else{
        text.innerText += " \nYou Missed !!"
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() + xp)+1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;


    if(health<=0){
        lose();
    }
    else if(monsterHealth<=0){
     

        if(fighting === 2){
            wingame();
        }
        else{
            defeatMonster();
        }
    }


    if(Math.random()<=0.1 && inventory.length !== 1){
        text.innerText += " Your " + inventory.pop() + " breaks.!!!!! ";
        currentWeapon--;
        weaponbreaks();
    }
}

function getmonsterattackvalue(level){
    let hit = level*5 - (Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}

function ismonsterhit(){
    // probability of that monster gonna get hit be decided here
    // as the math.random funtion will return value between [0,1)
    // so it will check for it is greater or not and so will return true or false
    // thus making it hit for 80 percent of time  
    return Math.random() > .2 || (health < 20);
    // we can make it hard by removing or condition
}
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function wingame() {
    update(locations[6]);
}

function lose(){
    update(locations[5]);
}


function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}


function easterEgg() {
    update(locations[7]);
}



function pickTwo(){
    pick(2);
}


function pickEight(){
    pick(8);
}

function pick(guess){
    let numbers = [];

    while(numbers.length<10){
        numbers.push(Math.floor(Math.random()*11));
    }

    text.innerText = "You picked " + guess + " .here are the random numbers:\n";

    
    for(let i=0;i<10;i++){
        text.innerText += numbers[i] + '\n';
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        if (health <= 0) {
            lose();
        }
    }
}