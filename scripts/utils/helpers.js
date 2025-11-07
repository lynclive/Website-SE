export const createRipple = (element, event) => {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,0,0.4) 0%, transparent 70%);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    transform: scale(0);
    z-index: 10;
  `;

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  gsap.to(ripple, {
    scale: 2,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove(),
  });
};

export const setupParallax = () => {
  document.addEventListener('mousemove', (e) => {
    const orb1 = document.querySelector('.orb1');
    const orb2 = document.querySelector('.orb2');

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    gsap.to(orb1, {
      x: x * 50,
      y: y * 50,
      duration: 2,
      ease: 'power2.out',
    });

    gsap.to(orb2, {
      x: x * -30,
      y: y * -30,
      duration: 2,
      ease: 'power2.out',
    });
  });
};
