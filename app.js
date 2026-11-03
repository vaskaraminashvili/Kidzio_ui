/* Star Hop — quiz logic.
   Step 1: one multiple-choice question so the card + button can be reviewed.
   The full question bank (all 5 types) arrives in step 2. */

const ACCENTS = ['rocket', 'moon', 'mint', 'pink'];
const LETTERS = ['A', 'B', 'C', 'D'];

const SAMPLE_QUESTIONS = [
  {
    type: 'multiple',
    subject: 'Science',
    prompt: 'Which planet is closest to the Sun?',
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
    answer: 0,
    praise: 'Yes! Mercury whizzes round the Sun faster than any other planet.',
    hint: 'Good try! It’s Mercury, the smallest planet and the Sun’s nearest neighbour.',
  },
  {
    type: 'multiple',
    subject: 'Maths',
    prompt: 'A rocket has 3 windows on each side. How many windows on 4 sides?',
    options: ['7', '12', '10', '34'],
    answer: 1,
    praise: 'Spot on! 3 × 4 = 12 windows.',
    hint: 'Nearly! 3 windows on 4 sides is 3 × 4, which makes 12.',
  },
];

document.addEventListener('alpine:init', () => {
  Alpine.data('mcQuestion', () => ({
    index: 0,
    picked: null,
    checked: false,

    get q() { return SAMPLE_QUESTIONS[this.index]; },
    get isRight() { return this.picked === this.q.answer; },
    accent(i) { return ACCENTS[i % ACCENTS.length]; },
    letter(i) { return LETTERS[i]; },

    pick(i) {
      if (this.checked) return;
      this.picked = this.picked === i ? null : i;
    },

    cardClass(i) {
      const isAnswer = i === this.q.answer;
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
      const base = `Answer ${this.letter(i)}: ${this.q.options[i]}`;
      if (!this.checked) return base;
      if (i === this.q.answer) return `${base}. Correct answer.`;
      if (i === this.picked) return `${base}. Your pick, not this one.`;
      return base;
    },

    check() {
      if (this.picked === null) return;
      if (this.checked) return this.next();
      this.checked = true;
    },

    next() {
      this.index = (this.index + 1) % SAMPLE_QUESTIONS.length;
      this.picked = null;
      this.checked = false;
      this.$nextTick(() => this.$refs.prompt?.focus());
    },

    get buttonLabel() { return this.checked ? 'Next question' : 'Check'; },

    get feedback() {
      if (!this.checked) {
        return this.picked === null
          ? 'Tap a planet to choose your answer.'
          : `You picked ${this.letter(this.picked)}. Press Check when you’re ready.`;
      }
      return this.isRight ? this.q.praise : this.q.hint;
    },
  }));
});
