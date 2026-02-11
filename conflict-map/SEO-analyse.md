# SEO Analyse — Global Conflict Tracker
> Date : 10 février 2026 | Domaine cible : studio-auralis.com

---

## 1. Ce qui a été implémenté

### Meta tags (head)
| Balise | Statut | Valeur |
|--------|--------|--------|
| `<html lang="fr">` | OK | Langue française déclarée |
| `meta description` | OK | 155 chars, mots-clés naturels |
| `meta keywords` | OK | 8 termes ciblés |
| `meta author` | OK | Studio Auralis |
| `meta robots` | OK | index, follow |
| `meta theme-color` | OK | #0f1419 |
| `link canonical` | OK | https://studio-auralis.com/ |
| `title` | OK | "Global Conflict Tracker — Février 2026" |

### Open Graph (Facebook / LinkedIn)
| Balise | Statut | Valeur |
|--------|--------|--------|
| og:title | OK | Titre descriptif avec mots-clés |
| og:description | OK | Description courte |
| og:type | OK | website |
| og:url | OK | URL canonique |
| og:image | A FAIRE | Placeholder — besoin d'une vraie capture 1200x630px |
| og:locale | OK | fr_FR |
| og:site_name | OK | Global Conflict Tracker |

### Twitter Card
| Balise | Statut |
|--------|--------|
| twitter:card | OK (summary_large_image) |
| twitter:title | OK |
| twitter:description | OK |
| twitter:image | A FAIRE (même image OG) |

### Favicon
| Element | Statut |
|---------|--------|
| SVG inline (data URI) | OK |
| Apple touch icon | OK (SVG fallback) |
| favicon.ico | MANQUANT — browsers legacy cherchent /favicon.ico |

### Données structurées (JSON-LD)
| Schema | Statut |
|--------|--------|
| WebSite | OK (nom, URL, description, langue) |
| WebApplication | OK (catégorie, OS, offre gratuite) |

### Fichiers SEO
| Fichier | Statut |
|---------|--------|
| robots.txt | OK |
| sitemap.xml | OK (1 URL, lastmod, changefreq daily) |

### Accessibilité / HTML sémantique
| Element | Statut |
|---------|--------|
| `<main>` autour du contenu | OK |
| `<nav>` sur les onglets | OK |
| `role="navigation"` sidebar | OK |
| `aria-label` sur selects | OK (3/3) |
| `aria-label` sur search input | OK |
| `aria-label` sur slider timeline | OK |
| `aria-hidden` sur SVG décoratifs | OK |

---

## 2. Score SEO estimé

| Catégorie | Note | Détail |
|-----------|------|--------|
| Meta tags essentiels | 9/10 | Tout est là, description bien calibrée |
| Open Graph | 7/10 | Complet mais image manquante |
| Twitter Card | 7/10 | Idem, image placeholder |
| Données structurées | 8/10 | WebSite + WebApplication, pas de BreadcrumbList (mono-page) |
| Accessibilité HTML | 8/10 | Bonne sémantique, aria-labels présents |
| Fichiers techniques | 8/10 | robots.txt + sitemap OK |
| Performance | 7/10 | Pas de compression gzip configurée (côté serveur), pas de service worker |
| **Score global** | **7.5/10** | |

---

## 3. Concurrents principaux

| Site | Description | Forces SEO connues |
|------|-------------|-------------------|
| **CFR Global Conflict Tracker** (cfr.org) | Référence institutionnelle, carte interactive | Autorité domaine massive, backlinks .edu/.gov, contenu éditorial riche |
| **ACLED Dashboard** (acleddata.com) | Données brutes conflits, API | SEO technique solide, blog actif, citations académiques |
| **Crisis Group** (crisisgroup.org) | Analyses géopolitiques | Contenu long-form, backlinks médias internationaux |
| **UCDP** (ucdp.uu.se) | Base de données universitaire Uppsala | Autorité académique, citations, données ouvertes |
| **LiveUAMap** (liveuamap.com) | Carte temps réel Ukraine/monde | Trafic organique massif, actualité en temps réel, SEO technique basique |

### Positionnement par rapport à la concurrence

| Critère | Studio Auralis | CFR | ACLED | LiveUAMap |
|---------|---------------|-----|-------|-----------|
| Autorité domaine (DA) | ~0 (nouveau) | ~90 | ~70 | ~65 |
| Backlinks | 0 | Milliers | Milliers | Milliers |
| Contenu indexable | Faible (SPA) | Elevé | Elevé | Moyen |
| SEO technique | Bon | Bon | Bon | Basique |
| Vitesse page | Rapide | Moyenne | Moyenne | Lente |
| Mobile | Responsive | Responsive | Responsive | Partiel |

---

## 4. Points faibles actuels (priorité haute)

### A. Contenu non indexable (problème #1)
- Le site est une SPA (Single Page Application) pure JS
- Google peut exécuter le JS mais c'est moins fiable
- Les 31 conflits sont chargés dynamiquement depuis `data.json`
- **Aucun texte de conflit n'est dans le HTML source** = invisible pour les crawlers basiques
- Impact : les fiches conflits ne seront jamais indexées individuellement

### B. Image OG manquante
- `og:image` pointe vers un fichier qui n'existe pas encore
- Les partages Facebook/LinkedIn/Twitter n'auront pas de preview visuelle
- **Action** : créer une capture 1200x630px et la placer sur le serveur

### C. favicon.ico manquant
- Les navigateurs legacy et certains outils cherchent `/favicon.ico`
- Erreur 404 dans les logs serveur
- **Action** : convertir le SVG en .ico ou ajouter un fichier favicon.ico

### D. Autorité domaine = 0
- Domaine neuf, aucun backlink
- Impossible de ranker sur des mots-clés compétitifs ("conflit", "guerre", "carte")
- **Action** : stratégie de link building nécessaire

### E. Pas de contenu textuel riche
- Pas de blog, pas d'articles, pas de pages secondaires
- Google privilégie les sites avec du contenu éditorial
- Les concurrents ont des centaines/milliers de pages indexées

---

## 5. Actions recommandées (prochaines étapes)

### Court terme (cette semaine)
- [ ] Créer `og-image.png` (capture d'écran 1200x630px)
- [ ] Créer `favicon.ico` (16x16 + 32x32)
- [ ] Tester partage sur Facebook Debugger (https://developers.facebook.com/tools/debug/)
- [ ] Tester sur Twitter Card Validator
- [ ] Soumettre sitemap dans Google Search Console

### Moyen terme (ce mois)
- [ ] Ajouter des balises `<noscript>` avec contenu statique pour les crawlers
- [ ] Envisager le Server-Side Rendering (SSR) ou pre-rendering pour le contenu
- [ ] Ajouter des pages individuelles par conflit (URLs uniques = plus de pages indexées)
- [ ] Configurer HTTPS + headers de sécurité sur le serveur de production
- [ ] Ajouter `hreflang` si version anglaise prévue

### Long terme (3-6 mois)
- [ ] Blog / section actualités avec contenu éditorial (indexable)
- [ ] Stratégie backlinks (partages médias, citations, partenariats)
- [ ] Monitoring avec Google Search Console + Analytics
- [ ] Schema.org Article pour les contenus éditoriaux
- [ ] AMP ou pages statiques pour le référencement mobile

---

## 6. Mots-clés cibles suggérés

| Mot-clé | Volume estimé | Difficulté | Pertinence |
|---------|--------------|------------|------------|
| carte conflits monde | Moyen | Moyenne | Haute |
| conflits armés 2026 | Faible | Basse | Haute |
| guerre en cours | Elevé | Haute | Haute |
| suivi conflits temps réel | Faible | Basse | Haute |
| GDELT carte | Faible | Basse | Haute |
| global conflict tracker | Moyen | Moyenne | Haute |
| carte interactive guerres | Faible | Basse | Haute |

---

*Fichier généré le 10/02/2026 — à mettre à jour après chaque itération SEO.*
