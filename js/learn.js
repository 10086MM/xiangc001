document.addEventListener('DOMContentLoaded', () => {
  renderLearnModules();
  initQuiz();
});

function renderLearnModules() {
  const container = document.getElementById('learn-modules');
  if (!container || !window.HUAIROU_DATA) return;

  container.innerHTML = HUAIROU_DATA.learnModules.map((mod, i) => `
    <div class="learn-module fade-in">
      <div class="learn-module-cover">
        <img src="${mod.image}" alt="${mod.title}" loading="lazy">
        <div class="learn-module-cover-text">
          <span class="learn-module-num">0${i + 1}</span>
          <h3>${mod.title}</h3>
          <span>${mod.subtitle}</span>
        </div>
      </div>
      <div class="learn-module-body">
        <ul>
          ${mod.topics.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  if (typeof initScrollAnimations === 'function') initScrollAnimations();
}

function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container || !window.HUAIROU_DATA) return;

  const questions = HUAIROU_DATA.quiz;
  let current = 0;
  let score = 0;
  let answered = false;

  function render() {
    if (current >= questions.length) {
      renderResult();
      return;
    }

    const q = questions[current];
    container.innerHTML = `
      <div class="quiz-progress">
        ${questions.map((_, i) => `
          <div class="quiz-dot ${i < current ? 'done' : ''} ${i === current ? 'current' : ''}"></div>
        `).join('')}
      </div>
      <div class="quiz-card">
        <p class="quiz-meta">第 ${current + 1} / ${questions.length} 题</p>
        <h3 class="quiz-question">${q.question}</h3>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
        <button class="btn btn-secondary quiz-next" id="quiz-next">
          ${current < questions.length - 1 ? '下一题' : '查看成绩'}
        </button>
      </div>
    `;

    answered = false;
    document.getElementById('quiz-next').style.display = 'none';
    bindQuizEvents();
  }

  function bindQuizEvents() {
    const options = container.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    const q = questions[current];

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const selected = parseInt(btn.dataset.index);
        const isCorrect = selected === q.answer;
        if (isCorrect) score++;

        options.forEach((opt, i) => {
          opt.disabled = true;
          if (i === q.answer) opt.classList.add('correct');
          else if (i === selected) opt.classList.add('wrong');
        });

        feedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
        feedback.innerHTML = isCorrect
          ? `回答正确。${q.explanation}`
          : `正确答案是 ${String.fromCharCode(65 + q.answer)}。${q.explanation}`;

        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      current++;
      render();
    });
  }

  function renderResult() {
    const pct = Math.round((score / questions.length) * 100);
    let message = '继续加油，多了解乡村振兴知识吧！';
    if (pct >= 80) message = '太棒了！您是乡村振兴科普达人！';
    else if (pct >= 60) message = '不错哦！您对怀柔乡村振兴有一定了解。';

    container.innerHTML = `
      <div class="quiz-card quiz-result">
        <h3>挑战完成</h3>
        <div class="quiz-score">${score}<span>/${questions.length}</span></div>
        <p class="quiz-result-text">正确率 ${pct}% — ${message}</p>
        <button class="btn btn-primary" id="quiz-retry">再来一次</button>
      </div>
    `;

    document.getElementById('quiz-retry').addEventListener('click', () => {
      current = 0;
      score = 0;
      render();
    });
  }

  render();
}
