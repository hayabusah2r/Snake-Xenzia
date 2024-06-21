document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const controls = {
        up: document.getElementById('up'),
        left: document.getElementById('left'),
        down: document.getElementById('down'),
        right: document.getElementById('right')
    };

    const boardSize = 20;
    const cells = [];
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = { x: 0, y: 0 };
    let score = 0;
    let gameInterval;
    const initialSpeed = 100; // Initial speed in milliseconds
    let speed = initialSpeed;

    function createBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cells.push(cell);
            board.appendChild(cell);
        }
    }

    function draw() {
        cells.forEach(cell => cell.className = 'cell');
        snake.forEach(segment => {
            const index = segment.y * boardSize + segment.x;
            if (cells[index]) cells[index].classList.add('snake');
        });
        const foodIndex = food.y * boardSize + food.x;
        if (cells[foodIndex]) cells[foodIndex].classList.add('food');
    }

    function moveSnake() {
        const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            score += 3;
            scoreDisplay.textContent = `Score: ${score}`;
            placeFood();
        } else {
            snake.pop();
        }

        if (isGameOver()) {
            clearInterval(gameInterval);
            alert(`Game Over. Your score is ${score}`);
            resetGame();
        }

        draw();
    }

    function isGameOver() {
        const head = snake[0];
        if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return false;
    }

    function placeFood() {
        let newFoodPosition;
        do {
            newFoodPosition = {
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize)
            };
        } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
        food = newFoodPosition;
    }

    function changeDirection(event) {
        const keyPressed = event.key;
        switch (keyPressed) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    }

    function handleControlButton(directionChange) {
        switch (directionChange) {
            case 'up':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'down':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'left':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'right':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        placeFood();
        draw();
        clearInterval(gameInterval);
        gameInterval = setInterval(moveSnake, speed);
    }

    controls.up.addEventListener('click', () => handleControlButton('up'));
    controls.left.addEventListener('click', () => handleControlButton('left'));
    controls.down.addEventListener('click', () => handleControlButton('down'));
    controls.right.addEventListener('click', () => handleControlButton('right'));
    document.addEventListener('keydown', changeDirection);

    createBoard();
    placeFood();
    draw();
    gameInterval = setInterval(moveSnake, speed);
});
