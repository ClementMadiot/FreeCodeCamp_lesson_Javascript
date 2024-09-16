// In this project, I build an algorithmic thinking by building a dice game. There are a total of 6 rounds and for each round, the player can roll the dice up to 3 times and collect a score.

const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
// buttons
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let rolls = 0;
let score = 0;
let round = 1;

const rollDice = () => {
  diceValuesArr = [];
  // boucle pour générer 5 valeurs de dés aléatoires
  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  }
  // afficher les valeurs de dés dans le DOM
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};
// update the score
const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round
}

const updateRadioOptions = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `score = ${score}`;
}

//button event listeners
rollDiceBtn.addEventListener("click", () => {
  rollDice();
  rolls++;
// condition pour désactiver le bouton après 3 lancers
  if (rolls >= 3) {
    alert("You have rolled the dice three times!");
    rollDiceBtn.disabled = true;
  }
  updateStats()
});
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  isModalShowing
    ? (rulesContainer.style.display = "block")
    : (rulesContainer.style.display = "none");
  isModalShowing
    ? (rulesBtn.innerHTML = "Show rules")
    : (rulesBtn.innerHTML = "Hide rules");
});
