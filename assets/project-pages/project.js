(function () {
  'use strict';

  const copyBtn = document.getElementById("bibtex-copy");
  copyBtn.addEventListener("click", async function () {
    const text = document.getElementById("bibtex-content").textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied";
      copyBtn.classList.add("copied");
    } catch {
      copyBtn.textContent = "Copy failed";
    }
    setTimeout(() => {
      copyBtn.textContent = "Copy";
      copyBtn.classList.remove("copied");
    }, 1500);
  });
})();
