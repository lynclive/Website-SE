import { createRipple } from '../utils/helpers.js';

export const setupGlassEffects = () => {
  const cards = document.querySelectorAll('.glass-interactive');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 100;
      const rotateY = (centerX - x) / 100;

      gsap.to(this, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });
  });

  // Ripple effect
  document.addEventListener('click', (e) => {
    if (e.target.closest('.glass-interactive')) {
      const card = e.target.closest('.glass-interactive');
      createRipple(card, e);
    }
  });
};
