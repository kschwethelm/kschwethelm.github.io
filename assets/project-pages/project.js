(function () {
  'use strict';

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollDuration = 1000;
  let scrollFrame;

  document.querySelector(".chapter-link")?.addEventListener("click", function (event) {
    if (reducedMotion.matches || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const hash = this.hash;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    cancelAnimationFrame(scrollFrame);
    if (window.location.hash !== hash) history.pushState(null, "", hash);

    const start = window.scrollY;
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const destination = Math.max(0, Math.min(maxScroll, start + target.getBoundingClientRect().top - margin));
    let lastPosition = start;
    let startTime;

    function scroll(now) {
      if (window.location.hash !== hash || window.scrollY !== lastPosition) return;

      startTime ??= now;
      const progress = reducedMotion.matches ? 1 : Math.min((now - startTime) / scrollDuration, 1);
      const easedProgress = (1 - Math.cos(Math.PI * progress)) / 2;
      window.scrollTo(window.scrollX, start + (destination - start) * easedProgress);
      lastPosition = window.scrollY;

      if (progress < 1) {
        scrollFrame = requestAnimationFrame(scroll);
        return;
      }

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }

    scrollFrame = requestAnimationFrame(scroll);
  });

  document.querySelectorAll(".citation-box").forEach((citationBox) => {
    const copyBtn = citationBox.querySelector(".copy-btn");
    const citation = citationBox.querySelector(".bibtex code");
    let resetTimer;

    copyBtn.addEventListener("click", async function () {
      clearTimeout(resetTimer);
      try {
        await navigator.clipboard.writeText(citation.textContent);
        copyBtn.textContent = "Copied";
        copyBtn.classList.add("copied");
      } catch {
        copyBtn.textContent = "Copy failed";
        copyBtn.classList.remove("copied");
      }
      resetTimer = setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 1500);
    });
  });
})();
