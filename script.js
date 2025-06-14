const phrases = [
  "Te Amo Zayuri Nahomi 😍",
  "Mi vida 💖",
  "Te amo 😘",
  "Mi corazón ❤️",
  "Contigo soy feliz 🥰",
  "Siempre tú 💞",
  "Eres mi felicidad diaria 💘",
  "Mi alma gemela 🤗",
  "Gracias por existir 😍",
  "Contigo todo es mejor 🥰",
  "Nuestro destino está escrito 📝",
  "Eres mi sol ☀️",
  "Besitos 😘",
  "💍 ¿Para siempre?"
];

const typewriterText = "I love you 💘";

function typeEffectLoop(text, elementId, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const el = document.getElementById(elementId);
  let i = 0;
  let isDeleting = false;

  function type() {
    if (isDeleting) {
      el.textContent = text.substring(0, i--);
    } else {
      el.textContent = text.substring(0, i++);
    }

    if (!isDeleting && i === text.length + 1) {
      setTimeout(() => isDeleting = true, pauseTime);
    } else if (isDeleting && i === 0) {
      isDeleting = false;
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, delay);
  }

  type();
}

function showMessage() {
  const container = document.getElementById("messages-container");
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = phrases[Math.floor(Math.random() * phrases.length)];

  const side = Math.random() > 0.5 ? 'left' : 'right';
  const offsetY = Math.random() * 80 - 40;

  msg.style[side] = `${Math.random() * 40 + 10}%`;
  msg.style.top = `calc(50% + ${offsetY}px)`;

  container.appendChild(msg);
  setTimeout(() => container.removeChild(msg), 3000);
}

window.onload = () => {
  typeEffectLoop(typewriterText, "typewriter-text");
  setInterval(showMessage, 2000);
};
