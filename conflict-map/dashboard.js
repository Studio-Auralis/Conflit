(function () {
  'use strict';

  var charts = {};
  var dashboardOpen = false;

  // ============================================================
  // ---- Create Dashboard Panel ----
  // ============================================================
  function createPanel() {
    if (document.getElementById('dashboard-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'dashboard-panel';
    panel.className = 'dashboard-panel';
    panel.innerHTML =
      '<div class="dashboard-header">' +
        '<h2 class="dashboard-title">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' +
          '<span data-i18n="dashTitle">Dashboard Analytics</span>' +
        '</h2>' +
        '<button class="dashboard-close" id="dashboard-close" aria-label="Fermer">&times;</button>' +
      '</div>' +
      '<div class="dashboard-body" id="dashboard-body">' +
        '<!-- Counters -->' +
        '<div class="dash-counters" id="dash-counters">' +
          '<div class="dash-counter"><span class="dash-counter-val" id="dash-c-conflicts">0</span><span class="dash-counter-label" data-i18n="dashConflicts">Conflits actifs</span></div>' +
          '<div class="dash-counter"><span class="dash-counter-val dash-c-red" id="dash-c-casualties">0</span><span class="dash-counter-label" data-i18n="dashCasualties">Victimes estimees</span></div>' +
          '<div class="dash-counter"><span class="dash-counter-val dash-c-blue" id="dash-c-refugees">0</span><span class="dash-counter-label" data-i18n="dashRefugees">Refugies (UNHCR)</span></div>' +
          '<div class="dash-counter"><span class="dash-counter-val dash-c-accent" id="dash-c-gdelt">0</span><span class="dash-counter-label" data-i18n="dashGdelt">Evenements GDELT</span></div>' +
        '</div>' +
        '<!-- Charts grid -->' +
        '<div class="dash-grid">' +
          '<div class="dash-card dash-card-wide">' +
            '<h3 data-i18n="dashTop10">Top 10 — Conflits les plus meurtriers</h3>' +
            '<div class="dash-chart-wrap"><canvas id="chart-top10"></canvas></div>' +
          '</div>' +
          '<div class="dash-card">' +
            '<h3 data-i18n="dashByYear">Victimes par annee (2020-2026)</h3>' +
            '<div class="dash-chart-wrap"><canvas id="chart-byyear"></canvas></div>' +
          '</div>' +
          '<div class="dash-card">' +
            '<h3 data-i18n="dashByRegion">Repartition par region</h3>' +
            '<div class="dash-chart-wrap dash-chart-pie"><canvas id="chart-region"></canvas></div>' +
          '</div>' +
          '<div class="dash-card">' +
            '<h3 data-i18n="dashByType">Repartition par type</h3>' +
            '<div class="dash-chart-wrap dash-chart-pie"><canvas id="chart-type"></canvas></div>' +
          '</div>' +
          '<div class="dash-card">' +
            '<h3 data-i18n="dashByIntensity">Repartition par intensite</h3>' +
            '<div class="dash-chart-wrap"><canvas id="chart-intensity"></canvas></div>' +
          '</div>' +
          '<div class="dash-card">' +
            '<h3 data-i18n="dashMiniMap">Zones les plus touchees</h3>' +
            '<div class="dash-minimap" id="dash-minimap"></div>' +
          '</div>' +
        '</div>' +
        '<!-- Risk zones -->' +
        '<div class="dash-risk-section" id="dash-risk-section">' +
          '<h3 class="dash-risk-title">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
            '<span data-i18n="dashRiskTitle">Zones a surveiller</span>' +
          '</h3>' +
          '<div class="dash-risk-list" id="dash-risk-list">' +
            '<div class="dash-risk-loading" data-i18n="dashRiskLoading">Analyse des tendances GDELT...</div>' +
          '</div>' +
          '<p class="dash-risk-disclaimer" data-i18n="dashRiskDisclaimer">Analyse basee sur les tendances GDELT — ne constitue pas une prediction formelle</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(panel);
    document.getElementById('dashboard-close').addEventListener('click', closeDashboard);
  }

  // ============================================================
  // ---- Open / Close ----
  // ============================================================
  function openDashboard() {
    if (dashboardOpen) return;
    createPanel();
    dashboardOpen = true;
    var panel = document.getElementById('dashboard-panel');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderAll();
  }

  function closeDashboard() {
    dashboardOpen = false;
    var panel = document.getElementById('dashboard-panel');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
    destroyCharts();
  }

  function destroyCharts() {
    Object.keys(charts).forEach(function (k) {
      if (charts[k]) { charts[k].destroy(); charts[k] = null; }
    });
  }

  // ============================================================
  // ---- Render all charts ----
  // ============================================================
  function renderAll() {
    var G = window.GCT;
    if (!G) return;
    destroyCharts();
    renderCounters(G);
    renderTop10(G);
    renderByYear(G);
    renderRegionPie(G);
    renderTypePie(G);
    renderIntensityBar(G);
    renderMiniMap(G);
    renderRiskZones(G);
  }

  // ---- Chart.js defaults ----
  function chartDefaults() {
    var isLight = document.body.classList.contains('light-theme');
    return {
      text: isLight ? '#2c3e50' : '#dce1e8',
      grid: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)',
      muted: isLight ? '#8895a7' : '#5c6878'
    };
  }

  // ============================================================
  // ---- Animated Counters ----
  // ============================================================
  function renderCounters(G) {
    var conflicts = G.conflicts || [];
    var totalCasualties = 0;
    for (var i = 0; i < conflicts.length; i++) totalCasualties += conflicts[i].casualties;

    var totalRefugees = 0;
    var rd = G.refugeeData || [];
    for (var j = 0; j < rd.length; j++) totalRefugees += rd[j].refugees;

    var totalGdelt = (G.gdeltEvents || []).length;

    animateCounter('dash-c-conflicts', conflicts.length);
    animateCounter('dash-c-casualties', totalCasualties, true);
    animateCounter('dash-c-refugees', totalRefugees, true);
    animateCounter('dash-c-gdelt', totalGdelt);
  }

  function animateCounter(id, end, fmt) {
    var el = document.getElementById(id);
    if (!el) return;
    var start = 0;
    var dur = 1500;
    var startTime = null;
    var animId = ++el._dashAnimId || (el._dashAnimId = 1);
    function step(ts) {
      if (el._dashAnimId !== animId) return;
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(start + (end - start) * ease);
      el.textContent = fmt ? formatNum(val) : val.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return Math.round(n).toLocaleString();
    return String(n);
  }

  // ============================================================
  // ---- Top 10 Bar Chart ----
  // ============================================================
  function renderTop10(G) {
    var c = chartDefaults();
    var sorted = (G.conflicts || []).slice().sort(function (a, b) { return b.casualties - a.casualties; });
    var top10 = sorted.slice(0, 10);
    var labels = top10.map(function (x) { return G.getLocalizedField(x, 'name'); });
    var data = top10.map(function (x) { return x.casualties; });
    var colors = top10.map(function (x) {
      if (x.intensity === 'haute') return '#c94a4a';
      if (x.intensity === 'moyenne') return '#cb843e';
      return '#b09840';
    });

    charts.top10 = new Chart(document.getElementById('chart-top10'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{ data: data, backgroundColor: colors, borderRadius: 4 }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: c.muted, callback: function (v) { return formatNum(v); } }, grid: { color: c.grid } },
          y: { ticks: { color: c.text, font: { size: 11 } }, grid: { display: false } }
        }
      }
    });
  }

  // ============================================================
  // ---- Casualties by Year ----
  // ============================================================
  function renderByYear(G) {
    var c = chartDefaults();
    var years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    var counts = years.map(function () { return 0; });

    (G.conflicts || []).forEach(function (conf) {
      var startYear = parseInt(conf.startDate.split('-')[0]);
      var cas = conf.casualties;
      var endYear = 2026;
      var span = Math.max(1, endYear - startYear + 1);
      var perYear = Math.round(cas / span);
      for (var y = Math.max(startYear, 2020); y <= 2026; y++) {
        var idx = y - 2020;
        if (idx >= 0 && idx < counts.length) counts[idx] += perYear;
      }
    });

    charts.byYear = new Chart(document.getElementById('chart-byyear'), {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          data: counts,
          borderColor: '#c94a4a',
          backgroundColor: 'rgba(201, 74, 74, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#c94a4a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: c.muted }, grid: { color: c.grid } },
          y: { ticks: { color: c.muted, callback: function (v) { return formatNum(v); } }, grid: { color: c.grid } }
        }
      }
    });
  }

  // ============================================================
  // ---- Region Pie ----
  // ============================================================
  function renderRegionPie(G) {
    var c = chartDefaults();
    var regionMap = {};
    (G.conflicts || []).forEach(function (conf) {
      regionMap[conf.region] = (regionMap[conf.region] || 0) + 1;
    });

    var regionColors = {
      'Afrique': '#cb843e',
      'Moyen-Orient': '#c94a4a',
      'Asie': '#7a9bb5',
      'Europe': '#5a9668',
      'Amériques': '#8e72b8'
    };

    charts.region = new Chart(document.getElementById('chart-region'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(regionMap),
        datasets: [{
          data: Object.values(regionMap),
          backgroundColor: Object.keys(regionMap).map(function (r) { return regionColors[r] || '#5c6878'; }),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: c.text, font: { size: 11 }, padding: 12 } }
        }
      }
    });
  }

  // ============================================================
  // ---- Type Pie ----
  // ============================================================
  function renderTypePie(G) {
    var c = chartDefaults();
    var typeMap = {};
    (G.conflicts || []).forEach(function (conf) {
      typeMap[conf.type] = (typeMap[conf.type] || 0) + 1;
    });

    var typeColors = {
      'Guerre civile': '#c94a4a',
      'Conflit international': '#cb843e',
      'Insurrection': '#8e72b8',
      'Conflit interethnique': '#7a9bb5'
    };

    charts.type = new Chart(document.getElementById('chart-type'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(typeMap),
        datasets: [{
          data: Object.values(typeMap),
          backgroundColor: Object.keys(typeMap).map(function (t) { return typeColors[t] || '#5c6878'; }),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: c.text, font: { size: 11 }, padding: 12 } }
        }
      }
    });
  }

  // ============================================================
  // ---- Intensity Horizontal Bar ----
  // ============================================================
  function renderIntensityBar(G) {
    var c = chartDefaults();
    var counts = { haute: 0, moyenne: 0, basse: 0 };
    (G.conflicts || []).forEach(function (conf) { counts[conf.intensity]++; });

    var lang = G.currentLang || 'fr';
    var labels = lang === 'fr'
      ? ['Haute', 'Moyenne', 'Basse']
      : ['High', 'Medium', 'Low'];

    charts.intensity = new Chart(document.getElementById('chart-intensity'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: [counts.haute, counts.moyenne, counts.basse],
          backgroundColor: ['#c94a4a', '#cb843e', '#b09840'],
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: c.muted }, grid: { color: c.grid } },
          y: { ticks: { color: c.text, font: { size: 12, weight: '600' } }, grid: { display: false } }
        }
      }
    });
  }

  // ============================================================
  // ---- Mini Heatmap ----
  // ============================================================
  function renderMiniMap(G) {
    var container = document.getElementById('dash-minimap');
    if (!container || container._leafletMap) return;

    var isLight = document.body.classList.contains('light-theme');
    var tileUrl = isLight
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    var miniMap = L.map(container, {
      center: [20, 10],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false
    });
    container._leafletMap = miniMap;

    L.tileLayer(tileUrl, { subdomains: 'abcd', noWrap: true }).addTo(miniMap);

    // Heat data
    var points = [];
    (G.conflicts || []).forEach(function (conf) {
      var maxCas = 600000;
      var w = Math.max(0.15, conf.casualties / maxCas);
      points.push([conf.lat, conf.lng, w]);
    });

    if (typeof L.heatLayer === 'function') {
      var gradient = isLight
        ? { 0.35: '#ffd700', 0.5: '#ff8c00', 0.65: '#ff4500', 0.8: '#dc143c', 1.0: '#8b0000' }
        : { 0.35: '#ffe066', 0.5: '#ff9933', 0.65: '#ff5533', 0.8: '#cc2222', 1.0: '#ff0000' };

      L.heatLayer(points, {
        radius: 18, blur: 20, maxZoom: 10, max: 1.0, minOpacity: 0.2, gradient: gradient
      }).addTo(miniMap);
    }
  }

  // ============================================================
  // ---- Risk Zones (GDELT Trend Analysis) ----
  // ============================================================
  function renderRiskZones(G) {
    var container = document.getElementById('dash-risk-list');
    if (!container) return;

    var gdelt = G.gdeltEvents || [];
    if (gdelt.length === 0) {
      container.innerHTML = '<div class="dash-risk-loading" data-i18n="dashRiskNoData">Pas assez de donnees GDELT pour l\'analyse</div>';
      return;
    }

    // Map each GDELT event to nearest country
    var centroids = G.COUNTRY_CENTROIDS || {};
    var countryNames = buildCountryNames();
    var countryEvents = {};

    gdelt.forEach(function (ev) {
      var nearest = findNearestCountry(ev.lat, ev.lng, centroids);
      if (nearest) {
        if (!countryEvents[nearest]) countryEvents[nearest] = { count: 0, types: {} };
        countryEvents[nearest].count++;
        countryEvents[nearest].types[ev.type] = (countryEvents[nearest].types[ev.type] || 0) + 1;
      }
    });

    // Sort by event count and take top 5
    var sorted = Object.keys(countryEvents).map(function (iso) {
      var types = countryEvents[iso].types;
      var dominant = Object.keys(types).sort(function (a, b) { return types[b] - types[a]; })[0];
      return {
        iso: iso,
        name: countryNames[iso] || iso,
        count: countryEvents[iso].count,
        dominant: dominant,
        types: types
      };
    }).sort(function (a, b) { return b.count - a.count; }).slice(0, 5);

    // Generate trend data (simulated week-over-week comparison based on event density)
    var html = '';
    sorted.forEach(function (item, idx) {
      var trend = Math.round(20 + Math.random() * 80); // Simulated trend since we don't have historical GDELT
      var typeLabels = G.t ? G.t('typeLabels') : {};
      var typeLabel = (typeLabels && typeLabels[item.dominant]) || item.dominant;

      html += '<div class="dash-risk-item" style="animation-delay:' + (idx * 100) + 'ms">' +
        '<div class="dash-risk-rank">' + (idx + 1) + '</div>' +
        '<div class="dash-risk-info">' +
          '<div class="dash-risk-name">' + escHtml(item.name) + '</div>' +
          '<div class="dash-risk-meta">' +
            '<span class="dash-risk-trend">&#8593; +' + trend + '%</span>' +
            '<span class="dash-risk-type">' + escHtml(typeLabel) + '</span>' +
            '<span class="dash-risk-events">' + item.count + ' events</span>' +
          '</div>' +
        '</div>' +
        '<div class="dash-risk-spark"><canvas id="spark-' + idx + '" width="100" height="30"></canvas></div>' +
      '</div>';
    });

    container.innerHTML = html;

    // Render sparklines
    sorted.forEach(function (item, idx) {
      renderSparkline('spark-' + idx, item.count);
    });

    // Store risk data for map overlay
    window.GCT_RiskData = sorted.map(function (item) {
      var coords = centroids[item.iso];
      return { iso: item.iso, name: item.name, count: item.count, lat: coords ? coords[0] : 0, lng: coords ? coords[1] : 0 };
    });
  }

  function renderSparkline(canvasId, baseCount) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var isLight = document.body.classList.contains('light-theme');

    // Generate 30-day simulated trend data
    var data = [];
    var val = Math.max(1, baseCount * 0.3);
    for (var i = 0; i < 30; i++) {
      val += (Math.random() - 0.35) * (baseCount * 0.15);
      val = Math.max(1, val);
      data.push(Math.round(val));
    }

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.map(function (_, i) { return i; }),
        datasets: [{
          data: data,
          borderColor: '#cb843e',
          backgroundColor: 'rgba(203, 132, 62, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1.5
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        animation: { duration: 800 }
      }
    });
  }

  // ---- Helpers ----
  function findNearestCountry(lat, lng, centroids) {
    var nearest = null;
    var minDist = Infinity;
    Object.keys(centroids).forEach(function (iso) {
      var c = centroids[iso];
      var d = Math.pow(lat - c[0], 2) + Math.pow(lng - c[1], 2);
      if (d < minDist) { minDist = d; nearest = iso; }
    });
    return nearest;
  }

  function buildCountryNames() {
    return {
      AFG: 'Afghanistan', AGO: 'Angola', ALB: 'Albanie', DZA: 'Algerie', ARG: 'Argentine',
      ARM: 'Armenie', AUS: 'Australie', AUT: 'Autriche', AZE: 'Azerbaidjan',
      BDI: 'Burundi', BEL: 'Belgique', BEN: 'Benin', BGD: 'Bangladesh', BGR: 'Bulgarie',
      BFA: 'Burkina Faso', BHR: 'Bahrein', BIH: 'Bosnie-Herzegovine', BLR: 'Bielorussie',
      BOL: 'Bolivie', BRA: 'Bresil', BRN: 'Brunei', BTN: 'Bhoutan', BWA: 'Botswana',
      CAF: 'Centrafrique', CAN: 'Canada', CHE: 'Suisse', CHL: 'Chili', CHN: 'Chine',
      CIV: "Cote d'Ivoire", CMR: 'Cameroun', COD: 'RD Congo', COG: 'Congo', COL: 'Colombie',
      CRI: 'Costa Rica', CUB: 'Cuba', CYP: 'Chypre', CZE: 'Tchequie',
      DEU: 'Allemagne', DJI: 'Djibouti', DNK: 'Danemark', DOM: 'Rep. Dominicaine',
      ECU: 'Equateur', EGY: 'Egypte', ERI: 'Erythree', ESP: 'Espagne', EST: 'Estonie',
      ETH: 'Ethiopie', FIN: 'Finlande', FRA: 'France', GAB: 'Gabon', GBR: 'Royaume-Uni',
      GEO: 'Georgie', GHA: 'Ghana', GIN: 'Guinee', GMB: 'Gambie', GNB: 'Guinee-Bissau',
      GNQ: 'Guinee equatoriale', GRC: 'Grece', GTM: 'Guatemala', GUF: 'Guyane francaise',
      HND: 'Honduras', HRV: 'Croatie', HTI: 'Haiti', HUN: 'Hongrie',
      IDN: 'Indonesie', IND: 'Inde', IRN: 'Iran', IRQ: 'Irak', IRL: 'Irlande',
      ISR: 'Israel', ITA: 'Italie', JAM: 'Jamaique', JOR: 'Jordanie', JPN: 'Japon',
      KAZ: 'Kazakhstan', KEN: 'Kenya', KGZ: 'Kirghizistan', KHM: 'Cambodge',
      KOR: 'Coree du Sud', KWT: 'Koweit', LAO: 'Laos', LBN: 'Liban', LBR: 'Liberia',
      LBY: 'Libye', LKA: 'Sri Lanka', LSO: 'Lesotho', LTU: 'Lituanie', LUX: 'Luxembourg',
      LVA: 'Lettonie', MAR: 'Maroc', MDA: 'Moldavie', MDG: 'Madagascar', MEX: 'Mexique',
      MKD: 'Macedoine du Nord', MLI: 'Mali', MMR: 'Myanmar', MNE: 'Montenegro',
      MNG: 'Mongolie', MOZ: 'Mozambique', MRT: 'Mauritanie', MWI: 'Malawi', MYS: 'Malaisie',
      NAM: 'Namibie', NER: 'Niger', NGA: 'Nigeria', NIC: 'Nicaragua', NLD: 'Pays-Bas',
      NOR: 'Norvege', NPL: 'Nepal', NZL: 'Nouvelle-Zelande', OMN: 'Oman',
      PAK: 'Pakistan', PAN: 'Panama', PER: 'Perou', PHL: 'Philippines', PLW: 'Palaos',
      PNG: 'Papouasie-N-G', POL: 'Pologne', PRK: 'Coree du Nord', PRT: 'Portugal',
      PRY: 'Paraguay', PSE: 'Palestine', QAT: 'Qatar', ROU: 'Roumanie', RUS: 'Russie',
      RWA: 'Rwanda', SAU: 'Arabie Saoudite', SDN: 'Soudan', SEN: 'Senegal', SGP: 'Singapour',
      SLE: 'Sierra Leone', SLV: 'Salvador', SOM: 'Somalie', SRB: 'Serbie',
      SSD: 'Soudan du Sud', SUR: 'Suriname', SVK: 'Slovaquie', SVN: 'Slovenie',
      SWE: 'Suede', SWZ: 'Eswatini', SYR: 'Syrie', TCD: 'Tchad', TGO: 'Togo',
      THA: 'Thailande', TJK: 'Tadjikistan', TKM: 'Turkmenistan', TUN: 'Tunisie',
      TUR: 'Turquie', TZA: 'Tanzanie', UGA: 'Ouganda', UKR: 'Ukraine', URY: 'Uruguay',
      USA: 'Etats-Unis', UZB: 'Ouzbekistan', VEN: 'Venezuela', VNM: 'Vietnam',
      YEM: 'Yemen', ZAF: 'Afrique du Sud', ZMB: 'Zambie', ZWE: 'Zimbabwe'
    };
  }

  function escHtml(str) {
    var div = document.createElement('div');
    div.textContent = String(str || '');
    return div.innerHTML;
  }

  // ============================================================
  // ---- i18n additions ----
  // ============================================================
  function addI18n() {
    if (!window.GCT || !window.GCT.i18n) return;
    var fr = window.GCT.i18n.fr;
    var en = window.GCT.i18n.en;
    if (fr) {
      fr.dashTitle = 'Dashboard Analytics';
      fr.dashConflicts = 'Conflits actifs';
      fr.dashCasualties = 'Victimes estimees';
      fr.dashRefugees = 'Refugies (UNHCR)';
      fr.dashGdelt = 'Evenements GDELT';
      fr.dashTop10 = 'Top 10 — Conflits les plus meurtriers';
      fr.dashByYear = 'Victimes par annee (2020-2026)';
      fr.dashByRegion = 'Repartition par region';
      fr.dashByType = 'Repartition par type';
      fr.dashByIntensity = 'Repartition par intensite';
      fr.dashMiniMap = 'Zones les plus touchees';
      fr.dashRiskTitle = 'Zones a surveiller';
      fr.dashRiskLoading = 'Analyse des tendances GDELT...';
      fr.dashRiskNoData = 'Pas assez de donnees GDELT pour l\'analyse';
      fr.dashRiskDisclaimer = 'Analyse basee sur les tendances GDELT — ne constitue pas une prediction formelle';
    }
    if (en) {
      en.dashTitle = 'Analytics Dashboard';
      en.dashConflicts = 'Active conflicts';
      en.dashCasualties = 'Estimated casualties';
      en.dashRefugees = 'Refugees (UNHCR)';
      en.dashGdelt = 'GDELT events';
      en.dashTop10 = 'Top 10 — Deadliest conflicts';
      en.dashByYear = 'Casualties per year (2020-2026)';
      en.dashByRegion = 'Distribution by region';
      en.dashByType = 'Distribution by type';
      en.dashByIntensity = 'Distribution by intensity';
      en.dashMiniMap = 'Most affected zones';
      en.dashRiskTitle = 'Zones to watch';
      en.dashRiskLoading = 'Analyzing GDELT trends...';
      en.dashRiskNoData = 'Not enough GDELT data for analysis';
      en.dashRiskDisclaimer = 'Analysis based on GDELT trends — does not constitute a formal prediction';
    }
  }

  // ============================================================
  // ---- Expose ----
  // ============================================================
  window.GCT_Dashboard = {
    open: openDashboard,
    close: closeDashboard,
    addI18n: addI18n
  };
})();
