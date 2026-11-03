/* Kidzio — quiz logic and sample data.
   Everything runs in the browser: one Alpine component drives all screens. */

const ACCENTS = ['rocket', 'moon', 'mint', 'pink'];
const LETTERS = ['A', 'B', 'C', 'D'];

const SUBJECTS = [
  { id: 'maths',     name: 'Maths',     accent: 'rocket', icon: 'i-maths' },
  { id: 'english',   name: 'English',   accent: 'pink',   icon: 'i-english' },
  { id: 'science',   name: 'Science',   accent: 'mint',   icon: 'i-science' },
  { id: 'geography', name: 'Geography', accent: 'moon',   icon: 'i-geo' },
];

/* Sample questions. Every question has a `type`:
   multiple | gap | picture | truefalse | match */
const QUESTIONS = [
  // ---- Maths
  {
    id: 'm1', subject: 'maths', type: 'multiple',
    prompt: 'A rocket has 3 windows on each side. How many windows on 4 sides?',
    options: ['7', '12', '10', '34'],
    answer: 1,
    praise: 'Spot on! 3 × 4 = 12 windows.',
    hint: '3 windows on 4 sides is 3 × 4, which makes 12.',
  },
  {
    id: 'm2', subject: 'maths', type: 'match',
    prompt: 'Match each sum to its answer.',
    pairs: [['2 + 3', '5'], ['4 × 2', '8'], ['10 − 7', '3'], ['6 + 6', '12']],
    praise: 'Every pair matched. Super sums!',
    hint: 'All matched! A few tries, and you got there.',
  },
  {
    id: 'm3', subject: 'maths', type: 'truefalse',
    prompt: 'Half of 18 is 8.',
    answer: false,
    praise: 'Right, it’s false! Half of 18 is 9, because 9 + 9 = 18.',
    hint: 'This one is false. Half of 18 is 9, because 9 + 9 = 18.',
  },

  // ---- English
  {
    id: 'e1', subject: 'english', type: 'gap',
    prompt: 'Pick the word that fits the gap.',
    before: 'Yesterday, the astronaut',
    after: 'into her spaceship.',
    words: ['climbs', 'climbed', 'climbing'],
    answer: 'climbed',
    praise: 'Yes! “Yesterday” means it already happened, so we say climbed.',
    hint: '“Yesterday” means it already happened, so the word is climbed.',
  },
  {
    id: 'e2', subject: 'english', type: 'picture',
    prompt: 'Which word matches the picture?',
    picture: 'i-rocket',
    alt: 'A drawing of a tall white ship with fins and a flame, flying up into space',
    options: ['pocket', 'rocket', 'socket', 'locket'],
    answer: 1,
    praise: 'Rocket! Pocket, socket and locket all rhyme with it too.',
    hint: 'It’s a rocket. Pocket, socket and locket only rhyme with it.',
  },
  {
    id: 'e3', subject: 'english', type: 'multiple',
    prompt: 'Which word means the opposite of “tiny”?',
    options: ['small', 'huge', 'little', 'short'],
    answer: 1,
    praise: 'Huge! Tiny and huge are opposites.',
    hint: 'The opposite of tiny is huge. Small and little mean the same as tiny.',
  },

  // ---- Science
  {
    id: 's1', subject: 'science', type: 'multiple',
    prompt: 'Which planet is closest to the Sun?',
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
    answer: 0,
    praise: 'Yes! Mercury whizzes round the Sun faster than any other planet.',
    hint: 'It’s Mercury, the smallest planet and the Sun’s nearest neighbour.',
  },
  {
    id: 's2', subject: 'science', type: 'picture',
    prompt: 'Whose shadow is this?',
    picture: 'i-saturn', shadow: true,
    alt: 'A dark shadow: a round shape with a long flat band across it',
    options: [
      { label: 'Saturn', icon: 'i-saturn' },
      { label: 'Moon',   icon: 'i-moon' },
      { label: 'Sun',    icon: 'i-sun' },
      { label: 'Comet',  icon: 'i-comet' },
    ],
    answer: 0,
    praise: 'It’s Saturn! Its rings are made of ice and rock.',
    hint: 'That shadow belongs to Saturn. Look for the ring around it.',
  },
  {
    id: 's3', subject: 'science', type: 'truefalse',
    prompt: 'The Sun is a star.',
    answer: true,
    praise: 'True! The Sun is the closest star to Earth.',
    hint: 'It’s true! The Sun is a star, the closest one to Earth.',
  },

  // ---- Geography
  {
    id: 'g1', subject: 'geography', type: 'match',
    prompt: 'Match each country to its capital city.',
    pairs: [['France', 'Paris'], ['Japan', 'Tokyo'], ['Egypt', 'Cairo'], ['Italy', 'Rome']],
    praise: 'Brilliant! You know your capital cities.',
    hint: 'All matched! Capitals take practice, and you got there.',
  },
  {
    id: 'g2', subject: 'geography', type: 'gap',
    prompt: 'Pick the word that fits the gap.',
    before: 'The biggest ocean on Earth is the',
    after: 'Ocean.',
    words: ['Arctic', 'Pacific', 'Indian'],
    answer: 'Pacific',
    praise: 'Yes! The Pacific is bigger than all the land on Earth put together.',
    hint: 'It’s the Pacific. It’s bigger than all the land on Earth put together.',
  },
  {
    id: 'g3', subject: 'geography', type: 'picture',
    prompt: 'Which place makes this shadow?',
    picture: 'i-volcano', shadow: true,
    alt: 'A dark shadow: a tall pointed hill with puffs rising from the top',
    options: [
      { label: 'Island',  icon: 'i-island' },
      { label: 'Desert',  icon: 'i-desert' },
      { label: 'Volcano', icon: 'i-volcano' },
      { label: 'Iceberg', icon: 'i-glacier' },
    ],
    answer: 2,
    praise: 'A volcano! Hot melted rock called lava comes out of the top.',
    hint: 'It’s a volcano. Those puffs at the top are smoke.',
  },
];

/* Today's mission: 10 questions, the first five show all five game types. */
const DAILY = ['s1', 'e1', 's2', 's3', 'm2', 'm1', 'g2', 'e2', 'm3', 'g1'];
const MISSION_ORDER = ['daily', 'maths', 'english', 'science', 'geography'];

const byId = (id) => QUESTIONS.find((q) => q.id === id);

function buildMission(id) {
  if (id === 'daily') {
    return { id, title: 'Today’s mission', questions: DAILY.map(byId) };
  }
  const subject = SUBJECTS.find((s) => s.id === id);
  return {
    id,
    title: `${subject.name} planet`,
    questions: QUESTIONS.filter((q) => q.subject === id),
  };
}

function shuffled(n) {
  const a = [...Array(n).keys()];
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } while (a.some((v, i) => v === i)); // never leave a pair sitting side by side
  return a;
}

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The mascot, Zip: drawn once here and dropped in wherever Zip appears. */
const MASCOT_SVG = `
<svg viewBox="0 0 120 150" aria-hidden="true" focusable="false">
  <g stroke="#1E2346" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <rect x="30" y="80" width="60" height="38" rx="12" fill="#D8CBB2"/>
    <rect x="43" y="112" width="13" height="22" rx="6.5" fill="#FFF8EC"/>
    <rect x="64" y="112" width="13" height="22" rx="6.5" fill="#FFF8EC"/>
    <path d="M39 132h20v5a5 5 0 0 1-5 5H44a5 5 0 0 1-5-5z" fill="#FF7A3D"/>
    <path d="M61 132h20v5a5 5 0 0 1-5 5H66a5 5 0 0 1-5-5z" fill="#FF7A3D"/>
    <g class="m-arm m-arm-l"><rect x="28" y="84" width="12" height="27" rx="6" fill="#FFF8EC"/><circle cx="34" cy="113" r="7" fill="#FF7A3D"/></g>
    <g class="m-arm m-arm-r"><rect x="80" y="84" width="12" height="27" rx="6" fill="#FFF8EC"/><circle cx="86" cy="113" r="7" fill="#FF7A3D"/></g>
    <rect x="36" y="77" width="48" height="42" rx="16" fill="#FFF8EC"/>
    <rect x="49" y="89" width="22" height="14" rx="5" fill="#2B3670"/>
    <circle cx="55" cy="96" r="2.4" fill="#FFCF4A" stroke="none"/>
    <circle cx="65" cy="96" r="2.4" fill="#5ED6B0" stroke="none"/>
    <g class="m-head">
      <path d="M60 21V9"/>
      <circle cx="60" cy="7" r="6" fill="#FF7A3D"/>
      <circle cx="60" cy="50" r="31" fill="#FFF8EC"/>
      <ellipse cx="60" cy="52" rx="22" ry="18" fill="#2B3670"/>
      <g stroke="none">
        <ellipse cx="51" cy="50" rx="4" ry="5.5" fill="#FFF4D6"/>
        <ellipse cx="69" cy="50" rx="4" ry="5.5" fill="#FFF4D6"/>
        <circle cx="45" cy="59" r="3.2" fill="#FF9EB5"/>
        <circle cx="75" cy="59" r="3.2" fill="#FF9EB5"/>
      </g>
      <path d="M53 59q7 6 14 0" fill="none" stroke="#FFF4D6" stroke-width="2.6"/>
      <path d="M43 41q4-7 11-8" fill="none" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="2.6"/>
    </g>
  </g>
</svg>`;

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    mascotSvg: MASCOT_SVG,

    /* ---------- profile ---------- */
    kidName: 'Mia',
    streak: 4,
    doneToday: false,
    subjects: SUBJECTS,

    /* ---------- navigation ---------- */
    screen: 'home',
    mission: buildMission('daily'),
    qIndex: 0,
    qKey: 0,
    results: [],

    /* ---------- current question ---------- */
    picked: null,       // choice questions
    gapWord: null,      // index into q.words
    match: { sel: null, done: {}, wrong: [], mistakes: 0, order: [], lines: [] },
    checked: false,
    correct: false,
    feedback: '',
    mood: 'idle',
    blasting: false,

    init() {
      window.addEventListener('resize', () => this.drawLines());
    },

    /* ================= Home ================= */
    get greeting() {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 18) return 'Good afternoon';
      return 'Good evening';
    },

    get week() {
      // The last seven days, ending today. Past streak days are lit; today lights up once a mission is done.
      const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const pastDays = this.doneToday ? this.streak - 1 : this.streak;
      return [6, 5, 4, 3, 2, 1, 0].map((back) => {
        const d = new Date();
        d.setDate(d.getDate() - back);
        const name = names[d.getDay()];
        const lit = back === 0 ? this.doneToday : back <= pastDays;
        return { label: name[0], name: back === 0 ? 'today' : name, lit, today: back === 0 };
      });
    },

    get weekLabel() {
      const lit = this.week.filter((d) => d.lit).map((d) => d.name);
      return lit.length ? `Missions done this week: ${lit.join(', ')}` : 'No missions yet this week';
    },

    subjectCount(id) {
      return QUESTIONS.filter((q) => q.subject === id).length;
    },

    /* ================= Navigation ================= */
    go(screen) {
      this.screen = screen;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$root.querySelector(`[data-screen="${screen}"] [data-focus]`)?.focus();
          this.drawLines();
        }, 280);
      });
    },

    startMission(id) {
      this.mission = buildMission(id);
      this.qIndex = 0;
      this.results = [];
      this.resetQuestion();
      this.go('quiz');
    },

    leaveQuiz() {
      this.blasting = false;
      this.go('home');
    },

    get nextMissionId() {
      const i = MISSION_ORDER.indexOf(this.mission.id);
      return MISSION_ORDER[(i + 1) % MISSION_ORDER.length];
    },

    get nextMissionName() {
      return buildMission(this.nextMissionId).title;
    },

    /* ================= Quiz ================= */
    get q() { return this.mission.questions[this.qIndex]; },
    get total() { return this.mission.questions.length; },
    get isLast() { return this.qIndex === this.total - 1; },
    get isChoice() { return ['multiple', 'picture', 'truefalse'].includes(this.q.type); },
    get subjectName() { return SUBJECTS.find((s) => s.id === this.q.subject).name; },

    get progress() {
      return (this.qIndex + (this.checked ? 1 : 0)) / this.total;
    },

    resetQuestion() {
      this.picked = null;
      this.gapWord = null;
      this.checked = false;
      this.correct = false;
      this.mood = 'idle';
      const q = this.q;
      this.match = {
        sel: null, done: {}, wrong: [], mistakes: 0, lines: [],
        order: q.type === 'match' ? shuffled(q.pairs.length) : [],
      };
      this.feedback = {
        multiple: 'Tap a planet to choose your answer.',
        picture: 'Look closely, then tap your answer.',
        truefalse: 'Is it true or false? Tap one.',
        gap: 'Tap a word to drop it into the gap.',
        match: 'Tap a card on the left, then its partner on the right.',
      }[q.type];
      this.qKey++;
      this.$nextTick(() => {
        if (this.screen === 'quiz') this.$root.querySelector('#q-prompt')?.focus();
      });
    },

    get canCheck() {
      if (this.checked) return true;
      const q = this.q;
      if (this.isChoice) return this.picked !== null;
      if (q.type === 'gap') return this.gapWord !== null;
      if (q.type === 'match') return Object.keys(this.match.done).length === q.pairs.length;
      return false;
    },

    get buttonLabel() {
      if (!this.checked) return 'Check';
      return this.isLast ? 'See my stars' : 'Next question';
    },

    check() {
      if (!this.canCheck) return;
      if (this.checked) return this.advance();
      const q = this.q;
      if (this.isChoice) this.correct = this.picked === this.answerIndex;
      else if (q.type === 'gap') this.correct = q.words[this.gapWord] === q.answer;
      else if (q.type === 'match') this.correct = this.match.mistakes <= 1;

      this.checked = true;
      this.results.push(this.correct);
      this.feedback = this.correct ? q.praise : q.hint;
      this.mood = this.correct ? 'happy' : 'shrug';
      if (this.correct) this.celebrate();
    },

    advance() {
      if (this.isLast) {
        if (!this.doneToday) { this.doneToday = true; this.streak++; }
        this.go('results');
        return;
      }
      this.qIndex++;
      this.resetQuestion();
    },

    celebrate() {
      if (prefersReducedMotion()) return;
      this.blasting = false;
      this.$nextTick(() => {
        this.blasting = true;
        setTimeout(() => { this.blasting = false; }, 1500);
      });
    },

    /* ---------- choice: multiple, picture, true/false ---------- */
    get options() {
      const q = this.q;
      if (q.type === 'truefalse') {
        return [
          { label: 'True',  icon: 'i-thumb-up',   accent: 'mint' },
          { label: 'False', icon: 'i-thumb-down', accent: 'pink' },
        ];
      }
      if (!q.options) return [];
      return q.options.map((o, i) => ({
        ...(typeof o === 'string' ? { label: o } : o),
        accent: ACCENTS[i % ACCENTS.length],
      }));
    },

    get answerIndex() {
      return this.q.type === 'truefalse' ? (this.q.answer ? 0 : 1) : this.q.answer;
    },

    letter(i) { return LETTERS[i]; },

    pick(i) {
      if (this.checked) return;
      this.picked = this.picked === i ? null : i;
      if (this.picked !== null) {
        this.feedback = `You picked ${this.options[i].label}. Press Check when you’re ready.`;
      }
    },

    cardClass(i) {
      const isAnswer = i === this.answerIndex;
      const isPicked = i === this.picked;
      if (!this.checked) return { 'is-selected': isPicked };
      return {
        'is-revealed': true,
        'is-flipped': isAnswer || isPicked,
        'is-dimmed': !isAnswer && !isPicked,
        'is-wobbling': isPicked && !isAnswer,
      };
    },

    cardLabel(i) {
      const opt = this.options[i];
      const base = this.q.type === 'truefalse' ? opt.label : `${this.letter(i)}: ${opt.label}`;
      if (!this.checked) return base;
      if (i === this.answerIndex) return `${base}. Correct answer.`;
      if (i === this.picked) return `${base}. Your pick, not this one.`;
      return base;
    },

    /* ---------- fill the gap ---------- */
    placeWord(i, ev) {
      if (this.checked) return;
      const from = ev.currentTarget.getBoundingClientRect();
      this.gapWord = i;
      this.feedback = `“${this.q.words[i]}” is in the gap. Tap it to take it out, or press Check.`;
      this.$nextTick(() => {
        const chip = this.$root.querySelector('.gap-chip');
        if (!chip || prefersReducedMotion()) return;
        const to = chip.getBoundingClientRect();
        chip.animate(
          [
            { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(.9)` },
            { transform: 'translate(0, 0) scale(1)' },
          ],
          { duration: 320, easing: 'cubic-bezier(.34, 1.56, .64, 1)' }
        );
      });
    },

    clearGap() {
      if (this.checked || this.gapWord === null) return;
      this.gapWord = null;
      this.feedback = 'Tap a word to drop it into the gap.';
    },

    get gapLabel() {
      if (this.gapWord === null) return 'Gap, empty';
      const w = this.q.words[this.gapWord];
      if (!this.checked) return `Gap, filled with ${w}. Tap to take it out.`;
      return this.correct ? `Gap: ${w}. Correct.` : `Gap: ${w}. Not quite, the answer is ${this.q.answer}.`;
    },

    /* ---------- match pairs ---------- */
    rightItem(pos) { return this.q.pairs[this.match.order[pos]][1]; },

    isMatched(side, i) {
      return side === 'L'
        ? i in this.match.done
        : Object.values(this.match.done).includes(i);
    },

    isSel(side, i) { return this.match.sel?.side === side && this.match.sel?.i === i; },
    isWrong(side, i) { return this.match.wrong.includes(side + i); },

    matchLabel(side, i) {
      const text = side === 'L' ? this.q.pairs[i][0] : this.rightItem(i);
      if (this.isMatched(side, i)) return `${text}, matched`;
      if (this.isSel(side, i)) return `${text}, chosen. Now tap its partner.`;
      return text;
    },

    tapMatch(side, i) {
      if (this.checked || this.isMatched(side, i)) return;
      const sel = this.match.sel;

      if (!sel || sel.side === side) {
        this.match.sel = sel && sel.i === i ? null : { side, i };
        if (this.match.sel) this.feedback = 'Now tap its partner on the other side.';
        return;
      }

      const L = side === 'L' ? i : sel.i;
      const R = side === 'R' ? i : sel.i;
      this.match.sel = null;

      if (this.match.order[R] === L) {
        this.match.done[L] = R;
        const [a, b] = this.q.pairs[L];
        const allDone = Object.keys(this.match.done).length === this.q.pairs.length;
        this.feedback = allDone ? 'All pairs matched! Press Check.' : `${a} and ${b} are a pair!`;
        this.$nextTick(() => this.drawLines());
      } else {
        this.match.mistakes++;
        this.match.wrong = ['L' + L, 'R' + R];
        this.feedback = 'Those two aren’t a pair. Have another go!';
        setTimeout(() => { this.match.wrong = []; }, 650);
      }
    },

    drawLines() {
      if (this.screen !== 'quiz' || this.q.type !== 'match') return;
      const board = this.$root.querySelector('.match-board');
      if (!board) return;
      const b = board.getBoundingClientRect();
      this.match.lines = Object.entries(this.match.done).map(([L, R]) => {
        const a = board.querySelector(`[data-m="L${L}"]`).getBoundingClientRect();
        const c = board.querySelector(`[data-m="R${R}"]`).getBoundingClientRect();
        const x1 = a.right - b.left - 4, y1 = a.top + a.height / 2 - b.top;
        const x2 = c.left - b.left + 4, y2 = c.top + c.height / 2 - b.top;
        const bend = (x2 - x1) * 0.6;
        return {
          key: L, x1, y1, x2, y2,
          d: `M${x1} ${y1} C${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`,
        };
      });
    },

    /* ================= Results ================= */
    get score() { return this.results.filter(Boolean).length; },

    get stars() {
      const r = this.score / this.total;
      if (r >= 0.9) return 3;
      if (r >= 0.6) return 2;
      return 1;
    },

    get resultTitle() {
      return ['', 'Mission complete!', 'Great flying!', 'Superstar pilot!'][this.stars];
    },

    get resultMessage() {
      if (this.stars === 3) return 'You nailed it. Zip is doing a space dance!';
      if (this.stars === 2) return 'So close to three stars. One more go?';
      return 'Every try makes your brain stronger. Want another go?';
    },

    get resultMood() { return this.stars >= 2 ? 'happy' : 'shrug'; },
  }));
});
