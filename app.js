(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const ui = {
    tap: $('#tap-button'), bpm: $('#bpm-value'), tempoStatus: $('#tempo-status'),
    tempoCaption: $('#tempo-caption'), clockExplanation: $('#clock-explanation'),
    beatBoxes: [...document.querySelectorAll('.beat')],
    subdivisionButtons: [...document.querySelectorAll('[data-subdivision]')],
    modeButtons: [...document.querySelectorAll('[data-mode]')],
    formatButtons: [...document.querySelectorAll('[data-format]')],
    barButtons: [...document.querySelectorAll('[data-bars]')],
    barCounter: $('#bar-counter'), barCurrent: $('#bar-current'), barTotal: $('#bar-total'),
    barProgressFill: $('#bar-progress-fill'),
    patternButtons: [...document.querySelectorAll('[data-pattern]')],
    patternStrip: $('#pattern-strip'), patternRule: $('#pattern-rule'), round: $('#round-count'),
    promptLabel: $('#prompt-label'), promptIndex: $('#prompt-index'), promptWord: $('#prompt-word'),
    promptWords: $('#prompt-words'), promptTermination: $('#prompt-termination'), terminationValue: $('#termination-value'),
    terminationToggle: $('#termination-toggle'), terminationState: $('#termination-state'),
    characterToggle: $('#character-toggle'), characterState: $('#character-state'),
    characterChip: $('#character-chip'), characterName: $('#character-name'), characterRule: $('#character-rule'),
    helpButtons: [...document.querySelectorAll('[data-help]')],
    promptHint: $('#prompt-hint'), rhymeArea: $('#rhyme-area'), rhymeList: $('#rhyme-list'), revealNote: $('#reveal-note'),
    instruction: $('#instruction'), hit: $('#hit-button'), streak: $('#streak-value'),
    hits: $('#hits-value'), best: $('#best-value'), reset: $('#reset-button'),
    sound: $('#sound-toggle'), vibration: $('#vibration-toggle'), form: $('#youtube-form'), url: $('#youtube-url'),
    playerFrame: $('#player-frame'), player: $('#youtube-player'),
    playerStatus: $('#youtube-status'), closePlayer: $('#close-player'), toast: $('#toast'),
  };
  if (Object.values(ui).some((element) => !element)) return;

  const STORAGE_KEY = 'rapea-session-v1';
  const PROMPTS = {
    esdrujulas: [
      { word: 'MÁGICO', hint: 'Convertí una escena del barrio en algo imposible.', rhymes: ['trágico', 'clásico', 'básico', 'simbólico'] },
      { word: 'ELÉCTRICO', hint: 'Que se sienta la energía en cada barra.', rhymes: ['métrico', 'simétrico', 'excéntrico', 'geométrico'] },
      { word: 'RÁPIDO', hint: 'Una respuesta veloz, pero que diga algo.', rhymes: ['válido', 'cálido', 'pálido', 'sólido'] },
      { word: 'CÁMARA', hint: 'Contá lo que pasa como si filmaras una escena.', rhymes: ['lámpara', 'pájara', 'máscara', 'náufraga'] },
      { word: 'PÚBLICO', hint: 'Hablale a la plaza como si fuera una sola voz.', rhymes: ['músico', 'único', 'rústico', 'lúdico'] },
      { word: 'LÓGICA', hint: 'Dale vuelta a una idea con un remate inesperado.', rhymes: ['simbólica', 'metáfora', 'histórica', 'caótica'] },
      { word: 'BRÚJULA', hint: 'Perdete un segundo y encontrá tu propio norte.', rhymes: ['burbuja', 'aguja', 'dibujan', 'empujan'] },
      { word: 'ESDRÚJULA', hint: 'Jugá con el acento y caé firme en el compás.', rhymes: ['película', 'partícula', 'ridícula', 'minúscula'] },
    ],
    doble: [
      { word: 'EL BONDI', hint: 'Doble tempo: cada pulso tiene dos espacios.', rhymes: ['escondí', 'seguí', 'compartí', 'por aquí'] },
      { word: 'LA VEREDA', hint: 'Meté dos sílabas por pulso y pintá la escena.', rhymes: ['moneda', 'rueda', 'queda', 'vereda'] },
      { word: 'UN MATE', hint: 'Doble tempo: mantené el aire y cambiá el remate.', rhymes: ['debate', 'late', 'rescate', 'combate'] },
      { word: 'LA PLAZA', hint: 'Hacé que responda el barrio, sin perder el pulso.', rhymes: ['amenaza', 'abraza', 'terraza', 'calabaza'] },
      { word: 'EL POTRERO', hint: 'Dos golpes por pulso: jugá la barra de primera.', rhymes: ['compañero', 'sincero', 'sendero', 'aguacero'] },
      { word: 'EL SUBTE', hint: 'Doble velocidad, con las palabras bien claras.', rhymes: ['rebote', 'bigote', 'fuerte', 'norte'] },
      { word: 'EL BARRIO', hint: 'Contá una historia corta que tenga principio y giro.', rhymes: ['escenario', 'diario', 'horario', 'adversario'] },
      { word: 'LA ESQUINA', hint: 'Doblá el ritmo y dejá que la imagen se defina.', rhymes: ['neblina', 'rutina', 'vecina', 'gasolina'] },
    ],
  };

  const FIVE_WORDS = [
    'BARRIO', 'ESQUINA', 'VEREDA', 'BONDI', 'MATE', 'PLAZA', 'POTRERO', 'SUBTE',
    'CANCHA', 'ASADO', 'LLUVIA', 'VENTANA', 'ESPEJO', 'CAMINO', 'FUEGO', 'TIEMPO',
    'SILENCIO', 'PALABRA', 'RISA', 'HERIDA', 'SUEÑO', 'CALLE', 'NOCHE', 'MAÑANA',
    'BANDERA', 'TAMBOR', 'MICRÓFONO', 'BATALLA', 'FLOW', 'RIMA', 'ORGULLO', 'MEMORIA',
  ];

  const TERMINATIONS = ['-ÓN', '-ERO', '-AR', '-ADA', '-INGO', '-UELA', '-ISMO', '-AJE'];
  const CHARACTERS = [
    { name: 'EL VECINO', rule: 'Contá la escena como si la vieras desde la ventana.' },
    { name: 'EL PORTEÑO', rule: 'Llevá la ronda al centro: subte, esquina y apuro.' },
    { name: 'EL PIBE DEL BARRIO', rule: 'Hablá como en la cancha, sin pedir permiso.' },
    { name: 'LA TÍA DEL ASADO', rule: 'Meté una historia de familia y un remate seco.' },
    { name: 'EL DUEÑO DEL KIOSCO', rule: 'Observá el barrio desde el mostrador.' },
    { name: 'LA PIBARDA DEL SUBTE', rule: 'Improvisá como si el viaje fuera corto.' },
  ];
  const HELP_LEVELS = ['todas', 'primera', 'ultima', 'ninguna'];
  const BAR_OPTIONS = [4, 8, 16];

  const PATTERNS = {
    libre: { scheme: null, rule: 'Sin patrón: rematá como te salga. Elegí AABB, ABAB o ABBA para ver qué barras comparten rima.' },
    aabb: { scheme: ['A', 'A', 'B', 'B'], rule: 'AABB · las barras 1 y 2 comparten rima; las barras 3 y 4 cierran con otra.' },
    abab: { scheme: ['A', 'B', 'A', 'B'], rule: 'ABAB · las barras 1 y 3 comparten rima; las barras 2 y 4, otra.' },
    abba: { scheme: ['A', 'B', 'B', 'A'], rule: 'ABBA · las barras 2 y 3 comparten rima; la barra 4 vuelve a la de la 1.' },
  };

  const saved = readProgress();
  const state = {
    mode: 'esdrujulas', format: saved.format, terminationOn: saved.terminationOn, characterOn: saved.characterOn, help: saved.help, barsPerRound: saved.barsPerRound, subdivision: 1, pattern: saved.pattern, lastTapAt: null, intervals: [], pendingIntervals: [], bpm: null,
    running: false, timer: 0, tickTimerIds: new Set(), generation: 0,
    nextTickAt: 0, tickNumber: 0, lastTickNumber: -1, lastTickAt: null, clockStepMs: 0,
    roundNumber: 0, barNumber: 0, currentPrompt: null,
    decks: { esdrujulas: [], doble: [] }, fiveDeck: [], terminationDeck: [], currentTermination: null,
    characterDeck: [], currentCharacter: null,
    rhymeRevealed: false, hitThisRound: false, streak: saved.streak,
    hits: saved.hits, best: saved.best, soundOn: false, vibrationOn: false, audio: null,
    player: null, pendingMedia: null, apiState: 'idle', toastTimer: 0,
  };

  updateStats();
  setMode('esdrujulas');
  setFormat(state.format);
  setBarsPerRound(state.barsPerRound);
  setTermination(state.terminationOn);
  setCharacter(state.characterOn);
  setHelp(state.help);
  setPattern(state.pattern);
  renderEmptyPrompt();
  setTempoReady(false);
  updateSoundButton();
  updateVibrationButton();

  ui.tap.addEventListener('click', handleTap);
  ui.modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
  ui.formatButtons.forEach((button) => button.addEventListener('click', () => setFormat(button.dataset.format)));
  ui.barButtons.forEach((button) => button.addEventListener('click', () => {
    setBarsPerRound(button.dataset.bars);
    showToast(`Ronda de ${state.barsPerRound} barras. El patrón de 4 se repite en cada ciclo.`);
  }));
  ui.terminationToggle.addEventListener('click', toggleTermination);
  ui.characterToggle.addEventListener('click', toggleCharacter);
  ui.helpButtons.forEach((button) => button.addEventListener('click', () => setHelp(button.dataset.help)));
  ui.subdivisionButtons.forEach((button) => button.addEventListener('click', () => {
    state.subdivision = Number(button.dataset.subdivision);
    ui.subdivisionButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    updateClockExplanation();
    restartClockPhase();
  }));
  ui.hit.addEventListener('click', confirmHit);
  ui.patternButtons.forEach((button) => button.addEventListener('click', () => setPattern(button.dataset.pattern)));
  ui.reset.addEventListener('click', resetSession);
  ui.sound.addEventListener('click', toggleSound);
  ui.vibration.addEventListener('click', toggleVibration);
  ui.form.addEventListener('submit', handleYouTubeSubmit);
  ui.closePlayer.addEventListener('click', closeYouTubePlayer);

  function readProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        streak: safeCount(value.streak), hits: safeCount(value.hits),
        best: safeCount(value.best),
        pattern: PATTERNS[value?.pattern] ? value.pattern : 'libre',
        format: value?.format === 'cinco' ? 'cinco' : 'una',
        terminationOn: Boolean(value?.terminationOn),
        characterOn: Boolean(value?.characterOn),
        help: HELP_LEVELS.includes(value?.help) ? value.help : 'todas',
        barsPerRound: BAR_OPTIONS.includes(Number(value?.barsPerRound)) ? Number(value.barsPerRound) : 4,
      };
    } catch (_) {
      return { streak: 0, hits: 0, best: 0, pattern: 'libre', format: 'una', terminationOn: false, characterOn: false, help: 'todas', barsPerRound: 4 };
    }
  }

  function safeCount(value) {
    return Number.isSafeInteger(value) && value >= 0 ? Math.min(value, 999999) : 0;
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        streak: state.streak, hits: state.hits, best: state.best, pattern: state.pattern, format: state.format,
        terminationOn: state.terminationOn, characterOn: state.characterOn, help: state.help, barsPerRound: state.barsPerRound,
      }));
    } catch (_) {
      // Private browsing or a full storage quota must not interrupt practice.
    }
  }

  const MIN_TAP_INTERVAL = 250;
  const MAX_TAP_INTERVAL = 1500;
  const LONG_PAUSE = 2200;
  const OUTLIER_TOLERANCE = 0.2;

  function handleTap() {
    const now = performance.now();
    const hadPreviousTap = state.lastTapAt !== null;
    pulseTapButton();
    if (state.soundOn) resumeAudio();

    if (state.lastTapAt !== null) {
      const interval = now - state.lastTapAt;
      if (interval > LONG_PAUSE) {
        state.intervals = [];
        state.pendingIntervals = [];
      } else if (interval >= MIN_TAP_INTERVAL && interval <= MAX_TAP_INTERVAL) {
        acceptTapInterval(interval);
      } else {
        state.pendingIntervals = [];
      }
    }
    state.lastTapAt = now;

    if (!state.bpm) {
      ui.tempoCaption.textContent = hadPreviousTap
        ? 'Seguí tocando para fijar el pulso'
        : 'Tocá al ritmo de tu base';
    }
    if (state.vibrationOn) requestTapVibration();
  }

  function acceptTapInterval(interval) {
    const baseline = median(state.intervals);
    if (!baseline || Math.abs(interval - baseline) <= baseline * OUTLIER_TOLERANCE) {
      state.intervals.push(interval);
      state.intervals = state.intervals.slice(-6);
      state.pendingIntervals = [];
    } else {
      const pendingBaseline = median(state.pendingIntervals);
      if (!pendingBaseline || Math.abs(interval - pendingBaseline) > pendingBaseline * OUTLIER_TOLERANCE) {
        state.pendingIntervals = [interval];
      } else {
        state.pendingIntervals.push(interval);
        if (state.pendingIntervals.length >= 2) {
          state.intervals = state.pendingIntervals.slice(-6);
          state.pendingIntervals = [];
        }
      }
    }

    if (!state.intervals.length) return;
    const previousBpm = state.bpm;
    const estimate = estimateBpm(state.intervals);
    state.bpm = estimate;
    ui.bpm.textContent = String(estimate);
    ui.tempoCaption.textContent = `Pulso estimado · ${effectiveTempo()} BPM de práctica`;
    setTempoReady(true);
    if (state.running && previousBpm !== estimate) adjustClockTempo();
    else startClock();
  }

  function median(values) {
    if (!values.length) return null;
    const ordered = [...values].sort((a, b) => a - b);
    const middle = Math.floor(ordered.length / 2);
    return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
  }

  function estimateBpm(intervals) {
    const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
    return Math.max(40, Math.min(240, Math.round(60000 / average)));
  }

  function effectiveTempo() {
    return state.bpm ? state.bpm * (state.mode === 'doble' ? 2 : 1) : 0;
  }

  function setTempoReady(ready) {
    ui.tempoStatus.classList.toggle('running', ready && state.running);
    ui.tempoStatus.lastChild.textContent = ready ? (state.running ? 'EN MARCHA' : 'LISTO') : 'ESPERANDO';
  }

  function updateClockExplanation() {
    const modeFactor = state.mode === 'doble' ? 2 : 1;
    const hitsPerBeat = state.subdivision * modeFactor;
    const hitLabel = hitsPerBeat === 1 ? 'golpe' : 'golpes';
    ui.clockExplanation.textContent = `Cuenta: subdivisión ×${state.subdivision} × dinámica ×${modeFactor} = ${hitsPerBeat} ${hitLabel} por pulso base; ${hitsPerBeat * 4} por compás 4/4. Ronda de ${state.barsPerRound} compases.`;
  }

  function clockGrid(tick) {
    const divisions = state.subdivision * (state.mode === 'doble' ? 2 : 1);
    return {
      divisions,
      stepMs: 60000 / state.bpm / divisions,
      beat: Math.floor(tick / divisions) % 4,
      isAccent: tick % divisions === 0,
    };
  }

  function startClock() {
    if (!state.bpm || state.running) return;
    state.running = true;
    state.generation += 1;
    state.tickNumber = 0;
    state.lastTickNumber = -1;
    state.lastTickAt = null;
    state.clockStepMs = clockGrid(0).stepMs;
    state.nextTickAt = performance.now() + 70;
    setTempoReady(true);
    ui.tempoCaption.textContent = `Pulso estimado · ${effectiveTempo()} BPM de práctica`;
    scheduleLoop(state.generation);
  }

  function clearClockTimers() {
    window.clearTimeout(state.timer);
    state.tickTimerIds.forEach((id) => window.clearTimeout(id));
    state.tickTimerIds.clear();
  }

  function adjustClockTempo() {
    const now = performance.now();
    const oldStepMs = state.clockStepMs || clockGrid(0).stepMs;
    const phase = state.lastTickAt === null
      ? 0
      : Math.max(0, Math.min(1, (now - state.lastTickAt) / oldStepMs));
    state.generation += 1;
    clearClockTimers();
    state.clockStepMs = clockGrid(0).stepMs;
    if (state.lastTickNumber < 0) {
      state.tickNumber = 0;
      state.nextTickAt = now + 70;
    } else {
      state.tickNumber = state.lastTickNumber + 1;
      state.nextTickAt = now + Math.max(8, state.clockStepMs * (1 - phase));
    }
    scheduleLoop(state.generation);
  }

  const CLOCK_LOOKAHEAD_MS = 100;
  const CLOCK_LOOP_MS = 25;
  const MAX_CLOCK_LATENESS_MS = 50;

  function scheduleLoop(generation) {
    if (!state.running || generation !== state.generation) return;
    const now = performance.now();
    if (state.nextTickAt < now - MAX_CLOCK_LATENESS_MS) {
      clearClockTimers();
      state.tickNumber = Math.max(0, state.lastTickNumber + 1);
      state.nextTickAt = now + 8;
    }
    while (state.nextTickAt <= now + CLOCK_LOOKAHEAD_MS) {
      const scheduledAt = state.nextTickAt;
      const tick = state.tickNumber++;
      const grid = clockGrid(tick);
      queueTick(scheduledAt, tick, grid, generation);
      if (state.soundOn) scheduleClick(scheduledAt, grid.isAccent);
      state.nextTickAt += grid.stepMs;
    }
    state.timer = window.setTimeout(() => scheduleLoop(generation), CLOCK_LOOP_MS);
  }

  function queueTick(time, tick, grid, generation) {
    const delay = Math.max(0, time - performance.now());
    const id = window.setTimeout(() => {
      state.tickTimerIds.delete(id);
      if (!state.running || generation !== state.generation) return;
      if (tick <= state.lastTickNumber) return;
      if (performance.now() - time > Math.min(state.clockStepMs, MAX_CLOCK_LATENESS_MS)) return;
      state.lastTickNumber = tick;
      state.lastTickAt = time;
      renderBeat(grid.beat, grid.isAccent);
      if (grid.isAccent) onMainBeat(grid.beat);
    }, delay);
    state.tickTimerIds.add(id);
  }

  function renderBeat(beat, isAccent) {
    ui.beatBoxes.forEach((box, index) => {
      box.classList.toggle('active', index === beat && isAccent);
      box.classList.toggle('sub-beat', index === beat && !isAccent);
    });
  }

  function onMainBeat(beat) {
    if (beat === 0) {
      state.barNumber = state.barNumber >= state.barsPerRound ? 1 : state.barNumber + 1;
      if (state.barNumber === 1) startNewRound();
      updateBarUI();
    }
    if (beat === 2 && state.currentPrompt && !state.rhymeRevealed && state.barNumber === state.barsPerRound) revealRhymes();
  }

  function startNewRound() {
    state.roundNumber += 1;
    state.currentPrompt = choosePromptForRound();
    if (state.terminationOn) state.currentTermination = drawTermination();
    if (state.characterOn) state.currentCharacter = drawCharacter();
    state.rhymeRevealed = false;
    state.hitThisRound = false;
    ui.hit.disabled = true;
    ui.round.textContent = `RONDA ${String(state.roundNumber).padStart(2, '0')}`;
    renderPrompt();
    updateTerminationUI();
    updateCharacterUI();
    showEmptyRhymes();
  }

  function updateBarUI() {
    const active = state.running && state.barNumber > 0;
    ui.barCurrent.textContent = active ? String(state.barNumber).padStart(2, '0') : '—';
    ui.barProgressFill.style.width = active ? `${Math.round((state.barNumber / state.barsPerRound) * 100)}%` : '0%';
    ui.barCounter.setAttribute('aria-label', active
      ? `Barra ${state.barNumber} de ${state.barsPerRound}, ronda ${state.roundNumber}`
      : `Ronda de ${state.barsPerRound} barras; sin iniciar`);
    updatePatternCurrent();
  }

  function updatePatternCurrent() {
    const entry = PATTERNS[state.pattern] || PATTERNS.libre;
    if (!entry.scheme) return;
    const active = state.running && state.barNumber > 0 ? (state.barNumber - 1) % 4 : -1;
    ui.patternStrip.querySelectorAll('[data-bar]').forEach((bar, index) => {
      bar.classList.toggle('current', index === active);
    });
  }

  function renderPrompt() {
    const prompt = state.currentPrompt;
    if (!prompt) return;
    const five = state.format === 'cinco';
    ui.promptIndex.textContent = `#${String(state.roundNumber).padStart(2, '0')}`;
    ui.promptWord.hidden = five;
    ui.promptWords.hidden = !five;
    ui.rhymeArea.hidden = five;
    if (five) {
      ui.promptLabel.textContent = 'CINCO PALABRAS · USALAS EN LA RONDA';
      ui.promptWords.replaceChildren(...prompt.words.map((word, index) => {
        const chip = document.createElement('span');
        chip.className = 'prompt-word-chip';
        chip.textContent = word;
        chip.style.transitionDelay = `${index * 45}ms`;
        requestAnimationFrame(() => chip.classList.add('visible'));
        return chip;
      }));
      ui.promptHint.textContent = prompt.hint;
      ui.instruction.textContent = 'En la barra 1, agarrá las cinco. En la última, cerrá el remate.';
    } else {
      ui.promptLabel.textContent = state.mode === 'esdrujulas' ? 'CONCEPTO · ACENTO EN LA ANTEPENÚLTIMA' : 'CONCEPTO · DOBLE TEMPO';
      ui.promptWord.textContent = prompt.word;
      ui.promptWord.classList.remove('pop');
      void ui.promptWord.offsetWidth;
      ui.promptWord.classList.add('pop');
      ui.promptHint.textContent = prompt.hint;
      ui.instruction.textContent = state.mode === 'doble' ? 'Doblá las sílabas; el remate llega en la última barra.' : 'En la barra 1, agarrá el concepto. En la última, buscá el remate.';
    }
  }

  function choosePromptForRound() {
    if (state.format === 'cinco') {
      return { words: drawFiveWords(), hint: 'Usalas todas en la ronda; el remate cierra la última barra.', rhymes: [] };
    }
    return choosePrompt(state.mode);
  }

  function drawFiveWords() {
    if (!Array.isArray(state.fiveDeck)) state.fiveDeck = [];
    while (state.fiveDeck.length < 5) {
      const currentWords = new Set(state.currentPrompt?.words || []);
      const available = FIVE_WORDS.filter((word) => !state.fiveDeck.includes(word) && !currentWords.has(word));
      const fallback = FIVE_WORDS.filter((word) => !state.fiveDeck.includes(word));
      state.fiveDeck.push(...shuffle(available.length ? available : fallback));
      if (!state.fiveDeck.length) break;
    }
    return state.fiveDeck.splice(0, 5);
  }

  function choosePrompt(mode) {
    const pool = PROMPTS[mode] || PROMPTS.esdrujulas;
    if (!Array.isArray(state.decks[mode])) state.decks[mode] = [];
    const deck = state.decks[mode];
    if (!deck.length) {
      const fresh = pool.filter((item) => item !== state.currentPrompt);
      deck.push(...shuffle(fresh.length ? fresh : pool));
    }
    return deck.shift() || pool[0];
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapWith = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapWith]] = [copy[swapWith], copy[index]];
    }
    return copy;
  }

  function showEmptyRhymes() {
    ui.rhymeList.replaceChildren(...Array.from({ length: 4 }, () => {
      const chip = document.createElement('span');
      chip.className = 'rhyme-chip empty-chip';
      chip.textContent = '—';
      return chip;
    }));
    ui.revealNote.textContent = 'APARECE EN EL 3 FINAL';
  }

  function revealRhymes() {
    state.rhymeRevealed = true;
    if (state.format === 'cinco') {
      ui.promptHint.textContent = '¡Última barra! Cerrá con una de las cinco.';
      ui.hit.disabled = false;
      return;
    }
    renderRhymes();
    ui.hit.disabled = false;
  }

  function renderRhymes() {
    const rhymes = state.currentPrompt?.rhymes || [];
    const slots = [null, null, null, null];
    if (state.help === 'todas') {
      rhymes.slice(0, 4).forEach((word, index) => { slots[index] = word; });
    } else if (state.help === 'primera') {
      slots[0] = rhymes[0] || null;
    } else if (state.help === 'ultima') {
      slots[3] = rhymes[rhymes.length - 1] || null;
    }
    ui.rhymeList.replaceChildren(...slots.map((word, index) => {
      const chip = document.createElement('span');
      chip.className = word ? 'rhyme-chip' : 'rhyme-chip empty-chip';
      chip.textContent = word || '—';
      if (word) {
        chip.style.transitionDelay = `${index * 45}ms`;
        requestAnimationFrame(() => chip.classList.add('visible'));
      }
      return chip;
    }));
    const notes = {
      todas: '¡REMATE A TU MANERA!',
      primera: 'AYUDA: PRIMERA RIMA',
      ultima: 'AYUDA: ÚLTIMA RIMA',
      ninguna: 'SIN AYUDA · A TU MANERA',
    };
    ui.revealNote.textContent = notes[state.help] || notes.todas;
  }

  function renderEmptyPrompt() {
    const five = state.format === 'cinco';
    ui.round.textContent = 'RONDA 01';
    ui.promptIndex.textContent = '#01';
    ui.promptWord.hidden = five;
    ui.promptWords.hidden = !five;
    ui.rhymeArea.hidden = five;
    ui.hit.disabled = true;
    if (five) {
      ui.promptLabel.textContent = 'CINCO PALABRAS · USALAS EN LA RONDA';
      ui.promptWords.replaceChildren(...Array.from({ length: 5 }, () => {
        const chip = document.createElement('span');
        chip.className = 'prompt-word-chip visible';
        chip.textContent = '—';
        return chip;
      }));
      ui.promptHint.textContent = 'Marcá cuatro pulsos para empezar';
      ui.instruction.textContent = 'En la barra 1, agarrá las cinco. En la última, cerrá el remate.';
    } else {
      ui.promptLabel.textContent = 'TU CONCEPTO';
      ui.promptWord.textContent = 'LISTA';
      ui.promptHint.textContent = 'Marcá cuatro pulsos para empezar';
      ui.instruction.textContent = 'En la barra 1, agarrá el concepto. En la última, buscá el remate.';
    }
    showEmptyRhymes();
  }

  function confirmHit() {
    if (!state.rhymeRevealed || state.hitThisRound) return;
    state.hitThisRound = true;
    state.streak += 1;
    state.hits += 1;
    state.best = Math.max(state.best, state.streak);
    updateStats();
    saveProgress();
    ui.hit.disabled = true;
    ui.hit.innerHTML = 'REMATE GUARDADO <span>✓</span>';
    window.setTimeout(() => { ui.hit.innerHTML = '¡LA EMBOQUÉ! <span>↗</span>'; }, 1100);
    showToast(PATTERNS[state.pattern]?.scheme
      ? `Remate guardado con patrón ${state.pattern.toUpperCase()}. ¡Buen cierre!`
      : 'Una más para la racha. ¡Buen remate!');
  }

  function updateStats() {
    ui.streak.textContent = String(state.streak);
    ui.hits.textContent = String(state.hits);
    ui.best.textContent = String(state.best);
  }

  function setMode(mode) {
    if (!PROMPTS[mode]) return;
    state.mode = mode;
    document.body.classList.toggle('mode-double', mode === 'doble');
    ui.modeButtons.forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateClockExplanation();
    if (state.bpm) ui.tempoCaption.textContent = `Pulso estimado · ${effectiveTempo()} BPM de práctica`;
    restartClockPhase();
  }

  function setFormat(format) {
    state.format = format === 'cinco' ? 'cinco' : 'una';
    ui.formatButtons.forEach((button) => {
      const active = button.dataset.format === state.format;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (state.running) restartClockPhase();
    else renderEmptyPrompt();
    saveProgress();
  }

  function setBarsPerRound(bars) {
    const value = BAR_OPTIONS.includes(Number(bars)) ? Number(bars) : 4;
    state.barsPerRound = value;
    ui.barButtons.forEach((button) => {
      const active = Number(button.dataset.bars) === value;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    ui.barTotal.textContent = String(value).padStart(2, '0');
    state.barNumber = 0;
    if (state.running) {
      restartClockPhase();
    } else {
      state.roundNumber = 0;
      state.currentPrompt = null;
      renderEmptyPrompt();
    }
    updateBarUI();
    updateClockExplanation();
    saveProgress();
  }

  function setTermination(enabled) {
    state.terminationOn = Boolean(enabled);
    if (!state.terminationOn) state.currentTermination = null;
    updateTerminationUI();
    saveProgress();
  }

  function toggleTermination() {
    state.terminationOn = !state.terminationOn;
    if (!state.terminationOn) state.currentTermination = null;
    updateTerminationUI();
    saveProgress();
    showToast(state.terminationOn
      ? 'Terminación obligatoria activada. Aparece al empezar la ronda.'
      : 'Terminación desactivada.');
  }

  function drawTermination() {
    if (!state.terminationDeck.length) {
      const fresh = TERMINATIONS.filter((item) => item !== state.currentTermination);
      state.terminationDeck = shuffle(fresh.length ? fresh : TERMINATIONS);
    }
    return state.terminationDeck.shift() || TERMINATIONS[0];
  }

  function updateTerminationUI() {
    const on = state.terminationOn;
    ui.terminationToggle.classList.toggle('active', on);
    ui.terminationToggle.setAttribute('aria-pressed', String(on));
    ui.terminationState.textContent = on ? 'ON' : 'OFF';
    const visible = on && Boolean(state.currentTermination);
    ui.promptTermination.hidden = !visible;
    if (visible) ui.terminationValue.textContent = state.currentTermination;
  }

  function setCharacter(enabled, drawNow = false) {
    state.characterOn = Boolean(enabled);
    if (!state.characterOn) {
      state.currentCharacter = null;
    } else if (drawNow) {
      state.currentCharacter = drawCharacter();
    }
    updateCharacterUI();
    saveProgress();
  }

  function toggleCharacter() {
    const next = !state.characterOn;
    setCharacter(next, next && state.running);
    if (!next) {
      showToast('Personaje desactivado.');
    } else if (state.currentCharacter) {
      showToast(`Personaje activado: ${state.currentCharacter.name}.`);
    } else {
      showToast('Personaje activado. Aparece al empezar la ronda.');
    }
  }

  function drawCharacter() {
    if (!state.characterDeck.length) {
      const fresh = CHARACTERS.filter((item) => item !== state.currentCharacter);
      state.characterDeck = shuffle(fresh.length ? fresh : CHARACTERS);
    }
    return state.characterDeck.shift() || CHARACTERS[0];
  }

  function updateCharacterUI() {
    const on = state.characterOn;
    ui.characterToggle.classList.toggle('active', on);
    ui.characterToggle.setAttribute('aria-pressed', String(on));
    ui.characterState.textContent = on ? 'ON' : 'OFF';
    const visible = on && Boolean(state.currentCharacter);
    ui.characterChip.hidden = !visible;
    if (visible) {
      ui.characterName.textContent = state.currentCharacter.name;
      ui.characterRule.textContent = state.currentCharacter.rule;
    }
  }

  function setHelp(level) {
    state.help = HELP_LEVELS.includes(level) ? level : 'todas';
    ui.helpButtons.forEach((button) => {
      const active = button.dataset.help === state.help;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (state.rhymeRevealed && state.currentPrompt && state.format !== 'cinco') renderRhymes();
    saveProgress();
  }

  function setPattern(pattern) {
    const entry = PATTERNS[pattern] || PATTERNS.libre;
    state.pattern = entry === PATTERNS.libre ? 'libre' : pattern;
    ui.patternButtons.forEach((button) => {
      const active = button.dataset.pattern === state.pattern;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderPattern();
    saveProgress();
  }

  function renderPattern() {
    const entry = PATTERNS[state.pattern] || PATTERNS.libre;
    const scheme = entry.scheme;
    ui.patternRule.textContent = scheme ? `${entry.rule} El ciclo se repite cada 4 barras.` : entry.rule;
    ui.patternStrip.hidden = !scheme;
    if (!scheme) return;
    ui.patternStrip.querySelectorAll('[data-bar]').forEach((bar, index) => {
      const letter = scheme[index] || '';
      const badge = bar.querySelector('[data-letter]');
      if (badge) badge.textContent = letter;
      const shared = Boolean(letter) && scheme.filter((item) => item === letter).length > 1;
      bar.classList.toggle('shared', shared);
      bar.setAttribute('aria-label', `Barra ${index + 1}: rima ${letter}`);
    });
    updatePatternCurrent();
  }

  function restartClockPhase() {
    if (!state.running) return;
    state.generation += 1;
    clearClockTimers();
    state.tickNumber = 0;
    state.lastTickNumber = -1;
    state.lastTickAt = null;
    state.clockStepMs = clockGrid(0).stepMs;
    state.nextTickAt = performance.now() + 70;
    state.barNumber = 0;
    updateBarUI();
    scheduleLoop(state.generation);
  }

  function stopClock() {
    state.running = false;
    state.generation += 1;
    clearClockTimers();
    ui.beatBoxes.forEach((box) => box.classList.remove('active', 'sub-beat'));
    setTempoReady(Boolean(state.bpm));
    updateBarUI();
  }

  function resetSession() {
    stopClock();
    state.lastTapAt = null;
    state.intervals = [];
    state.pendingIntervals = [];
    state.bpm = null;
    state.roundNumber = 0;
    state.barNumber = 0;
    state.currentPrompt = null;
    state.decks = { esdrujulas: [], doble: [] };
    state.fiveDeck = [];
    state.terminationDeck = [];
    state.currentTermination = null;
    state.characterDeck = [];
    state.currentCharacter = null;
    state.rhymeRevealed = false;
    state.hitThisRound = false;
    state.streak = 0;
    state.hits = 0;
    ui.bpm.textContent = '—';
    ui.tempoCaption.textContent = 'Tocá al ritmo de tu base';
    ui.hit.innerHTML = '¡LA EMBOQUÉ! <span>↗</span>';
    renderEmptyPrompt();
    updateTerminationUI();
    updateCharacterUI();
    updateBarUI();
    updateStats();
    saveProgress();
    showToast('Sesión reiniciada. El récord queda guardado.');
  }

  function pulseTapButton() {
    ui.tap.classList.add('pulse');
    window.setTimeout(() => ui.tap.classList.remove('pulse'), 110);
  }

  function toggleSound() {
    state.soundOn = !state.soundOn;
    if (state.soundOn) resumeAudio();
    updateSoundButton();
    showToast(state.soundOn ? 'Metrónomo sonoro activado.' : 'Metrónomo sonoro silenciado.');
  }

  function updateSoundButton() {
    ui.sound.classList.toggle('active', state.soundOn);
    ui.sound.setAttribute('aria-pressed', String(state.soundOn));
    ui.sound.setAttribute('aria-label', state.soundOn ? 'Silenciar metrónomo' : 'Activar metrónomo sonoro');
    ui.sound.title = state.soundOn ? 'Silenciar metrónomo' : 'Activar metrónomo sonoro';
  }

  function toggleVibration() {
    if (typeof navigator.vibrate !== 'function') return;
    state.vibrationOn = !state.vibrationOn;
    updateVibrationButton();
    showToast(state.vibrationOn
      ? 'Vibración solicitada solo en cada tap manual.'
      : 'Vibración desactivada.');
  }

  function updateVibrationButton() {
    const supported = typeof navigator.vibrate === 'function';
    ui.vibration.disabled = !supported;
    ui.vibration.classList.toggle('active', supported && state.vibrationOn);
    ui.vibration.setAttribute('aria-pressed', String(supported && state.vibrationOn));
    const label = supported
      ? (state.vibrationOn ? 'Desactivar vibración en tap manual' : 'Activar vibración en cada tap manual')
      : 'Vibración no disponible en este dispositivo o navegador';
    ui.vibration.setAttribute('aria-label', label);
    ui.vibration.title = supported
      ? 'Solicitar vibración solo al tocar TAP (si el navegador lo permite)'
      : label;
  }

  function requestTapVibration() {
    try {
      navigator.vibrate(8);
    } catch (_) {
      // Vibration is optional and must not interrupt manual Tap Tempo.
    }
  }

  function resumeAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      if (!state.audio) state.audio = new AudioContextClass();
      if (state.audio.state === 'suspended') state.audio.resume();
    } catch (_) {
      // Visual timing remains available if Web Audio is unavailable.
    }
  }

  function scheduleClick(time, accented) {
    if (!state.audio || state.audio.state !== 'running') return;
    try {
      const oscillator = state.audio.createOscillator();
      const gain = state.audio.createGain();
      const start = state.audio.currentTime + Math.max(0, time - performance.now()) / 1000;
      oscillator.type = 'sine';
      oscillator.frequency.value = accented ? 880 : 590;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(accented ? 0.11 : 0.055, start + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);
      oscillator.connect(gain);
      gain.connect(state.audio.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.05);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch (_) {
      // A missed sound must not stop the visual beat scheduler.
    }
  }

  function showToast(message) {
    ui.toast.textContent = message;
    ui.toast.classList.add('show');
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => ui.toast.classList.remove('show'), 1900);
  }

  function handleYouTubeSubmit(event) {
    event.preventDefault();
    const media = parseYouTubeUrl(ui.url.value);
    if (!media) {
      ui.playerStatus.textContent = 'Ese link no parece un video o playlist compatible de YouTube.';
      ui.url.focus();
      return;
    }
    state.pendingMedia = media;
    ui.playerFrame.hidden = false;
    ui.playerStatus.textContent = media?.type === 'playlist' ? 'Preparando playlist de YouTube…' : 'Preparando video de YouTube…';
    if (state.player) {
      try { state.player.destroy(); } catch (_) { /* Ignore stale player cleanup errors. */ }
      state.player = null;
    }
    ui.player.replaceChildren();
    loadYouTubeApi();
  }

  function parseYouTubeUrl(value) {
    const raw = String(value || '').trim();
    if (!raw || raw.length > 2048) return null;
    let url;
    try {
      url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`);
    } catch (_) {
      return null;
    }
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    const host = url.hostname.toLowerCase().replace(/\.$/, '');
    const isYoutube = host === 'youtube.com' || host.endsWith('.youtube.com');
    const isShort = host === 'youtu.be';
    if (!isYoutube && !isShort) return null;
    const playlistId = url.searchParams.get('list');
    const validPlaylist = playlistId && /^[A-Za-z0-9_-]{10,120}$/.test(playlistId);
    let videoId = '';
    if (isShort) videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    else if (url.pathname === '/watch') videoId = url.searchParams.get('v') || '';
    else {
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})(?:\/|$)/);
      if (match) videoId = match[1];
    }
    if (/^[A-Za-z0-9_-]{11}$/.test(videoId)) return { type: 'video', id: videoId };
    if (validPlaylist) return { type: 'playlist', id: playlistId };
    return null;
  }

  function loadYouTubeApi() {
    if (window.YT && window.YT.Player) {
      createYouTubePlayer();
      return;
    }
    if (state.apiState === 'loading') return;
    state.apiState = 'loading';
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') {
        try { previousCallback(); } catch (_) { /* Do not block this player. */ }
      }
      state.apiState = 'ready';
      createYouTubePlayer();
    };
    let script = document.querySelector('script[data-rapea-youtube-api]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.dataset.rapeaYoutubeApi = 'true';
      script.onerror = () => {
        state.apiState = 'idle';
        ui.playerStatus.textContent = 'No se pudo conectar con YouTube. Podés seguir practicando sin el reproductor.';
      };
      document.head.append(script);
    }
    window.setTimeout(() => {
      if (state.apiState === 'loading') {
        state.apiState = 'idle';
        ui.playerStatus.textContent = 'YouTube tarda en responder o está bloqueado. Volvé a cargar el link para reintentar.';
      }
    }, 12000);
  }

  function createYouTubePlayer() {
    if (!state.pendingMedia || !window.YT || !window.YT.Player) return;
    state.apiState = 'ready';
    const media = state.pendingMedia;
    try {
      state.player = new window.YT.Player(ui.player, {
        width: '100%', height: '100%',
        playerVars: { autoplay: 0, controls: 1, playsinline: 1, rel: 0 },
        events: {
          onReady(event) {
            if (state.pendingMedia !== media) return;
            if (media?.type === 'video') event.target.cueVideoById(media.id);
            else if (media?.type === 'playlist') event.target.cuePlaylist({ listType: 'playlist', list: media.id, index: 0 });
            else return;
            ui.playerStatus.textContent = 'Reproductor listo. Iniciá el video con sus controles; el TAP sigue independiente.';
          },
          onError(event) {
            const messages = {
              2: 'YouTube rechazó el identificador del video o playlist.',
              5: 'Este video no se puede reproducir en el reproductor HTML5.',
              100: 'El video no existe o no está disponible.',
              101: 'El dueño del video no permite reproducirlo en este reproductor.',
              150: 'El dueño del video no permite reproducirlo en este reproductor.',
              153: 'YouTube no pudo validar esta solicitud. Probá desde un sitio publicado.',
            };
            ui.playerStatus.textContent = messages[event.data] || 'YouTube no pudo cargar ese contenido; probá otro link.';
          },
        },
      });
      ui.playerStatus.textContent = 'Conectando con el reproductor oficial de YouTube…';
    } catch (_) {
      state.player = null;
      ui.playerStatus.textContent = 'No se pudo iniciar YouTube en este navegador. El entrenamiento sigue disponible.';
    }
  }

  function closeYouTubePlayer() {
    if (state.player) {
      try { state.player.destroy(); } catch (_) { /* Ignore stale player cleanup errors. */ }
    }
    state.player = null;
    state.pendingMedia = null;
    ui.player.replaceChildren();
    ui.playerFrame.hidden = true;
    ui.playerStatus.textContent = 'El beat suena por YouTube; el TAP marca un metrónomo independiente.';
  }
})();
