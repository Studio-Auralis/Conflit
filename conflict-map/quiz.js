(function () {
  'use strict';

  var quizOpen = false;
  var questions = [];
  var currentQ = 0;
  var score = 0;
  var answered = false;

  function G() { return window.GCT || {}; }
  function t(key) { return G().t ? G().t(key) : key; }
  function esc(s) { return G().esc ? G().esc(s) : s; }
  function fmt(n) { return G().formatNumber ? G().formatNumber(n) : String(n); }
  function lang() { return (G().currentLang) || 'fr'; }

  function createPanel() {
    if (document.getElementById('quiz-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'quiz-panel';
    panel.className = 'quiz-panel';
    panel.innerHTML =
      '<div class="quiz-header">' +
        '<div class="quiz-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span data-i18n="quizTitle">' + t('quizTitle') + '</span></div>' +
        '<button class="quiz-close" id="quiz-close">&times;</button>' +
      '</div>' +
      '<div class="quiz-body" id="quiz-body"></div>';
    document.body.appendChild(panel);
    document.getElementById('quiz-close').addEventListener('click', closeQuiz);
  }

  function openQuiz() {
    createPanel();
    quizOpen = true;
    document.getElementById('quiz-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
    startNewQuiz();
  }

  function closeQuiz() {
    quizOpen = false;
    var panel = document.getElementById('quiz-panel');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  function startNewQuiz() {
    currentQ = 0;
    score = 0;
    questions = generateQuestions(10);
    renderQuestion();
  }

  // ---- Question Generators ----
  function generateQuestions(count) {
    var conflicts = (G().conflicts || []).slice();
    if (conflicts.length < 4) return [];
    var pool = [];

    // Type 1: Which country has the deadliest conflict?
    pool.push(function () {
      var sorted = conflicts.slice().sort(function (a, b) { return b.casualties - a.casualties; });
      var correct = sorted[0];
      var options = [correct];
      var others = shuffle(sorted.slice(1));
      for (var i = 0; i < others.length && options.length < 4; i++) {
        if (others[i].name !== correct.name) options.push(others[i]);
      }
      options = shuffle(options);
      return {
        q: lang() === 'fr'
          ? 'Quel est le conflit le plus meurtrier actuellement ?'
          : 'What is the deadliest current conflict?',
        options: options.map(function (c) { return localName(c); }),
        correct: options.indexOf(correct),
        explanation: lang() === 'fr'
          ? localName(correct) + ' : ' + fmt(correct.casualties) + ' victimes estim\u00e9es.'
          : localName(correct) + ': ' + fmt(correct.casualties) + ' estimated casualties.'
      };
    });

    // Type 2: Since when does a specific conflict last?
    pool.push(function () {
      var c = pickRandom(conflicts.filter(function (x) { return x.startDate; }));
      if (!c) return null;
      var year = parseInt(c.startDate.split('-')[0]);
      var wrong = [year - 2, year + 1, year + 3].filter(function (y) { return y > 1980 && y <= 2026 && y !== year; });
      while (wrong.length < 3) wrong.push(year + wrong.length + 2);
      var options = shuffle([year].concat(wrong.slice(0, 3)));
      return {
        q: lang() === 'fr'
          ? 'Depuis quelle ann\u00e9e dure ' + localName(c) + ' ?'
          : 'Since what year has ' + localName(c) + ' been going on?',
        options: options.map(String),
        correct: options.indexOf(year),
        explanation: lang() === 'fr'
          ? 'Ce conflit a d\u00e9but\u00e9 le ' + c.startDate + '.'
          : 'This conflict started on ' + c.startDate + '.'
      };
    });

    // Type 3: In which region?
    pool.push(function () {
      var c = pickRandom(conflicts);
      var regions = ['Afrique', 'Moyen-Orient', 'Asie', 'Europe', 'Am\u00e9riques'];
      var correct = c.region;
      var others = regions.filter(function (r) { return r !== correct; });
      var options = shuffle([correct].concat(shuffle(others).slice(0, 3)));
      return {
        q: lang() === 'fr'
          ? 'Dans quelle r\u00e9gion se situe ' + localName(c) + ' ?'
          : 'In which region is ' + localName(c) + ' located?',
        options: options,
        correct: options.indexOf(correct),
        explanation: lang() === 'fr'
          ? localName(c) + ' est en ' + correct + '.'
          : localName(c) + ' is in ' + correct + '.'
      };
    });

    // Type 4: How many casualties?
    pool.push(function () {
      var c = pickRandom(conflicts.filter(function (x) { return x.casualties > 1000; }));
      if (!c) return null;
      var correct = c.casualties;
      var wrong = [
        Math.round(correct * 0.3),
        Math.round(correct * 2.5),
        Math.round(correct * 0.1)
      ];
      var options = shuffle([correct].concat(wrong));
      return {
        q: lang() === 'fr'
          ? 'Combien de victimes estim\u00e9es pour ' + localName(c) + ' ?'
          : 'How many estimated casualties for ' + localName(c) + '?',
        options: options.map(function (n) { return fmt(n); }),
        correct: options.indexOf(correct),
        explanation: fmt(correct) + (lang() === 'fr' ? ' victimes estim\u00e9es.' : ' estimated casualties.')
      };
    });

    // Type 5: Who are the parties?
    pool.push(function () {
      var c = pickRandom(conflicts.filter(function (x) { return x.parties && x.parties.length >= 2; }));
      if (!c) return null;
      var correctParty = c.parties[0];
      var allParties = [];
      for (var i = 0; i < conflicts.length; i++) {
        if (conflicts[i].parties) {
          for (var j = 0; j < conflicts[i].parties.length; j++) {
            if (allParties.indexOf(conflicts[i].parties[j]) === -1 && conflicts[i].parties[j] !== correctParty) {
              allParties.push(conflicts[i].parties[j]);
            }
          }
        }
      }
      var wrong = shuffle(allParties).slice(0, 3);
      var options = shuffle([correctParty].concat(wrong));
      return {
        q: lang() === 'fr'
          ? 'Quelle partie est impliqu\u00e9e dans ' + localName(c) + ' ?'
          : 'Which party is involved in ' + localName(c) + '?',
        options: options,
        correct: options.indexOf(correctParty),
        explanation: lang() === 'fr'
          ? 'Parties : ' + c.parties.join(', ')
          : 'Parties: ' + c.parties.join(', ')
      };
    });

    // Type 6: What type of conflict?
    pool.push(function () {
      var c = pickRandom(conflicts);
      var types = ['Guerre civile', 'Conflit international', 'Insurrection', 'Conflit interethnique'];
      var correct = c.type;
      var others = types.filter(function (t2) { return t2 !== correct; });
      var options = shuffle([correct].concat(others.slice(0, 3)));
      return {
        q: lang() === 'fr'
          ? 'Quel est le type de ' + localName(c) + ' ?'
          : 'What is the type of ' + localName(c) + '?',
        options: options,
        correct: options.indexOf(correct),
        explanation: localName(c) + (lang() === 'fr' ? ' est class\u00e9 comme : ' : ' is classified as: ') + correct + '.'
      };
    });

    // Type 7: Displaced persons (general knowledge)
    pool.push(function () {
      var correct = '117 millions';
      var correctEn = '117 million';
      var options = lang() === 'fr'
        ? shuffle(['117 millions', '45 millions', '200 millions', '80 millions'])
        : shuffle(['117 million', '45 million', '200 million', '80 million']);
      return {
        q: lang() === 'fr'
          ? 'Combien de personnes sont d\u00e9plac\u00e9es dans le monde (estimation UNHCR) ?'
          : 'How many people are displaced worldwide (UNHCR estimate)?',
        options: options,
        correct: options.indexOf(lang() === 'fr' ? correct : correctEn),
        explanation: lang() === 'fr'
          ? 'Environ 117 millions de personnes d\u00e9plac\u00e9es selon le UNHCR (2024).'
          : 'Approximately 117 million displaced people according to UNHCR (2024).'
      };
    });

    // Type 8: UN agency for refugees
    pool.push(function () {
      var correct = 'UNHCR';
      var options = shuffle(['UNHCR', 'UNICEF', 'OMS / WHO', 'UNESCO']);
      return {
        q: lang() === 'fr'
          ? "Quel organisme de l'ONU s'occupe principalement des r\u00e9fugi\u00e9s ?"
          : 'Which UN agency primarily handles refugees?',
        options: options,
        correct: options.indexOf(correct),
        explanation: lang() === 'fr'
          ? "Le Haut Commissariat des Nations unies pour les r\u00e9fugi\u00e9s (UNHCR) prot\u00e8ge les r\u00e9fugi\u00e9s dans le monde."
          : 'The UN High Commissioner for Refugees (UNHCR) protects refugees worldwide.'
      };
    });

    // Generate questions by cycling through types
    var result = [];
    var typeIdx = 0;
    var attempts = 0;
    while (result.length < count && attempts < 100) {
      attempts++;
      var gen = pool[typeIdx % pool.length];
      typeIdx++;
      var q = gen();
      if (q && q.options.length === 4) result.push(q);
    }
    return shuffle(result).slice(0, count);
  }

  function localName(c) {
    var g = G();
    if (g.getLocalizedField) return g.getLocalizedField(c, 'name');
    return c.name;
  }

  function pickRandom(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ---- Rendering ----
  function renderQuestion() {
    var body = document.getElementById('quiz-body');
    if (!body || currentQ >= questions.length) { renderResults(); return; }

    var q = questions[currentQ];
    answered = false;

    var html = '<div class="quiz-progress"><div class="quiz-progress-fill" style="width:' + ((currentQ / questions.length) * 100) + '%"></div></div>';
    html += '<div class="quiz-question-num">Question ' + (currentQ + 1) + '/' + questions.length + '</div>';
    html += '<div class="quiz-question">' + esc(q.q) + '</div>';
    html += '<div class="quiz-options">';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="quiz-option" data-idx="' + i + '">' + esc(q.options[i]) + '</button>';
    }
    html += '</div>';
    html += '<div id="quiz-feedback-area"></div>';

    body.innerHTML = html;

    var opts = body.querySelectorAll('.quiz-option');
    for (var j = 0; j < opts.length; j++) {
      opts[j].addEventListener('click', function () {
        if (answered) return;
        handleAnswer(parseInt(this.dataset.idx));
      });
    }
  }

  function handleAnswer(idx) {
    answered = true;
    var q = questions[currentQ];
    var isCorrect = idx === q.correct;
    if (isCorrect) score++;

    var opts = document.querySelectorAll('.quiz-option');
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.add('disabled');
      if (i === q.correct) opts[i].classList.add('correct');
      if (i === idx && !isCorrect) opts[i].classList.add('wrong');
    }

    var area = document.getElementById('quiz-feedback-area');
    var cls = isCorrect ? 'correct' : 'wrong';
    var prefix = isCorrect
      ? (lang() === 'fr' ? 'Correct ! ' : 'Correct! ')
      : (lang() === 'fr' ? 'Incorrect. ' : 'Incorrect. ');
    area.innerHTML = '<div class="quiz-feedback ' + cls + '">' + prefix + esc(q.explanation) + '</div>' +
      '<button class="quiz-next" id="quiz-next-btn">' + (lang() === 'fr' ? 'Suivant' : 'Next') + '</button>';

    document.getElementById('quiz-next-btn').addEventListener('click', function () {
      currentQ++;
      renderQuestion();
    });
  }

  function renderResults() {
    var body = document.getElementById('quiz-body');
    if (!body) return;

    var msg;
    if (lang() === 'fr') {
      if (score <= 3) msg = "Il y a beaucoup \u00e0 apprendre \u2014 explorez la carte pour en savoir plus !";
      else if (score <= 6) msg = "Pas mal ! Vous avez de bonnes bases.";
      else if (score <= 9) msg = "Excellent ! Vous \u00eates bien inform\u00e9.";
      else msg = "Parfait ! Vous \u00eates un expert.";
    } else {
      if (score <= 3) msg = "There's a lot to learn \u2014 explore the map to find out more!";
      else if (score <= 6) msg = "Not bad! You have a good foundation.";
      else if (score <= 9) msg = "Excellent! You're well informed.";
      else msg = "Perfect! You're an expert.";
    }

    var shareText = lang() === 'fr'
      ? "J'ai obtenu " + score + "/10 au quiz Global Conflict Tracker \u2014 testez vos connaissances \u2192"
      : "I scored " + score + "/10 on the Global Conflict Tracker quiz \u2014 test your knowledge \u2192";
    var shareUrl = window.location.origin + window.location.pathname;

    body.innerHTML = '<div class="quiz-results">' +
      '<div class="quiz-progress"><div class="quiz-progress-fill" style="width:100%"></div></div>' +
      '<div class="quiz-score">' + score + '/10</div>' +
      '<div class="quiz-score-label">' + (lang() === 'fr' ? 'Votre score' : 'Your score') + '</div>' +
      '<div class="quiz-message">' + esc(msg) + '</div>' +
      '<div class="quiz-actions">' +
        '<button class="quiz-next" id="quiz-restart">' + (lang() === 'fr' ? 'Recommencer' : 'Try again') + '</button>' +
        '<button class="quiz-share-btn" id="quiz-share-linkedin">LinkedIn</button>' +
      '</div>' +
    '</div>';

    document.getElementById('quiz-restart').addEventListener('click', startNewQuiz);
    document.getElementById('quiz-share-linkedin').addEventListener('click', function () {
      window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareUrl), '_blank', 'width=550,height=420');
    });
  }

  // ---- Expose ----
  window.GCT_Quiz = {
    open: openQuiz,
    close: closeQuiz
  };
})();
