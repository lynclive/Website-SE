// Initialize Lenis Smooth Scroll
        let lenis;
        let currentSection = 'homepage';
        let isTransitioning = false;

        function initLenis() {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                smooth: true,
                smoothTouch: false,
                touchMultiplier: 2,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }

        // Logo Intro Animation
        function logoIntroAnimation() {
            const intro = document.getElementById('logo-intro');
            const logo = intro.querySelector('.intro-logo');
            const body = document.body;

            gsap.timeline()
                .fromTo(logo, 
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
                )
                .to(logo, { 
                    delay: 1.5,
                    scale: 0.3, 
                    y: -300, 
                    opacity: 0, 
                    duration: 1,
                    ease: 'power2.in'
                })
                .to(intro, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        intro.style.display = 'none';
                        body.classList.remove('no-scroll');
                        initLenis();
                        setupScrollAnimations();
                    }
                });
        }

        // Setup Homepage Scroll Animations
        function setupScrollAnimations() {
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
            gsap.fromTo('.vam-section',
                {
                    y: '100vh',
                    borderRadius: '50px',
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
                }
            );

            // Division horizontal scroll
            const divisionTrack = document.querySelector('.division-track');
            const divisionSection = document.querySelector('.division-section');
            
            gsap.to(divisionTrack, {
                scrollTrigger: {
                    trigger: divisionSection,
                    start: 'top top',
                    end: () => `+=${divisionTrack.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                },
                x: () => -(divisionTrack.scrollWidth - window.innerWidth),
                ease: 'none',
            });

            // Project cards stack animation
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: '.projects-section',
                        start: `top+=${index * 200} top`,
                        end: `top+=${(index + 1) * 200} top`,
                        scrub: true,
                    },
                    opacity: 1,
                    x: 0,
                    ease: 'power2.out',
                });
            });

            // Enhanced glass card 3D hover effects
            setupGlassEffects();
        }

        // Glass Interactive Effects
        function setupGlassEffects() {
            const cards = document.querySelectorAll('.glass-interactive');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    gsap.to(this, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', function() {
                    gsap.to(this, {
                        scale: 1,
                        rotationX: 0,
                        rotationY: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    gsap.to(this, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        duration: 0.3,
                        ease: 'power2.out',
                        transformPerspective: 1000,
                    });
                });
            });
        }

        // Navigation System
        function navigateTo(sectionId) {
            if (isTransitioning || currentSection === sectionId) return;
            isTransitioning = true;

            const currentEl = document.getElementById(currentSection);
            const nextEl = document.getElementById(sectionId);
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            // Close mobile menu
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');

            // Destroy current lenis instance
            if (lenis) {
                lenis.destroy();
            }

            // Animate transition
            gsap.timeline()
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
                .fromTo(nextEl,
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
                                initLenis();
                                setupScrollAnimations();
                            }

                            // Animate cards in new section
                            const cards = nextEl.querySelectorAll('.glass-interactive');
                            gsap.fromTo(cards,
                                { opacity: 0, y: 50 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    stagger: 0.08,
                                    ease: 'power2.out',
                                }
                            );
                        }
                    }
                );
        }

        // Scroll to specific sections within homepage
        function scrollToVAM() {
            if (currentSection !== 'homepage') {
                navigateTo('homepage');
                setTimeout(() => {
                    lenis.scrollTo('.vam-section', { offset: 0, duration: 1.5 });
                }, 1000);
            } else {
                lenis.scrollTo('.vam-section', { offset: 0, duration: 1.5 });
            }
        }

        function scrollToProjects() {
            if (currentSection !== 'homepage') {
                navigateTo('homepage');
                setTimeout(() => {
                    lenis.scrollTo('.projects-section', { offset: 0, duration: 2 });
                }, 1000);
            } else {
                lenis.scrollTo('.projects-section', { offset: 0, duration: 2 });
            }
        }

        // Toggle Mobile Menu
        function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        }

        // Liquid glass ripple effect
        document.addEventListener('click', (e) => {
            if (e.target.closest('.glass-interactive')) {
                const card = e.target.closest('.glass-interactive');
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

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
                `;

                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(ripple);

                gsap.to(ripple, {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                });
            }
        });

        // Parallax effect for background orbs
        document.addEventListener('mousemove', (e) => {
            const orb1 = document.querySelector('.orb1');
            const orb2 = document.querySelector('.orb2');
            
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            gsap.to(orb1, {
                x: x * 50,
                y: y * 50,
                duration: 2,
                ease: 'power2.out'
            });
            
            gsap.to(orb2, {
                x: x * -30,
                y: y * -30,
                duration: 2,
                ease: 'power2.out'
            });
        });

        // Initialize on load
        window.addEventListener('load', () => {
            logoIntroAnimation();
        });

        // Prevent default scroll behavior on member sections
        document.querySelectorAll('.member-section').forEach(section => {
            section.addEventListener('wheel', (e) => {
                e.stopPropagation();
            });
        });