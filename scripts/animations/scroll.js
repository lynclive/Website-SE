export const setupScrollAnimations = () => {
  // Hero section shrink animation
  gsap.to('.hero-section', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    scale: 0.7,
    opacity: 0.3,
  });

  // VAM section slide up animation
  gsap.fromTo(
    '.vam-container',
    {
      y: '50vh',
      borderRadius: '50px',
      scale: 0.9,
    },
    {
      scrollTrigger: {
        trigger: '.vam-section',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
      y: 0,
      borderRadius: '0px',
      scale: 1,
    }
  );

  // Division horizontal scroll - RIGHT TO LEFT
  const divisionTrack = document.querySelector('.division-track');
  const divisionSection = document.querySelector('.division-section');
  const trackWidth = divisionTrack.scrollWidth;

  gsap.to(divisionTrack, {
    scrollTrigger: {
      trigger: divisionSection,
      start: 'top top',
      end: () => `+=${trackWidth * 1.5}`,
      scrub: 1,
      pin: true,
    },
    x: () => -(trackWidth - window.innerWidth + 100),
    ease: 'none',
  });

  // Projects horizontal scroll - RIGHT TO LEFT with stacking effect
  const projectsStack = document.querySelector('.projects-stack');
  const projectsSection = document.querySelector('.projects-section');
  const projectCards = document.querySelectorAll('.project-card');
  const stackWidth = projectsStack.scrollWidth;

  gsap.to(projectsStack, {
    scrollTrigger: {
      trigger: projectsSection,
      start: 'top top',
      end: () => `+=${stackWidth * 1.5}`,
      scrub: 1,
      pin: true,
    },
    x: () => -(stackWidth - window.innerWidth + 100),
    ease: 'none',
  });

  // Individual card stacking animation
  projectCards.forEach((card) => {
    gsap.fromTo(
      card,
      {
        x: 100,
        opacity: 0.5,
      },
      {
        scrollTrigger: {
          trigger: projectsSection,
          start: 'top top',
          end: () => `+=${stackWidth * 1.5}`,
          scrub: 1,
        },
        x: 0,
        opacity: 1,
        ease: 'none',
      }
    );
  });
};
