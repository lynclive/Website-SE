import { membersData } from './data/members.js';
import { initVantaBackground } from './animations/vanta-bg.js';

// Get division from URL
const urlParams = new URLSearchParams(window.location.search);
const division = urlParams.get('division') || getDivisionFromFilename();

function getDivisionFromFilename() {
  const filename = window.location.pathname.split('/').pop();
  return filename.replace('.html', '');
}

// Render members
function renderMembers() {
  const data = membersData[division];
  if (!data) {
    document.getElementById('division-title').textContent = 'DIVISION NOT FOUND';
    return;
  }

  document.getElementById('division-title').textContent = data.title;
  document.title = `${data.title} | SABA EXPLOIT`;

  const container = document.getElementById('members-container');
  container.innerHTML = data.members
    .map(
      (member) => `
    <div class="member-card glass glass-interactive">
      <div class="member-avatar">${member.avatar}</div>
      <h4>${member.name}</h4>
      <p>${member.role}</p>
    </div>
  `
    )
    .join('');

  // Animate cards in
  gsap.fromTo(
    '.member-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.2,
    }
  );
}

// Glass effects
function setupGlassEffects() {
  const cards = document.querySelectorAll('.glass-interactive');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// Initialize
window.addEventListener('load', () => {
  initVantaBackground();
  renderMembers();
  setupGlassEffects();
});