function intersect() {
    const x = Math.max(snake.x, apple.x),
      num1 = Math.min(snake.x + snake.width, apple.x + apple.width),
      y = Math.max(snake.y, apple.y),
      num2 = Math.min(snake.y + snake.height, apple.y + apple.height);
    return num1 >= x && num2 >= y;
  }