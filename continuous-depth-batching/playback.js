(function () {
  'use strict';

  function createPlayback({ root, last, render, controls, delay = 1000, hold = 3000 }) {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = last;
    let started = false;
    let playing = false;
    let userPaused = false;
    let visible = !('IntersectionObserver' in window);
    let focused = document.hasFocus();
    let restartOnEntry = false;
    let timer = null;
    let due = 0;
    let remaining = hold;

    function state() {
      return { frame, started, playing, active: playing && visible && focused && !document.hidden, complete: frame === last };
    }

    function stopClock() {
      if (timer === null) return;
      remaining = Math.max(0, due - performance.now());
      clearTimeout(timer);
      timer = null;
    }

    function queue() {
      stopClock();
      const current = state();
      root.dataset.frame = frame;
      root.dataset.playing = String(playing);
      root.dataset.active = String(current.active);
      controls(current);
      if (!current.active) return;
      due = performance.now() + remaining;
      timer = setTimeout(() => {
        timer = null;
        move(frame === last ? 0 : frame + 1);
      }, remaining);
    }

    function move(next) {
      const previous = frame;
      frame = next;
      remaining = frame === last ? hold : typeof delay === 'function' ? delay(frame) : delay;
      render(frame, previous);
      queue();
    }

    function replay() {
      stopClock();
      userPaused = false;
      restartOnEntry = false;
      started = true;
      playing = true;
      move(0);
    }

    function pause() {
      playing = false;
      userPaused = true;
      restartOnEntry = false;
      queue();
    }

    function play() {
      userPaused = false;
      if (!started || frame === last) return replay();
      playing = true;
      queue();
    }

    function activate() {
      if (!visible || !focused || document.hidden) {
        if (playing) restartOnEntry = true;
        queue();
        return;
      }
      if (playing && restartOnEntry) replay();
      else if (!started && !userPaused && !motion.matches) replay();
      else queue();
    }

    function focusChanged() {
      focused = document.hasFocus();
      activate();
    }

    document.addEventListener('visibilitychange', focusChanged);
    window.addEventListener('focus', focusChanged);
    window.addEventListener('blur', () => { focused = false; activate(); });
    motion.addEventListener('change', () => { if (motion.matches) pause(); });
    render(frame, null);
    queue();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        activate();
      }, { rootMargin: '-10% 0px -10% 0px' }).observe(root);
    } else activate();

    return { play, pause, replay, toggle: () => playing ? pause() : play() };
  }

  window.CDBPlayback = { createPlayback };
})();
