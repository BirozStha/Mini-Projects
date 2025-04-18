const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const player1ScoreText = document.querySelector("#player1Score");
const player2ScoreText = document.querySelector("#player2Score");
const drawScoreText = document.querySelector("#drawScore");

let player1Score = 0;
let player2Score = 0;
let drawScore = 0;
let lastWinner = "X"; // X starts by default

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    // statusText.textContent = `${currentPlayer}'s turn`;
    // statusText.textContent = `Player 1(X)'s turn`;
    updateStatusText();
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("data-cell-index");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    if(currentPlayer === "O"){
        statusText.textContent = `Player 2(O)'s turn`;
    }
    else if(currentPlayer === "X"){
        statusText.textContent = `Player 1(X)'s turn`;

    }
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            document.querySelector(`[data-cell-index="${condition[0]}"]`).classList.add("win");
            document.querySelector(`[data-cell-index="${condition[1]}"]`).classList.add("win");
            document.querySelector(`[data-cell-index="${condition[2]}"]`).classList.add("win");
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        if(currentPlayer === "X") {
            statusText.textContent = `Player 1 wins!`;
            player1Score++;
            player1ScoreText.textContent = player1Score;
            lastWinner = "X";
        } else {
            statusText.textContent = `Player 2 wins!`;
            player2Score++;
            player2ScoreText.textContent = player2Score;
            lastWinner = "O";
        }
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        drawScore++;
        drawScoreText.textContent = drawScore;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = lastWinner;
    options = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win"); 
    });
    updateStatusText();
    running = true;
}

function updateStatusText() {
    if(currentPlayer === "X"){
        statusText.textContent = `Player 1(X)'s turn`;
    } else {
        statusText.textContent = `Player 2(O)'s turn`;
    }
}
