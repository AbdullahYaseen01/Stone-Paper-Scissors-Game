let userScore = 0;
let compScore = 0;
let round = 0;
const history = [];

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");
const historyBtn = document.querySelector("#history-btn");
const modal = document.querySelector("#history-modal");
const closeBtn = document.querySelector(".close");
const historyBody = document.querySelector("#history-body");

const getComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const drawGame = (userChoice, compChoice) => {
  msg.innerText = "It's a Draw!";
  msg.style.backgroundColor = "#444";
  logHistory(userChoice, compChoice, "Draw");
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! 🎉 ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    logHistory(userChoice, compChoice, "You Win");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lose! 😢 ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    logHistory(userChoice, compChoice, "Computer Wins");
  }
};

const playGame = (userChoice) => {
  const compChoice = getComputerChoice();
  if (userChoice === compChoice) {
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset Game
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  round = 0;
  history.length = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  historyBody.innerHTML = "";
});

// Leaderboard Functions
function logHistory(userChoice, compChoice, result) {
  round++;
  history.push({ round, userChoice, compChoice, result });
  renderHistory();
}

function renderHistory() {
  historyBody.innerHTML = "";
  history.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.round}</td>
      <td>${entry.userChoice}</td>
      <td>${entry.compChoice}</td>
      <td>${entry.result}</td>
    `;
    historyBody.appendChild(row);
  });
}

// Modal Open/Close
historyBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
