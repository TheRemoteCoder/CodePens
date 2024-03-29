/**
 * Run animation.
 */
window.onload = () => {
  'use strict';

  const canvas = document.getElementById('canvas');
  const effectDisplacement = document.querySelector('filter feDisplacementMap');
  const effectOffset = document.querySelector('filter feOffset');

  const animation = new SvgCanvasAnimation({
    canvasElement: canvas,
    effectDisplacementElement: effectDisplacement,
    effectOffsetElement: effectOffset,
  });

  animation.start();
};

/**
 * SVG + Canvas animation class.
 */
class SvgCanvasAnimation {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  effectDisplacement: SVGFEDisplacementMapElement;
  effectOffset: SVGFEOffsetElement;
  centerX: number;
  centerY: number;
  offsetFactor: number = 0;
  rotation: number = 0; // Radians
  frame: number = 0;

  /**
   * Constructor sets canvas and filter effect elements
   * with initial values for starting the animation.
   */
  constructor({ canvasElement, effectDisplacementElement, effectOffsetElement }) {
    this.canvas = canvasElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.effectDisplacement = effectDisplacementElement as SVGFEDisplacementMapElement;
    this.effectOffset = effectOffsetElement as SVGFEOffsetElement;

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  /**
   * Public API –
   * Bind mouse event and start animation.
   */
  start() {
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.loop();
  }

  /**
   * Frame-by-frame render process.
   *
   * 1) Optional feature demonstrated – Artificial delay for better visibility:
   *    To render every N-th frame only; change expression 'i % 1' to higher numbers.
   *
   * @private
   */
  loop() {
    const frame = this.frame;
    const renderFrame = frame === 0 || frame % 1 === 0; // *1

    if (renderFrame) {
      this.update();
      this.reset();
      this.draw();
    }

    window.requestAnimationFrame(this.loop.bind(this));
    this.frame++;
  }

  /**
   * Update effect values.
   *
   * @private
   */
  update() {
    const effectDisplacement = this.effectDisplacement;
    const effectOffset = this.effectOffset;

    const rnd: string = Math.random().toString();
    let scale: string = effectDisplacement.getAttribute('scale') + '';

    // Effect size:
    // - Define minimum size (arbitrary number, what looks good)
    // - Add random values for distortion and 'vibration' effect
    scale = (16 + Math.sin(+scale) * this.offsetFactor).toString();

    // Rotation movement
    this.rotation += 0.05;

    effectOffset.setAttribute('dx', rnd);
    effectOffset.setAttribute('dy', rnd);
    effectDisplacement.setAttribute('scale', scale);
  }

  /**
   * Draw rectangle at screen center.
   *
   * @todo Simplify complicated math.
   * @private
   */
  draw() {
    const ctx = this.ctx;

    // colorFactor = Transition curve to smoothen colors
    // color = toFixed() removes exponents; bring all into 0-255 range
    // colorApplied = Clamp to desired luminance/saturation
    const colorFactor = Math.abs(Math.cos(this.rotation * 0.5));
    const color = Math.abs(Math.sin(Math.PI / this.rotation).toFixed(8) * 255);
    let colorApplied = Math.min(Math.max(Math.abs(255 * colorFactor - color), 255/2), 255);

    ctx.save();

    // offsetFactor just to make the other effect more visible
    ctx.lineWidth = 24 + this.offsetFactor;
    ctx.strokeStyle = `rgba(${colorApplied}, ${colorApplied * 0.65}, 0, 1)`;

    ctx.translate(this.centerX, this.centerY);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.rect(-100, -100, 200, 200);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Reset screen by partly transparent filling for a fading effect.
   *
   * @private
   */
  reset() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Moving mouse away from center (on X) increases shake effect factor; boundaries will become close to 0.
   * Values are ok for this screen size. Bad math ;)
   *
   * - scaleFactor: Determines max. possible effect result.
   * - offset: Left or right from center (must be positive in all cases).
   *   - Higher offset will cancel out with scale factor and become close to 0.
   *
   * @todo Invert unintuitive effect behaviour by moving the effect to the center, not outside.
   * @private
   */
  onMouseMove(event: MouseEvent) {
    const centerX = this.centerX;

    const scaleFactor = centerX / 100;
    const offset = 8 * (event.offsetX - centerX) / 100;

    this.offsetFactor = Math.abs(Math.abs(offset) - scaleFactor);
  }
}
