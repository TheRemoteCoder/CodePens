/**
 * Bootstrap accordion JS workaround to restore basic functionality.
 * Useful in environments that don't work with Bootstrap's JS.
 *
 * Limitations
 * - Toggle/ content elements must be directly adjacent siblings.
 * - Alternative animation (opacity instead of height).
 *
 * How to use
 * - HTML 5 solution: Use details/ summary HTML tags with Bootstrap CSS classes.
 * - Custom JS solution: Combine Bootstrap markup with a custom 'js-' class (see code).
 *
 * ---
 *
 * Originally developed for a CMS editor (TinyMCE-like) with Bootstrap 5:
 * - Assuming no extension for accordions is used: HTML markup cannot be inserted
 *   via the admin editor, as required 'data'-attributes will be sanitized and stripped.
 */
;(() => {
  "use strict";

  /**
   * Toggle button (ignore other potential inner elements).
   * Supports nested accordions via 'stopPropagation'.
   */
  const onToggle = (event) => {
    event.stopPropagation();

    const el = event.target;
    const isBtn = el.classList.contains("accordion-button");

    if (!isBtn) {
      return;
    }

    el.classList.toggle("collapsed");
    el.nextElementSibling.classList.toggle("show");
  };

  /**
   * Bind event listeners to accordions.
   *
   * @param {Object} accordions
   */
  const bindEvents = (accordions) => {
    for (const accordion of accordions.values()) {
      accordion.addEventListener("click", onToggle);
    }
  };

  /**
   * DOM ready to bind events.
   */
  window.onload = () => {
    const accordions = document.querySelectorAll(".js-accordion");

    bindEvents(accordions);
  };
})();


/**
 * Implementation suggestion to separate markup representation from functionality.
 * Not realized here, to keep things simple and portable to other code bases.
 * /
const config = {
  eventType: 'click',
  css: {
    accordionContainerClass: '.js-accordion',
    toggleBtn: 'accordion-button',
    toggleBtnActive: 'collapsed',
    bodyActive: 'show',
  },
};
/* */
