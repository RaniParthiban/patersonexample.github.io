{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const canvas = document.getElementById("pong");\
const ctx = canvas.getContext("2d");\
\
// Ball\
const ball = \{\
  x: canvas.width / 2,\
  y: canvas.height / 2,\
  radius: 10,\
  speed: 4,\
  dx: 4,\
  dy: 4,\
\};\
\
// Paddles\
const paddleWidth = 10;\
const paddleHeight = 100;\
\
const user = \{\
  x: 0,\
  y: canvas.height / 2 - paddleHeight / 2,\
  width: paddleWidth,\
  height: paddleHeight,\
  color: "white",\
  score: 0,\
\};\
\
const ai = \{\
  x: canvas.width - paddleWidth,\
  y: canvas.height / 2 - paddleHeight / 2,\
  width: paddleWidth,\
  height: paddleHeight,\
  color: "white",\
  score: 0,\
\};\
\
function drawRect(x, y, w, h, color) \{\
  ctx.fillStyle = color;\
  ctx.fillRect(x, y, w, h);\
\}\
\
function drawCircle(x, y, r, color) \{\
  ctx.fillStyle = color;\
  ctx.beginPath();\
  ctx.arc(x, y, r, 0, Math.PI * 2, false);\
  ctx.closePath();\
  ctx.fill();\
\}\
\
function drawText(text, x, y) \{\
  ctx.fillStyle = "white";\
  ctx.font = "24px Arial";\
  ctx.fillText(text, x, y);\
\}\
\
function render() \{\
  drawRect(0, 0, canvas.width, canvas.height, "#111");\
\
  drawText(user.score, canvas.width / 4, 30);\
  drawText(ai.score, 3 * canvas.width / 4, 30);\
\
  drawRect(user.x, user.y, user.width, user.height, user.color);\
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);\
\
  drawCircle(ball.x, ball.y, ball.radius, "white");\
\}\
\
function resetBall() \{\
  ball.x = canvas.width / 2;\
  ball.y = canvas.height / 2;\
  ball.dx = -ball.dx;\
  ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);\
\}\
\
function collision(b, p) \{\
  return (\
    b.x - b.radius < p.x + p.width &&\
    b.x + b.radius > p.x &&\
    b.y - b.radius < p.y + p.height &&\
    b.y + b.radius > p.y\
  );\
\}\
\
function update() \{\
  ball.x += ball.dx;\
  ball.y += ball.dy;\
\
  // AI movement\
  ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.05;\
\
  // Bounce off top/bottom\
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) \{\
    ball.dy = -ball.dy;\
  \}\
\
  // Bounce off paddles\
  const player = ball.x < canvas.width / 2 ? user : ai;\
\
  if (collision(ball, player)) \{\
    // Change direction\
    let collidePoint = ball.y - (player.y + player.height / 2);\
    collidePoint = collidePoint / (player.height / 2);\
\
    let angleRad = collidePoint * Math.PI / 4;\
    let direction = ball.x < canvas.width / 2 ? 1 : -1;\
    ball.dx = direction * ball.speed * Math.cos(angleRad);\
    ball.dy = ball.speed * Math.sin(angleRad);\
    ball.speed += 0.2;\
  \}\
\
  // Score\
  if (ball.x - ball.radius < 0) \{\
    ai.score++;\
    resetBall();\
  \} else if (ball.x + ball.radius > canvas.width) \{\
    user.score++;\
    resetBall();\
  \}\
\}\
\
function game() \{\
  update();\
  render();\
\}\
\
setInterval(game, 1000 / 60);\
\
// User paddle control\
document.addEventListener("mousemove", (e) => \{\
  const rect = canvas.getBoundingClientRect();\
  user.y = e.clientY - rect.top - user.height / 2;\
\});}