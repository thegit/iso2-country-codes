# iso2

ISO 3166 country codes — alpha-2, alpha-3 and numeric — plus ISO 3166-2 subdivision codes, bundled for offline use. No dependencies. Data refreshed weekly from [iso2.com](https://iso2.com).

```sh
pip install iso2
```

```python
import iso2

iso2.lookup("GB")["name"]     # 'United Kingdom'
iso2.lookup("gbr")["a2"]      # 'GB'
iso2.lookup(826)["a2"]        # 'GB'
iso2.to_alpha3("DE")          # 'DEU'
len(iso2.subdivisions("US"))  # 57
```

Each country has `a2`, `a3`, `num`, `name`, `capital`, `dial`, `tld`, `currencies` and a Wikidata ID. Need the very latest? `iso2.fetch_latest("JP")` calls the free [iso2.com API](https://iso2.com/downloads/).

Data: Wikidata via iso2.com, CC0 public domain. Code: MIT. iso2.com is independent and not affiliated with ISO.
