// @ts-check
// Astro configuration. The site is fully static: `npm run build` writes plain HTML, CSS and JS
// into dist/, which is what gets published. There are no integrations or server code.
//
// `site` is the public address (used for canonical links, link previews and the sitemap).
// `base` is the sub-path the site lives under. Every internal link goes through url() in
// src/lib/url.js and scripts/check-links.mjs reads `base` from here, so changing these two
// lines is all a move to a new host or domain needs on the code side.
import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo at https://<user>.github.io/<repo>/.
// If you move to a custom domain (e.g. mulc.ca), set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://lem-d.github.io',
  base: '/MULC-Website',
});
