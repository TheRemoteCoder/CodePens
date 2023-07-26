/*

This demo showcases different variants of creating hexagons with image backgrounds.

Depending on your needs or the system you use, you might find one or few of them practical to use.

This example is based on a client project, where the software did not allow using WebP format. As transparent PNGs are too large, we had to use JPG instead. This led to the need to hide borders, and all those fancy workarounds you see here :)

---

// Image formats
This example uses JPG, which is not the best format here. Use WebP or PNG images with or without transparency.

Please note that WebP might not work everywhere (yet) and need a fallback.

---

// clip-path rounding
1. clip-path might give tiny rounding issues in some cases. If using images with a background, it might shine through in some occasions and scales, showing a pixel wide streak around some corners.

Assuming you use a non-transparent image, here are thoughts on workarounds:

A) Edit the image to be in hexagonal shape as well and fill the background to match the body (less flexible, though it saves space compared to keeping all image data). If clipping the image to be in hexagonal shape, make sure it's a few pixels larger around all sides than it needs to be.

B) Modify the polygon() to take care of cutting off the edges. I don't recommend this approach though, as it distorts the shape. If you needed perfect alignment, it could become visible.

// clip-path vs. Bounding box
2. Use of clip-path does not change the bounding-box of elements. If you need a border around the elements, it would be cut off. Here it's probably best to go with an SVG approach.

---

// Generators

CSS clip-path
- https://bennettfeely.com/clippy

SVG hexagons
- https://codepen.io/wvr/pen/WrNgJp

*/