const boxes = [...document.querySelectorAll('.box')];

const spawnSparkle = (box) => {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';

  const side = Math.floor(Math.random() * 4);
  let x;
  let y;

  if (side === 0) {
    x = -2 + Math.random() * 104;
    y = -8 + Math.random() * 24;
  } else if (side === 1) {
    x = 78 + Math.random() * 24;
    y = -4 + Math.random() * 108;
  } else if (side === 2) {
    x = -2 + Math.random() * 104;
    y = 78 + Math.random() * 24;
  } else {
    x = -8 + Math.random() * 24;
    y = -4 + Math.random() * 108;
  }

  sparkle.style.left = `${x}%`;
  sparkle.style.top = `${y}%`;
  sparkle.style.setProperty('--duration', `${650 + Math.random() * 650}ms`);

  box.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1400);
};

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    box.animate(
      [
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-7px) scale(1.04)' },
        { transform: 'translateY(0) scale(1)' }
      ],
      { duration: 280, easing: 'ease-out' }
    );
  });

  const animateSparkle = () => {
    spawnSparkle(box);
    if (Math.random() > 0.55) {
      setTimeout(() => spawnSparkle(box), 120 + Math.random() * 240);
    }
  };

  setInterval(animateSparkle, 850 + index * 120 + Math.random() * 900);
});
