# Blog

Personal blog built with [Lume](https://lume.land/) (a Deno static site generator) and Tailwind CSS.

## Prerequisites

Install [Deno](https://docs.deno.com/runtime/getting_started/installation/) (v2+):

```sh
curl -fsSL https://deno.land/install.sh | sh
```

## Local development

Start the dev server with live reload on port 3000:

```sh
deno task serve
```

The site will be available at http://localhost:3000.

## Build

Generate the static site into `_site/`:

```sh
deno task build
```

## Other tasks

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `deno task serve` | Dev server with live reload       |
| `deno task build` | Production build to `_site/`      |
| `deno task fmt`   | Format source files               |
| `deno task check` | Format check + lint               |

## Project structure

```
src/
  posts/      # Blog posts (Markdown)
  _includes/  # Layout templates (Vento)
  assets/     # Static assets (images, fonts, favicon)
  styles/     # CSS / Tailwind styles
  js/         # Client-side scripts
_config.ts    # Lume configuration
deno.json     # Deno tasks and import map
```
