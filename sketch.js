let leftPaddle, rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;
let paddleHeight = 100;
let paddleWidth = 10;
let ballSize = 15;

function setup() {
  createCanvas(800, 400);

  leftPaddle = new Paddle(10, height / 2 - paddleHeight / 2);
  rightPaddle = new Paddle(width - 20, height / 2 - paddleHeight / 2);

  ball = new Ball();
}

function draw() {
  background(0);

  // Display the scores
  textSize(32);
  fill(255);
  text(leftScore, 32, 40);
  text(rightScore, width - 64, 40);

  // Update and display paddles and ball
  leftPaddle.update();
  leftPaddle.display();

  rightPaddle.update();
  rightPaddle.display();

  ball.update();
  ball.display();

  ball.checkPaddle(leftPaddle);
  ball.checkPaddle(rightPaddle);

  // Move the right paddle automatically (AI)
  rightPaddle.y = ball.y - paddleHeight / 2;
}

function keyPressed() {
  if (key === 'W') {
    leftPaddle.move(-10);
  } else if (key === 'S') {
    leftPaddle.move(10);
  }
}

function keyReleased() {
  if (key === 'W' || key === 'S') {
    leftPaddle.move(0);
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ySpeed = 0;
  }

  move(speed) {
    this.ySpeed = speed;
  }

  update() {
    this.y += this.ySpeed;
    this.y = constrain(this.y, 0, height - paddleHeight);
  }

  display() {
    fill(255);
    rect(this.x, this.y, paddleWidth, paddleHeight);
  }
}

class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random() > 0.5 ? 5 : -5;
    this.ySpeed = random(-3, 3);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    if (this.x < 0) {
      rightScore++;
      this.reset();
    }

    if (this.x > width) {
      leftScore++;
      this.reset();
    }
  }

  checkPaddle(paddle) {
    if (
      this.y > paddle.y &&
      this.y < paddle.y + paddleHeight &&
      ((this.x - ballSize / 2 < paddle.x + paddleWidth && this.x + ballSize / 2 > paddle.x) ||
        (this.x + ballSize / 2 > paddle.x && this.x - ballSize / 2 < paddle.x + paddleWidth))
    ) {
      this.xSpeed *= -1;
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, ballSize);
  }
}
