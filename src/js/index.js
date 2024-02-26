import { canvasElement } from './dom';

const ctx = canvasElement.getContext('2d');
const spriteElement = document.getElementById('sprite')
const bricksElement = document.getElementById('bricks')

canvasElement.width = 448;
canvasElement.height = 400;

// VARIABLES PELOTA
const ballRadius = 4;
// Posicion pelota
let positionBallX = canvasElement.width / 2;
let positionBallY = canvasElement.height - 30;
// Velocidad pelota
let velocityBallX = 3;
let velocityBallY = -3;

// VARIABLES PALA
const paddleWidth = 50;
const paddleHeight = 10;

let positionPaddleX = (canvasElement.width - paddleWidth) / 2;
let positionPaddleY = canvasElement.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

const PADDLE_SENS = 5;

// VARIABLES LADRILLOS
const brickRow = 6;
const brickColumn = 13;
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 0;
const brickTop = 80;
const brickLeft = 16;
const bricks = [];

const BRICK_STATUS = {
	ACTIVE: 1,
	DESTROYED: 0
};

for (let i = 0; i < brickColumn; i++) {
	bricks[i] = [];
	for (let j = 0; j < brickRow; j++) {
		// Calculamos posicion ladrillo
		const brickX = i * (brickWidth + brickPadding) + brickLeft;
		const brickY = j * (brickHeight + brickPadding) + brickTop;
		const randomColor = Math.floor(Math.random() * 8);

		bricks[i][j] = {
			x: brickX,
			y: brickY,
			status: BRICK_STATUS.ACTIVE,
			color: randomColor
		};
	}
}

const drawBall = () => {
	ctx.beginPath();
	ctx.arc(positionBallX, positionBallY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();
};

const drawPaddle = () => {
	ctx.drawImage(
		spriteElement,
		29,
		174,
		paddleWidth,
		paddleHeight,
		positionPaddleX,
		positionPaddleY,
		paddleWidth,
		paddleHeight
		)
};
const drawBricks = () => {
	for (let i = 0; i < brickColumn; i++) {
		for (let j = 0; j < brickRow; j++) {
			const currentBrick = bricks[i][j];
			if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

			const clipX = currentBrick.color * 32
			ctx.drawImage(
				bricksElement,
				clipX,
				0,
				brickWidth,
				brickHeight,
				currentBrick.x,
				currentBrick.y,
				brickWidth,
				brickHeight
			)
		}
	}
};

const collisionDetection = () => {
	for (let i = 0; i < brickColumn; i++) {
		for (let j = 0; j < brickRow; j++) {
			const currentBrick = bricks[i][j];
			if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

			const isBallInsideBrickX =
				positionBallX + ballRadius > currentBrick.x &&
				positionBallX - ballRadius < currentBrick.x + brickWidth;
			const isBallTouchingBrick =
				positionBallY + ballRadius > currentBrick.y &&
				positionBallY - ballRadius < currentBrick.y + brickHeight;

			if (isBallInsideBrickX && isBallTouchingBrick) {
				velocityBallY = -velocityBallY;
				currentBrick.status = BRICK_STATUS.DESTROYED;
			}
		}
	}
};

const ballMovement = () => {
	// Rebotar laterales
	if (
		positionBallX + velocityBallX > canvasElement.width - ballRadius ||
		positionBallX + velocityBallX < ballRadius
	) {
		velocityBallX = -velocityBallX;
	}

	// Rebotar arriba
	if (positionBallY + velocityBallY < ballRadius) {
		velocityBallY = -velocityBallY;
	}

	const isBallInsidePaddleX =
		positionBallX > positionPaddleX &&
		positionBallX < positionPaddleX + paddleWidth;
	const isBallTouchingPaddle = positionBallY + velocityBallY > positionPaddleY;

	// Toca la pala o suelo
	if (isBallInsidePaddleX && isBallTouchingPaddle) {
		velocityBallY = -velocityBallY;
	} else if (
		positionBallY + velocityBallY >
		canvasElement.height - ballRadius - paddleHeight
	) {
		// console.log('Game Over');
		document.location.reload();
	}

	positionBallX += velocityBallX;
	positionBallY += velocityBallY;
};
const paddleMovement = () => {
	if (rightPressed && positionPaddleX < canvasElement.width - paddleWidth) {
		positionPaddleX += PADDLE_SENS;
	} else if (leftPressed && positionPaddleX > 0) {
		positionPaddleX -= PADDLE_SENS;
	}
};

// Limpiar todo el canvas para redibujar cada vez
const cleanCanvas = () => {
	ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

const keyDownHandler = event => {
	const key = event.key;
	if (key === 'Right' || key === 'ArrowRight') {
		rightPressed = true;
	} else if (key === 'Left' || key === 'ArrowLeft') {
		leftPressed = true;
	}
};

const keyUpHandler = event => {
	const key = event.key;
	if (key === 'Right' || key === 'ArrowRight') {
		rightPressed = false;
	} else if (key === 'Left' || key === 'ArrowLeft') {
		leftPressed = false;
	}
};

const draw = () => {
	cleanCanvas();
	// Dibujar pelota
	drawBall();
	// Dibujar pala
	drawPaddle();
	// Dibujar bloques
	drawBricks();

	// Colisiones y rebotes
	collisionDetection();
	// Movimiento pelota
	ballMovement();
	// Movimiento pala
	paddleMovement();
	// Para que se ejecute cada segundo
	window.requestAnimationFrame(draw);
};

draw();

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
