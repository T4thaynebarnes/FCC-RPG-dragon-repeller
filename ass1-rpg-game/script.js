// free code camp assignment//
// rpg game

// setting values to player at start of game
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
// inventory is an array i can add values to
let inventory = ["🩼"];
// const locations = [
//   {
//     name: "town square",
//     "button text": ["Go to store", "Go to cave", "Fight dragon"],
//     "button functions": [goStore, goCave, fightDragon],
//     text: "You are in the town square. You see a sign that says Store.",
//   },
//   {
//     name: "store",
//     "button text": [
//       "Buy 10 health (10 gold)",
//       "Buy weapon (30 gold)",
//       "Go to town square",
//     ],
//     "button functions": [buyHealth, buyWeapon, goTown],
//     // testing
//     // "button functions": [goTown],
//     text: "You enter the store.",
//   },
//   {
//     name: "cave",
//     "button text": ["Fight golbin", "Fight fanged beast", "Go to town square"],
//     "button functions": [fightGoblin, fightBeast, goTown],
//     // testing
//     // "button functions": [goTown],
//     text: "You enter the cave. You see some monsters.",
//   },
// ];
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
// function for logic of game
function goTown(location) {
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

function fightDragon() {
  console.log("Fighting dragon.");
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
  if (gold >= 30) {
    gold -= 30;
    currentWeapon += 1;
  }
}
function update(location) {
  text.innerText = location.text;
  button1.innerText = location["button text"][0];
  button1.onclick = location["button functions"][0]; // Access "button functions" property
  button2.innerText = location["button text"][1];
  button2.onclick = location["button functions"][1]; // Access "button functions" property
  button3.innerText = location["button text"][2];
  button3.onclick = location["button functions"][2];
  text.innerText = "You enter the store.";
  button1.innerText = "Buy 10 💖 for 10 🪙";
  button1.onclick = buyHealth;
  button2.innerText = "Buy 🗡️ (30 🪙)";
  button2.onclick = buyWeapon;
  button3.innerText = "Go to town square";
  button3.onclick = goTown;
}
// ES6 arrow function syntax
const fightGoblin = () => {};
const fightBeast = () => {};
// testing function used to log data being passed
const testing = () => {
  console.log("testing: ", locations[1]);
};
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
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
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
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = testing;
