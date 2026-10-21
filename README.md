# miknios.com

My portfolio site, built with [Eleventy](https://www.11ty.dev/). Every push to `master` is built and published to
GitHub Pages automatically (see `.github/workflows/deploy.yml`).

## Adding a project

Create a Markdown file in `src/works/` (professional work) or `src/side-projects/`, then commit and push.

```markdown
---
title: Uragun
role: Lead Programmer        # works only, shown as "as Lead Programmer at Kool2Play"
company: Kool2Play           # works only
subtitle: Prototype          # side projects only, optional
order: 20                    # position on the page, lowest first
color: "#304265"             # works only, background colour of the section
video: /video/uragun.mp4     # either a video + poster image...
poster: /img/uragun.jpg
image: /img/legendary.png    # ...or just an image + its description
alt: Screenshots from Legendary
links:                       # optional buttons under the text
  - label: Uragun on steam
    url: https://store.steampowered.com/app/724000/Uragun/
---
Text about the project. Leave an empty line between paragraphs.

**bold**, [a link](https://example.com), `code`
```

Put images in `src/img/` and videos in `src/video/`. Orders go up in steps of 10, so a new project can be placed
between two others (e.g. `order: 15`) without renumbering the rest.

A bullet list in the text is shown as cards, with sub-bullets as regular bullets inside each card
(see `src/side-projects/ue5-locomotion.md`).

## Previewing locally

Needs [Node.js](https://nodejs.org/) (LTS version).

```bash
npm install
npm start
```

Then open http://localhost:8080. The page reloads automatically when you save a file.

## Where things are

- `src/works/`, `src/side-projects/` – one Markdown file per project
- `src/index.njk` – the main page (side projects intro text, page order)
- `src/_includes/info.njk` – the "info" page
- `src/_includes/` – the other building blocks of the page
- `src/styles.css` – all styling
