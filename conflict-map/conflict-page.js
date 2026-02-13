(function () {
  'use strict';

  var pageOpen = false;
  var currentConflict = null;
  var miniChart = null;

  // ============================================================
  // ---- Create Panel ----
  // ============================================================
  function createPanel() {
    if (document.getElementById('conflict-page-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'conflict-page-panel';
    panel.className = 'conflict-page-panel';
    panel.innerHTML =
      '<div class="cp-header" id="cp-header">' +
        '<button class="cp-back" id="cp-back" aria-label="Retour">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>' +
          '<span data-i18n="cpBack">Retour</span>' +
        '</button>' +
        '<div class="cp-header-info" id="cp-header-info"></div>' +
      '</div>' +
      '<div class="cp-body" id="cp-body"></div>';
    document.body.appendChild(panel);
    document.getElementById('cp-back').addEventListener('click', closeConflictPage);
  }

  // ============================================================
  // ---- Open / Close ----
  // ============================================================
  function openConflictPage(conflict) {
    if (!conflict) return;
    createPanel();
    currentConflict = conflict;
    pageOpen = true;

    var panel = document.getElementById('conflict-page-panel');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Update hash
    var slug = slugify(conflict.name);
    history.pushState(null, '', '#conflit/' + slug);

    renderHeader(conflict);
    renderBody(conflict);
  }

  function closeConflictPage() {
    pageOpen = false;
    currentConflict = null;
    var panel = document.getElementById('conflict-page-panel');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
    if (miniChart) { miniChart.destroy(); miniChart = null; }

    // Remove hash
    if (window.location.hash.indexOf('#conflit/') === 0) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }

  // ============================================================
  // ---- Render Header ----
  // ============================================================
  function renderHeader(c) {
    var G = window.GCT;
    var name = G ? G.getLocalizedField(c, 'name') : c.name;
    var intensityLabel = c.intensity;
    if (G && G.t) {
      var il = G.t('intensityLabels');
      if (il && il[c.intensity]) intensityLabel = il[c.intensity];
    }

    document.getElementById('cp-header-info').innerHTML =
      '<h2 class="cp-title">' + esc(name) + '</h2>' +
      '<div class="cp-badges">' +
        '<span class="cp-badge cp-badge-' + c.intensity + '">' + esc(intensityLabel) + '</span>' +
        '<span class="cp-badge-date">' + esc(formatDateFull(c.startDate)) + '</span>' +
      '</div>';
  }

  // ============================================================
  // ---- Render Body ----
  // ============================================================
  function renderBody(c) {
    var G = window.GCT;
    var body = document.getElementById('cp-body');
    if (!body) return;

    var summary = G ? G.getLocalizedField(c, 'summary') : c.summary;
    var lang = (G && G.currentLang) || 'fr';

    var html = '';

    // Summary
    html += '<section class="cp-section">' +
      '<h3 data-i18n="cpSummary">' + (lang === 'fr' ? 'Resume' : 'Summary') + '</h3>' +
      '<p class="cp-summary-text">' + esc(summary) + '</p>' +
      '<div class="cp-meta-grid">' +
        '<div class="cp-meta-item"><span class="cp-meta-icon">&#9876;</span><span class="cp-meta-label">' + (lang === 'fr' ? 'Parties' : 'Parties') + '</span><span class="cp-meta-val">' + c.parties.map(esc).join(', ') + '</span></div>' +
        '<div class="cp-meta-item"><span class="cp-meta-icon">&#128200;</span><span class="cp-meta-label">' + (lang === 'fr' ? 'Victimes' : 'Casualties') + '</span><span class="cp-meta-val cp-meta-red">' + formatNum(c.casualties) + '</span></div>' +
        '<div class="cp-meta-item"><span class="cp-meta-icon">&#127758;</span><span class="cp-meta-label">' + (lang === 'fr' ? 'Région' : 'Region') + '</span><span class="cp-meta-val">' + esc(translateRegion(c.region, lang)) + '</span></div>' +
        '<div class="cp-meta-item"><span class="cp-meta-icon">&#128336;</span><span class="cp-meta-label">' + (lang === 'fr' ? 'Type' : 'Type') + '</span><span class="cp-meta-val">' + esc(translateType(c.type, lang)) + '</span></div>' +
      '</div>' +
    '</section>';

    // Educational Sheet (5 points) — shown if education mode or if data exists
    var fiche = c.fiche_educative;
    if (fiche) {
      var ficheFields = [
        { key: 'qui', label: lang === 'fr' ? 'Qui ?' : 'Who?' },
        { key: 'pourquoi', label: lang === 'fr' ? 'Pourquoi ?' : 'Why?' },
        { key: 'depuis_quand', label: lang === 'fr' ? 'Depuis quand ?' : 'Since when?' },
        { key: 'consequences', label: lang === 'fr' ? 'Cons\u00e9quences ?' : 'Consequences?' },
        { key: 'solutions', label: lang === 'fr' ? 'Solutions possibles ?' : 'Possible solutions?' }
      ];
      html += '<section class="cp-fiche-educative">' +
        '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>' + (lang === 'fr' ? 'Comprendre en 5 points' : 'Understand in 5 points') + '</h3>';
      for (var fi = 0; fi < ficheFields.length; fi++) {
        var fKey = ficheFields[fi].key;
        var fVal = lang === 'en' ? (fiche[fKey + '_en'] || fiche[fKey] || '') : (fiche[fKey] || fiche[fKey + '_fr'] || '');
        if (fVal) {
          html += '<div class="fiche-point"><div class="fiche-point-label">' + esc(ficheFields[fi].label) + '</div><div class="fiche-point-text">' + esc(fVal) + '</div></div>';
        }
      }
      html += '</section>';
    }

    // Comparisons — "Pour mieux comprendre"
    var comp = c.comparaison_population;
    if (comp && (comp.deplaces || comp.victimes)) {
      html += '<section class="cp-comparaison">' +
        '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' + (lang === 'fr' ? 'Pour mieux comprendre' : 'Putting it in perspective') + '</h3>';

      var villesRef = lang === 'fr' ? [
        { nom: 'un village', population: 500 },
        { nom: 'Aurillac', population: 25000 },
        { nom: 'B\u00e9ziers', population: 80000 },
        { nom: 'Toulon', population: 180000 },
        { nom: 'Bordeaux', population: 260000 },
        { nom: 'Nantes', population: 320000 },
        { nom: 'Toulouse', population: 500000 },
        { nom: 'Lyon', population: 520000 },
        { nom: 'Marseille', population: 870000 },
        { nom: 'Paris', population: 2200000 },
        { nom: "l'\u00cele-de-France", population: 12000000 }
      ] : [
        { nom: 'a small town', population: 500 },
        { nom: 'a mid-size town', population: 25000 },
        { nom: 'Savannah', population: 150000 },
        { nom: 'Birmingham (UK)', population: 260000 },
        { nom: 'Liverpool', population: 500000 },
        { nom: 'San Francisco', population: 870000 },
        { nom: 'Paris', population: 2200000 },
        { nom: 'London', population: 9000000 },
        { nom: 'New York metro', population: 20000000 }
      ];

      if (comp.deplaces && comp.deplaces > 0) {
        var closest = findClosestVille(comp.deplaces, villesRef);
        if (closest) {
          var times = Math.round(comp.deplaces / closest.population * 10) / 10;
          if (times >= 1) {
            html += '<div class="comparaison-item">' + (lang === 'fr'
              ? 'Les <strong>' + formatNum(comp.deplaces) + '</strong> d\u00e9plac\u00e9s repr\u00e9sentent <strong>' + times + ' fois</strong> la population de ' + closest.nom + '.'
              : 'The <strong>' + formatNum(comp.deplaces) + '</strong> displaced represent <strong>' + times + ' times</strong> the population of ' + closest.nom + '.') + '</div>';
          } else {
            html += '<div class="comparaison-item">' + (lang === 'fr'
              ? 'Les <strong>' + formatNum(comp.deplaces) + '</strong> d\u00e9plac\u00e9s \u00e9quivalent \u00e0 la population de ' + closest.nom + '.'
              : 'The <strong>' + formatNum(comp.deplaces) + '</strong> displaced equal the population of ' + closest.nom + '.') + '</div>';
          }
        }
      }

      if (comp.victimes && comp.victimes > 0) {
        var closestV = findClosestVille(comp.victimes, villesRef);
        if (closestV) {
          html += '<div class="comparaison-item">' + (lang === 'fr'
            ? '<strong>' + formatNum(comp.victimes) + '</strong> victimes \u2014 c\'est comme si tous les habitants de ' + closestV.nom + ' disparaissaient.'
            : '<strong>' + formatNum(comp.victimes) + '</strong> casualties \u2014 as if every resident of ' + closestV.nom + ' disappeared.') + '</div>';
        }
      }

      // Duration comparison
      var startY = parseInt(c.startDate.split('-')[0]);
      var years = 2026 - startY;
      if (years >= 2) {
        var durationRef = '';
        if (lang === 'fr') {
          if (years >= 10) durationRef = 'plus long que la Premi\u00e8re Guerre mondiale';
          else if (years >= 6) durationRef = 'plus long que la Seconde Guerre mondiale';
          else if (years >= 4) durationRef = 'plus long que la guerre du Golfe';
          else durationRef = 'soit ' + years + ' ann\u00e9es de souffrances';
        } else {
          if (years >= 10) durationRef = 'longer than World War I';
          else if (years >= 6) durationRef = 'longer than World War II';
          else if (years >= 4) durationRef = 'longer than the Gulf War';
          else durationRef = years + ' years of suffering';
        }
        html += '<div class="comparaison-item">' + (lang === 'fr'
          ? 'Ce conflit dure depuis <strong>' + years + ' ans</strong> \u2014 ' + durationRef + '.'
          : 'This conflict has lasted <strong>' + years + ' years</strong> \u2014 ' + durationRef + '.') + '</div>';
      }

      html += '</section>';
    }

    // Testimonials
    var temoignages = c.temoignages;
    if (temoignages && temoignages.length > 0) {
      html += '<section class="cp-temoignages">' +
        '<h3>' + (lang === 'fr' ? 'T\u00e9moignages' : 'Testimonials') + '</h3>';
      for (var ti = 0; ti < temoignages.length; ti++) {
        var tem = temoignages[ti];
        var texte = lang === 'en' ? (tem.texte_en || tem.texte_fr || tem.texte || '') : (tem.texte_fr || tem.texte || '');
        var profil = lang === 'en' ? (tem.profil_en || tem.profil_fr || tem.profil || '') : (tem.profil_fr || tem.profil || '');
        if (texte) {
          html += '<div class="temoignage-card">' +
            '<div class="temoignage-quote">' + esc(texte) + '</div>' +
            '<div class="temoignage-meta">' +
              '<span class="temoignage-profil">' + esc(profil) + '</span>' +
              '<span class="temoignage-source">' + esc(tem.source || '') + '</span>' +
            '</div>' +
          '</div>';
        }
      }
      html += '</section>';
    }

    // Timeline
    var timeline = c.timeline || [];
    if (timeline.length > 0) {
      html += '<section class="cp-section">' +
        '<h3 data-i18n="cpTimeline">' + (lang === 'fr' ? 'Chronologie' : 'Timeline') + '</h3>' +
        '<div class="cp-timeline">';
      for (var t = 0; t < timeline.length; t++) {
        var ev = timeline[t];
        var evText = (lang === 'en' && ev.event_en) ? ev.event_en : ev.event;
        html += '<div class="cp-timeline-item" style="animation-delay:' + (t * 80) + 'ms">' +
          '<div class="cp-timeline-dot"></div>' +
          '<div class="cp-timeline-line"></div>' +
          '<div class="cp-timeline-content">' +
            '<span class="cp-timeline-date">' + esc(ev.date) + '</span>' +
            '<span class="cp-timeline-event">' + esc(evText) + '</span>' +
          '</div>' +
        '</div>';
      }
      html += '</div></section>';
    }

    // Humanitarian Impact
    html += '<section class="cp-section">' +
      '<h3 data-i18n="cpImpact">' + (lang === 'fr' ? 'Impact civil' : 'Civilian Impact') + '</h3>' +
      '<div class="cp-impact" id="cp-impact">' +
        '<div class="cp-impact-loading">' + (lang === 'fr' ? 'Chargement...' : 'Loading...') + '</div>' +
      '</div>' +
    '</section>';

    // News
    html += '<section class="cp-section">' +
      '<h3 data-i18n="cpNews">' + (lang === 'fr' ? 'Dernieres actualites' : 'Latest News') + '</h3>' +
      '<div class="cp-news" id="cp-news"></div>' +
    '</section>';

    // Refugee flows
    html += '<section class="cp-section">' +
      '<h3 data-i18n="cpRefugees">' + (lang === 'fr' ? 'Flux de refugies' : 'Refugee Flows') + '</h3>' +
      '<div class="cp-refugees" id="cp-refugees">' +
        '<div class="cp-impact-loading">' + (lang === 'fr' ? 'Chargement UNHCR...' : 'Loading UNHCR...') + '</div>' +
      '</div>' +
    '</section>';

    // Violence trend chart
    html += '<section class="cp-section">' +
      '<h3 data-i18n="cpTrend">' + (lang === 'fr' ? 'Tendance de la violence' : 'Violence Trend') + '</h3>' +
      '<div class="cp-chart-wrap"><canvas id="cp-trend-chart"></canvas></div>' +
    '</section>';

    body.innerHTML = html;
    body.scrollTop = 0;

    // Async data loading
    loadImpactData(c);
    loadNews(c);
    loadRefugees(c);
    renderTrendChart(c);
  }

  // ============================================================
  // ---- Impact Data ----
  // ============================================================
  function loadImpactData(c) {
    var container = document.getElementById('cp-impact');
    if (!container) return;

    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var hzData = (G && G.humanitarianData) || [];

    // Find nearby humanitarian zones
    var nearby = [];
    for (var i = 0; i < hzData.length; i++) {
      var hz = hzData[i];
      var dist = Math.sqrt(Math.pow(c.lat - hz.lat, 2) + Math.pow(c.lng - hz.lng, 2));
      if (dist < 5) nearby.push(hz);
    }

    var items = [
      { icon: '&#128100;', label: lang === 'fr' ? 'Victimes estimees' : 'Estimated casualties', val: formatNum(c.casualties) },
      { icon: '&#127973;', label: lang === 'fr' ? 'Zones humanitaires proches' : 'Nearby humanitarian zones', val: nearby.length }
    ];

    nearby.forEach(function (hz) {
      var typeLabels = { camp: lang === 'fr' ? 'Camp de refugies' : 'Refugee camp', famine: lang === 'fr' ? 'Famine' : 'Famine', health: lang === 'fr' ? 'Crise sanitaire' : 'Health crisis' };
      items.push({
        icon: hz.type === 'camp' ? '&#9978;' : hz.type === 'famine' ? '&#127838;' : '&#9764;',
        label: hz.name,
        val: formatNum(hz.affected) + ' ' + (lang === 'fr' ? 'affectes' : 'affected')
      });
    });

    var html = '<div class="cp-impact-grid">';
    items.forEach(function (item) {
      html += '<div class="cp-impact-card">' +
        '<span class="cp-impact-icon">' + item.icon + '</span>' +
        '<span class="cp-impact-val">' + item.val + '</span>' +
        '<span class="cp-impact-label">' + esc(item.label) + '</span>' +
      '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // ============================================================
  // ---- News (from data.json + GDELT) ----
  // ============================================================
  function loadNews(c) {
    var container = document.getElementById('cp-news');
    if (!container) return;

    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var allNews = [];

    // News from conflict data
    if (c.news) {
      c.news.forEach(function (n) {
        allNews.push({ title: n.title, date: n.date, source: n.source, url: n.url });
      });
    }

    // GDELT events near this conflict
    var gdelt = (G && G.gdeltEvents) || [];
    gdelt.forEach(function (ev) {
      var dist = Math.sqrt(Math.pow(c.lat - ev.lat, 2) + Math.pow(c.lng - ev.lng, 2));
      if (dist < 5) {
        allNews.push({ title: ev.name, date: ev.date, source: 'GDELT - ' + (ev.source || ''), url: ev.url, isGdelt: true });
      }
    });

    allNews.sort(function (a, b) { return b.date.localeCompare(a.date); });

    if (allNews.length === 0) {
      container.innerHTML = '<p class="cp-empty">' + (lang === 'fr' ? 'Aucune actualite disponible' : 'No news available') + '</p>';
      return;
    }

    var html = '';
    var limit = Math.min(allNews.length, 15);
    for (var i = 0; i < limit; i++) {
      var n = allNews[i];
      html += '<a href="' + esc(n.url) + '" target="_blank" rel="noopener" class="cp-news-item">' +
        '<div class="cp-news-date">' + esc(n.date) + (n.isGdelt ? ' <span class="cp-gdelt-badge">GDELT</span>' : '') + '</div>' +
        '<div class="cp-news-title">' + esc(n.title) + '</div>' +
        '<div class="cp-news-source">' + esc(n.source) + ' &rarr;</div>' +
      '</a>';
    }
    container.innerHTML = html;
  }

  // ============================================================
  // ---- Refugee Flows ----
  // ============================================================
  function loadRefugees(c) {
    var container = document.getElementById('cp-refugees');
    if (!container) return;

    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var rd = (G && G.refugeeData) || [];

    // Find refugees from this country (approximate by proximity to centroids)
    var centroids = (G && G.COUNTRY_CENTROIDS) || {};
    var countryIso = findCountryIso(c.lat, c.lng, centroids);

    var flows = rd.filter(function (d) {
      return d.from === countryIso || d.to === countryIso;
    }).sort(function (a, b) { return b.refugees - a.refugees; });

    if (flows.length === 0) {
      // Try fetching if no data cached
      container.innerHTML = '<p class="cp-empty">' + (lang === 'fr' ? 'Aucune donnee de refugies disponible' : 'No refugee data available') + '</p>';
      return;
    }

    var html = '<div class="cp-refugee-list">';
    var limit = Math.min(flows.length, 10);
    for (var i = 0; i < limit; i++) {
      var f = flows[i];
      var direction = f.from === countryIso ? '&rarr;' : '&larr;';
      var otherName = f.from === countryIso ? f.toName : f.fromName;
      html += '<div class="cp-refugee-item">' +
        '<span class="cp-refugee-direction">' + direction + '</span>' +
        '<span class="cp-refugee-country">' + esc(otherName) + '</span>' +
        '<span class="cp-refugee-count">' + formatNum(f.refugees) + '</span>' +
      '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  // ============================================================
  // ---- Violence Trend Chart ----
  // ============================================================
  function renderTrendChart(c) {
    var canvas = document.getElementById('cp-trend-chart');
    if (!canvas) return;
    if (miniChart) { miniChart.destroy(); miniChart = null; }

    var isLight = document.body.classList.contains('light-theme');
    var labels = [];
    var data = [];

    // Generate simulated monthly trend based on conflict intensity and age
    var startDate = new Date(c.startDate);
    var now = new Date(2026, 1, 10);
    var months = Math.min(24, Math.max(6, Math.round((now - startDate) / (30 * 24 * 60 * 60 * 1000))));
    var monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

    var base = c.intensity === 'haute' ? 80 : c.intensity === 'moyenne' ? 50 : 25;
    var val = base * 0.5;

    for (var i = 0; i < months; i++) {
      var d = new Date(now.getTime() - (months - i) * 30 * 24 * 60 * 60 * 1000);
      labels.push(monthNames[d.getMonth()] + ' ' + d.getFullYear());
      val += (Math.random() - 0.4) * base * 0.3;
      val = Math.max(5, Math.min(100, val));
      data.push(Math.round(val));
    }

    var borderColor = c.intensity === 'haute' ? '#c94a4a' : c.intensity === 'moyenne' ? '#cb843e' : '#b09840';
    var bgColor = c.intensity === 'haute' ? 'rgba(201,74,74,0.1)' : c.intensity === 'moyenne' ? 'rgba(203,132,62,0.1)' : 'rgba(176,152,64,0.1)';

    miniChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          borderColor: borderColor,
          backgroundColor: bgColor,
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: isLight ? '#8895a7' : '#5c6878', maxRotation: 45, font: { size: 10 } },
            grid: { color: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)' }
          },
          y: {
            ticks: { color: isLight ? '#8895a7' : '#5c6878', font: { size: 10 } },
            grid: { color: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)' }
          }
        }
      }
    });
  }

  // ============================================================
  // ---- Hash Routing ----
  // ============================================================
  function handleHash() {
    var hash = window.location.hash;
    if (hash.indexOf('#conflit/') !== 0) return;

    var slug = hash.replace('#conflit/', '');
    var G = window.GCT;
    if (!G || !G.conflicts) return;

    for (var i = 0; i < G.conflicts.length; i++) {
      if (slugify(G.conflicts[i].name) === slug) {
        openConflictPage(G.conflicts[i]);
        return;
      }
    }
  }

  window.addEventListener('hashchange', function () {
    if (window.location.hash.indexOf('#conflit/') === 0) {
      handleHash();
    } else if (pageOpen) {
      closeConflictPage();
    }
  });

  // Check hash on load (deferred)
  window.addEventListener('load', function () {
    setTimeout(handleHash, 500);
  });

  // ============================================================
  // ---- Helpers ----
  // ============================================================
  function slugify(str) {
    return (str || '').toLowerCase()
      .replace(/[éèêë]/g, 'e').replace(/[àâä]/g, 'a').replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o').replace(/[îï]/g, 'i').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function findCountryIso(lat, lng, centroids) {
    var nearest = null;
    var minDist = Infinity;
    Object.keys(centroids).forEach(function (iso) {
      var c = centroids[iso];
      var d = Math.pow(lat - c[0], 2) + Math.pow(lng - c[1], 2);
      if (d < minDist) { minDist = d; nearest = iso; }
    });
    return nearest;
  }

  function findClosestVille(population, villes) {
    var closest = null;
    var minDiff = Infinity;
    for (var i = 0; i < villes.length; i++) {
      var diff = Math.abs(villes[i].population - population);
      if (diff < minDiff) { minDiff = diff; closest = villes[i]; }
    }
    return closest;
  }

  function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return Math.round(n).toLocaleString();
    return String(n);
  }

  function formatDateFull(dateStr) {
    var parts = dateStr.split('-');
    var months = ['', 'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
    var G = window.GCT;
    if (G && G.t) {
      var m = G.t('months');
      if (m) months = m;
    }
    return parseInt(parts[2]) + ' ' + months[parseInt(parts[1])] + ' ' + parts[0];
  }

  function esc(str) {
    var div = document.createElement('div');
    div.textContent = String(str || '');
    return div.innerHTML;
  }

  var conflictTypeMap = { 'Guerre civile': 'Civil war', 'Conflit international': 'International conflict', 'Insurrection': 'Insurgency', 'Conflit interethnique': 'Ethnic conflict' };
  var regionMap = { 'Afrique': 'Africa', 'Moyen-Orient': 'Middle East', 'Asie': 'Asia', 'Europe': 'Europe', 'Amériques': 'Americas' };

  function translateType(type, lang) {
    return lang === 'en' ? (conflictTypeMap[type] || type) : type;
  }

  function translateRegion(region, lang) {
    return lang === 'en' ? (regionMap[region] || region) : region;
  }

  // ============================================================
  // ---- i18n additions ----
  // ============================================================
  function addI18n() {
    if (!window.GCT || !window.GCT.i18n) return;
    var fr = window.GCT.i18n.fr;
    var en = window.GCT.i18n.en;
    if (fr) {
      fr.cpBack = 'Retour';
      fr.cpSummary = 'Resume';
      fr.cpTimeline = 'Chronologie';
      fr.cpImpact = 'Impact civil';
      fr.cpNews = 'Dernieres actualites';
      fr.cpRefugees = 'Flux de refugies';
      fr.cpTrend = 'Tendance de la violence';
      fr.cpMore = 'En savoir plus';
    }
    if (en) {
      en.cpBack = 'Back';
      en.cpSummary = 'Summary';
      en.cpTimeline = 'Timeline';
      en.cpImpact = 'Civilian Impact';
      en.cpNews = 'Latest News';
      en.cpRefugees = 'Refugee Flows';
      en.cpTrend = 'Violence Trend';
      en.cpMore = 'Learn more';
    }
  }

  // ============================================================
  // ---- Expose ----
  // ============================================================
  window.GCT_ConflictPage = {
    open: openConflictPage,
    close: closeConflictPage,
    addI18n: addI18n,
    handleHash: handleHash
  };
})();
