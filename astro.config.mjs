// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo at https://<user>.github.io/<repo>/.
// If you move to a custom domain (e.g. mulc.ca), set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://lem-d.github.io',
  base: '/MULC-Website',
});
