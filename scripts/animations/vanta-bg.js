import { vantaConfig } from '../config/vanta.config.js';

let vantaEffect = null;

export const initVantaBackground = () => {
  // Wait for VANTA to be available
  if (typeof VANTA !== 'undefined' && typeof VANTA.NET !== 'undefined') {
    vantaEffect = VANTA.NET(vantaConfig);
  } else {
    console.error('VANTA NET is not loaded');
  }
};

export const destroyVantaBackground = () => {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }
};

export const getVantaEffect = () => vantaEffect;