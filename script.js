/* script.js */
}


function drawHearts() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
hearts.forEach(h => {
ctx.beginPath();
ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
ctx.fillStyle = h.c;
ctx.fill();
});
}


function updateHearts() {
hearts.forEach(h => {
h.y -= h.d;
if (h.y + h.r < 0) {
h.y = canvas.height + random(50, 100);
h.x = random(0, canvas.width);
}
});
}


function animateHearts() {
drawHearts();
updateHearts();
requestAnimationFrame(animateHearts);
}


const messages = [
'You make my world brighter 🌸',
'Every heartbeat whispers your name 💖',
'Forever and always, it’s you ❤️',
'Your smile lights up my day ✨',
'Love you more every moment 💜'
];


revealBtn.addEventListener('click', () => {
giftMessage.style.display = 'block';
revealBtn.style.display = 'none';
loveMessages.style.display = 'block';
animateHearts();


let index = 0;
function showNextMessage() {
if (index < messages.length) {
const p = document.createElement('p');
p.textContent = messages[index];
loveMessages.appendChild(p);
index++;
setTimeout(showNextMessage, 1000);
}
}
showNextMessage();
});
