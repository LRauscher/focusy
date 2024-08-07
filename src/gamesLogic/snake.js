import { updateHighScore, displayHighScore } from "../main.js";

export function snakeGame(container, callback) {
    container.innerHTML = ''; // Clear container
    // Snake game implementation
    // For simplicity, using a basic implementation
  
    let canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    container.appendChild(canvas);
    let ctx = canvas.getContext('2d');
  
    let snake = [{ x: 200, y: 200 }];
    let food = { x: 100, y: 100 };
    let direction = 'right';
    let score = 0;
  
    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'green';
      snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, 20, 20);
    };
  
    const moveSnake = () => {
      let head = { ...snake[0] };
      if (direction === 'right') head.x += 20;
      if (direction === 'left') head.x -= 20;
      if (direction === 'up') head.y -= 20;
      if (direction === 'down') head.y += 20;
  
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
      } else {
        snake.pop();
      }
  
      if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert(`Game over! Your score: ${score}`);
        callback(score);
      }
    };
  
    const changeDirection = (e) => {
      if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
      if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
      if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
      if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    };
  
    document.addEventListener('keydown', changeDirection);
    const gameInterval = setInterval(() => {
      moveSnake();
      drawSnake();
    }, 100);
  };