import fs from 'fs';

const seeds = [
  'Hi.',
  'Hello.',
  "Oh. You're still here.",
  'Did you think I put something here?',
  "There's nothing.",
  'Like, actually nothing.',
  'Go back.',
  "I'm serious.",
  'This page is empty on purpose.',
  'You can stop scrolling now.',
  'Nobody ever listens.',
  'Still scrolling?',
  'Wow. Okay.',
  'Did someone send you this link?',
  'Was it my license plate? Lol.',
  'There is no prize at the bottom.',
  'Except disappointment.',
  'Hi again.',
  'We already did this.',
  "Oh. You're STILL here.",
  "Did you think there'd be a portfolio?",
  'A resume?',
  'A secret?',
  'A car reveal?',
  'Nope.',
  'Just vibes.',
  'Bad vibes.',
  'Scroll exhaustion vibes.',
  'Have you tried turning it off and on?',
  "That won't help here either.",
  'Yes, again.',
  "You're committed.",
  'Or bored.',
  'Probably bored.',
  'Did you think I did something here?',
  "I didn't.",
  "I really didn't.",
  'This took me longer to deploy than to write.',
  'The deploy worked though. Congrats to me.',
  "At this point it's on you.",
  "I'm not even mad.",
  'Just confused.',
  'Greetings.',
  'Salutations.',
  'Why are you still reading this?',
  'You could be anywhere.',
  'Anywhere else.',
  "Did you think there'd be animations?",
  'There are animations.',
  'But no content.',
  'Content is overrated.',
  'The nothing is coming.',
  'Prepare for nothing.',
  'Still here?',
  'Yep. Still empty.',
  'Did you check behind the scroll bar?',
  'Nothing there either.',
  "Did you think I'd hide an easter egg?",
  'This IS the easter egg.',
  "It's just disappointment.",
  'I respect the grind.',
  'Wrong website for that though.',
  'We should get matching tattoos.',
  'JK. Please leave.',
  'Did you think I built a whole website for you?',
  'I built a whole website to waste your time.',
  'Mission accomplished.',
  'Okay but like… why?',
  'Was the Instagram link not enough?',
  'You needed MORE Alex?',
  'Flattered. Still empty.',
  'You again.',
  'Still you.',
  'Always you.',
  'Did you think scrolling faster would help?',
  "It won't.",
  'The jokes get worse from here.',
  'This is the part where people quit.',
  "You didn't quit.",
  'Legend.',
  'Empty legend.',
  "Oh. You're STILL STILL here.",
  "Did you think I'd say something profound?",
  "The profound thing is you're still scrolling.",
  'Deep.',
  'Empty and deep.',
  'There is no end.',
  'Only scroll.',
  'Forever.',
];

const openers = ['Hi', 'Hello', 'Hey', 'Yo', 'Sup', 'Howdy', 'Greetings', 'Ah', 'Oh', 'Hmm', 'Well', 'Okay', 'So', 'Anyway', 'Listen', 'Look', 'Bro', 'Dude', 'Friend', 'Stranger'];
const punct = ['.', '...', '?', '?!', '.', '.', '.'];
const stillPhrases = [
  "you're still here", "you're STILL here", "you're still scrolling", "you're still doing this",
  "you haven't left", "you're committed to this", "you're really still here", "still you",
  "still scrolling", "still going", "still here somehow", "you're not gone yet",
];
const thinkObjects = [
  'a portfolio', 'a resume', 'a secret', 'a prize', 'a car reveal', 'content', 'a point',
  'an ending', 'a plot twist', 'a reward', 'answers', 'meaning', 'a website', 'something',
  'a joke that gets better', 'closure', 'a boss fight', 'a credits roll', 'a merch drop',
  'a newsletter signup', 'a coupon code', 'my phone number', 'a LinkedIn', 'a TED talk',
];
const nothing = [
  'nothing', 'literally nothing', 'absolutely nothing', 'void', 'emptiness', 'air', 'dust',
  'the absence of content', 'a whole lot of nothing', 'negative content', 'anti-content',
];
const meta = [
  (n) => `This is message ${n}.`,
  (n) => `You have scrolled past ${n} lies.`,
  (n) => `Line ${n}. Still empty.`,
  (n) => `${n} scrolls and zero payoff.`,
  (n) => `Depth level: ${n}. Content level: 0.`,
  (n) => `Achievement unlocked: scroll ${n}.`,
  (n) => `Nobody reads message ${n}. Except you.`,
  (n) => `If you're at ${n}, go outside.`,
];
const absurd = [
  'The scroll bar is judging you.',
  'Your thumb called. It wants a raise.',
  'This text was hand-crafted by disappointment.',
  'Somewhere, a designer is crying.',
  'The void is proud of you.',
  'You are now legally scrolling.',
  'In this economy?',
  'Rent is due. This is free though.',
  'Your screen time report is gonna be wild.',
  'Tell your therapist about this.',
  'This counts as cardio maybe.',
  'The algorithm sent you here to suffer.',
  'I would say get a hobby but this might be it.',
  'Your ancestors fought wars. You scroll.',
  'No refunds on wasted time.',
  'Certified empty.',
  'As seen on absolutely nowhere.',
  'Rated E for Empty.',
  'Now with 100% less content.',
  'Batteries not included. Neither is content.',
];

const lines = [...seeds];
const seen = new Set(lines);

function add(s) {
  if (!seen.has(s) && s.length < 120) {
    seen.add(s);
    lines.push(s);
  }
}

let i = 0;
while (lines.length < 1000 && i < 20000) {
  i++;
  const n = lines.length + 1;
  const p = punct[i % punct.length];
  const o = openers[i % openers.length];
  const s = stillPhrases[i % stillPhrases.length];
  const t = thinkObjects[i % thinkObjects.length];
  const z = nothing[i % nothing.length];

  switch (i % 24) {
    case 0: add(`${o}.`); break;
    case 1: add(`Oh. ${s.charAt(0).toUpperCase() + s.slice(1)}.`); break;
    case 2: add(`Did you think there'd be ${t}?`); break;
    case 3: add(`There's ${z}.`); break;
    case 4: add(`Still scrolling${p}`); break;
    case 5: add(meta[i % meta.length](n)); break;
    case 6: add(absurd[i % absurd.length]); break;
    case 7: add(`Go back${p}`); break;
    case 8: add(`I didn't put anything here${p}`); break;
    case 9: add(`${o} again${p}`); break;
    case 10: add(`We already said ${o.toLowerCase()}${p}`); break;
    case 11: add(`You could've stopped ${n} messages ago`); break;
    case 12: add(`Why are you still here${p}`); break;
    case 13: add(`Did you think I did something here${p}`); break;
    case 14: add(`Nope. Still ${z}${p}`); break;
    case 15: add(`Message ${n}. ${o}.`); break;
    case 16: add(`The scroll continues${p}`); break;
    case 17: add(`No end in sight${p}`); break;
    case 18: add(`This is infinite, by the way${p}`); break;
    case 19: add(`Your dedication is unsettling${p}`); break;
    case 20: add(`Was it worth scrolling to ${n}${p}`); break;
    case 21: add(`Plot twist: there is no plot${p}`); break;
    case 22: add(`Easter egg? No. Just ${z}${p}`); break;
    case 23: add(`${o}. ${s.charAt(0).toUpperCase() + s.slice(1)}.`); break;
  }
}

while (lines.length < 1000) {
  const n = lines.length + 1;
  add(`Hi number ${n}.`);
}

const body = lines.map((l) => `  '${l.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',`).join('\n');
const out = `const lines = [\n${body}\n];\n\nexport const messages = lines;\n`;

fs.writeFileSync('src/messages.js', out);
console.log(`wrote ${lines.length} messages`);
