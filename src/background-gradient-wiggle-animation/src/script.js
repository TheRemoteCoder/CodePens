window.onload = () => {
  "use strict";

  // Public API
  const wiggleSpeed = 1; // 0 = Off, 0.5 = Decent, 1+ = Strong
  const fps = 1000 / 60; // 60 ^= 16.67ms

  // Private
  const gradientElement = document.querySelector(".gradient");
  const colors = { a: getColorVar("colorA"), b: getColorVar("colorB") };
  let debounceTimeout = null;

  /**
   * Effect creates a decent vertical 'wiggling' gradient.
   * That iterates between ca. -45° <-> 45° deg rotation.
   * Note that 0° deg is vertical (values go sideways).
   */
  function animate() {
    const screenHeight = window.innerHeight; // Current viewport height
    const scrollPositionT = window.scrollY; // From top coordinate (bottom will never be 100%)
    const documentHeight = window.document.documentElement.scrollHeight;
    const scrollPercent = (scrollPositionT / documentHeight) * 100;
    const waveFactor = wiggleSpeed * Math.sin(scrollPercent); // -1 -> 1
    const waveFactorClamp = waveFactor / 2; // -0.5 -> 0.5
    const angle = waveFactorClamp * 100;

    const style = `linear-gradient(${angle}deg, ${colors.a}, ${colors.b})`;

    gradientElement.style.background = style;
  }

  /**
   * Increase document height for scrolling.
   */
  function addText() {
    for (let i = 1; i <= 30; i++) {
      const h1 = document.createElement("h1");
      h1.textContent = `${i}.`;
      document.body.appendChild(h1);
    }
  }

  /**
   * Get CSS color variable value.
   */
  function getColorVar(name) {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`);
  }

  // Debounce effect for performance, but not sluggish
  window.addEventListener("scroll", () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(animate, fps);
  });

  addText();
};
