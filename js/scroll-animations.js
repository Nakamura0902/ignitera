document.addEventListener('DOMContentLoaded', () => {
  // --- Hero entry animation ---
  const heroEls = document.querySelectorAll('.hero-animate');
  const heroLogo = document.querySelector('.hero-logo-animate');

  heroEls.forEach((el, i) => {
    const delay = i * 150;
    setTimeout(() => el.classList.add('is-loaded'), delay);
  });

  if (heroLogo) {
    setTimeout(() => heroLogo.classList.add('is-loaded'), 200);
  }

  // Fade out scroll indicator after first scroll
  const scrollIndicator = document.querySelector('.hero-scroll');
  if (scrollIndicator) {
    window.addEventListener('scroll', function hideIndicator() {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.transition = 'opacity 0.4s ease';
      window.removeEventListener('scroll', hideIndicator);
    }, { once: true });
  }

  // --- Scroll reveal via Intersection Observer ---
  const revealEls = document.querySelectorAll('.scroll-reveal');

  if (!revealEls.length) return;

  // Apply stagger delays to value cards
  document.querySelectorAll('.values-grid .value-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealEls.forEach((el) => {
    // Apply data-delay if set
    const delay = el.dataset.delay;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    observer.observe(el);
  });
});
