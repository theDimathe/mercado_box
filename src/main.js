import './style.css';

const pulseBtn = document.querySelector('#pulseBtn');
const counter = document.querySelector('#pulseCounter');
const tiltCard = document.querySelector('#tiltCard');

let clicks = 0;

pulseBtn?.addEventListener('click', () => {
  clicks += 1;
  counter.textContent = `Кликов: ${clicks}`;
  pulseBtn.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.06)' },
      { transform: 'scale(1)' }
    ],
    { duration: 220, easing: 'ease-out' }
  );
});

window.addEventListener('mousemove', (event) => {
  if (!tiltCard) return;
  const { innerWidth, innerHeight } = window;
  const rotateY = ((event.clientX / innerWidth) - 0.5) * 8;
  const rotateX = ((event.clientY / innerHeight) - 0.5) * -8;
  tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
