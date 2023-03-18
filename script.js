const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let speed = 0;
let apple = {
  x: 40,
  y: 100,
  width: 15,
  height: 15,
  color: "green",
};

let snake = {
  x: 30,
  y: 30,
  width: 15,
  height: 15,
  color: "red",
  x1: 15,
  y1: 0,
  cell: [],
  startCell: 4,
};

function loop() {
  requestAnimationFrame(loop);
  if (speed++ < 6) {
    return;
  }
  speed = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.x1;
  snake.y += snake.y1;
  snake.cell.unshift({ x: snake.x, y: snake.y });
  if (snake.cell.length > snake.startCell) {
    snake.cell.pop();
  }

  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x, apple.y, apple.width, apple.height);
  ctx.fillStyle = "black";
  snake.cell.forEach(function (cells, index) {
    ctx.fillRect(cells.x, cells.y, 14, 14);
    if (intersect()) {
      snake.startCell++,
        (apple.x = Math.floor(Math.random() * 500)),
        (apple.y = Math.floor(Math.random() * 500));
    }
    for (let i = index + 1; i < snake.cell.length; i++) {
      if (cells.x === snake.cell[i].x && cells.y === snake.cell[i].y) {
        alert("GAME OVER");
        snake.x = 15;
        snake.y = 15;
        snake.cell = [];
        snake.startCell = 4;
        snake.x1 = 15;
        snake.y1 = 0;
      }
    }
  });
  if (
    snake.x + snake.width > canvas.width|| 
    snake.x < 0 ||
    snake.y + snake.height > canvas.height ||
    snake.y < 0
  ) {
    alert("GAME OVER");
    snake.x = 15;
    snake.y = 0;
    snake.x1 = 15;
    snake.y1 = 0;
    snake.cell = [];
    snake.startCell = 4;
    apple.x = Math.floor(Math.random() * 500);
    apple.y = Math.floor(Math.random() * 500);
  }
}

document.addEventListener("keydown", direction);
let dir;
function direction(event) {
  if (event.code === "ArrowDown" && dir !== "up") {
    dir = "down";
    snake.x1 = 0;
    snake.y1 = 15;
  } else if (event.code === "ArrowRight" && dir !== "left") {
    dir = "right";
    snake.x1 = 15;
    snake.y1 = 0;
  } else if (event.code === "ArrowUp" && dir !== "down") {
    dir = "up";
    snake.x1 = 0;
    snake.y1 = -15;
  } else if (event.code === "ArrowLeft" && dir !== "right") {
    dir = "left";
    snake.x1 = -15;
    snake.y1 = 0;
  }
}

requestAnimationFrame(loop);