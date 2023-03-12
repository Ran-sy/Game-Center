const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const boardWidth = 410;
const boardHeight = 500;
let score = 0;

// create the ball
const ball = document.createElement("div");
const ballDimension = 10;
let ballCurrentPosition = [boardWidth / 2, 40];
createBall();
function createBall() {
  ball.classList.add(
    "absolute",
    "w-[10px]",
    "h-[10px]",
    "bg-red-300",
    "border-2",
    "border-red-700",
    "rounded-full"
  );
  drawBall();
  grid.appendChild(ball);
}
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}
// move the ball
let xSpeed = Math.floor(4 + Math.random() * 4);
let ySpeed = Math.floor(4 + Math.random() * 4);
console.log("xSpeed, ySpeed", xSpeed, ySpeed);
let moveTimer = setInterval(moveBall, 30);
function moveBall() {
  ballCurrentPosition[0] += xSpeed;
  ballCurrentPosition[1] += ySpeed;
  drawBall();
  chkCollesion();
}
function chkCollesion() {
  let xmovement = ballCurrentPosition[0];
  let ymovement = ballCurrentPosition[1];
  //   check for block collesion
  for (let i = 0; i < blocksBounding.length; i++) {
    if (
      xmovement + ballDimension >= blocksBounding[i].left &&
      xmovement - ballDimension <= blocksBounding[i].left + blockWidth + 4 &&
      ymovement + ballDimension >= blocksBounding[i].bottom &&
      ymovement - ballDimension <= blocksBounding[i].bottom + blockHeight + 4
    ) {
      grid.removeChild(blocks[i]);
      assignBounding();
      changeDirection();
      score++;
      scoreDisplay.innerText = score;
    }
  }
  //   check if user collesion
  if (
    xmovement + ballDimension >= currentPosition[0] &&
    xmovement <= currentPosition[0] + 114 &&
    ymovement + ballDimension >= currentPosition[1] &&
    ymovement <= currentPosition[1] + 24
  ) {
    changeDirection();
  }
  // check wall collesion
  if (
    xmovement + ballDimension >= boardWidth ||
    ymovement + ballDimension >= boardHeight ||
    xmovement <= 0
  ) {
    changeDirection();
  }
  //   check for game over
  if (ymovement <= 0) {
    clearInterval(moveTimer);
    scoreDisplay.innerText = "You Lose!";
    document.removeEventListener("keydown", moveUser);
  }
  //   check for win
  if (blocksBounding.length == 0) {
    clearInterval(moveTimer);
    document.removeEventListener("keydown", moveUser);
    scoreDisplay.innerText = "You SMASHED The Game 💥💥💥";
  }
}

function changeDirection() {
  if (xSpeed > 0 && ySpeed > 0) {
    xSpeed = -xSpeed;
    return;
  }
  if (xSpeed < 0 && ySpeed > 0) {
    ySpeed = -ySpeed;
    return;
  }
  if (xSpeed < 0 && ySpeed < 0) {
    xSpeed = -xSpeed;
    return;
  }
  if (xSpeed > 0 && ySpeed < 0) {
    ySpeed = -ySpeed;
    return;
  }
}
// create the blocks
const blockWidth = 60;
const blockHeight = 20;
let y = 460;
let gap = 6;
let blocks = [];
let blocksBounding = [];

function addBlocks() {
  for (let i = 0; i < 15; i++) {
    const block = document.createElement("div");
    block.setAttribute("id", i);
    block.classList.add(
      "block",
      "absolute",
      "w-[60px]",
      "h-[20px]",
      "bg-[#fd7f32]",
      "border-2",
      "border-orange-700"
    );

    if (i >= 0 && i < 5) {
      block.style.bottom = y + "px";
      block.style.left = (blockWidth + gap * 4) * i + "px";
    } else if (i >= 5 && i < 10) {
      block.style.bottom = y - 4 * gap + "px";
      block.style.left = (blockWidth + gap * 4) * (i - 5) + "px";
    } else {
      block.style.bottom = y - 8 * gap + "px";
      block.style.left = (blockWidth + gap * 4) * (i - 10) + "px";
    }
    grid.appendChild(block);
  }
  assignBounding();
}
addBlocks();
function assignBounding() {
  blocks = document.querySelectorAll(".block");
  const blocksArray = Array.apply(null, blocks);
  blocksBounding = blocksArray.map((block) => {
    return {
      left: parseInt(block.style.left),
      bottom: parseInt(block.style.bottom),
    };
  });
  console.log(blocksBounding);
}
// add the user
const userStart = [(boardWidth - 110) / 2, 10];
let currentPosition = userStart;
const user = document.createElement("div");
user.classList.add(
  "w-[110px]",
  "h-[20px]",
  "bg-[#32D2FD]",
  "absolute",
  "border-2",
  "border-blue-700"
);
drawUser();
grid.appendChild(user);
// draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}
// move user
function moveUser(e) {
  //   to move using mouse change the event to mousemove
  //   if (e.offsetX < boardWidth - 114 || e.offsetX > 0) {
  //     currentPosition[0] = e.offsetX - 114 / 2;
  //     drawUser();
  //   }
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - 114) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);
