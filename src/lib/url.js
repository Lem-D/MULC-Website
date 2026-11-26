// Link helpers. Use these for every internal link and every image/PDF path, never a
// hard-coded "/about/", so the site works at any base path (see astro.config.mjs).
//
//   url('about/')                   -> "/MULC-Website/about/"
//   asset('images/execs/maria.jpg') -> "/MULC-Website/images/execs/maria.jpg"  (file in public/)

// Builds a link that works both locally and on GitHub Pages, where the
// site lives under a sub-path (see `base` in astro.config.mjs).
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

// Images in src/content/*.json are paths inside public/, e.g. "images/execs/maria.jpg".
export function asset(path) {
  return path ? url(path) : '';
}
