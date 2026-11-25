# iso2-country-codes

ISO 3166 country codes — alpha-2, alpha-3 and numeric — plus ISO 3166-2 subdivision codes, bundled for offline use. No dependencies. Data refreshed weekly from [iso2.com](https://iso2.com).

```sh
npm install iso2-country-codes
```

```js
import { lookup, toAlpha3, subdivisions } from "iso2-country-codes";

lookup("GB").name;          // "United Kingdom"
lookup("gbr").a2;           // "GB"
lookup(826).a2;             // "GB"
toAlpha3("DE");             // "DEU"
subdivisions("US").length;  // 57
```

Each country has `a2`, `a3`, `num`, `name`, `capital`, `dial`, `tld`, `currencies` and a Wikidata ID. Need the very latest? `await fetchLatest("JP")` calls the free [iso2.com API](https://iso2.com/downloads/).

Data: Wikidata via iso2.com, CC0 public domain. Code: MIT. iso2.com is independent and not affiliated with ISO.
