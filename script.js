/* script.js */
const revealBtn = document.getElementById('revealBtn');
const giftMessage = document.getElementById('giftMessage');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const confetti = [];
for (let i = 0; i < 150; i++) {
  confetti.push({
    x: random(0, canvas.width),
    y: random(0, canvas.height),
    r: random(2, 6),
    c: `hsl(${random(280, 330)}, 100%, 70%)`,
    d: random(2, 5)
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
  });
}

function updateConfetti() {
  confetti.forEach(p => {
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = random(0, canvas.width);
    }
  });
}

function animateConfetti() {
  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}

revealBtn.addEventListener('click', () => {
  giftMessage.style.display = 'block';
  revealBtn.style.display = 'none';
  animateConfetti();
});
