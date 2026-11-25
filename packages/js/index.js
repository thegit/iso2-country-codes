// iso2 - ISO 3166 country and subdivision codes, bundled offline.
// Data: https://iso2.com (from Wikidata, CC0). Code: MIT.
import data from "./data.js";

const byA2 = new Map();
const byA3 = new Map();
const byNum = new Map();
for (const c of data.countries) {
  byA2.set(c.a2, c);
  if (c.a3) byA3.set(c.a3, c);
  if (c.num) byNum.set(c.num, c);
}
const subsByCountry = new Map();
const subsByCode = new Map();
for (const s of data.subdivisions) {
  if (!subsByCountry.has(s.country)) subsByCountry.set(s.country, []);
  subsByCountry.get(s.country).push(s);
  subsByCode.set(s.code, s);
}

/** Date the bundled data was last refreshed (YYYY-MM-DD). */
export const updated = data.updated;

/** All countries, sorted by name. */
export const countries = data.countries;

/**
 * Find a country by alpha-2 ("GB"), alpha-3 ("GBR") or numeric ("826" or 826).
 * Case-insensitive. Returns undefined if not found.
 */
export function lookup(code) {
  if (code === undefined || code === null) return undefined;
  const k = String(code).trim().toUpperCase();
  if (/^\d{1,3}$/.test(k)) return byNum.get(k.padStart(3, "0"));
  if (k.length === 2) return byA2.get(k);
  if (k.length === 3) return byA3.get(k);
  return undefined;
}

export const toAlpha2 = (code) => lookup(code)?.a2;
export const toAlpha3 = (code) => lookup(code)?.a3;
export const toNumeric = (code) => lookup(code)?.num;
export const nameOf = (code) => lookup(code)?.name;

/** ISO 3166-2 subdivisions for a country (any code form), sorted by code. */
export function subdivisions(country) {
  const c = lookup(country);
  return c ? subsByCountry.get(c.a2) ?? [] : [];
}

/** Find one subdivision by its ISO 3166-2 code, e.g. "GB-SOM". */
export function subdivision(code) {
  return subsByCode.get(String(code).trim().toUpperCase());
}

/** Fetch the very latest record for a country from the iso2.com API. */
export async function fetchLatest(code) {
  const c = lookup(code);
  if (!c) return undefined;
  const res = await fetch(`https://iso2.com/api/v1/countries/${c.a2}.json`);
  if (!res.ok) throw new Error(`iso2.com returned ${res.status}`);
  return res.json();
}

export default { updated, countries, lookup, toAlpha2, toAlpha3, toNumeric,
  nameOf, subdivisions, subdivision, fetchLatest };
