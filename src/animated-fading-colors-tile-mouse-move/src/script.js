/**
 * @todo Refactor: Avoid global vars in functions
 */
;(() => {
  ;('use strict')

  const cssVar = '--cc-color-deg'
  const $fxContainer = document.getElementById('fx')
  const $doc = document.documentElement

  // Performance threshold - Prevents updating CSS too fast
  const animationThresholdMs = 50

  // Color offset based on time, in addition to mouse move
  const colorFadeSpeed = 0.25

  // Internal: Previous state
  let lastX = 0
  let lastY = 0

  /**
   * Returns true if interval threshold is passed beyond certain value.
   * In this case, '0.9' is considered sufficient (otherwise arbitrary value).
   *
   * This keeps events rare, while also ensuring effects ever happen:
   * User action is random and doesn't always hit at the perfect moment of time.
   */
  function canAnimate() {
    const threshold = animationThresholdMs

    const currentTime = Date.now() % threshold
    const isInRange = currentTime > threshold * 0.9

    return isInRange
  }

  /**
   * Animate tile color on mouse move.
   * Effect influenced by mouse distance to container center and time passed.
   *
   * @todo Fix: Degrees must be clamped in 0-360 range in smooth way (currently allows negative values).
   * @todo Improve: 'last' calculation can be tricked if users move cursor narrowly without much space. Use vectors instead?
   *   - Test: Move mouse in small circle, color changes faster - This is not intended
   */
  $fxContainer.addEventListener('mousemove', (event) => {
    const colorSpeed = colorFadeSpeed
    const $el = event.currentTarget

    if (!canAnimate()) {
      return
    }

    // Mouse coordinate relative to element
    const rect = $el.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const timeFactor = Math.sin(Date.now()) * colorSpeed
    const radians = Math.atan2(lastX - x, lastY - y)

    let degrees = ~(radians * (180 / Math.PI) * 2) | 0
    degrees = (degrees * timeFactor) | 0

    if (degrees >= 360) {
      degrees = 0
    }

    $doc.style.setProperty(cssVar, degrees)

    // Next run's state
    lastX = x
    lastY = y
  })
})()
