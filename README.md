# MULC-Website

The official website for the MacEwan University Law Club (MULC): learn about the club, meet the execs, see upcoming events and photos, find out how to join, and get in touch.

Built with [Astro](https://astro.build) and hosted on GitHub Pages. See `design.md` for the full design spec.

## Run it locally

You need [Node.js](https://nodejs.org) 22.12 or newer.

```sh
npm install      # once
npm run dev      # live preview at http://localhost:4321/MULC-Website/
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run check    # build, then check every link and image inside the site
```

## Where things live

| Path | What it is |
|---|---|
| `src/content/*.json` | All the text: events, execs, FAQ, sponsors, partners, join steps, club documents, albums, club info. **Edit these to update the site.** |
| `public/docs/` | The constitution PDFs (and the sponsorship package once it exists) |
| `public/images/` | Logo, headshots, event posters and album photos |
| `public/favicon.ico`, `public/icons/` | Browser tab and home-screen icons, made from the club logo |
| `scripts/check-links.mjs` | The link checker used by `npm run check` and GitHub Actions |
| `src/pages/` | The pages: Home (`index.astro`), About Us, Partner with us, Join, FAQ, the 404 page, plus `sitemap.xml`, `robots.txt` and `site.webmanifest`, which are generated from code |
| `src/components/` | Header, footer and shared pieces |
| `src/styles/global.css` | Colours, fonts and layout (brand colours are at the top) |
| `src/scripts/site.js` | Mobile menu, events carousel, popups and the partner inquiry form |
| `prototype/` | The original clickable prototype, kept for reference |

Execs updating events, partners or the FAQ: start with **`EDITING-GUIDE.md`**, a plain-language walkthrough for editing on github.com. `CONTRIBUTING.md` documents every content field.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site, checks its internal links, and publishes it to `https://lem-d.github.io/MULC-Website/`. If the build or the link check fails, nothing is published and the live site keeps its last good version.

Pull requests and pushes to other branches run `.github/workflows/check.yml` (build plus link check, and a report-only check of outside links).

One-time setup on GitHub: **Settings > Pages > Build and deployment > Source: GitHub Actions**.

To use a custom domain later, set `site` in `astro.config.mjs` to the domain, remove `base`, and add the domain under Settings > Pages.
