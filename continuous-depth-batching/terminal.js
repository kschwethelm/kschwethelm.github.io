(function () {
  'use strict';

  const root = document.getElementById('terminal-demo');
  if (!root) return;

  // Color runs preserve visible loop-depth changes; reveal chunks are illustrative.
  const session = [
    {"text": "$ Hello :)\n", "kind": "prompt", "type": true, "pause": 350},
    {"text": "<think>\n", "kind": "tag"},
    {"text": "Okay", "kind": "thinking", "depth": 4},
    {"text": ", the ", "kind": "thinking", "depth": 2},
    {"text": "user sent ", "kind": "thinking", "depth": 3},
    {"text": "a ", "kind": "thinking", "depth": 4},
    {"text": "message with ", "kind": "thinking", "depth": 3},
    {"text": "the content \"", "kind": "thinking", "depth": 4},
    {"text": "Hello :) ", "kind": "thinking", "depth": 3},
    {"text": "\" and the role is user", "kind": "thinking", "depth": 4},
    {"text": ". ", "kind": "thinking", "depth": 3},
    {"text": "I ", "kind": "thinking", "depth": 4},
    {"text": "need to ", "kind": "thinking", "depth": 2},
    {"text": "respond ", "kind": "thinking", "depth": 3},
    {"text": "appropriately", "kind": "thinking", "depth": 4},
    {"text": ". ", "kind": "thinking", "depth": 2},
    {"text": "Since it", "kind": "thinking", "depth": 4},
    {"text": "'s ", "kind": "thinking", "depth": 2},
    {"text": "a greeting, ", "kind": "thinking", "depth": 3},
    {"text": "I ", "kind": "thinking", "depth": 4},
    {"text": "should ", "kind": "thinking", "depth": 2},
    {"text": "reply in ", "kind": "thinking", "depth": 4},
    {"text": "a ", "kind": "thinking", "depth": 2},
    {"text": "friendly and welcoming manner", "kind": "thinking", "depth": 3},
    {"text": ". ", "kind": "thinking", "depth": 2},
    {"text": "Maybe say something ", "kind": "thinking", "depth": 4},
    {"text": "like", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "\"", "kind": "thinking", "depth": 2},
    {"text": "Hello! How can ", "kind": "thinking", "depth": 3},
    {"text": "I assist you today", "kind": "thinking", "depth": 2},
    {"text": "?\" ", "kind": "thinking", "depth": 3},
    {"text": "That's straightforward ", "kind": "thinking", "depth": 4},
    {"text": "and ", "kind": "thinking", "depth": 3},
    {"text": "opens ", "kind": "thinking", "depth": 4},
    {"text": "the door for ", "kind": "thinking", "depth": 3},
    {"text": "them ", "kind": "thinking", "depth": 4},
    {"text": "to ", "kind": "thinking", "depth": 2},
    {"text": "ask for ", "kind": "thinking", "depth": 4},
    {"text": "help. I should keep it simple and ", "kind": "thinking", "depth": 3},
    {"text": "polite. ", "kind": "thinking", "depth": 4},
    {"text": "Let me ", "kind": "thinking", "depth": 3},
    {"text": "ma", "kind": "thinking", "depth": 2},
    {"text": "ke su", "kind": "thinking", "depth": 3},
    {"text": "re th", "kind": "thinking", "depth": 2},
    {"text": "ere's no ", "kind": "thinking", "depth": 3},
    {"text": "ma", "kind": "thinking", "depth": 2},
    {"text": "rkdo", "kind": "thinking", "depth": 4},
    {"text": "wn fo", "kind": "thinking", "depth": 2},
    {"text": "rmatting and it's ", "kind": "thinking", "depth": 4},
    {"text": "al", "kind": "thinking", "depth": 2},
    {"text": "l in ", "kind": "thinking", "depth": 4},
    {"text": "En", "kind": "thinking", "depth": 3},
    {"text": "glish. ", "kind": "thinking", "depth": 4},
    {"text": "Yep", "kind": "thinking", "depth": 3},
    {"text": ", th", "kind": "thinking", "depth": 2},
    {"text": "at should work.\n", "kind": "thinking", "depth": 3},
    {"text": "</think>\n\n", "kind": "tag", "pause": 300},
    {"text": "Hello! How ", "kind": "response", "depth": 3},
    {"text": "can I assist you today? ", "kind": "response", "depth": 2},
    {"text": "😊", "kind": "response", "depth": 3, "hold": 3000},
    {"text": "$ What is 12 × 5?\n", "kind": "prompt", "type": true, "pause": 400, "clear": true},
    {"text": "<think>\n", "kind": "tag"},
    {"text": "Okay", "kind": "thinking", "depth": 4},
    {"text": ", ", "kind": "thinking", "depth": 2},
    {"text": "let", "kind": "thinking", "depth": 3},
    {"text": "'s ", "kind": "thinking", "depth": 2},
    {"text": "see", "kind": "thinking", "depth": 3},
    {"text": ". The user ", "kind": "thinking", "depth": 2},
    {"text": "asked, ", "kind": "thinking", "depth": 4},
    {"text": "\"What is 12 × 5", "kind": "thinking", "depth": 2},
    {"text": "?\" ", "kind": "thinking", "depth": 3},
    {"text": "Al", "kind": "thinking", "depth": 4},
    {"text": "right, ", "kind": "thinking", "depth": 2},
    {"text": "multiplication. So", "kind": "thinking", "depth": 4},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "12 ", "kind": "thinking", "depth": 2},
    {"text": "multiplied ", "kind": "thinking", "depth": 3},
    {"text": "by 5", "kind": "thinking", "depth": 2},
    {"text": ". Let ", "kind": "thinking", "depth": 3},
    {"text": "me ", "kind": "thinking", "depth": 2},
    {"text": "break it ", "kind": "thinking", "depth": 3},
    {"text": "down. 12 ", "kind": "thinking", "depth": 2},
    {"text": "times ", "kind": "thinking", "depth": 4},
    {"text": "5", "kind": "thinking", "depth": 3},
    {"text": ". Hmm", "kind": "thinking", "depth": 4},
    {"text": ", 1", "kind": "thinking", "depth": 3},
    {"text": "0 ", "kind": "thinking", "depth": 2},
    {"text": "times ", "kind": "thinking", "depth": 3},
    {"text": "5 is 50", "kind": "thinking", "depth": 2},
    {"text": ", and ", "kind": "thinking", "depth": 3},
    {"text": "2 ", "kind": "thinking", "depth": 2},
    {"text": "times ", "kind": "thinking", "depth": 3},
    {"text": "5 is 10", "kind": "thinking", "depth": 2},
    {"text": ". ", "kind": "thinking", "depth": 3},
    {"text": "So ", "kind": "thinking", "depth": 4},
    {"text": "adding those together, ", "kind": "thinking", "depth": 3},
    {"text": "50 ", "kind": "thinking", "depth": 2},
    {"text": "+ ", "kind": "thinking", "depth": 3},
    {"text": "10 ", "kind": "thinking", "depth": 2},
    {"text": "equals ", "kind": "thinking", "depth": 3},
    {"text": "60. ", "kind": "thinking", "depth": 2},
    {"text": "Wait", "kind": "thinking", "depth": 4},
    {"text": ", ", "kind": "thinking", "depth": 2},
    {"text": "that makes ", "kind": "thinking", "depth": 4},
    {"text": "sense", "kind": "thinking", "depth": 2},
    {"text": ". ", "kind": "thinking", "depth": 3},
    {"text": "Alternatively", "kind": "thinking", "depth": 4},
    {"text": ", ", "kind": "thinking", "depth": 2},
    {"text": "I ", "kind": "thinking", "depth": 4},
    {"text": "can ", "kind": "thinking", "depth": 3},
    {"text": "think ", "kind": "thinking", "depth": 4},
    {"text": "of it ", "kind": "thinking", "depth": 3},
    {"text": "as ", "kind": "thinking", "depth": 2},
    {"text": "5 ", "kind": "thinking", "depth": 3},
    {"text": "added ", "kind": "thinking", "depth": 4},
    {"text": "12 times", "kind": "thinking", "depth": 3},
    {"text": ", but ", "kind": "thinking", "depth": 4},
    {"text": "that's ", "kind": "thinking", "depth": 3},
    {"text": "more work", "kind": "thinking", "depth": 4},
    {"text": ". ", "kind": "thinking", "depth": 2},
    {"text": "No", "kind": "thinking", "depth": 4},
    {"text": ", ", "kind": "thinking", "depth": 2},
    {"text": "the first ", "kind": "thinking", "depth": 4},
    {"text": "method is faster. So the answer should ", "kind": "thinking", "depth": 3},
    {"text": "be 60. ", "kind": "thinking", "depth": 2},
    {"text": "Let ", "kind": "thinking", "depth": 3},
    {"text": "me ", "kind": "thinking", "depth": 2},
    {"text": "double", "kind": "thinking", "depth": 3},
    {"text": "-check ", "kind": "thinking", "depth": 2},
    {"text": "to ", "kind": "thinking", "depth": 4},
    {"text": "make ", "kind": "thinking", "depth": 3},
    {"text": "sure ", "kind": "thinking", "depth": 2},
    {"text": "I ", "kind": "thinking", "depth": 3},
    {"text": "didn't ", "kind": "thinking", "depth": 2},
    {"text": "mix up the ", "kind": "thinking", "depth": 3},
    {"text": "numbers", "kind": "thinking", "depth": 4},
    {"text": ". ", "kind": "thinking", "depth": 3},
    {"text": "12 ", "kind": "thinking", "depth": 2},
    {"text": "× 5", "kind": "thinking", "depth": 3},
    {"text": ". ", "kind": "thinking", "depth": 4},
    {"text": "Yes", "kind": "thinking", "depth": 3},
    {"text": ", ", "kind": "thinking", "depth": 2},
    {"text": "12 ", "kind": "thinking", "depth": 3},
    {"text": "five ", "kind": "thinking", "depth": 4},
    {"text": "times", "kind": "thinking", "depth": 3},
    {"text": ". 5, ", "kind": "thinking", "depth": 4},
    {"text": "10, 15, ", "kind": "thinking", "depth": 3},
    {"text": "20", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "25", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 4},
    {"text": "30", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "35", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "40", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "45", "kind": "thinking", "depth": 2},
    {"text": ", ", "kind": "thinking", "depth": 3},
    {"text": "50", "kind": "thinking", "depth": 2},
    {"text": ", 55, 6", "kind": "thinking", "depth": 3},
    {"text": "0", "kind": "thinking", "depth": 2},
    {"text": ". ", "kind": "thinking", "depth": 3},
    {"text": "Y", "kind": "thinking", "depth": 4},
    {"text": "ep, ", "kind": "thinking", "depth": 2},
    {"text": "that", "kind": "thinking", "depth": 4},
    {"text": "'s ", "kind": "thinking", "depth": 2},
    {"text": "12 ", "kind": "thinking", "depth": 3},
    {"text": "times. So ", "kind": "thinking", "depth": 4},
    {"text": "definitely ", "kind": "thinking", "depth": 3},
    {"text": "60. ", "kind": "thinking", "depth": 2},
    {"text": "I ", "kind": "thinking", "depth": 4},
    {"text": "think ", "kind": "thinking", "depth": 3},
    {"text": "that's ", "kind": "thinking", "depth": 2},
    {"text": "correct", "kind": "thinking", "depth": 3},
    {"text": ". ", "kind": "thinking", "depth": 2},
    {"text": "No mistakes here", "kind": "thinking", "depth": 3},
    {"text": ".\n", "kind": "thinking", "depth": 2},
    {"text": "</think>\n\n", "kind": "tag", "pause": 300},
    {"text": "The ", "kind": "response", "depth": 4},
    {"text": "result ", "kind": "response", "depth": 3},
    {"text": "of 12 multiplied by 5 is ", "kind": "response", "depth": 2},
    {"text": "**", "kind": "response", "depth": 3},
    {"text": "60**.", "kind": "response", "depth": 2},
  ];

  const screen = root.querySelector('.terminal-screen');
  const toggle = root.querySelector('[data-terminal-toggle]');
  const restart = root.querySelector('[data-terminal-restart]');
  const status = root.querySelector('[data-terminal-status]');
  const runs = session.map(part => {
    const span = document.createElement('span');
    span.className = `terminal-${part.kind}${part.depth ? ` depth-${part.depth}` : ''}`;
    if (part.depth) span.title = `${part.depth} recurrent steps`;
    span.textContent = part.text;
    return span;
  });
  const mathStart = session.findIndex(part => part.clear);
  for (const [start, end] of [[0, mathStart], [mathStart, runs.length]]) {
    const sizing = document.createElement('pre');
    sizing.className = 'terminal-screen terminal-size';
    sizing.setAttribute('aria-hidden', 'true');
    sizing.append(...runs.slice(start, end).map(run => run.cloneNode(true)));
    root.querySelector('.terminal-output').append(sizing);
  }
  const caret = document.createElement('span');
  caret.className = 'terminal-caret';
  caret.setAttribute('aria-hidden', 'true');
  screen.replaceChildren(...runs, caret);

  const playbackSpeed = 1.2;
  const events = session.flatMap((part, run) => {
    const chunks = part.type ? Array.from(part.text) : part.text.match(/\s*\S+\s*|\s+/gu) || [];
    return chunks.map((text, index) => ({
      run, text, depth: part.depth || 0,
      clear: part.clear && index === 0,
      delay: (part.type ? 22 : part.depth ? 30 * part.depth : 25) / playbackSpeed,
      pauseAfter: index === chunks.length - 1 ? part.hold || (part.pause || 0) / playbackSpeed : 0,
    }));
  });

  const player = window.CDBPlayback.createPlayback({
    root,
    last: events.length,
    delay(position) {
      return events[position].delay + (events[position - 1]?.pauseAfter || 0);
    },
    render(position, previous) {
      if (previous === null) {
        runs.slice(0, mathStart).forEach(run => { run.textContent = ''; });
        return;
      }
      if (position === 0) {
        runs.forEach(run => { run.textContent = ''; });
      } else {
        const event = events[position - 1];
        if (event.clear) runs.forEach(run => { run.textContent = ''; });
        runs[event.run].append(document.createTextNode(event.text));
      }
    },
    controls({ frame: position, playing: running, started, active, complete }) {
      toggle.textContent = running ? 'Pause' : !started ? 'Play' : complete ? 'Replay' : 'Resume';
      toggle.setAttribute('aria-label', `${toggle.textContent} terminal replay`);
      restart.hidden = !started || (!running && complete);
      root.dataset.position = position;
      root.dataset.complete = String(complete);
      root.dataset.holding = String(complete || events[position - 1]?.pauseAfter >= 3000);
      root.dataset.scene = position > 0 && events[position - 1].run >= mathStart ? 'math' : 'greeting';
      root.dataset.depth = active ? events[position]?.depth || 0 : 0;
      const message = !started ? '' : !running ? 'Terminal replay paused.' :
        complete ? 'Terminal replay complete.' : 'Playing terminal replay.';
      if (status.textContent !== message) status.textContent = message;
    },
  });

  toggle.addEventListener('click', player.toggle);
  restart.addEventListener('click', player.replay);
  root.querySelector('.terminal-actions').hidden = false;
})();
