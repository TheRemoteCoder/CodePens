window.onload = () => {
  'use strict';

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const effectDisplacement = document.querySelector('filter feDisplacementMap') as SVGFEDisplacementMapElement;
  const effectOffset = document.querySelector('filter feOffset') as SVGFEOffsetElement;

  const centerX: number = canvas.width / 2;
  const centerY: number = canvas.height / 2;
  let offsetFactor: number = 0;
  let radians: number = 0;
  let i: number = 0;

  /**
   * Bad math - Values are ok for this screen size.
   * Moving mouse to center (on X) increases factor; boundaries will become close to 0.
   *
   * - scaleFactor: Determines max. possible result.
   * - offset: Left or right from center (must be positive).
   *   Higher offset will cancel out with scale factor and become close to 0.
   */
  function onMouseMove(event: MouseEvent) {
    const scaleFactor = centerX / 100;
    const offset = (event.offsetX - centerX) / 100;

    offsetFactor = Math.abs(Math.abs(offset) - scaleFactor);
  }

  /**
   * Frame-by-frame render process.
   */
  function loop() {
    // Artificial delay for better visibility:
    // To render every N-th frame only; change expression 'i % 1' to higher numbers.
    const renderFrame = i === 0 || i % 1 === 0;

    if (renderFrame) {
      update();
      reset();
      draw();
    }

    window.requestAnimationFrame(loop);
    i++;
  }

  /**
   * Update effect values.
   */
  function update() {
    let scale: string = effectDisplacement.getAttribute('scale') + '';
    let rnd: string = Math.random().toString();

    // Effect size - Added random values = Stronger distortion and 'vibration' effect
    scale = (16 + Math.sin(+scale) * offsetFactor).toString();

    // Rotation speed
    radians += 0.05;

    effectOffset.setAttribute('dx', rnd);
    effectOffset.setAttribute('dy', rnd);
    effectDisplacement.setAttribute('scale', scale);
  }

  /**
   * Reset screen by partly transparent filling for a fading effect.
   */
  function reset() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Draw rectangle at screen center.
   */
  function draw() {
    ctx.save();

    ctx.lineWidth = 24;
    ctx.strokeStyle = 'rgba(255, 192, 0, 1)';

    ctx.translate(centerX, centerY);
    ctx.rotate(radians);
    ctx.beginPath();
    ctx.rect(-100, -100, 200, 200);
    ctx.stroke();

    ctx.restore();
  }

  // Start
  canvas.addEventListener('mousemove', onMouseMove);

  loop();
};
