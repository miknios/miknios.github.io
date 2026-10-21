# miknios.com

My portfolio site, built with [Eleventy](https://www.11ty.dev/). Every push to `master` is built and published to
GitHub Pages automatically (see `.github/workflows/deploy.yml`).

## Adding a project

Create a Markdown file in `src/works/` (professional work) or `src/side-projects/`, then commit and push.

```markdown
---
title: Uragun
role: Lead Programmer        # works only, shown as "Lead Programmer · Kool2Play · 2020 – 2023"
company: Kool2Play           # works only
subtitle: Prototype          # side projects only, optional
years: 2020 – 2023           # optional, e.g. "2022" or "2024 – now"
order: 20                    # position on the page, lowest first
color: "#304265"             # works only, background colour of the section (dark enough for white text, see below)
video: /video/uragun.mp4     # either a video + poster image...
poster: /img/uragun.jpg
image: /img/legendary.png    # ...or just an image
alt: Screenshots from Legendary # what the image or video shows, read out by screen readers
links:                       # optional buttons under the text
  - label: Uragun on steam
    url: https://store.steampowered.com/app/724000/Uragun/
---
Text about the project. Leave an empty line between paragraphs.

**bold**, [a link](https://example.com), `code`
```

Put images in `src/img/` and videos in `src/video/`. Orders go up in steps of 10, so a new project can be placed
between two others (e.g. `order: 15`) without renumbering the rest.

Each project can be linked to directly by its file name, e.g. https://miknios.com/#uragun for `uragun.md`.

### Images, videos and colours

- **Images** (PNG, JPG or WebP) are resized and converted to WebP automatically when the site is built
  (`src/_data/images.js`), so they can be added at full size.
- **Videos** are not converted, so shrink them before adding them. They play without sound, so the audio can be
  dropped. With [ffmpeg](https://ffmpeg.org/):

  ```bash
  ffmpeg -i input.mp4 -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart output.mp4
  ```

  Use a poster image with the same proportions as the video, so the page doesn't jump when the video loads.
- **Colours**: white text needs enough contrast against a section's colour to be easy to read. Check new colours
  with a [contrast checker](https://webaim.org/resources/contrastchecker/) (white text, aim for at least 5:1).

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
- `src/404.njk` – the "page not found" page
- `src/_data/site.json` – the site address, title, the description shown in search results and link previews, and
  the year your career started (for "N years of commercial experience" on the info page)
- `src/_data/contact.json` – GitHub, LinkedIn, email and CV links (shown on the info page and in the footer, empty ones are hidden)
- `src/_includes/` – the other building blocks of the page
- `src/styles.css` – all styling
- `src/js/script.js` – switching between the pages and loading videos
