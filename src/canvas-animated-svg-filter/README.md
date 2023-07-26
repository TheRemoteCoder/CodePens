# Canvas + Animated SVG filter

A Pen created on CodePen.io. Original URL: [https://codepen.io/TheRemoteCoder/pen/YzqjEqd](https://codepen.io/TheRemoteCoder/pen/YzqjEqd).

Combine Canvas animation with animated SVG filters. The filter is applied via CSS and animated in JS depending on mouse move within the screen.

Note that the border (CSS) is animated as well, as the SVG filter affects the whole element and its styles. If that is not desired, a wrapper or clipping mask could be used to cut off the element cleanly.

This might be a powerful and performant way to add complex effects in 2D game development and benefit from GPU performance in an otherwise mostly CPU controlled environment.