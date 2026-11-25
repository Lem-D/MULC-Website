// Checks every link and image in the built site (dist/) after `npm run build`.
//
//   npm run check:links             internal links only (fails if any are broken)
//   npm run check:links -- --external   also tries each outside link (reports only, never fails)
//
// Internal links are the ones under the site's base path, e.g. /MULC-Website/faq/#documents.
// They must point at a page or file that exists, and a #anchor must match an id on that page.
// No extra packages needed.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const checkExternal = process.argv.includes('--external');

// Read `base` from astro.config.mjs, so the checker follows the config if the site moves.
const config = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
const base = (config.match(/^\s*base:\s*['"]([^'"]*)['"]/m)?.[1] ?? '/').replace(/\/?$/, '/');
const site = config.match(/^\s*site:\s*['"]([^'"]*)['"]/m)?.[1]?.replace(/\/$/, '') ?? '';

if (!existsSync(dist)) {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));

// Page path in the browser for a built file, e.g. dist/faq/index.html -> /MULC-Website/faq/
const pagePath = (file) => base + relative(dist, file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '$1');

// Map a browser path to the built file it would serve, or null if none exists.
function fileFor(path) {
  if (!path.startsWith(base)) return null;
  let rel = decodeURIComponent(path.slice(base.length));
  const candidates = rel === '' || rel.endsWith('/') ? [join(rel, 'index.html')] : [rel, join(rel, 'index.html'), rel + '.html'];
  for (const c of candidates) {
    const p = join(dist, c);
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}

const idsCache = new Map();
const idsIn = (file) => {
  if (!idsCache.has(file)) {
    const ids = new Set([...readFileSync(file, 'utf8').matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1]));
    idsCache.set(file, ids);
  }
  return idsCache.get(file);
};

const broken = [];
const external = new Map(); // url -> pages that use it

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
    // Ignore the JSON data blocks the popups read from.
    .replace(/<script type="application\/json"[\s\S]*?<\/script>/g, '')
    // Font preconnect hints aren't links anyone visits.
    .replace(/<link rel="preconnect"[^>]*>/g, '');
  const from = pagePath(file);
  const refs = [...html.matchAll(/\s(?:href|src|poster)=["']([^"']*)["']/g)].map((m) => m[1]);
  for (const ref of new Set(refs)) {
    if (ref === '' ) { broken.push([from, '(empty link)']); continue; }
    if (/^(mailto:|tel:|data:|javascript:)/i.test(ref)) continue;
    // Full links back to this site (e.g. the canonical link) are checked like internal ones.
    if (site && ref.startsWith(site + base)) {
      if (!fileFor(new URL(ref).pathname)) broken.push([from, ref]);
      continue;
    }
    if (/^https?:\/\//i.test(ref)) {
      if (!external.has(ref)) external.set(ref, new Set());
      external.get(ref).add(from);
      continue;
    }
    const url = new URL(ref.replace(/&amp;/g, '&'), 'http://site' + from);
    const target = url.pathname === from && url.hash ? file : fileFor(url.pathname);
    if (!target) { broken.push([from, ref]); continue; }
    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (id && id !== 'top' && !idsIn(target).has(id)) broken.push([from, `${ref} (no element with id="${id}")`]);
    }
  }
}

console.log(`Checked ${htmlFiles.length} pages under ${base}`);
if (broken.length) {
  console.error(`\n${broken.length} broken internal link(s):`);
  for (const [from, ref] of broken) console.error(`  on ${from}  ->  ${ref}`);
} else {
  console.log('All internal links and images point at something that exists.');
}

if (checkExternal) {
  // Sites like Instagram, LinkedIn and Facebook often refuse automated checks (status 999, 403 or 429),
  // so outside links are reported for a person to look at and never fail the run.
  console.log(`\nChecking ${external.size} outside link(s)...`);
  const results = await Promise.all(
    [...external.keys()].map(async (link) => {
      try {
        const res = await fetch(link, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Mozilla/5.0 (link check)' } });
        return [link, res.status];
      } catch (e) {
        return [link, e.name === 'TimeoutError' ? 'timed out' : 'could not connect'];
      }
    })
  );
  for (const [link, status] of results) {
    const ok = typeof status === 'number' && status < 400;
    console.log(`  ${ok ? 'ok  ' : 'look'} ${status}  ${link}`);
  }
}

process.exit(broken.length ? 1 : 0);
