import { gsap } from 'gsap';
import { messages } from './messages.js';

const SEGMENT_RATIO = 0.65;
const LOOP_MULTIPLIER = 4;

function segmentHeight() {
  return window.innerHeight * SEGMENT_RATIO;
}

function loopHeight() {
  return messages.length * segmentHeight();
}

function paletteForIndex(index) {
  const i = ((index % messages.length) + messages.length) % messages.length;
  const h1 = (i * 47 + 200) % 360;
  const h2 = (h1 + 55 + (i % 3) * 20) % 360;
  const h3 = (h2 + 40) % 360;
  const light = i % 5 === 2 || i % 5 === 3;
  return {
    stops: [
      { h: h1, s: light ? 25 : 40, l: light ? 88 : 6 },
      { h: h2, s: light ? 35 : 50, l: light ? 78 : 14 },
      { h: h3, s: light ? 30 : 45, l: light ? 92 : 10 },
    ],
    light,
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpHue(a, b, t) {
  const diff = ((b - a + 540) % 360) - 180;
  return (a + diff * t + 360) % 360;
}

function lerpPalette(a, b, t) {
  return {
    stops: a.stops.map((stop, i) => ({
      h: lerpHue(stop.h, b.stops[i].h, t),
      s: lerp(stop.s, b.stops[i].s, t),
      l: lerp(stop.l, b.stops[i].l, t),
    })),
    light: t < 0.5 ? a.light : b.light,
  };
}

function paletteToGradient(p) {
  const [a, b, c] = p.stops;
  return `linear-gradient(145deg,
    hsl(${a.h}, ${a.s}%, ${a.l}%) 0%,
    hsl(${b.h}, ${b.s}%, ${b.l}%) 45%,
    hsl(${c.h}, ${c.s}%, ${c.l}%) 100%)`;
}

function easeSmooth(t) {
  return t * t * (3 - 2 * t);
}

export function initInfiniteScroll(lenis) {
  const bg = document.getElementById('bg');
  const textA = document.querySelector('.morph-text--a');
  const textB = document.querySelector('.morph-text--b');
  const spacer = document.getElementById('scroll-spacer');
  const hint = document.getElementById('scroll-hint');
  const stage = document.getElementById('stage');

  let spacerBlocks = LOOP_MULTIPLIER;
  let lastIndex = -1;

  function resize() {
    spacer.style.height = `${spacerBlocks * loopHeight()}px`;
  }

  resize();
  window.addEventListener('resize', resize);

  function extendSpacer(scroll) {
    const threshold = spacerBlocks * loopHeight() - window.innerHeight * 3;
    if (scroll > threshold) {
      spacerBlocks += LOOP_MULTIPLIER;
      resize();
    }
  }

  function update(scroll) {
    extendSpacer(scroll);

    const loop = loopHeight();
    const seg = segmentHeight();
    const wrapped = ((scroll % loop) + loop) % loop;
    const progress = wrapped / seg;
    const index = Math.floor(progress) % messages.length;
    const nextIndex = (index + 1) % messages.length;
    const t = easeSmooth(progress % 1);

    const from = paletteForIndex(index);
    const to = paletteForIndex(nextIndex);
    const blended = lerpPalette(from, to, t);

    bg.style.background = paletteToGradient(blended);
    stage.dataset.theme = blended.light ? 'light' : 'dark';

    if (index !== lastIndex) {
      textA.textContent = messages[index];
      textB.textContent = messages[nextIndex];
      lastIndex = index;
    }

    const outT = t;
    textA.style.opacity = String(1 - outT);
    textA.style.filter = `blur(${outT * 12}px)`;
    textA.style.transform = `translateY(${outT * 32}px) scale(${1 - outT * 0.07})`;

    textB.style.opacity = String(outT);
    textB.style.filter = `blur(${(1 - outT) * 12}px)`;
    textB.style.transform = `translateY(${(1 - outT) * -32}px) scale(${0.93 + outT * 0.07})`;
  }

  lenis.on('scroll', ({ scroll }) => {
    update(scroll);
    if (scroll > 40 && hint) {
      hint.classList.add('scroll-hint--hidden');
    }
  });

  update(0);

  return { update, segmentHeight, loopHeight };
}

export function playScrollHint(lenis, { segmentHeight: segHeight }) {
  const hint = document.getElementById('scroll-hint');
  const nudge = segHeight() * 0.4;
  const proxy = { y: 0 };

  const tl = gsap.timeline({
    delay: 1.2,
    onComplete: () => hint?.classList.add('scroll-hint--pulse'),
  });

  tl.to(proxy, {
    y: nudge,
    duration: 1.4,
    ease: 'power2.inOut',
    onUpdate: () => lenis.scrollTo(proxy.y, { immediate: true }),
  }).to(proxy, {
    y: 0,
    duration: 1.1,
    ease: 'power2.inOut',
    onUpdate: () => lenis.scrollTo(proxy.y, { immediate: true }),
  });

  return tl;
}
