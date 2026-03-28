/**
 * <github-card user="gaelgoth" repo="repo-name">
 *
 * Extensible card component. Fetches GitHub API and renders a styled card.
 * No Shadow DOM — Tailwind classes from main stylesheet apply directly.
 */
class GitHubCard extends HTMLElement {
  connectedCallback() {
    const user = this.getAttribute("user");
    const repo = this.getAttribute("repo");

    if (!user || !repo) return;

    // Loading skeleton — two-column layout matching the rendered card
    this.innerHTML = `
      <div class="github-card-loading my-6 rounded-xl border border-stone-200
                  dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-4">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex-1">
            <div class="h-4 w-40 rounded bg-stone-200 dark:bg-stone-700 mb-2"></div>
            <div class="h-3 w-3/4 rounded bg-stone-200 dark:bg-stone-700 mb-1.5"></div>
            <div class="h-3 w-1/2 rounded bg-stone-200 dark:bg-stone-700"></div>
          </div>
          <div class="w-12 h-12 rounded-lg bg-stone-200 dark:bg-stone-700 flex-shrink-0"></div>
        </div>
        <div class="flex gap-4 border-t border-stone-100 dark:border-stone-800 pt-3">
          <div class="h-3 w-10 rounded bg-stone-200 dark:bg-stone-700"></div>
          <div class="h-3 w-16 rounded bg-stone-200 dark:bg-stone-700"></div>
        </div>
      </div>
    `;

    fetch(`https://api.github.com/repos/${user}/${repo}`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((data) => {
        this._fadeIn(this._buildCard(user, data));
      })
      .catch(() => {
        this._fadeIn(this._buildFallback(user, repo));
      });
  }

  _fadeIn(el) {
    el.style.opacity = "0";
    el.style.transition = "opacity 150ms ease";
    this.innerHTML = "";
    this.appendChild(el);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.opacity = "";
      })
    );
  }

  _buildCard(user, data) {
    const homepageHtml = data.homepage
      ? `<p class="text-xs text-stone-400 dark:text-stone-500 not-prose truncate mt-1.5">
           <svg xmlns="http://www.w3.org/2000/svg" class="inline w-3 h-3 mr-0.5 -mt-px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
           ${escapeHtml(data.homepage)}
         </p>`
      : "";

    const starSvg =
      `<svg aria-hidden="true" viewBox="0 0 16 16" class="w-3.5 h-3.5 fill-current flex-shrink-0">
      <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
    </svg>`;

    const licenseSvg =
      `<svg aria-hidden="true" viewBox="0 0 16 16" class="w-3.5 h-3.5 fill-current flex-shrink-0">
      <path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"/>
    </svg>`;

    const languageHtml = data.language
      ? `<span class="flex items-center gap-1">
           <span class="w-2.5 h-2.5 rounded-full bg-stone-400 dark:bg-stone-500 flex-shrink-0"></span>
           ${escapeHtml(data.language)}
         </span>`
      : "";

    const licenseHtml =
      data.license?.spdx_id && data.license.spdx_id !== "NOASSERTION"
        ? `<span class="flex items-center gap-1">
             ${licenseSvg}
             ${escapeHtml(data.license.spdx_id)}
           </span>`
        : "";

    const tmp = document.createElement("div");
    tmp.innerHTML = `
      <a
        href="${escapeAttr(data.html_url)}"
        target="_blank"
        rel="noopener noreferrer"
        class="my-6 flex flex-col gap-0 rounded-xl border border-stone-200
               dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-4
               hover:border-stone-400 dark:hover:border-stone-500
               hover:bg-stone-100 dark:hover:bg-stone-800/60
               transition-colors no-underline block not-prose"
        aria-label="${escapeAttr(data.full_name)} on GitHub"
      >
        <!-- Top row: info left, avatar right -->
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 mb-1.5">
              <img
                src="https://github.com/${escapeAttr(user)}.png?size=48"
                alt="${escapeAttr(user)}"
                class="w-4 h-4 rounded-full flex-shrink-0"
                loading="lazy"
              />
              <span class="font-mono text-sm text-stone-500 dark:text-stone-400">
                ${escapeHtml(user)} /
              </span>
              <span class="font-mono text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
                ${escapeHtml(data.name)}
              </span>
            </div>

            ${
      data.description
        ? `<p class="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">${
          escapeHtml(data.description)
        }</p>`
        : ""
    }
            ${homepageHtml}
          </div>

          <img
            src="https://github.com/${escapeAttr(user)}.png?size=96"
            alt="${escapeAttr(user)}"
            class="w-12 h-12 rounded-lg flex-shrink-0"
            loading="lazy"
          />
        </div>

        <!-- Stats bar -->
        <div class="flex items-center flex-wrap gap-x-4 gap-y-1
                    text-xs text-stone-400 dark:text-stone-500
                    border-t border-stone-100 dark:border-stone-800 pt-3 mt-3">
          <span class="flex items-center gap-1">
            ${starSvg}
            ${data.stargazers_count.toLocaleString()}
          </span>
          ${languageHtml}
          ${licenseHtml}
        </div>
      </a>
    `;
    return tmp.firstElementChild;
  }

  _buildFallback(user, repo) {
    const tmp = document.createElement("div");
    tmp.innerHTML = `
      <a
        href="https://github.com/${escapeAttr(user)}/${escapeAttr(repo)}"
        target="_blank"
        rel="noopener noreferrer"
        class="my-6 flex items-center gap-2 rounded-xl border border-stone-200
               dark:border-stone-700 p-4 text-sm text-stone-500 dark:text-stone-400
               hover:border-stone-400 dark:hover:border-stone-500 transition-colors
               no-underline block not-prose"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span class="font-mono">${escapeHtml(user)}/${escapeHtml(repo)}</span>
        <span class="text-stone-300 dark:text-stone-600 ml-auto">View on GitHub →</span>
      </a>
    `;
    return tmp.firstElementChild;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

customElements.define("github-card", GitHubCard);
