const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("your-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");
let userChoice, computerChoice, result;

const computerCount = document.getElementById("computer-count");
const userCount = document.getElementById("user-count");
const drawCount = document.getElementById("draw-count");
let computerWinCount = 0,
  userWinCount = 0,
  drawWinCount = 0;

possibleChoices.forEach((choice) =>
  choice.addEventListener("click", (e) => {
    let userNumber = parseInt(e.target.id);
    userChoice = getChoice(userNumber);
    userChoiceDisplay.innerHTML = userChoice;
    let compNumber = generateComputerChoice();
    getResult(userNumber, compNumber);
    updateStatics();
  })
);
function getResult(user, comp) {
  let color = "";
  if (user === comp) {
    color = "text-slate-100";
    result = "Its a draw!";
    drawWinCount++;
  } else if (user === 1 && comp === 3) {
    color = "text-green-700";
    result = "You won :)";
    userWinCount++;
  } else if (comp === 1 && user === 3) {
    color = "text-red-700";
    result = "Computer won :)";
    computerWinCount++;
  } else if (user > comp) {
    color = "text-green-700";
    result = "You won :)";
    userWinCount++;
  } else {
    color = "text-red-700";
    result = "Computer won :)";
    computerWinCount++;
  }
  resultDisplay.innerHTML = `<span class="${color} uppercase">${result}</span>`;
}
function generateComputerChoice() {
  var compNumber = Math.ceil(Math.random() * possibleChoices.length);
  computerChoice = getChoice(compNumber);
  computerChoiceDisplay.innerHTML = computerChoice;
  return compNumber;
}
function getChoice(id) {
  /* using id instead of actual word, so if we need to make this example about something else like animals [worms eaten by birds eaten by cats eaten by snakes eaten by eagles eaten by worms] or something like that */
  let choice = "";
  switch (id) {
    case 1:
      choice = "rock";
      break;
    case 2:
      choice = "paper";
      break;
    case 3:
      choice = "scissors";
      break;
    default:
      choice = "error";
  }
  return choice;
}

function updateStatics() {
  computerCount.innerHTML = computerWinCount;
  userCount.innerHTML = userWinCount;
  drawCount.innerHTML = drawWinCount;
}
