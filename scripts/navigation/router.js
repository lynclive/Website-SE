import { setupScrollAnimations } from '../animations/scroll.js';

let lenis = null;
let currentSection = 'homepage';
let isTransitioning = false;

export const initLenis = (lenisConfig) => {
  lenis = new Lenis(lenisConfig);

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
};

export const navigateTo = (sectionId) => {
  if (isTransitioning || currentSection === sectionId) return;
  isTransitioning = true;

  const currentEl = document.getElementById(currentSection);
  const nextEl = document.getElementById(sectionId);
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Close mobile menu
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');

  // Destroy current lenis instance and ScrollTrigger
  if (lenis) {
    lenis.destroy();
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Animate transition
  gsap
    .timeline()
    .to(currentEl, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in',
    })
    .call(() => {
      currentEl.classList.remove('active');
      nextEl.classList.add('active');
      window.scrollTo(0, 0);
    })
    .fromTo(
      nextEl,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          isTransitioning = false;
          currentSection = sectionId;

          // Reinit lenis for homepage
          if (sectionId === 'homepage') {
            const lenisConfig = {
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              direction: 'vertical',
              smooth: true,
              smoothTouch: false,
              touchMultiplier: 2,
            };
            initLenis(lenisConfig);
            setupScrollAnimations();
          }

          // Animate cards in new section
          const cards = nextEl.querySelectorAll('.glass-interactive');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
            }
          );
        },
      }
    );
};

export const scrollToSection = (section) => {
  if (currentSection !== 'homepage') {
    navigateTo('homepage');
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(`.${section}-section`, { offset: 0, duration: 1.5 });
      }
    }, 1000);
  } else {
    if (lenis) {
      lenis.scrollTo(`.${section}-section`, { offset: 0, duration: 1.5 });
    }
  }
};

export const setupNavigationHandlers = () => {
  // Navigation links
  document.querySelectorAll('[data-navigate]').forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const target = element.getAttribute('data-navigate');
      navigateTo(target);
    });
  });

  // Scroll links
  document.querySelectorAll('[data-scroll]').forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const target = element.getAttribute('data-scroll');
      scrollToSection(target);
    });
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Prevent scroll on member sections
  document.querySelectorAll('.member-section').forEach((section) => {
    section.addEventListener('wheel', (e) => {
      e.stopPropagation();
    });
  });
};
