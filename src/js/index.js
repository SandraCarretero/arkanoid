import { canvasElement } from './dom';

const ctx = canvasElement.getContext('2d');

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

const drawBall = () => {
	ctx.beginPath();
	ctx.arc(positionBallX, positionBallY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();
};

const drawPaddle = () => {
	ctx.fillStyle = '#fff';
	ctx.fillRect(positionPaddleX, positionPaddleY, paddleWidth, paddleHeight);
};
const drawBricks = () => {};
const collisionDetection = () => {};
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
		canvasElement.height - ballRadius
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
