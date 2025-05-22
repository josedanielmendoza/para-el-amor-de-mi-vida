const phrases = document.querySelectorAll('.floating');
const velocities = [];

// Inicializa posiciones y velocidades
phrases.forEach(p => {
  const vx = (Math.random() - 0.5) * 2;
  const vy = (Math.random() - 0.5) * 2;
  velocities.push({ x: vx, y: vy });

  p.style.left = Math.random() * (window.innerWidth - 200) + 'px';
  p.style.top = Math.random() * (window.innerHeight - 50) + 'px';
});

const centralText = document.querySelector('.central-text');

function getRect(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.left + rect.width,
    bottom: rect.top + rect.height,
    width: rect.width,
    height: rect.height
  };
}

function updatePositions() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const centralRect = getRect(centralText);

  for (let i = 0; i < phrases.length; i++) {
    const p = phrases[i];
    const vel = velocities[i];

    let x = parseFloat(p.style.left);
    let y = parseFloat(p.style.top);
    const w = p.offsetWidth;
    const h = p.offsetHeight;

    x += vel.x * 2;
    y += vel.y * 2;

    // Rebote con bordes de la pantalla
    if (x <= 0 || x + w >= width) vel.x *= -1;
    if (y <= 0 || y + h >= height) vel.y *= -1;

    // Rebote con otras frases
    for (let j = 0; j < phrases.length; j++) {
      if (i === j) continue;
      const other = phrases[j];
      const ox = parseFloat(other.style.left);
      const oy = parseFloat(other.style.top);
      const ow = other.offsetWidth;
      const oh = other.offsetHeight;

      if (
        x < ox + ow &&
        x + w > ox &&
        y < oy + oh &&
        y + h > oy
      ) {
        vel.x *= -1;
        vel.y *= -1;
      }
    }

    // Rebote con frase central
    if (
      x < centralRect.right &&
      x + w > centralRect.left &&
      y < centralRect.bottom &&
      y + h > centralRect.top
    ) {
      vel.x *= -1;
      vel.y *= -1;
    }

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
  }

  requestAnimationFrame(updatePositions);
}
updatePositions();

// Corazones animados
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💗';

  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight;

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.getElementById('heart-container').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2500);
}
setInterval(createHeart, 150);
