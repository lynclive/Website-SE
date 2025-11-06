export const logoIntroAnimation = (onComplete) => {
  const intro = document.getElementById('logo-intro');
  const heroSection = document.querySelector('.hero-section');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const body = document.body;

  // Calculate scrollbar width and add padding to prevent shift
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Keep scroll disabled during animation
  body.classList.add('no-scroll');
  body.style.paddingRight = `${scrollbarWidth}px`;
  
  // Hide scrollbar completely during intro
  document.documentElement.style.overflow = 'hidden';

  // Make hero section visible during intro
  gsap.set(heroSection, { zIndex: 10000 });
  
  // Set initial states
  gsap.set(heroTitle, {
    y: window.innerHeight,
    scale: 0,
    opacity: 0,
  });
  gsap.set(heroSubtitle, { opacity: 0, y: 30 });
  gsap.set(header, { y: -100, opacity: 0 });
  gsap.set(footer, { y: 100, opacity: 0 });

  gsap
    .timeline()
    // Animate hero title from bottom - scale up to 1.5x
    .to(heroTitle, {
      y: 0,
      scale: 1.5,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    })
    // Hold at larger size
    .to(heroTitle, {
      delay: 0.6,
      duration: 0.2,
    })
    // Scale down to fit as hero title
    .to(heroTitle, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.inOut',
    })
    // Fade out intro overlay
    .to(intro, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        intro.style.display = 'none';
        body.classList.remove('no-scroll');
        body.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        gsap.set(heroSection, { zIndex: 1 });
      },
    })
    // Animate subtitle
    .to(
      heroSubtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    )
    // Slide in header from top
    .to(
      header,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    )
    // Slide in footer from bottom
    .to(
      footer,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      },
      '-=0.5'
    );
};