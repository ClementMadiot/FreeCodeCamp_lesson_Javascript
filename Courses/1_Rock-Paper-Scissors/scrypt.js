// In this mini project, I review conditionals, **functions, getElementById**, and more. This project give me an opportunity to solve small problems and get a better understanding of the basics.

// buttons
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");
// scores
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
// Result message
const roundResultsMsg = document.getElementById("results-msg");
//  first one to three points wins
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

// evenement onCLick
rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});

function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomNumber = Math.floor(Math.random() * options.length);
  return options[randomNumber];
}
// console.log(getRandomComputerResult());

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );

  // if (player === "Rock" && computer === "Scissors") {
  //   return true;
  // } else if (player === "Scissors" && computer === "Paper") {
  //   return true;
  // } else if (player === "Paper" && computer === "Rock") {
  //   return true;
  // } else {
  //   return false
  // }
}
// console.log(hasPlayerWonTheRound("Rock", "Scissors"));
// console.log(hasPlayerWonTheRound("Scissors", "Rock"));

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  // console.log(computerResult, computerScore);
  // console.log(userOption, playerScore);
  // console.log(hasPlayerWonTheRound());

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

// console.log(getRoundResults("Rock"));
// console.log("Player Score: ", playerScore, "Computer Score: ", computerScore);

function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;

  if (playerScore === 3) {
    winnerMsgElement.innerText = `Player has won the game!`;
    optionsContainer.style.display = "none";
    resetGameBtn.style.display = "flex";
  } else if (computerScore === 3) {
    winnerMsgElement.innerText = `Computer has won the game!`;
    optionsContainer.style.display = "none";
    resetGameBtn.style.display = "flex";
  }
}

showResults();

resetGameBtn.addEventListener('click', () => {
  resetGame()
});

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.innerText = playerScore
  computerScoreSpanElement.innerText = computerScore

  optionsContainer.style.display = "flex";
  optionsContainer.style.flexDirection = "column";
  resetGameBtn.style.display = "none";

  roundResultsMsg.innerText = " "
  winnerMsgElement.innerText = " "
}
