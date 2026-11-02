(function () {
  'use strict';
  const { createPlayback } = window.CDBPlayback;

  function text(x, y, value, classes = '', anchor = 'middle') {
    return `<text x="${x}" y="${y}" class="${classes}" text-anchor="${anchor}">${value}</text>`;
  }
  function decoding() {
    const root = document.getElementById('decoding-demo');
    const [prelude, core, coda] = root.querySelector('[data-decoding-labels]').children;
    function centerCoreLabel() {
      const left = prelude.getBBox();
      const middle = core.getBBox();
      const right = coda.getBBox();
      const center = (left.x + left.width + right.x) / 2;
      const offset = center - (middle.x + middle.width / 2);
      core.setAttribute('x', Number(core.getAttribute('x')) + offset);
    }
    centerCoreLabel();
    if (document.fonts) document.fonts.ready.then(centerCoreLabel);
    if ('ResizeObserver' in window) new ResizeObserver(centerCoreLabel).observe(root);
  }

  function componentPreviews() {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const button = document.querySelector('[data-component-toggle]');
    const stageFrames = [
      { stage: 'prefill', batches: [0, 0, 0], caption: 'Prefill admits 4 new requests.' },
      { stage: 'prelude', batches: [4, 0, 0], caption: 'Prelude prepares 4 tokens for the core.' },
      { stage: 'core', batches: [0, 4, 0], caption: 'Core runs loop step 1 for 4 tokens.' },
      { stage: 'loop', next: 'core', batches: [0, 3, 1], caption: '1 token exits; 3 need another loop step.\n→ Scheduler decides for another loop step.' },
      { stage: 'core', batches: [0, 3, 1], caption: 'Core runs loop step 2 for 3 tokens.' },
      { stage: 'exit', next: 'coda', batches: [0, 2, 2], caption: '1 token exits; 2 need another loop step.\n→ Scheduler decides for Coda.' },
      { stage: 'coda', batches: [0, 2, 2], caption: 'Coda predicts next token for 2 exited tokens.' },
      { stage: 'prelude', batches: [2, 2, 0], caption: 'Prelude prepares these 2 next tokens for refill.' },
      { stage: 'refill', batches: [0, 4, 0], caption: '2 tokens refill the core batch to 4.' },
      { stage: 'core', batches: [0, 4, 0], caption: 'Core runs loop step 1 for 2 new tokens and loop step 3 for 2 waiting tokens.' },
    ];
    const cacheFrames = [
      { kind: 'start', caption: 'Assume tokens exit after 2, 1, and 3 loop steps.' },
      { kind: 'reserve', token: 0, caption: 'Init: Reserve KV slots for “It”.' },
      { kind: 'write', token: 0, depth: 1, caption: 'Loop 1: Both caches write to their first slot.' },
      { kind: 'write', token: 0, depth: 2, caption: 'Loop 2: Last-exited writes to the next slot; Shared overwrites the same slot.' },
      { kind: 'exit', token: 0, caption: 'Exit: Last-exited frees 1 unused KV slot.' },
      { kind: 'reserve', token: 1, caption: 'Init: Reserve KV slots for “is”.' },
      { kind: 'write', token: 1, depth: 1, caption: 'Loop 1: Both caches write to their first slot.' },
      { kind: 'exit', token: 1, caption: 'Exit: Last-exited frees 2 unused KV slots.' },
      { kind: 'reserve', token: 2, caption: 'Init: Reserve KV slots for “60”.' },
      { kind: 'write', token: 2, depth: 1, caption: 'Loop 1: Both caches write to their first slot.' },
      { kind: 'write', token: 2, depth: 2, caption: 'Loop 2: Last-exited writes to the next slot; Shared overwrites the same slot.' },
      { kind: 'write', token: 2, depth: 3, caption: 'Loop 3: Last-exited writes to the next slot; Shared overwrites the same slot.' },
      { kind: 'exit', token: 2, caption: 'Exit: No KV slots are freed.' },
      { kind: 'summary', caption: 'At skipped depths, later tokens attend to the last KV state computed before exit.' },
    ];
    function cacheState(frame) {
      const tokens = [0, 1, 2].map(() => ({ reserved: false, written: 0, finalized: false }));
      cacheFrames.slice(0, frame + 1).forEach(event => {
        if (event.kind === 'reserve') tokens[event.token].reserved = true;
        if (event.kind === 'write') tokens[event.token].written = event.depth;
        if (event.kind === 'exit') tokens[event.token].finalized = true;
      });
      // Logical aliases reuse retained versions without occupying physical slots.
      const lastUsed = tokens.reduce((sum, token) => sum + (token.reserved ? token.finalized ? token.written : 3 : 0), 0);
      const sharedUsed = tokens.filter(token => token.reserved).length;
      const freed = tokens.reduce((sum, token) => sum + (token.finalized ? 3 - token.written : 0), 0);
      return { tokens, lastUsed, sharedUsed, freed };
    }
    function cachePanel(policy) {
      const shared = policy === 'shared';
      const left = shared ? 152 : 28;
      return [0, 1, 2].map(token => [3, 2, 1].filter(depth => !shared || depth === 1).map(depth => {
        const x = left + token * 32;
        const y = 37 + (3 - depth) * 27;
        return `<g class="preview-cell" data-policy="${policy}" data-token="${token}" data-depth="${depth}" data-kind="empty"><rect x="${x}" y="${y}" width="28" height="23" rx="3" />${text(x + 14, y + 16, '·')}</g>`;
      }).join('')).join('') + ['It', 'is', '60'].map((token, index) => text(left + index * 32 + 14, 129, token, 'preview-detail')).join('');
    }

    // Both schedules execute three loop steps on the same schematic time scale.
    const gateTimes = [0, .5, 1, 1.75, 2.25, 3, 3.75, 4.5, 5.75, 6.5, 7.25, 8, 9];
    function gateTimeline(mode, y) {
      const sync = mode === 'sync';
      const gates = sync ? [
        { start: 2, end: 2.75 },
        { start: 5.5, end: 6.25 },
      ] : [
        { start: 0, end: .75 },
        { start: 2, end: 2.75 },
      ];
      const cpu = sync ? [
        { start: 2.75, end: 3.5 },
        { start: 6.25, end: 7 },
      ] : [
        { start: .75, end: 1.5 },
        { start: 2.75, end: 3.5 },
      ];
      const gpu = sync ? [
        { start: 0, end: 2, label: 'N' }, { start: 2, end: 3.5, label: 'wait', wait: true },
        { start: 3.5, end: 5.5, label: 'N+1' }, { start: 5.5, end: 7, label: 'wait', wait: true },
        { start: 7, end: 9, label: 'N+2' },
      ] : [
        { start: 0, end: 2, label: 'N' }, { start: 2, end: 4, label: 'N+1' }, { start: 4, end: 6, label: 'N+2' },
      ];
      function blocks(items, top, height, lane) {
        return items.map(item => {
          const x = 56 + item.start * 21.5;
          const width = (item.end - item.start) * 21.5 - 2;
          const classes = item.wait ? 'preview-wait' : lane === 'cpu' ? 'preview-prepare' : 'preview-core';
          return `<g class="preview-node ${classes}" data-timeline="${mode}" data-lane="${lane}" data-start="${item.start}" data-end="${item.end}"><rect x="${x}" y="${top}" width="${width}" height="${height}" rx="2" />${item.label ? text(x + width / 2, top + height / 2 + 4, item.label, 'preview-detail') : ''}<rect class="preview-progress" x="${x}" y="${top + height - 3}" width="0" height="2" data-width="${width}" /></g>`;
        }).join('');
      }
      return text(130, y + 12, sync ? 'Standard gate' : 'Lookahead gate', 'preview-heading') +
        text(2, y + 31, 'Exit gate', 'preview-detail preview-lane-label') +
        text(2, y + 49, 'CPU prep', 'preview-detail preview-lane-label') +
        text(2, y + 72, 'GPU', 'preview-detail preview-lane-label') +
        blocks(gates, y + 20, 14, 'gate') + blocks(cpu, y + 38, 14, 'cpu') + blocks(gpu, y + 56, 24, 'gpu') +
        (sync ? '' : `<text class="preview-detail" x="215" y="${y + 72}" data-lookahead-done>done</text>`);
    }

    const previews = {
      stages: {
        last: stageFrames.length,
        delay: frame => Math.max(3400, stageFrames[frame].caption.length * 60),
        svg: `<svg viewBox="0 0 260 180" aria-hidden="true"><g transform="translate(0 10)">
          <g class="preview-node" data-stage="prefill"><rect x="8" y="8" width="70" height="24" rx="2" />${text(43, 25, 'Prefill')}</g>
          <path class="preview-wire" d="M 43 32 V 61 M 78 83 H 95 M 165 83 H 182 M 146 61 V 43 H 114 V 61" />
          <path class="preview-arrow" d="M 40 56 L 43 61 L 46 56 Z M 90 80 L 95 83 L 90 86 Z M 177 80 L 182 83 L 177 86 Z" />
          <path class="preview-wire preview-flow" data-stage="loop" d="M 146 61 V 43 H 114 V 61" />
          <path class="preview-arrow preview-flow-arrow" data-stage="loop" d="M 111 56 L 114 61 L 117 56 Z" />
          <path class="preview-wire preview-flow" data-stage="exit" d="M 165 83 H 182" />
          <path class="preview-arrow preview-flow-arrow" data-stage="exit" d="M 177 80 L 182 83 L 177 86 Z" />
          <path class="preview-wire preview-flow" data-stage="refill" d="M 78 83 H 95" />
          <path class="preview-arrow preview-flow-arrow" data-stage="refill" d="M 90 80 L 95 83 L 90 86 Z" />
          <path class="preview-wire" d="M 217 105 V 133 H 43 V 106" />
          <path class="preview-arrow" d="M 40 111 L 43 106 L 46 111 Z" />
          ${['prelude', 'core', 'coda'].map((stage, index) => {
            const x = 8 + index * 87;
            return `<g class="preview-node ${stage === 'core' ? 'preview-core' : ''}" data-stage="${stage}"><rect x="${x}" y="61" width="70" height="44" rx="4" />${text(x + 35, 79, ['Prelude', 'Core', 'Coda'][index])}<text x="${x + 35}" y="97" class="preview-count" data-batch="${index}">0 tokens</text></g>`;
          }).join('')}
          <text x="86" y="121" class="preview-detail preview-flow-label" data-stage="refill">refill</text>
        </g></svg>`,
        render(root, frame, complete) {
          const state = stageFrames[Math.min(frame, stageFrames.length - 1)];
          root.querySelectorAll('[data-stage]').forEach(node => {
            node.classList.toggle('preview-current', !complete && node.dataset.stage === state.stage);
            node.classList.toggle('preview-selected', !complete && node.dataset.stage === state.next);
          });
          root.querySelectorAll('[data-batch]').forEach(node => {
            const count = state.batches[Number(node.dataset.batch)];
            node.textContent = `${count} ${count === 1 ? 'token' : 'tokens'}`;
          });
          root.querySelector('[data-caption]').textContent = state.caption;
        },
      },
      cache: {
        last: cacheFrames.length - 1,
        delay: frame => Math.max(3400, cacheFrames[frame].caption.length * 60),
        svg: `<svg viewBox="0 0 260 180" aria-hidden="true">
          ${text(74, 18, 'Last-exited', 'preview-heading')}${text(198, 18, 'Shared', 'preview-heading')}
          ${text(14, 33, 'depth', 'preview-small')}
          <path class="preview-wire" d="M 132 10 V 172" />
          ${[3, 2, 1].map(depth => text(12, 53 + (3 - depth) * 27, depth, 'preview-detail')).join('')}
          ${cachePanel('last')}${cachePanel('shared')}
          ${text(74, 150, 'KV slots', 'preview-detail')}${text(198, 150, 'KV slots', 'preview-detail')}
          <text x="74" y="166" class="preview-count" data-used-last></text>
          <text x="198" y="166" class="preview-count" data-used-shared></text>
        </svg>`,
        render(root, frame) {
          const index = Math.min(frame, cacheFrames.length - 1);
          const event = cacheFrames[index];
          const state = cacheState(index);
          root.querySelectorAll('[data-policy]').forEach(cell => {
            const tokenIndex = Number(cell.dataset.token);
            const depth = Number(cell.dataset.depth);
            const token = state.tokens[tokenIndex];
            const shared = cell.dataset.policy === 'shared';
            let kind = 'empty';
            let value = null;
            if (token.reserved) {
              if (shared) { kind = token.written ? 'written' : 'reserved'; value = token.written || null; }
              else if (depth <= token.written) { kind = 'written'; value = depth; }
              else if (token.finalized) { kind = 'alias'; value = token.written; }
              else kind = 'reserved';
            }
            const writing = event.kind === 'write' && event.token === tokenIndex && (shared || event.depth === depth);
            cell.setAttribute('class', `preview-cell${value ? ` depth-${value}` : ''}${writing ? ' preview-current' : ''}`);
            cell.dataset.kind = kind;
            cell.querySelector('text').textContent = value ?? '·';
          });
          root.querySelector('[data-used-last]').textContent = `${state.lastUsed} used · ${state.freed} freed`;
          root.querySelector('[data-used-shared]').textContent = `${state.sharedUsed} used`;
          const caption = root.querySelector('[data-caption]');
          const prefix = event.caption.match(/^(Init:|Loop \d+:|Exit:)/);
          if (prefix) {
            const label = document.createElement('strong');
            label.textContent = prefix[0];
            caption.replaceChildren(label, document.createTextNode(event.caption.slice(prefix[0].length)));
          } else caption.textContent = event.caption;
          root.dataset.lastUsed = state.lastUsed;
          root.dataset.sharedUsed = state.sharedUsed;
          root.dataset.freed = state.freed;
        },
      },
      gate: {
        last: gateTimes.length, delay: 900,
        svg: `<svg viewBox="0 0 260 180" aria-hidden="true">
          ${gateTimeline('sync', 6)}${gateTimeline('lookahead', 90)}
        </svg>`,
        render(root, frame, complete) {
          const time = gateTimes[Math.min(frame, gateTimes.length - 1)];
          root.querySelectorAll('[data-timeline]').forEach(node => {
            const start = Number(node.dataset.start), end = Number(node.dataset.end);
            node.classList.toggle('preview-current', !complete && time >= start && time < end);
            node.classList.toggle('preview-future', !complete && time < start);
            const progress = node.querySelector('.preview-progress');
            progress.setAttribute('width', Number(progress.dataset.width) * (complete ? 1 : Math.max(0, Math.min(1, (time - start) / (end - start)))));
          });
          root.querySelector('[data-lookahead-done]').style.visibility = complete || time >= 6 ? 'visible' : 'hidden';
          root.querySelector('[data-caption]').textContent = time >= 9 ? 'Lookahead avoids GPU waits.' :
            time >= 6 ? 'Lookahead finishes first.' : time >= 2 ? 'Lookahead can overlap CPU and GPU work.' : 'Both schedules run the same 3 loop steps.';
        },
      },
    };

    const players = Array.from(document.querySelectorAll('[data-component-preview]'), root => {
      const preview = previews[root.dataset.componentPreview];
      root.insertAdjacentHTML('afterbegin', `${preview.svg}<figcaption data-caption></figcaption>`);
      return createPlayback({
        root, last: preview.last, delay: preview.delay, hold: 4500,
        render: frame => preview.render(root, frame, frame === preview.last),
        controls() {},
      });
    });
    let paused = motion.matches;
    function setPaused(value) {
      paused = value;
      players.forEach(player => paused ? player.pause() : player.play());
      button.textContent = paused ? 'Play previews' : 'Pause previews';
    }
    button.addEventListener('click', () => setPaused(!paused));
    document.querySelector('[data-component-replay]').addEventListener('click', () => {
      paused = false;
      players.forEach(player => player.replay());
      button.textContent = 'Pause previews';
    });
    motion.addEventListener('change', () => { if (motion.matches) setPaused(true); });
    if (paused) setPaused(true);
    document.querySelector('.component-controls').hidden = false;
  }

  componentPreviews();
  decoding();
})();
