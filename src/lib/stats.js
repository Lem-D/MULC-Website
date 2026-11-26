// Stats helpers, used by the Home and Partner with us pages.
// All club numbers live in src/content/stats.json, so each one is typed once.
import stats from '../content/stats.json';

// The stats row for a page ("home" or "partners"), as [{ value, label }].
export const statsFor = (page) => (stats[page] || []).map((key) => stats.numbers[key]).filter(Boolean);

// Swap {members}, {partners}, ... in a piece of text for the current number.
export const fillStats = (text) => text.replace(/\{(\w+)\}/g, (m, key) => stats.numbers[key]?.value ?? m);
