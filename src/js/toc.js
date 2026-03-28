(function () {
  "use strict";

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-");
  }

  function init() {
    const nav = document.getElementById("toc-nav");
    if (!nav) return;

    const prose = document.querySelector(".prose");
    if (!prose) return;

    const headings = Array.from(prose.querySelectorAll("h2, h3"));
    if (headings.length < 2) {
      document.getElementById("toc-aside")?.remove();
      return;
    }

    // Assign IDs to headings that don't have one
    const seen = {};
    headings.forEach((h) => {
      if (!h.id) {
        const slug = slugify(h.textContent);
        seen[slug] = (seen[slug] || 0) + 1;
        h.id = seen[slug] > 1 ? slug + "-" + seen[slug] : slug;
      }
    });

    // Build nav label
    const label = document.createElement("p");
    label.className = "toc-label";
    label.textContent = "On this page";
    nav.appendChild(label);

    // Build link list
    const ul = document.createElement("ul");
    ul.className = "toc-list";

    headings.forEach((h) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      a.className = "toc-link" + (h.tagName === "H3" ? " toc-link--sub" : "");
      a.dataset.id = h.id;
      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);

    // Stagger entrance — slide links in from the left
    const links = Array.from(nav.querySelectorAll(".toc-link"));
    if (!globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      links.forEach((a, i) => {
        a.style.opacity = "0";
        a.style.transform = "translateX(-4px)";
        a.style.transition = `opacity 150ms ease ${
          i * 25
        }ms, transform 150ms ease ${i * 25}ms`;
      });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          links.forEach((a) => {
            a.style.opacity = "";
            a.style.transform = "";
          });
        })
      );
    }

    // Active section tracking via scroll position

    function updateActive() {
      const y = globalThis.scrollY + 100; // offset for floating header
      let active = headings[0];
      for (const h of headings) {
        if (h.offsetTop <= y) active = h;
      }
      links.forEach((a) =>
        a.classList.toggle("toc-link--active", a.dataset.id === active.id)
      );
    }

    globalThis.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
