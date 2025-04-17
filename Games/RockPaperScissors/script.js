const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
const playerScoreEl = document.querySelector("#playerScore");
const computerScoreEl = document.querySelector("#computerScore");
const historyList = document.querySelector("#historyList");
const resetBtn = document.querySelector("#resetBtn");

let playerScore = 0;
let computerScore = 0;
let drawCount = 0;
let matchHistory = [];

const emojiMap = {
    ROCK: "🪨",
    PAPER: "📄",
    SCISSORS: "✂️"
};

choiceBtns.forEach(button => button.addEventListener("click", () => {
    const player = button.textContent;
    const computer = getComputerChoice();
    const result = getResult(player, computer);

    updateScores(result);
    updateHistory(player, computer, result);

    playerText.textContent = `Player: ${player} ${emojiMap[player]}`;
    computerText.textContent = `Computer: ${computer} ${emojiMap[computer]}`;
    resultText.textContent = `Result: ${result}`;
}));

function getComputerChoice() {
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const randIndex = Math.floor(Math.random() * choices.length);
    return choices[randIndex];
}

function getResult(player, computer) {
    if (player === computer) return "Draw!";
    if (
        (player === "ROCK" && computer === "SCISSORS") ||
        (player === "PAPER" && computer === "ROCK") ||
        (player === "SCISSORS" && computer === "PAPER")
    ) {
        return "You Win!";
    }
    return "You Lose!";
}

function updateScores(result) {
    if (result === "You Win!") playerScore++;
    else if (result === "You Lose!") computerScore++;
    else drawCount++;

    playerScoreEl.textContent = `Player: ${playerScore}`;
    computerScoreEl.textContent = `Computer: ${computerScore}`;
    document.querySelector("#drawScore").textContent = `Draws: ${drawCount}`;
}

function updateHistory(player, computer, result) {
    const match = `Player: ${player} ${emojiMap[player]} | Computer: ${computer} ${emojiMap[computer]} => ${result}`;
    matchHistory.unshift(match); // add to beginning
    if (matchHistory.length > 10) matchHistory.pop(); // keep only last 10

    historyList.innerHTML = "";
    matchHistory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    drawCount = 0;
    matchHistory = [];

    playerText.textContent = "Player:";
    computerText.textContent = "Computer:";
    resultText.textContent = "Result:";
    playerScoreEl.textContent = "Player Wins: 0";
    computerScoreEl.textContent = "Computer Wins: 0";
    document.querySelector("#drawScore").textContent = "Draws: 0";
    historyList.innerHTML = "";
});

const toggleDark = document.getElementById("toggleDark");

toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
