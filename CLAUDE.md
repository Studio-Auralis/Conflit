# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive world map visualizing active armed conflicts (February 2026 data). Pure static site — vanilla JS, Leaflet.js, no framework, no build step. Bilingual FR/EN with educational features.

## Running Locally

```bash
cd conflict-map
python -m http.server 8090
# Open http://localhost:8090
```

Any static HTTP server works. No dependencies to install, no build process.

## Architecture

Single-page app in `conflict-map/` with these files:

- **index.html** — Page structure, CDN imports (Leaflet 1.9.4, Chart.js, Google Fonts Inter, CartoDB Dark/Light tiles)
- **app.js** — Core logic in a single IIFE. State: `conflicts[]`, `markers[]`, `map`, `educationMode`, `childrenMode`. Key flows: `init() → loadData() → initMap() → renderMarkers() → renderList() → bindEvents()`. Filtering triggers `applyFilters()`. Human ticker, education mode, children mode toggles.
- **style.css** — Dark theme via CSS custom properties. Pulsing marker animations. Responsive breakpoints at 900px and 480px. Focus mode hides chrome.
- **data.json** — 51 conflict objects with FR/EN text, timelines, news, testimonials, educational sheets, population comparisons.
- **conflict-page.js** — Conflict detail pages: 5-point educational sheets, city comparisons, testimonials, mini charts.
- **dashboard.js** — Dashboard analytics panel with Chart.js visualizations.
- **pages.js** — About, Contact (FormSubmit.co → contact@studio-auralis.com), Support, Teacher Resources pages.
- **quiz.js** — 10-question quiz with 8 question types, dynamically generated from data.json.
- **glossaire.js** — 33-term glossary FR/EN with search, alphabetical groups, in-text tooltip system.
- **events.json** — GDELT real-time event type mappings with SVG icons.

## Data Schema (data.json)

Each conflict object: `name`, `name_en`, `lat`, `lng`, `region`, `type`, `intensity` (haute|moyenne|basse), `parties[]`, `startDate`, `casualties`, `summary`, `summary_en`, `news[]`, `timeline[]`, `temoignages[]`, `fiche_educative{}`, `comparaison_population{}`.

### Enrichment fields:
- **temoignages**: `[{texte, texte_en, source, profil, profil_en}]`
- **fiche_educative**: `{qui, qui_en, pourquoi, pourquoi_en, depuis_quand, depuis_quand_en, consequences, consequences_en, solutions, solutions_en}`
- **comparaison_population**: `{deplaces, victimes}`

## Key Implementation Details

- **Marker positioning**: `iconSize: [0,0]` + `iconAnchor: [0,0]` with CSS `transform: translate(-50%, -50%)`
- **Map bounds**: `maxBounds` + `maxBoundsViscosity: 1.0` + `noWrap: true`
- **Performance**: `preferCanvas: true`, `updateWhenIdle: false`, `keepBuffer: 8`, `DocumentFragment` for list rendering, debounced search (120ms)
- **Tile background**: `#1a1a2e` matches CartoDB Dark Matter tiles to avoid black flash on pan
- **i18n**: FR/EN with `data-i18n` attributes, `t(key)` helper, localStorage persistence, lang switch fixed bottom-right
- **Education mode**: Simplifies UI (hides heatmap/timelapse/notif), localStorage persistent
- **Animation race condition fix**: Each animated element gets `el._animId` to prevent async overwrites

## Features

1. Interactive map with 51 conflicts (SVG type icons, pulsing intensity markers)
2. Sidebar with conflict list + real-time news (GDELT API)
3. Heatmap, Timelapse, Refugee flows (UNHCR API), Humanitarian zones
4. Dashboard analytics (Chart.js)
5. Conflict detail pages with educational sheets, city comparisons, testimonials
6. Interactive quiz (10 questions, 8 types)
7. Glossary (33 terms, tooltips)
8. Education mode, Children impact mode
9. Teacher resources page
10. Human impact ticker (animated counters)
11. FR/EN bilingual, Dark/Light theme, Focus mode, PDF/social export

## Rules

- **Context7 obligatoire** : Toujours utiliser les outils MCP Context7 (`resolve-library-id` puis `query-docs`) automatiquement pour toute génération de code, étape de configuration/installation, ou documentation de bibliothèque/API — sans attendre que l'utilisateur le demande explicitement.
