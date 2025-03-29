

const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverText = document.getElementById("game-over");
const restartButton = document.getElementById("restart");
const winMessage = document.getElementById("win-message");

let isJumping = false;
let gameOver = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isJumping && !gameOver) {
    jump();
  }
});

restartButton.addEventListener("click", restartGame);

function jump() {
  if (isJumping) return;
  isJumping = true;
  let position = 0;

  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          player.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 5;
      player.style.bottom = position + "px";
    }
  }, 20);
}

// Função para detectar colisões
function checkCollision() {
  const playerBox = player.getBoundingClientRect();
  const obstacleBox = obstacle.getBoundingClientRect();

  // Detecta colisão
  if (
    playerBox.left < obstacleBox.right &&
    playerBox.right > obstacleBox.left &&
    playerBox.bottom > obstacleBox.top
  ) {
    endGame();
  }
}

// Finaliza o jogo
function endGame() {
  gameOver = true;
  obstacle.style.animationPlayState = "paused";
  gameOverText.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  document.removeEventListener("keydown", jump);
}

// Reinicia o jogo
function restartGame() {
  gameOver = false;
  gameOverText.classList.add("hidden");
  restartButton.classList.add("hidden");

  // Reseta animação do obstáculo do game
  obstacle.style.animation = "none";
  setTimeout(() => {
    obstacle.style.animation = "moveObstacle 2s linear infinite";
  }, 10);

  player.style.bottom = "10px";

  // Reinicia o evento de pular
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      jump();
    }
  });
}

// Reinicia a verificação de colisão
setInterval(() => {
  if (!gameOver) {
    checkCollision();
  }
}, 50);

// play
