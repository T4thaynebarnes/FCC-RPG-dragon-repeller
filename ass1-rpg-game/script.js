// free code camp assignment//
// rpg game

// setting values to player at start of game
let xp = 2;
let health = 100;
let gold = 150;
let currentWeapon = 0;
let fighting;
let monsterHealth;
// inventory is an array I can add values to example push method on buyWeapon ()
let inventory = ["🩼"];

// declaring variables to grab onto html elements in the dom to manipulate them
const button1 = document.querySelector("#button1");

const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");

const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const cat = { name: "whiskers", "Number of legs": 4 };
console.log(cat.whiskers);

// function for logic of game
function goTown() {
  update(locations[0]);
}
function goStore() {
  text.innerText = "You enter the store.";
  button1.innerText = "Buy 10 💖 for 10 🪙";
  button1.onclick = buyHealth;
  button2.innerText = "Buy 🗡️ (30 🪙)";
  button2.onclick = buyWeapon;
  button3.innerText = "Go to town square";
  button3.onclick = goTown;
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

const buyHealth = () => {
  if (gold >= 10) {
    // compound operator used -= or += instead of health = health + 10;
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health. 😓";
  }
};
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      console.log(weapons[currentWeapon].name);
      text.innerText = `You now have a ${newWeapon}.`;
      text.innerText += `you have in your satchel: ${inventory}!`;
      // pushes new weapon to inventory array to be stored.
      inventory.push(newWeapon);
    } else {
      text.innerText = "You do not have enough gold to buy this weapon yet.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
// ES6 arrow function syntax
const fightGoblin = () => {
  fighting = 0;
  goFight();
};
const fightBeast = () => {
  fighting = 1;
  goFight();
};
const fightDragon = () => {
  fighting = 2;
  goFight();
};
const attack = () => {
  // display monsters attack
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  console.log("Weapon power:", weapons[currentWeapon].power);
  console.log("Random number:", Math.floor(Math.random() * xp) + 1);
  console.log("monster health:", monsterHealth);
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
};
// determines monster attack damage
const getMonsterAttackValue = (level) => {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
};
const dodge = () => {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
};

// this allows for selling of old weapons that will no longer be used.
const sellWeapon = () => {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;

    let currentWeapon = inventory.shift();
    text.innerText = `It served you well. you have sold your ${currentWeapon}! Recieved 15 gold!`;
    text.innerText += ` In your inventory you now have: ${inventory} `;
  } else {
    text.innerText = `Don't sell your only weapon. It is a sacred  ${inventory}`;
  }
};
// monst fight function
const goFight = () => {
  // calling 3rd indice (which is an object) in locations array below
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  console.log("health of current monster", monsters[fighting].health);
  //   this displays monster stats element
  monsterStats.style.display = "block";
  //   displays monster name and health
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
};
const defeatMonster = () => {
  // determines the amount of gold dropped by a defeated monster
  gold += Math.floor(monsters[fighting].level * 6.7);
  //   adds xp for eeach defeated enemy determines the amount fo xp awarded as well
  xp += monsters[fighting].level;
  //   updating gold and xp levels on UI
  goldText.innerText = gold;
  xpText.innerText = xp;
  //   calling update() to go be placed back in the cave un harrassed
  update(locations[4]);
};
const lose = () => {
  update(locations[5]);
};
const restart = () => {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;

  inventory = ["🩼"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
};
// win condition
const winGame = () => {
  update(locations[6]);
};
// testing function used to log data being passed
const testing = () => {
  //   console.log("testing: ", locations[1], "", monsters[fighting], "");
};
// could not initiate the data in the objects below had to move code to bottom
// *****************ARRAYS STORED BELOW ********************
// locations array which holds objects with the data we need
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says Store.",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 🪙)",
      "Buy weapon (30 🪙)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    // testing
    // "button functions": [goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight golbin", "Fight fanged beast", "Go to town square"],
    "button functions": [fightGoblin, fightBeast, goTown],
    // testing
    // "button functions": [goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["⚔️", "🛡️", "🏃"],
    "button functions": [attack, dodge, goTown],
    text: "You are engaged in combat. Strength in battle brothers & sisters!",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: "The monster screams Arg! as it dies. You gain experience points and find gold.",
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You have been killed in battle",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
];
// weapons array holding purchased weapons
const weapons = [
  {
    name: "🩼",
    power: 5,
  },
  {
    name: "🗡️",
    power: 30,
  },
  { name: "🏹", power: 50 },
  {
    name: "Enchanted 🗡️",
    power: 100,
  },
];
// monsters array
const monsters = [
  {
    name: "Goblin Scout",
    level: 2,
    health: 15,
  },
  { name: "Fanged Goblin Mount", level: 8, health: 60 },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = testing;
