#!/usr/bin/env python3
"""
build-seo.py — Generates SEO-friendly <noscript> content from data.json
and injects it into index.html between the SEO-CONTENT markers.

Usage: python build-seo.py
"""

import json
import os
import sys
from html import escape

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(SCRIPT_DIR, "data.json")
HTML_PATH = os.path.join(SCRIPT_DIR, "index.html")

START_MARKER = "<!-- SEO-CONTENT-START -->"
END_MARKER = "<!-- SEO-CONTENT-END -->"


def format_casualties(n):
    """Format number with space as thousands separator (French convention)."""
    return f"{n:,}".replace(",", "\u202f")


def format_date(date_str):
    """Convert YYYY-MM-DD to French readable date."""
    months = {
        "01": "janvier", "02": "février", "03": "mars", "04": "avril",
        "05": "mai", "06": "juin", "07": "juillet", "08": "août",
        "09": "septembre", "10": "octobre", "11": "novembre", "12": "décembre"
    }
    parts = date_str.split("-")
    if len(parts) != 3:
        return date_str
    return f"{int(parts[2])} {months.get(parts[1], parts[1])} {parts[0]}"


def build_noscript(conflicts):
    """Build the <noscript> HTML block from conflict data."""
    articles = []
    for c in conflicts:
        name = escape(c["name"])
        region = escape(c["region"])
        ctype = escape(c["type"])
        intensity = escape(c["intensity"])
        start = format_date(c["startDate"])
        summary = escape(c["summary"])
        parties = ", ".join(escape(p) for p in c["parties"])
        casualties = format_casualties(c["casualties"])

        article = (
            f'      <article>\n'
            f'        <h3>{name}</h3>\n'
            f'        <p class="seo-meta">{region} — {ctype} — Intensité {intensity} — Depuis le {start}</p>\n'
            f'        <p class="seo-summary">{summary}</p>\n'
            f'        <p class="seo-details">Parties : {parties} — Victimes estimées : {casualties}</p>\n'
            f'      </article>'
        )
        articles.append(article)

    count = len(conflicts)
    total_casualties = sum(c["casualties"] for c in conflicts)

    html = (
        f'    <noscript>\n'
        f'    <section class="seo-content">\n'
        f'      <h2>Conflits armés dans le monde — {count} conflits actifs, {format_casualties(total_casualties)} victimes estimées</h2>\n'
        + "\n".join(articles) + "\n"
        f'    </section>\n'
        f'    </noscript>'
    )
    return html


def main():
    # Load data.json
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            conflicts = json.load(f)
    except FileNotFoundError:
        print(f"Erreur : {DATA_PATH} introuvable.", file=sys.stderr)
        sys.exit(1)

    print(f"Chargé {len(conflicts)} conflits depuis data.json")

    # Build noscript block
    noscript_html = build_noscript(conflicts)

    # Read index.html
    try:
        with open(HTML_PATH, "r", encoding="utf-8") as f:
            html = f.read()
    except FileNotFoundError:
        print(f"Erreur : {HTML_PATH} introuvable.", file=sys.stderr)
        sys.exit(1)

    # Find markers
    start_idx = html.find(START_MARKER)
    end_idx = html.find(END_MARKER)

    if start_idx == -1 or end_idx == -1:
        print("Erreur : marqueurs SEO-CONTENT introuvables dans index.html.", file=sys.stderr)
        sys.exit(1)

    # Inject content between markers
    new_html = (
        html[:start_idx + len(START_MARKER)]
        + "\n"
        + noscript_html
        + "\n    "
        + html[end_idx:]
    )

    # Write back
    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(new_html)

    # Stats
    injected_size = len(noscript_html.encode("utf-8"))
    print(f"Injecté {injected_size:,} octets de contenu SEO dans index.html")
    print("Terminé.")


if __name__ == "__main__":
    main()
