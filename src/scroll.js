import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PIN_DURATION = '+=45%';

function pinPanel(panel) {
  ScrollTrigger.create({
    trigger: panel,
    start: 'top top',
    end: PIN_DURATION,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
  });
}

export function initScrollAnimations() {
  const panels = gsap.utils.toArray('.panel');

  if (prefersReducedMotion) {
    gsap.set('.joke-headline, .joke-sub, .joke-index', { opacity: 1, y: 0, scale: 1 });
    return;
  }

  panels.forEach((panel) => {
    const headline = panel.querySelector('.joke-headline');
    const sub = panel.querySelector('.joke-sub');
    const index = panel.querySelector('.joke-index');

    pinPanel(panel);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top top',
        end: PIN_DURATION,
        scrub: 0.8,
      },
    });

    tl.fromTo(index, { opacity: 0, y: 12 }, { opacity: 0.6, y: 0, duration: 0.2 }, 0)
      .fromTo(headline, { opacity: 0, y: 32, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.05);

    if (sub) {
      tl.fromTo(sub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, 0.35);
    }
  });

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
