import { lenisConfig } from './config/lenis.config.js';
import { logoIntroAnimation } from './animations/intro.js';
import { setupScrollAnimations } from './animations/scroll.js';
import { setupGlassEffects } from './animations/glass-effects.js';
import { initVantaBackground } from './animations/vanta-bg.js';

// Initialize Lenis smooth scroll
function initLenis(lenisConfig) {
  const lenis = new Lenis(lenisConfig);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// Scroll to section
function setupScrollLinks() {
  document.querySelectorAll('[data-scroll]').forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const target = element.getAttribute('data-scroll');
      const section = document.querySelector(`.${target}-section`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// Initialize on load
window.addEventListener('load', () => {
  initVantaBackground();

  logoIntroAnimation(() => {
    initLenis(lenisConfig);
    setupScrollAnimations();
    setupGlassEffects();
    setupScrollLinks();
  });
});