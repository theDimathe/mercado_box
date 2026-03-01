import './style.css';

const boxes = [...document.querySelectorAll('.box')];

const spawnSparkle = (box) => {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';

  const x = 8 + Math.random() * 84;
  const y = 8 + Math.random() * 84;

  sparkle.style.left = `${x}%`;
  sparkle.style.top = `${y}%`;
  sparkle.style.animationDuration = `${700 + Math.random() * 700}ms`;

  box.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1500);
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    box.animate(
      [
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-4px) scale(1.09)' },
        { transform: 'translateY(0) scale(1)' }
      ],
      { duration: 260, easing: 'ease-out' }
    );
  });

  const pulse = () => {
    if (Math.random() > 0.6) {
      spawnSparkle(box);
    }
  };

  const interval = 500 + Math.random() * 1100;
  setInterval(pulse, interval);
});
