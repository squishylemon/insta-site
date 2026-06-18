import './style.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { initInfiniteScroll, playScrollHint } from './scroll.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function init() {
  if (!prefersReducedMotion) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const scrollApi = initInfiniteScroll(lenis);

    if (!sessionStorage.getItem('scroll-hinted')) {
      playScrollHint(lenis, scrollApi);
      sessionStorage.setItem('scroll-hinted', '1');
    }
  } else {
    const scrollApi = initInfiniteScroll({
      on(_event, handler) {
        if (_event === 'scroll') {
          window.addEventListener('scroll', () => handler({ scroll: window.scrollY }), { passive: true });
        }
      },
      scrollTo: () => {},
    });
    scrollApi.update(window.scrollY);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
