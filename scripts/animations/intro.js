export const logoIntroAnimation = (onComplete) => {
  const intro = document.getElementById('logo-intro');
  const logo = intro.querySelector('.intro-logo');
  const body = document.body;

  gsap
    .timeline()
    .fromTo(
      logo,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .to(logo, {
      delay: 1.5,
      scale: 0.3,
      y: -300,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    })
    .to(intro, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        intro.style.display = 'none';
        body.classList.remove('no-scroll');
        if (onComplete) onComplete();
      },
    });
};
