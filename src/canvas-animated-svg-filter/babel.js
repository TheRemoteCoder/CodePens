window.onload = () => {
  'use strict';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const effectBlur = document.querySelector('filter feGaussianBlur');
  const effectDisplacement = document.querySelector('filter feDisplacementMap');
  const effectOffset = document.querySelector('filter feOffset');

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  let offsetFactor = 0;
  let radians = 0;
  let i = 0;

  // Bad math - Values are ok for this screen size.
  // Moving mouse to center (on X) increases factor; boundaries will become close to 0.
  // - Offset left or right from center (must be positive)
  // - Scale factor determines max. possible result
  // - Higher offset will cancel out with scale factor and become close to 0
  canvas.addEventListener('mousemove', (event) => {
    const offset = (event.offsetX - centerX) / 100;
    const scaleFactor = centerX / 100;

    offsetFactor = Math.abs(Math.abs(offset) - scaleFactor);
  });

  // Can be artificially delayed for better visibility:
  // Render every N-th frame only.
  function loop() {
    const renderFrame = i === 0 || i % 1 === 0;

    if (renderFrame) {
      update();
      reset();
      draw();
    }

    window.requestAnimationFrame(loop);
    i++;
  }

  function update() {
    let scale = effectDisplacement.getAttribute('scale');

    // Effect size
    // Added random values = Stronger distortion and 'vibration' effect
    scale = 16 + Math.sin(scale) * offsetFactor;

    // Rotation speed
    radians += 0.05;

    effectOffset.setAttribute('dx', Math.random());
    effectOffset.setAttribute('dy', Math.random());
    effectDisplacement.setAttribute('scale', scale);
  }

  function reset() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

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

  // Start with initial call
  loop();
};
