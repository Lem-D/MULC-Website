// Builds /robots.txt with the full address of the sitemap.
// Note: search engines only read robots.txt at the root of a domain. While the site lives at
// lem-d.github.io/MULC-Website/ this file is a harmless extra; it starts working once the site
// moves to its own domain (see astro.config.mjs). The sitemap is also linked from every page.
export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL(base + 'sitemap.xml', site).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
