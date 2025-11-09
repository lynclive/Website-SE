export const vantaConfig = {
  el: '#vanta-bg',
  mouseControls: false, // Disabled for better performance
  touchControls: false, // Disabled for better performance
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  
  // Red theme colors
  color: 0xff0000, // Primary red (#ff0000)
  backgroundColor: 0x0a0a0a, // Deep black (#0a0a0a)
  
  // Net effect settings - optimized for performance
  points: 10.0, 
  maxDistance: 25.0, 
  spacing: 18.0, 
  showDots: true,

  forceAnimate: false,
  fps: 40, // Reduced from 30 for better performance
};