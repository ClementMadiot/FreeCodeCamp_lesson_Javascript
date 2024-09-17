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
/// update the score
const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = ` score = ${score}`;
};

// keep score selected
const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

/// Count how many times each number is found in the array.
const getHighestDuplicates = (arr) => {
  const counts = {}; // stocker les valeurs de dés et leur fréquence
  // Comptage des occurrences de chaque valeur de dés
  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }
  // Recherche du nombre le plus fréquent:
  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }
  // Calcul de la somme totale des valeurs de dés
  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);
  // console.log("sumOfAllDice", sumOfAllDice);
  //Mise à jour des options radio
  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }
  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }
  updateRadioOption(5, 0);
};

/// Reset score value
const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

/// button event listeners
rollDiceBtn.addEventListener("click", () => {
  // condition pour désactiver le bouton après 3 lancers
  if (rolls >= 3) {
    alert("You have rolled the dice three times!");
    rollDiceBtn.disabled = true;
  }
  rollDice();
  resetRadioOptions();
  rolls++;
  getHighestDuplicates(diceValuesArr);
  updateStats();
});
/// modal rules
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  isModalShowing
    ? (rulesContainer.style.display = "block")
    : (rulesContainer.style.display = "none");
  isModalShowing
    ? (rulesBtn.innerHTML = "Show rules")
    : (rulesBtn.innerHTML = "Hide rules");
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }
  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
  } else {
    alert("Please select a score option!");
  }
  if (round === 6) {
    setTimeout(() => {
      alert("Game Over! Your total score is " + score);
    }, 500);
    console.log(round);
  }
  // const selectedOption = Array.from(scoreInputs).find(input => input.checked);
  // // console.log(selectedOption.value, selectedOption.id);
  // if(selectedOption){
  //   updateStats()
  //   updateScore(selectedOption.value, selectedOption.id);
  //   resetRadioOptions()
  // } else {
  //   alert("Please select a score option!");
  // }
});
