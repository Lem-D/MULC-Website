// Builds /sitemap.xml from the pages in this folder, so a new page is listed automatically.
// The 404 page and these generated files are left out.
const pages = Object.keys(import.meta.glob('./*.astro'))
  .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, ''))
  .filter((name) => name !== '404')
  .map((name) => (name === 'index' ? '' : `${name}/`))
  .sort();

export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const urls = pages
    .map((path) => `  <url><loc>${new URL(base + path, site).href}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
