const cardsArray = [
  { id: 1, name: "bread", img: "https://ran-sy.github.io/game-center/public/images/bread.webp" },
  { id: 2, name: "burger", img: "https://ran-sy.github.io/game-center/public/images/burger.png" },
  { id: 3, name: "chocolate", img: "https://ran-sy.github.io/game-center/public/images/chocolate.png" },
  { id: 4, name: "icecream", img: "https://ran-sy.github.io/game-center/public/images/icecream.png" },
  { id: 5, name: "taco", img: "https://ran-sy.github.io/game-center/public/images/taco.png" },
  { id: 6, name: "sushi", img: "https://ran-sy.github.io/game-center/public/images/sushi.webp" },
  { id: 1, name: "bread", img: "https://ran-sy.github.io/game-center/public/images/bread.webp" },
  { id: 2, name: "burger", img: "https://ran-sy.github.io/game-center/public/images/burger.png" },
  { id: 3, name: "chocolate", img: "https://ran-sy.github.io/game-center/public/images/chocolate.png" },
  { id: 4, name: "icecream", img: "https://ran-sy.github.io/game-center/public/images/icecream.png" },
  { id: 5, name: "taco", img: "https://ran-sy.github.io/game-center/public/images/taco.png" },
  { id: 6, name: "sushi", img: "https://ran-sy.github.io/game-center/public/images/sushi.webp" },
];
var cardsChk = [],
  flippedCardImgs = [],
  allCardImgs = [],
  correctCards = [];
var resultDisplay = document.getElementById("result");
var highestDisplay = document.getElementById("highest");
var result = 0,
  highest = parseInt(localStorage.getItem("highestScore"));

const gridDiv = document.getElementById("grid");
const body = document.querySelector("body");
createBoard();

function createBoard() {
  gridDiv.innerHTML = "";
  highestDisplay.innerHTML = highest || 0;
  resultDisplay.innerHTML = result || 0;
  cardsArray.sort(() => 0.5 - Math.random());
  for (let i = 1; i <= cardsArray.length; i++) {
    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", "https://ran-sy.github.io/game-center/public/images/blank.webp");
    cardImg.setAttribute("alt", "blank");
    cardImg.setAttribute("data-id", i);
    cardImg.setAttribute("flipped", false);
    // cardImg.classList.add("h-32", "w-32");
    cardImg.addEventListener("click", flipCard);
    gridDiv.appendChild(cardImg);
  }
}

function checkForMatch() {
  if (
    flippedCardImgs[0].getAttribute("src") ===
    flippedCardImgs[1].getAttribute("src")
  ) {
    matchedTwo();
    correctCards = document.querySelectorAll("#grid img[correct=true]");
    if (correctCards.length === cardsArray.length) {
      gridDiv.innerHTML = "";
      gridDiv.innerHTML += `<div class='relative bg-sparkle w-[100vw] h-[90%]'><button class="absolute top-[50%] left-[50%] p-4 uppercase translate-x-[-50%] translate-y-[-50%]" onclick="createBoard()">Try again</button></div>`;
      updateResult();
    }
  } else {
    backToDefault();
  }
  resultDisplay.innerHTML = result;
}
function flipCard() {
  const cardId = this.getAttribute("data-id");
  this.setAttribute("src", cardsArray[cardId - 1].img);
  this.setAttribute("alt", cardsArray[cardId - 1].name);
  this.setAttribute("flipped", true);
  allCardImgs = document.querySelectorAll("#grid img");
  flippedCardImgs = document.querySelectorAll("#grid img[flipped=true]");
  if (flippedCardImgs.length === 2) {
    setTimeout(() => {
      checkForMatch();
      cardsChk = [];
    }, 500);
  }
}
function backToDefault() {
  result--;
  resultDisplay.classList.add("text-red-500");
  resultDisplay.classList.remove("text-green-500");
  flippedCardImgs.forEach((card) => {
    card.setAttribute("src", "https://ran-sy.github.io/game-center/public/images/blank.webp");
    card.setAttribute("alt", "blank");
    card.setAttribute("flipped", false);
  });
}
function matchedTwo() {
  result = result + 2;
  resultDisplay.classList.remove("text-red-500");
  resultDisplay.classList.add("text-green-500");
  flippedCardImgs.forEach((card) => {
    card.setAttribute("src", "https://ran-sy.github.io/game-center/public/images/correct.webp");
    card.setAttribute("alt", "matched");
    card.setAttribute("flipped", false);
    card.setAttribute("correct", true);
    card.removeEventListener("click", flipCard);
  });
}
function updateResult() {
  if (highest) {
    if (result > highest) {
      localStorage.setItem("highestScore", result);
      highest = result;
    }
  } else {
    localStorage.setItem("highestScore", result);
  }
  highestDisplay.innerHTML = highest;
}
