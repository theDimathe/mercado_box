const boxes = [...document.querySelectorAll('.box')];
const landing = document.querySelector('.landing');
const gridScreen = document.querySelector('[data-screen="grid"]');
const bonusScreen = document.querySelector('[data-screen="bonus"]');
const revealWave = document.querySelector('.reveal-wave');
const claimButton = document.querySelector('.claim-button');

let isTransitionRunning = false;

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

const shakeBox = (box) => {
  if (isTransitionRunning || document.hidden) {
    return;
  }

  box.animate(
    [
      { transform: 'translate3d(0, 0, 0) scale(1)' },
      { transform: 'translate3d(-2px, 1px, 0) rotate(-0.7deg) scale(1.018)' },
      { transform: 'translate3d(2px, -1px, 0) rotate(0.7deg) scale(1.028)' },
      { transform: 'translate3d(-1px, 0, 0) rotate(-0.4deg) scale(1.012)' },
      { transform: 'translate3d(0, 0, 0) scale(1)' }
    ],
    { duration: 260 + Math.random() * 130, easing: 'ease-out' }
  );
};

const scheduleShake = (box) => {
  const tick = () => {
    const delay = 1800 + Math.random() * 2800;

    setTimeout(() => {
      if (Math.random() > 0.34) {
        shakeBox(box);
      }
      tick();
    }, delay);
  };

  tick();
};

const showBonusScreen = (clientX, clientY) => {
  if (isTransitionRunning) {
    return;
  }

  isTransitionRunning = true;

  const { left, top, width, height } = landing.getBoundingClientRect();
  const localX = clientX - left;
  const localY = clientY - top;
  const maxX = Math.max(localX, width - localX);
  const maxY = Math.max(localY, height - localY);
  const finalRadius = Math.sqrt(maxX ** 2 + maxY ** 2);

  revealWave.style.setProperty('--x', `${localX}px`);
  revealWave.style.setProperty('--y', `${localY}px`);
  revealWave.style.setProperty('--size', `${finalRadius * 2}px`);

  revealWave.classList.remove('is-active');
  // eslint-disable-next-line no-unused-expressions
  revealWave.offsetWidth;
  revealWave.classList.add('is-active');

  setTimeout(() => {
    gridScreen.classList.add('is-hidden');
    bonusScreen.classList.add('is-visible');
    bonusScreen.setAttribute('aria-hidden', 'false');
  }, 150);

  setTimeout(() => {
    isTransitionRunning = false;
  }, 520);
};

boxes.forEach((box, index) => {
  box.addEventListener('click', (event) => {
    if (isTransitionRunning) {
      return;
    }

    box.animate(
      [
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-7px) scale(1.04)' },
        { transform: 'translateY(0) scale(1)' }
      ],
      { duration: 220, easing: 'ease-out' }
    );

    showBonusScreen(event.clientX, event.clientY);
  });

  const animateSparkle = () => {
    spawnSparkle(box);
    if (Math.random() > 0.55) {
      setTimeout(() => spawnSparkle(box), 120 + Math.random() * 240);
    }
  };

  setInterval(animateSparkle, 850 + index * 120 + Math.random() * 900);
  scheduleShake(box);
});

claimButton?.addEventListener('click', () => {
  window.location.href = 'https://123.com';
});
