const revealBtn = document.getElementById('revealBtn');
const loveBubbles = document.getElementById('loveBubbles');
const canvas = document.getElementById('heartCanvas');
const animatedTexts = document.querySelectorAll('.animated-text');

// Add interactive effects to the text
animatedTexts.forEach(text => {
  text.addEventListener('click', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 500);
  });

  text.addEventListener('mouseover', function() {
    const randomEffect = Math.random();
    if (randomEffect > 0.5) {
      this.classList.add('rainbow');
      setTimeout(() => this.classList.remove('rainbow'), 2000);
    }
  });

  // Add continuous subtle movement
  let angle = 0;
  setInterval(() => {
    angle += 0.1;
    const yOffset = Math.sin(angle) * 3;
    text.style.transform = `translateY(${yOffset}px)`;
  }, 50);
});
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Heart class
class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.color = `hsla(${Math.random()*360}, 100%, 70%, 0.5)`;
    this.dy = Math.random() * 1 + 0.5;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    ctx.bezierCurveTo(
      this.x, this.y,
      this.x - this.size / 2, this.y,
      this.x - this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x, this.y + (this.size + topCurveHeight) / 1.5,
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x, this.y + (this.size + topCurveHeight) / 1.5,
      this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x + this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y,
      this.x, this.y,
      this.x, this.y + topCurveHeight
    );
    ctx.fill();
  }
  update() {
    this.y -= this.dy;
    if (this.y + this.size < 0) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }
}

// Generate hearts
const hearts = [];
for (let i = 0; i < 200; i++) {
  hearts.push(new Heart());
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animateHearts);
}

// Floating message bubbles
const messages = [
  'You make my world brighter 🌸',
  'Every heartbeat whispers your name 💖',
  'you are SPECIAL!❤️',
  'Your smile lights up my day ✨',
  'Love you more every moment 💜'
];

function createBubble(message) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = '❤️ ' + message + ' ❤️';
  bubble.style.left = Math.random() * 60 + '%';
  bubble.style.fontSize = `${Math.random() * 500 + 10}px`;
  bubble.style.color = `hsl(${Math.random()*360}, 100%, 80%)`;
  bubble.style.animationDuration = `${Math.random()*6 + 5}s`;
  loveBubbles.appendChild(bubble);
  setTimeout(() => bubble.remove(), 8000);
}

revealBtn.addEventListener('click', () => {
  revealBtn.style.display = 'none';
  animateHearts();
  messages.forEach((msg, index) => {
    setTimeout(() => createBubble(msg), index * 3000);
  });
});
