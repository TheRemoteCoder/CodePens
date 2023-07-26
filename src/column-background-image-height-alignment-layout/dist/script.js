/*

Align columns to a scaling background image sizing


How to use:

Resize the screen and see how the lower text column flows and stays below the top part, without overlapping the image.

In the smallest viewport, the column text exceeds image height, further pushing down the lower column. This is considered intentional for this demo. (We could also hide the text; just use less of it; or find some other fancy way to match the image to the text size dynamically.)

---

Challenges solved:
- A background image that scales with viewport size and used as additional column (or rather, reserved space).
- Content must never overlap the image.
- Content must be placed next to and below the column, while keeping a consistent distance to each other.
- Breakpoints cannot be used, as content size is unpredictable due to word wrapping differences depending on content, languages and browser abilities. Assume content can change anytime, so hard-coding or estimating lines of text is not an option.

Solution:
- Start with the image size: Calculate its aspect ratio.
- Use aspect-ratio and viewport width unit to define any other sizes.

---

Additionally:

Added a few typographic styles for a minimalist magazine style look, to give this demo a real world purpose.

*/