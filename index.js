const gameWindow = document.querySelector("#gameWindow");
const scoreH1 = document.querySelector("#score");
const snake = [
  [15, 15],
  [16, 15],
  [17, 15],
  [18, 15],
  [19, 15],
];
let dir = 0;
let score = 0;
let time = 100;
const fruitPos = [1, 1];
const pt = (i) => `<div id="p${i}" class="snake${i ? "Body" : "Head"}"></div>`;
const fruit = `<div id="fruit" class="fruit"></div>`;

const pointToGrid = (p) => `${p[1]}/${p[0]}/${p[1]}/${p[0]}`;
const placeSnake = () => {
  gameWindow.innerHTML = "";
  putFruit();
  snake.forEach((p, i) => {
    gameWindow.innerHTML += pt(i);
    document.getElementById(`p${i}`).style.gridArea = pointToGrid(p);
  });
};

const isDead = (p) =>
  snake.some((value) => value[0] == p[0] && value[1] == p[1]);
const ateFruit = (p) => fruitPos[0] == p[0] && fruitPos[1] == p[1];
const newPos = () => {
  const head = snake[0];
  switch (dir) {
    case 1:
      return [head[0] != 1 ? head[0] - 1 : 30, head[1]];
    case 2:
      return [head[0], head[1] != 1 ? head[1] - 1 : 30];
    case 3:
      return [head[0] != 30 ? head[0] + 1 : 1, head[1]];
    case 4:
      return [head[0], head[1] != 30 ? head[1] + 1 : 1];
    default:
      return [head[0], head[1]];
  }
};
const rand = () => ~~(Math.random() * 30) + 1;
const moveFruit = () => {
  let p = [rand(), rand()];
  while (isDead(p)) {
    p = [rand(), rand()];
  }
  fruitPos[0] = p[0];
  fruitPos[1] = p[1];
};
const putFruit = () => {
  gameWindow.innerHTML += fruit;
  document.getElementById("fruit").style.gridArea = pointToGrid(fruitPos);
};
const moveSnake = () => {
  const tail = snake[snake.length - 1];
  const p = newPos();
  if (isDead(p) && dir) {
    dir = 0;
    alert("You failed!");
    location.reload();
    return;
  }

  if (dir) {
    for (let i = snake.length - 1; i >= 0; i--) {
      if (i) snake[i] = snake[i - 1];
      else snake[0] = p;
    }
  }
  if (ateFruit(snake[0])) {
    score += 5;
    scoreH1.innerHTML = `Score : ${score}`;
    if (score <= 4500) time = 100 - ~~(score / 75);
    moveFruit();
    snake.push(tail);
  }
  placeSnake();
};
moveFruit();
moveSnake();

window.addEventListener(
  "keydown",
  (e) => {
    switch (e.key) {
      case "ArrowLeft":
      case "a":
        if (snake[0][0] != snake[1][0] + 1) dir = 1;
        break;
      case "ArrowUp":
      case "w":
        if (snake[0][1] != snake[1][1] + 1) dir = 2;
        break;
      case "ArrowRight":
      case "d":
        if (snake[0][0] != snake[1][0] - 1) dir = 3;
        break;
      case "ArrowDown":
      case "s":
        if (snake[0][1] != snake[1][1] - 1) dir = 4;
        break;
    }
  },
  false
);
const play = () => {
  if (dir) moveSnake();
  setTimeout(play, time);
};
play();
