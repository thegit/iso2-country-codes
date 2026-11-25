export interface Currency { code: string; name: string }
export interface Country {
  a2: string; a3: string; num: string; name: string; qid: string;
  capital: string; dial: string[]; tld: string[]; currencies: Currency[];
}
export interface Subdivision { code: string; country: string; name: string; qid: string }

export const updated: string;
export const countries: Country[];
export function lookup(code: string | number): Country | undefined;
export function toAlpha2(code: string | number): string | undefined;
export function toAlpha3(code: string | number): string | undefined;
export function toNumeric(code: string | number): string | undefined;
export function nameOf(code: string | number): string | undefined;
export function subdivisions(country: string | number): Subdivision[];
export function subdivision(code: string): Subdivision | undefined;
export function fetchLatest(code: string | number): Promise<(Country & { subdivisions: Subdivision[] }) | undefined>;
declare const _default: {
  updated: typeof updated; countries: typeof countries; lookup: typeof lookup;
  toAlpha2: typeof toAlpha2; toAlpha3: typeof toAlpha3; toNumeric: typeof toNumeric;
  nameOf: typeof nameOf; subdivisions: typeof subdivisions;
  subdivision: typeof subdivision; fetchLatest: typeof fetchLatest;
};
export default _default;
