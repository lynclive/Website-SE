import { createRipple } from '../utils/helpers.js';

export const setupGlassEffects = () => {
  const cards = document.querySelectorAll('.glass-interactive');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Store original z-indices for project cards
  const originalZIndices = new Map();
  projectCards.forEach((card) => {
    const zIndex = window.getComputedStyle(card).zIndex;
    originalZIndices.set(card, zIndex !== 'auto' ? parseInt(zIndex) : 0);
  });

  cards.forEach((card) => {
    const isProjectCard = card.classList.contains('project-card');
    
    card.addEventListener('mouseenter', function () {
      // For project cards, bring to front with higher z-index
      if (isProjectCard) {
        const maxZ = Math.max(...Array.from(originalZIndices.values()));
        gsap.to(this, {
          scale: 1.05,
          zIndex: maxZ + 10,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });

    card.addEventListener('mouseleave', function () {
      // Restore original z-index for project cards
      if (isProjectCard) {
        gsap.to(this, {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          zIndex: originalZIndices.get(this),
          duration: 0.5,
          ease: 'power2.out',
        });
      } else {
        gsap.to(this, {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    });

    // Optimized 3D tilt effect - throttled for performance
    let tiltTimeout;
    card.addEventListener('mousemove', function (e) {
      if (tiltTimeout) return; // Skip if already processing
      
      tiltTimeout = setTimeout(() => {
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
          overwrite: 'auto', // Prevent animation conflicts
        });
        
        tiltTimeout = null;
      }, 16); // ~60fps throttle
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