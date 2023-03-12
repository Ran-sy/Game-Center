let timeLeftDisplay = document.getElementById("time-left");
let resultDisplay = document.getElementById("result");
let gridDisplay = document.getElementById("grid");
let squaresDisplay = document.querySelectorAll(".square");
let replayBtn = document.getElementById("replayBtn");
let result;
let timeLeft;
let hitSquare;
let moleInterval, timeLeftInterval;

window.onload = startPlay();

function startPlay() {
  replayBtn.classList.add("hidden");
  replayBtn.classList.remove("flex");
  result = 0;
  timeLeft = 10;
  hitSquare = null;
  resultDisplay.innerText = result;
  moleInterval = setInterval(generateRandomMole, 1000);
  timeLeftInterval = setInterval(updateTimeLeft, 1000);
}
function updateTimeLeft() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftDisplay.innerText = timeLeft;
  } else {
    console.log("cleared");
    clearInterval(timeLeftInterval);
    clearInterval(moleInterval);
    squaresDisplay.forEach((square) =>
      square.removeEventListener("click", updateScore)
    );
    setTimeout(() => {
      replayBtn.classList.remove("hidden");
      replayBtn.classList.add("flex");
    }, 2500);
    alert("Game Over! Your Score is " + result);
  }
}
function updateScore() {
  console.log("hitSquare, this.id", hitSquare, this.id);
  if (this.id === hitSquare) {
    result++;
    resultDisplay.innerText = result;
    generateRandomMole();
  }
}
function generateRandomMole() {
  hitSquare = null;
  squaresDisplay.forEach((square) => {
    square.removeEventListener("click", updateScore);
    square.classList.remove("bg-mole");
  });
  const ranNum = Math.floor(Math.random() * 9);
  hitSquare = squaresDisplay[ranNum].id;
  squaresDisplay[ranNum].classList.add("bg-mole");
  squaresDisplay[ranNum].addEventListener("click", updateScore);
}
