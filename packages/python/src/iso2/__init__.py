"""iso2 - ISO 3166 country and subdivision codes, bundled offline.

Data: https://iso2.com (from Wikidata, CC0). Code: MIT.

    >>> import iso2
    >>> iso2.lookup("GB")["name"]
    'United Kingdom'
    >>> iso2.to_alpha3("de")
    'DEU'
"""
from __future__ import annotations

import json
from importlib import resources
from typing import Any, Dict, List, Optional, Union

__all__ = ["updated", "countries", "lookup", "to_alpha2", "to_alpha3",
           "to_numeric", "name_of", "subdivisions", "subdivision", "fetch_latest"]

_data = json.loads(resources.files(__name__).joinpath("data.json").read_text("utf-8"))

#: Date the bundled data was last refreshed (YYYY-MM-DD).
updated: str = _data["updated"]

_COUNTRIES: List[Dict[str, Any]] = _data["countries"]
_BY_A2 = {c["a2"]: c for c in _COUNTRIES}
_BY_A3 = {c["a3"]: c for c in _COUNTRIES if c.get("a3")}
_BY_NUM = {c["num"]: c for c in _COUNTRIES if c.get("num")}
_SUBS: Dict[str, List[Dict[str, Any]]] = {}
_SUB_BY_CODE: Dict[str, Dict[str, Any]] = {}
for _s in _data["subdivisions"]:
    _SUBS.setdefault(_s["country"], []).append(_s)
    _SUB_BY_CODE[_s["code"]] = _s

Code = Union[str, int]


def countries() -> List[Dict[str, Any]]:
    """All countries, sorted by name."""
    return list(_COUNTRIES)


def lookup(code: Code) -> Optional[Dict[str, Any]]:
    """Find a country by alpha-2 ("GB"), alpha-3 ("GBR") or numeric (826/"826")."""
    if code is None:
        return None
    k = str(code).strip().upper()
    if k.isdigit() and len(k) <= 3:
        return _BY_NUM.get(k.zfill(3))
    if len(k) == 2:
        return _BY_A2.get(k)
    if len(k) == 3:
        return _BY_A3.get(k)
    return None


def _field(code: Code, key: str) -> Optional[str]:
    c = lookup(code)
    return c[key] if c else None


def to_alpha2(code: Code) -> Optional[str]:
    return _field(code, "a2")


def to_alpha3(code: Code) -> Optional[str]:
    return _field(code, "a3")


def to_numeric(code: Code) -> Optional[str]:
    return _field(code, "num")


def name_of(code: Code) -> Optional[str]:
    return _field(code, "name")


def subdivisions(country: Code) -> List[Dict[str, Any]]:
    """ISO 3166-2 subdivisions for a country (any code form), sorted by code."""
    c = lookup(country)
    return list(_SUBS.get(c["a2"], [])) if c else []


def subdivision(code: str) -> Optional[Dict[str, Any]]:
    """Find one subdivision by its ISO 3166-2 code, e.g. "GB-SOM"."""
    return _SUB_BY_CODE.get(str(code).strip().upper())


def fetch_latest(code: Code) -> Optional[Dict[str, Any]]:
    """Fetch the very latest record for a country from the iso2.com API."""
    import urllib.request

    c = lookup(code)
    if not c:
        return None
    url = f"https://iso2.com/api/v1/countries/{c['a2']}.json"
    req = urllib.request.Request(url, headers={"User-Agent": "iso2-python"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)
