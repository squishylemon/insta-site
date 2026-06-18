import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pinPanel(panel, duration = '+=100%') {
  return ScrollTrigger.create({
    trigger: panel,
    start: 'top top',
    end: duration,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
  });
}

export function initScrollAnimations() {
  if (prefersReducedMotion) {
    initReducedMotion();
    return;
  }

  initHero();
  initTickets();
  initUptime();
  initFast();
  initElectric();
  initSilhouette();
  initHint();
  initReveal();
  initFooter();
  initProgressBar();
}

function initHero() {
  const panel = document.querySelector('[data-panel="hero"]');
  pinPanel(panel);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
    },
  });

  tl.to('.hero-eyebrow', { opacity: 1, duration: 0.3 }, 0)
    .to('.hero-name', { opacity: 1, scale: 1, duration: 0.5 }, 0.1)
    .to('.hero-tagline', { opacity: 1, duration: 0.4 }, 0.4);
}

function initTickets() {
  const panel = document.querySelector('[data-panel="tickets"]');
  const counter = document.querySelector('[data-counter]');
  pinPanel(panel);

  const counterObj = { value: 0 };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
    },
  });

  tl.to(counterObj, {
    value: 47000,
    duration: 1,
    onUpdate: () => {
      counter.textContent = Math.round(counterObj.value).toLocaleString();
    },
  }, 0).to('.tickets-footnote', { opacity: 1, duration: 0.3 }, 0.6);
}

function initUptime() {
  const panel = document.querySelector('[data-panel="uptime"]');
  pinPanel(panel);

  const bars = gsap.utils.toArray('.uptime-bar');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
    },
  });

  tl.to(bars, {
    height: (i) => `${40 + i * 12}%`,
    opacity: 0.9,
    stagger: 0.08,
    duration: 0.5,
  }, 0)
    .to('.uptime-headline', { opacity: 1, y: 0, duration: 0.4 }, 0.3)
    .to('.uptime-sub', { opacity: 1, y: 0, duration: 0.4 }, 0.45)
    .to('.uptime-caption', { opacity: 1, y: 0, duration: 0.4 }, 0.6);
}

function initFast() {
  const panel = document.querySelector('[data-panel="fast"]');
  pinPanel(panel);

  const bars = gsap.utils.toArray('.wifi-bar');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=80%',
      scrub: 1,
    },
  });

  tl.to(bars, {
    scaleY: 1,
    opacity: 0.85,
    stagger: 0.1,
    duration: 0.5,
  }, 0)
    .to('.fast-headline', { opacity: 1, y: 0, duration: 0.4 }, 0.25)
    .to('.fast-sub', { opacity: 1, y: 0, duration: 0.4 }, 0.4);
}

function initElectric() {
  const panel = document.querySelector('[data-panel="electric"]');
  pinPanel(panel);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
    },
  });

  tl.to('.battery-fill', { attr: { width: 84 }, duration: 0.6 }, 0)
    .to('.electric-headline', { opacity: 1, y: 0, duration: 0.4 }, 0.3)
    .to('.electric-sub', { opacity: 1, y: 0, duration: 0.4 }, 0.45);
}

function initSilhouette() {
  const panel = document.querySelector('[data-panel="silhouette"]');
  pinPanel(panel, '+=120%');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=120%',
      scrub: 1,
    },
  });

  tl.to('.silhouette-img', {
    opacity: 0.5,
    filter: 'blur(18px) brightness(0.35)',
    duration: 0.5,
  }, 0)
    .to('.silhouette-headline', { opacity: 1, y: 0, duration: 0.4 }, 0.35)
    .to('.silhouette-sub', { opacity: 1, y: 0, duration: 0.4 }, 0.5);
}

function initHint() {
  const panel = document.querySelector('[data-panel="hint"]');
  pinPanel(panel, '+=120%');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=120%',
      scrub: 1,
    },
  });

  tl.to('.hint-img', {
    opacity: 0.7,
    filter: 'blur(2px) brightness(0.65)',
    scale: 1.05,
    duration: 0.7,
  }, 0)
    .to('.hint-headline', { opacity: 1, y: 0, duration: 0.4 }, 0.4)
    .to('.hint-sub', { opacity: 1, y: 0, duration: 0.4 }, 0.55);
}

function initReveal() {
  const panel = document.querySelector('[data-panel="reveal"]');
  pinPanel(panel, '+=140%');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=140%',
      scrub: 1,
    },
  });

  tl.to('.reveal-img', {
    opacity: 1,
    filter: 'brightness(1)',
    scale: 1.02,
    duration: 0.8,
  }, 0)
    .to('.reveal-headline', { opacity: 1, y: 0, duration: 0.4 }, 0.45)
    .to('.reveal-sub', { opacity: 1, y: 0, duration: 0.4 }, 0.6);
}

function initFooter() {
  const panel = document.querySelector('[data-panel="footer"]');
  pinPanel(panel, '+=60%');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top top',
      end: '+=60%',
      scrub: 1,
    },
  });

  tl.to('.footer-name', { opacity: 1, duration: 0.3 }, 0)
    .to('.footer-link', { opacity: 1, duration: 0.3 }, 0.15)
    .to('.footer-copy', { opacity: 1, duration: 0.3 }, 0.3);
}

function initProgressBar() {
  gsap.to('.progress-bar__fill', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '#smooth-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

function initReducedMotion() {
  const counter = document.querySelector('[data-counter]');
  if (counter) counter.textContent = '47,000';

  document.querySelector('.battery-fill')?.setAttribute('width', '84');

  gsap.set([
    '.hero-eyebrow', '.hero-name', '.hero-tagline',
    '.tickets-footnote',
    '.uptime-headline', '.uptime-sub', '.uptime-caption',
    '.fast-headline', '.fast-sub',
    '.electric-headline', '.electric-sub',
    '.silhouette-headline', '.silhouette-sub',
    '.hint-headline', '.hint-sub',
    '.reveal-headline', '.reveal-sub',
    '.footer-name', '.footer-link', '.footer-copy',
  ], { opacity: 1, y: 0, scale: 1 });

  gsap.set('.wifi-bar', { scaleY: 1, opacity: 0.85 });
  gsap.set('.uptime-bar', { height: '80%', opacity: 0.6 });
}
