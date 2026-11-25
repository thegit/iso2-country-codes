# ISO 3166 country codes — open data

All ISO 3166-1 country codes (**alpha-2**, **alpha-3**, **numeric**) with names, capitals, dialling codes, internet domains and ISO 4217 currencies, plus every **ISO 3166-2** subdivision code — as CSV and JSON, public domain, updated automatically every week.

Browse and search: **[iso2.com](https://iso2.com)** · Free JSON API: **[iso2.com/downloads](https://iso2.com/downloads/)**

| File | Contents |
|---|---|
| [`data/countries.csv`](data/countries.csv) | alpha2, alpha3, numeric, name, capital, dialling codes, TLDs, currencies, Wikidata ID |
| [`data/countries.json`](data/countries.json) | the same, as JSON |
| [`data/subdivisions.csv`](data/subdivisions.csv) | ISO 3166-2 code, country, name, Wikidata ID |
| [`data/subdivisions.json`](data/subdivisions.json) | the same, as JSON |

## Packages

Offline lookups with the data bundled, no dependencies:

```sh
npm install iso2-country-codes   # JavaScript / TypeScript
pip install iso2-country-codes   # Python
```

```js
import { lookup } from "iso2-country-codes";
lookup("GBR").a2;   // "GB"
```

```python
import iso2   # pip package: iso2-country-codes
iso2.to_alpha3("FR")   # 'FRA'
```

## Or use the API directly

```sh
curl https://iso2.com/api/v1/countries/JP.json
```

More examples (Python, JavaScript, PHP, Rust, Google Sheets, PostgreSQL): [iso2.com/about](https://iso2.com/about/).

## How it stays current

[iso2.com](https://iso2.com) rebuilds weekly from [Wikidata](https://www.wikidata.org/), checks every refresh against the previous one, and logs any changes at [iso2.com/changes](https://iso2.com/changes/). A scheduled GitHub Action copies the result here.

## Licence

- **Data** (`data/`, bundled data in packages): [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain, no attribution required.
- **Code**: MIT.

iso2.com is an independent reference and is not affiliated with the International Organization for Standardization (ISO).
