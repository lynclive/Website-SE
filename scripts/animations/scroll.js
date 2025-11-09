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
      borderRadius: '0px',
      scale: 3,
    },
    {
      scrollTrigger: {
        trigger: '.vam-section',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
      y: 0,
      borderRadius: '40px',
      scale: 1,
    }
  );

  // Division horizontal scroll - RIGHT TO LEFT
  const divisionTrack = document.querySelector('.division-track');
  const divisionSection = document.querySelector('.division-section');
  const trackWidth = divisionTrack.scrollWidth;
  const viewportWidth = window.innerWidth;

  gsap.to(divisionTrack, {
    scrollTrigger: {
      trigger: divisionSection,
      start: 'top top',
      end: () => `+=${trackWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
    x: () => -(trackWidth - viewportWidth),
    ease: 'none',
  });

  // Projects section - Fixed to prevent inline top style
  const projectsSection = document.querySelector('.projects-section');
  const projectsWrapper = document.querySelector('.projects-wrapper');
  const projectCards = gsap.utils.toArray('.project-card');
  const totalCards = projectCards.length;
  const stackOffsetTop = 10;
  const stackOffsetLeft = 150;

  // Helper to compute final offsets
  function finalPos(index) {
    return {
      fx: index * stackOffsetLeft,
      fy: index * stackOffsetTop
    };
  }

  // Initialize cards with pure transforms (no top/left)
  projectCards.forEach((card, index) => {
    gsap.set(card, {
      x: 300 + finalPos(index).fx,
      y: window.innerHeight + finalPos(index).fy,
      rotation: 8,
      opacity: 0,
      zIndex: totalCards + index
    });
  });

  // Create ScrollTrigger - let it do its thing naturally
  ScrollTrigger.create({
    trigger: projectsSection,
    start: 'top top',
    end: () => `+=${window.innerHeight * totalCards}`,
    pin: projectsWrapper,
    pinSpacing: true,
    scrub: 2,
    onUpdate: (self) => {
      const progress = self.progress;

      projectCards.forEach((card, index) => {
        const { fx, fy } = finalPos(index);
        const cardStart = index / totalCards;
        const cardEnd = (index + 1) / totalCards;

        if (progress >= cardStart && progress <= cardEnd) {
          const cardProgress = (progress - cardStart) / (cardEnd - cardStart);
          const eased = cardProgress < 0.5
            ? 2 * cardProgress * cardProgress
            : 1 - Math.pow(-2 * cardProgress + 2, 2) / 2;

          gsap.set(card, {
            x: 300 * (1 - eased) + fx,
            y: window.innerHeight * (1 - eased) + fy,
            rotation: 8 * (1 - eased),
            opacity: eased,
            scale: 1
          });
        } else if (progress > cardEnd) {
          gsap.set(card, {
            x: fx,
            y: fy,
            rotation: 0,
            opacity: 1,
            scale: 1
          });
        } else {
          gsap.set(card, {
            x: 300 + fx,
            y: window.innerHeight + fy,
            rotation: 8,
            opacity: 0
          });
        }
      });

      if (progress >= 1) {
        projectCards.forEach((card, index) => {
          const { fx, fy } = finalPos(index);
          gsap.set(card, { x: fx, y: fy, rotation: 0, opacity: 1 });
        });
      }
    }
  });

  // Prevent inline top style on refresh
  ScrollTrigger.addEventListener("refreshInit", () => {
    gsap.set(".project-card", { 
      top: 0,
      clearProps: 'top'
    });
  });

  // Refresh on load and resize
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};