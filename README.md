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
```

## Where things live

| Path | What it is |
|---|---|
| `src/content/*.json` | All the text: events, execs, FAQ, sponsors, albums, club info. **Edit these to update the site.** |
| `public/images/` | Logo, headshots, event posters and album photos |
| `src/pages/` | The three pages: Home (`index.astro`), About Us, FAQ |
| `src/components/` | Header, footer and shared pieces |
| `src/styles/global.css` | Colours, fonts and layout (brand colours are at the top) |
| `src/scripts/site.js` | Mobile menu, events carousel and popups |
| `prototype/` | The original clickable prototype, kept for reference |

See `CONTRIBUTING.md` for step-by-step content updates.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to `https://lem-d.github.io/MULC-Website/`.

One-time setup on GitHub: **Settings > Pages > Build and deployment > Source: GitHub Actions**.

To use a custom domain later, set `site` in `astro.config.mjs` to the domain, remove `base`, and add the domain under Settings > Pages.
