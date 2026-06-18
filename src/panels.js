import { messages } from './messages.js';

const themes = ['panel--dark', 'panel--light', 'panel--gray', 'panel--black'];

export function buildPanels(container) {
  messages.forEach((text, index) => {
    const theme = themes[index % themes.length];
    const isLast = index === messages.length - 1;
    const section = document.createElement('section');
    section.className = `panel ${theme}${isLast ? ' panel--footer' : ''}`;
    section.dataset.panel = String(index);

    section.innerHTML = `
      <div class="panel__inner">
        <p class="joke-index">${index + 1} / ${messages.length}</p>
        <h2 class="headline joke-headline">${text}</h2>
        ${index > 0 && index % 7 === 0 ? '<p class="subhead joke-sub">(yes, another one)</p>' : ''}
      </div>
    `;

    container.appendChild(section);
  });
}
