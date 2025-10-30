import { lenisConfig } from './config/lenis.config.js';
import { logoIntroAnimation } from './animations/intro.js';
import { setupScrollAnimations } from './animations/scroll.js';
import { setupGlassEffects } from './animations/glass-effects.js';
import { initLenis, setupNavigationHandlers } from './navigation/router.js';
import { setupParallax } from './utils/helpers.js';

// Initialize on load
window.addEventListener('load', () => {
  // Start with logo intro animation
  logoIntroAnimation(() => {
    // After intro completes, initialize everything
    initLenis(lenisConfig);
    setupScrollAnimations();
    setupGlassEffects();
    setupNavigationHandlers();
    setupParallax();
  });
});
