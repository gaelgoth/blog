import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import pagefind from "lume/plugins/pagefind.ts";
import feed from "lume/plugins/feed.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import filterPages from "lume/plugins/filter_pages.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import icons from "lume/plugins/icons.ts";
import date from "lume/plugins/date.ts";
import checkUrls from "lume/plugins/check_urls.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
  location: new URL("https://gaelgoth.github.io/blog"),
});

// --- URL & page filtering ---
site.use(slugifyUrls());
site.use(filterPages({
  fn: (page) => page.data.draft !== true,
}));
site.use(date());

// --- Styling ---
site.add([".css"]);
site.use(tailwindcss());

// --- Content enrichment ---
site.use(codeHighlight());
site.use(metas());
site.use(icons());

// --- Assets & SEO ---
site.use(favicon({
  input: "/assets/favicon.svg",
}));

// --- Search ---
site.use(pagefind({
  indexing: {
    verbose: false,
  },
  ui: {
    containerId: "search",
    showImages: false,
    resetStyles: true,
  },
}));

// --- RSS / JSON feeds ---
site.use(feed({
  output: ["/feed.xml", "/feed.json"],
  query: "type=post",
  sort: "date=desc",
  limit: 20,
  info: {
    title: "=site.title",
    description: "=site.description",
    authorName: "Gaël",
    generator: true,
  },
  items: {
    title: "=title",
    description: "=summary",
    published: "=date",
    content: "=children",
  },
}));

// --- Reading time preprocessor ---
site.preprocess([".md"], (pages) => {
  for (const page of pages) {
    const content = String(page.data.content ?? "");
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    page.data.readingTime = Math.max(1, Math.round(words / 200));
  }
});

// --- Terminal chrome wrapper for code blocks ---
site.process([".html"], (pages) => {
  for (const page of pages) {
    const document = page.document;
    if (!document) continue;

    for (const pre of Array.from(document.querySelectorAll("pre"))) {
      const code = pre.querySelector("code");
      if (!code) continue; // skip non-code <pre> (e.g. ASCII art on 404)

      // Extract language from "language-xxx" class added by code_highlight
      const langMatch = code.className.match(/language-(\S+)/);
      const lang = langMatch ? langMatch[1] : "";

      // Build wrapper
      const wrapper = document.createElement("div");
      wrapper.setAttribute("class", "code-block");

      // Build header with traffic-light dots + optional language label
      const header = document.createElement("div");
      header.setAttribute("class", "code-header");
      header.innerHTML =
        `<span class="code-dot code-dot-red" aria-hidden="true"></span>` +
        `<span class="code-dot code-dot-yellow" aria-hidden="true"></span>` +
        `<span class="code-dot code-dot-green" aria-hidden="true"></span>` +
        (lang ? `<span class="code-lang">${lang}</span>` : "");

      // Rewrap: insert wrapper before pre, pull pre inside
      pre.parentNode!.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    }
  }
});

// --- CI only: broken link detection ---
if (Deno.env.get("CI")) {
  site.use(checkUrls({
    external: false,
  }));
}

// --- Static assets ---
site.add("/assets");
site.add("/js");
site.add([".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"]);

export default site;
