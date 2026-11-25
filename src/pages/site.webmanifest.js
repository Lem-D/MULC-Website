// The web app manifest: the name and icon used when someone adds the site to their phone's home screen.
import site from '../content/site.json';

export function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const manifest = {
    name: site.name,
    short_name: site.shortName,
    start_url: base,
    scope: base,
    display: 'browser',
    background_color: '#1A1214',
    theme_color: '#1A1214',
    icons: [
      { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), { headers: { 'Content-Type': 'application/manifest+json' } });
}
