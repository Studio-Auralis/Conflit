(function () {
  'use strict';

  // ============================================================
  // ---- i18n Dictionary ----
  // ============================================================
  var currentLang = localStorage.getItem('lang') || 'fr';

  var i18n = {
    fr: {
      headerDate: 'Données en temps réel — Février 2026',
      statConflicts: 'Conflits actifs',
      statCasualties: 'Victimes estimées',
      statEvents: 'Événements temps réel',
      tabConflicts: 'Conflits',
      tabNews: 'Actualités',
      searchPlaceholder: 'Rechercher un conflit...',
      filterRegion: 'Région',
      filterType: 'Type',
      filterIntensity: 'Intensité',
      filterAllRegions: 'Toutes les régions',
      filterAllTypes: 'Tous les types',
      filterAll: 'Toutes',
      typeCivilWar: 'Guerre civile',
      typeInternational: 'Conflit international',
      typeInsurgency: 'Insurrection',
      typeEthnic: 'Conflit interethnique',
      intensityHigh: 'Haute',
      intensityMedium: 'Moyenne',
      intensityLow: 'Basse',
      legendIntensity: 'Intensité des conflits',
      legendHigh: 'Guerre majeure',
      legendMedium: 'Conflit actif',
      legendLow: 'Basse intensité',
      legendEvents: 'Événements',
      legendHumanitarian: 'Zones humanitaires',
      evProtest: 'Manifestation',
      evAttack: 'Attentat / Attaque',
      evRiot: 'Émeute',
      evHumanitarian: 'Catastrophe humanitaire',
      evCeasefire: 'Cessez-le-feu',
      evCoup: 'Politique',
      hzCamp: 'Camp de réfugiés',
      hzFamine: 'Famine',
      hzHealth: 'Crise sanitaire',
      btnHeatmap: 'Heatmap',
      btnTimelapse: 'Timelapse',
      btnRefugees: 'Réfugiés',
      btnRefugeesFull: '100%',
      btnHumanitarian: 'Zones',
      btnTheme: 'Thème',
      btnExport: 'Exporter',
      btnEvents: 'Événements',
      exportPdf: 'Export PDF',
      exportLink: 'Copier le lien',
      linkCopied: 'Lien copié !',
      footer: 'Sources : ACLED, UCDP, Crisis Group, HRW, ICRC, GDELT — Compilé février 2026',
      timelineLast30: '30 derniers jours',
      popupInfos: 'Infos',
      popupNews: 'News',
      popupParties: 'Parties',
      popupSince: 'Depuis',
      popupCasualties: 'Victimes',
      popupRegion: 'Région',
      popupNoNews: 'Aucune actualité disponible',
      cpMore: 'En savoir plus',
      noConflictFound: 'Aucun conflit trouvé',
      gdeltLoading: 'Chargement des événements GDELT…',
      gdeltEmpty: 'Aucun événement GDELT dans la période sélectionnée.',
      updatedJustNow: "Mis à jour à l'instant",
      updatedAgo: 'Mis à jour il y a {n} min',
      timelineLast24h: 'Dernières 24h',
      timelineLastDays: '{n} derniers jours',
      timelineLastMonths: '{n} derniers mois',
      timelineLastYear: 'Dernière année',
      timelineLastYears: '{n} dernières années',
      casualtiesEstimated: '{n} victimes estimées',
      since: 'Depuis ',
      civilImpact: 'Impact civil',
      refugeesFrom: '{n} réfugiés de {from} vers {to}',
      months: ['', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      typeLabels: { manifestation: 'Manifestation', emeute: 'Émeute', attentat: 'Attaque', catastrophe_humanitaire: 'Crise humanitaire', cessez_le_feu: 'Cessez-le-feu', coup_etat: 'Évt politique' },
      intensityLabels: { haute: 'Haute', moyenne: 'Moyenne', basse: 'Basse' },
      btnDashboard: 'Dashboard',
      btnRiskZones: 'Risques',
      filterDateRange: 'Debut du conflit',
      filterCasualties: 'Victimes',
      filterReset: 'Reinitialiser les filtres',
      notifTitle: 'Nouvel evenement',
      notifEnabled: 'Notifications activees',
      notifDisabled: 'Notifications desactivees',
      btnAbout: 'A propos',
      btnSupport: 'Soutenir',
      partnersTitle: 'Nos Partenaires',
      partnerSlot: 'Votre logo ici',
      partnerCta: 'Devenir partenaire \u2192',
      footerDesc: 'Un projet Studio Auralis. Cartographie interactive des conflits dans le monde en temps reel.',
      footerNav: 'Navigation',
      footerMap: 'Carte',
      footerDashboard: 'Dashboard',
      footerAbout: 'A propos',
      footerContact: 'Contact',
      footerSources: 'Sources',
      footerFollow: 'Suivez-nous',
      footerCopyright: '\u00a9 2026 Studio Auralis \u2014 Donnees actualisees en temps reel',
      footerSupport: '\u2615 Soutenir le projet',
      headerSlogan: 'Les conflits du monde, expliqu\u00e9s et visualis\u00e9s',
      tickerDisplaced: 'millions de personnes d\u00e9plac\u00e9es dans le monde',
      tickerChildren: "millions d'enfants affect\u00e9s par les conflits",
      tickerSchools: '\u00e9coles d\u00e9truites ou endommag\u00e9es',
      tickerHospitals: 'h\u00f4pitaux attaqu\u00e9s',
      btnEducation: '\u00c9ducation',
      btnQuiz: 'Quiz',
      btnChildren: 'Enfants',
      educationBanner: 'Mode \u00c9ducation activ\u00e9 \u2014 Interface simplifi\u00e9e pour l\'apprentissage',
      childrenBanner: 'Mode Impact Enfants \u2014 Donn\u00e9es UNICEF & sources humanitaires',
      seoIntro: 'Global Conflict Tracker est une plateforme ind\u00e9pendante qui cartographie les conflits arm\u00e9s, les crises humanitaires et leurs impacts sur les populations civiles. Mis \u00e0 jour en temps r\u00e9el gr\u00e2ce aux donn\u00e9es de GDELT, UNHCR et ReliefWeb.',
      footerGlossary: 'Glossaire',
      footerTeachers: 'Espace Enseignants',
      ficheTitle: 'Comprendre en 5 points',
      ficheWho: 'Qui ?',
      ficheWhy: 'Pourquoi ?',
      ficheSince: 'Depuis quand ?',
      ficheConsequences: 'Cons\u00e9quences ?',
      ficheSolutions: 'Solutions possibles ?',
      comparaisonTitle: 'Pour mieux comprendre',
      comparaisonDisplaced: 'Les {n} d\u00e9plac\u00e9s repr\u00e9sentent {x} fois la population de {ville}',
      comparaisonVictims: "C'est comme si tous les habitants de {ville} disparaissaient",
      comparaisonDuration: 'Ce conflit dure depuis {n} ans \u2014 {ref}',
      temoignagesTitle: 'T\u00e9moignages',
      quizTitle: 'Quiz — Testez vos connaissances',
      glossaryTitle: 'Glossaire',
      layersTitle: 'Couches',
      layerConflicts: 'Conflits',
      layerEvents: 'Événements',
      layerGdelt: 'GDELT Live',
      layerRefugees: 'Flux réfugiés',
      layerHumanitarian: 'Zones humanitaires',
      layerHeatmap: 'Heatmap',
      filterMore: 'Filtres avancés',
      filterLess: 'Masquer les filtres'
    },
    en: {
      headerDate: 'Real-time data — February 2026',
      statConflicts: 'Active conflicts',
      statCasualties: 'Estimated casualties',
      statEvents: 'Real-time events',
      tabConflicts: 'Conflicts',
      tabNews: 'News',
      searchPlaceholder: 'Search a conflict...',
      filterRegion: 'Region',
      filterType: 'Type',
      filterIntensity: 'Intensity',
      filterAllRegions: 'All regions',
      filterAllTypes: 'All types',
      filterAll: 'All',
      typeCivilWar: 'Civil war',
      typeInternational: 'International conflict',
      typeInsurgency: 'Insurgency',
      typeEthnic: 'Ethnic conflict',
      intensityHigh: 'High',
      intensityMedium: 'Medium',
      intensityLow: 'Low',
      legendIntensity: 'Conflict intensity',
      legendHigh: 'Major war',
      legendMedium: 'Active conflict',
      legendLow: 'Low intensity',
      legendEvents: 'Events',
      legendHumanitarian: 'Humanitarian zones',
      evProtest: 'Protest',
      evAttack: 'Attack / Bombing',
      evRiot: 'Riot',
      evHumanitarian: 'Humanitarian crisis',
      evCeasefire: 'Ceasefire',
      evCoup: 'Political',
      hzCamp: 'Refugee camp',
      hzFamine: 'Famine',
      hzHealth: 'Health crisis',
      btnHeatmap: 'Heatmap',
      btnTimelapse: 'Timelapse',
      btnRefugees: 'Refugees',
      btnRefugeesFull: '100%',
      btnHumanitarian: 'Zones',
      btnTheme: 'Theme',
      btnExport: 'Export',
      btnEvents: 'Events',
      exportPdf: 'Export PDF',
      exportLink: 'Copy link',
      linkCopied: 'Link copied!',
      footer: 'Sources: ACLED, UCDP, Crisis Group, HRW, ICRC, GDELT — Compiled February 2026',
      timelineLast30: 'Last 30 days',
      popupInfos: 'Info',
      popupNews: 'News',
      popupParties: 'Parties',
      popupSince: 'Since',
      popupCasualties: 'Casualties',
      popupRegion: 'Region',
      popupNoNews: 'No news available',
      cpMore: 'Learn more',
      noConflictFound: 'No conflicts found',
      gdeltLoading: 'Loading GDELT events…',
      gdeltEmpty: 'No GDELT events in selected period.',
      updatedJustNow: 'Updated just now',
      updatedAgo: 'Updated {n} min ago',
      timelineLast24h: 'Last 24h',
      timelineLastDays: 'Last {n} days',
      timelineLastMonths: 'Last {n} months',
      timelineLastYear: 'Last year',
      timelineLastYears: 'Last {n} years',
      casualtiesEstimated: '{n} estimated casualties',
      since: 'Since ',
      civilImpact: 'Civilian impact',
      refugeesFrom: '{n} refugees from {from} to {to}',
      months: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      typeLabels: { manifestation: 'Protest', emeute: 'Riot', attentat: 'Attack', catastrophe_humanitaire: 'Humanitarian crisis', cessez_le_feu: 'Ceasefire', coup_etat: 'Political event' },
      intensityLabels: { haute: 'High', moyenne: 'Medium', basse: 'Low' },
      btnDashboard: 'Dashboard',
      btnRiskZones: 'Risk Zones',
      filterDateRange: 'Start date',
      filterCasualties: 'Casualties',
      filterReset: 'Reset filters',
      notifTitle: 'New event',
      notifEnabled: 'Notifications enabled',
      notifDisabled: 'Notifications disabled',
      btnAbout: 'About',
      btnSupport: 'Support',
      partnersTitle: 'Our Partners',
      partnerSlot: 'Your logo here',
      partnerCta: 'Become a partner \u2192',
      footerDesc: 'A Studio Auralis project. Interactive mapping of global conflicts in real time.',
      footerNav: 'Navigation',
      footerMap: 'Map',
      footerDashboard: 'Dashboard',
      footerAbout: 'About',
      footerContact: 'Contact',
      footerSources: 'Sources',
      footerFollow: 'Follow Us',
      footerCopyright: '\u00a9 2026 Studio Auralis \u2014 Real-time updated data',
      footerSupport: '\u2615 Support the project',
      headerSlogan: 'World conflicts, explained and visualized',
      tickerDisplaced: 'million people displaced worldwide',
      tickerChildren: 'million children affected by conflicts',
      tickerSchools: 'schools destroyed or damaged',
      tickerHospitals: 'hospitals attacked',
      btnEducation: 'Education',
      btnQuiz: 'Quiz',
      btnChildren: 'Children',
      educationBanner: 'Education Mode enabled \u2014 Simplified learning interface',
      childrenBanner: 'Children Impact Mode \u2014 UNICEF & humanitarian data',
      seoIntro: 'Global Conflict Tracker is an independent platform mapping armed conflicts, humanitarian crises and their impact on civilian populations. Updated in real time using GDELT, UNHCR and ReliefWeb data.',
      footerGlossary: 'Glossary',
      footerTeachers: 'Teacher Resources',
      ficheTitle: 'Understand in 5 points',
      ficheWho: 'Who?',
      ficheWhy: 'Why?',
      ficheSince: 'Since when?',
      ficheConsequences: 'Consequences?',
      ficheSolutions: 'Possible solutions?',
      comparaisonTitle: 'Putting it in perspective',
      comparaisonDisplaced: 'The {n} displaced represent {x} times the population of {city}',
      comparaisonVictims: "It's as if every resident of {city} disappeared",
      comparaisonDuration: 'This conflict has lasted {n} years \u2014 {ref}',
      temoignagesTitle: 'Testimonials',
      quizTitle: 'Quiz \u2014 Test your knowledge',
      glossaryTitle: 'Glossary',
      layersTitle: 'Layers',
      layerConflicts: 'Conflicts',
      layerEvents: 'Events',
      layerGdelt: 'GDELT Live',
      layerRefugees: 'Refugee flows',
      layerHumanitarian: 'Humanitarian zones',
      layerHeatmap: 'Heatmap',
      filterMore: 'Advanced filters',
      filterLess: 'Hide filters'
    }
  };

  function t(key) { return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.fr[key]) || key; }

  function getLocalizedField(obj, field) {
    if (currentLang === 'en' && obj[field + '_en']) return obj[field + '_en'];
    return obj[field];
  }

  function applyLanguage() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (i18n[currentLang] && i18n[currentLang][key]) {
        els[i].textContent = i18n[currentLang][key];
      }
    }
    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var pkey = placeholders[j].getAttribute('data-i18n-placeholder');
      if (i18n[currentLang] && i18n[currentLang][pkey]) {
        placeholders[j].placeholder = i18n[currentLang][pkey];
      }
    }
    // Update lang switch active state
    var langOpts = document.querySelectorAll('.lang-switch-option');
    for (var lo = 0; lo < langOpts.length; lo++) {
      if (langOpts[lo].dataset.lang === currentLang) langOpts[lo].classList.add('active');
      else langOpts[lo].classList.remove('active');
    }
    document.documentElement.lang = currentLang;
    // Re-render dynamic content
    renderList(filteredConflicts);
    if (activeTab === 'news') renderNews();
    if (activeTab === 'gdelt') renderGdeltList();
    updateEventCount();
    // Re-fetch GDELT with new language sourcelang
    fetchGdelt();
    var slider = document.getElementById('timeline-slider');
    if (slider) {
      var label = document.getElementById('timeline-label');
      label.textContent = formatTimelineLabel(parseInt(slider.value));
    }
  }

  // ============================================================
  // ---- State ----
  // ============================================================
  var conflicts = [];
  var events = [];
  var filteredConflicts = [];
  var markers = [];
  var eventMarkers = [];
  var map;
  var tileLayer;
  var searchTimer = null;
  var showConflicts = true;
  var showEvents = true;
  var activeTab = 'conflicts';
  var timelineDays = 1;
  var cachedEscDiv = document.createElement('div');

  // GDELT state
  var gdeltEvents = [];
  var gdeltMarkers = [];
  var showGdelt = true;
  var lastGdeltUpdate = null;
  var gdeltRefetchTimer = null;
  var focusMode = false;

  // Heatmap state
  var heatLayer = null;
  var showHeatmap = false;

  // Timelapse state
  var timelapseActive = false;
  var timelapsePlaying = false;
  var timelapseMonth = 0; // 0 = Jan 2020
  var timelapseSpeed = 1;
  var timelapseRAF = null;
  var timelapseLastTime = 0;
  var timelapseMarkerMap = {}; // keyed by conflict index, tracks existing timelapse markers
  var TIMELAPSE_START_YEAR = 2020;
  var TIMELAPSE_START_MONTH = 1;
  var TIMELAPSE_END_YEAR = 2026;
  var TIMELAPSE_END_MONTH = 2;
  var TIMELAPSE_TOTAL_MONTHS = (TIMELAPSE_END_YEAR - TIMELAPSE_START_YEAR) * 12 + (TIMELAPSE_END_MONTH - TIMELAPSE_START_MONTH);

  // Refugee state
  var showRefugees = false;
  var showAllRefugees = false;
  var refugeeArcs = [];
  var refugeeData = [];
  var lastRefugeeFetch = 0;

  // Humanitarian state
  var showHumanitarian = false;
  var humanitarianMarkers = [];
  var humanitarianData = [];
  var lastHumanitarianFetch = 0;

  // Theme state
  var currentTheme = localStorage.getItem('theme') || 'dark';

  // Notification state
  var notifEnabled = localStorage.getItem('notifEnabled') === 'true';
  var lastNotifTime = 0;
  var newEventCount = 0;
  var lastNotifTimestamp = parseInt(localStorage.getItem('lastNotifTimestamp')) || 0;

  // Risk zone state
  var showRiskZones = false;
  var riskZoneMarkers = [];

  // ============================================================
  // ---- Country Centroids (ISO3 → [lat, lng]) ----
  // ============================================================
  var COUNTRY_CENTROIDS = {
    AFG:[33.9,67.7],AGO:[-12.3,17.5],ALB:[41.2,20.2],DZA:[28,3],ARG:[-34.6,-58.4],ARM:[40.1,44.5],AUS:[-25.3,133.8],AUT:[47.5,14.6],AZE:[40.1,47.6],
    BDI:[-3.4,29.9],BEL:[50.8,4.5],BEN:[9.3,2.3],BGD:[23.7,90.4],BGR:[42.7,25.5],BHR:[26,50.5],BIH:[43.9,17.7],BLR:[53.7,27.9],BOL:[-16.3,-63.6],
    BRA:[-14.2,-51.9],BRN:[4.5,114.7],BTN:[27.5,90.4],BWA:[-22.3,24.7],CAF:[6.6,20.9],CAN:[56.1,-106.3],CHE:[46.8,8.2],CHL:[-35.7,-71.5],
    CHN:[35.9,104.2],CIV:[7.5,-5.5],CMR:[5.9,10.1],COD:[-4,21.8],COG:[-0.2,15.8],COL:[4.6,-74.3],CRI:[10,-84],CUB:[21.5,-77.8],CYP:[35.1,33.4],
    CZE:[49.8,15.5],DEU:[51.2,10.5],DJI:[11.6,43.1],DNK:[56.3,9.5],DOM:[18.7,-70.2],ECU:[-1.8,-78.2],EGY:[26.8,30.8],ERI:[15.2,39.8],
    ESP:[40.5,-3.7],EST:[58.6,25],ETH:[9,38.7],FIN:[61.9,25.7],FRA:[46.2,2.2],GAB:[-0.8,11.6],GBR:[55.4,-3.4],GEO:[42.3,43.4],GHA:[7.9,-1.0],
    GIN:[9.9,-11.7],GMB:[13.4,-15.3],GNB:[12,-15],GRC:[39.1,21.8],GTM:[15.8,-90.2],GUF:[4,-53],GNQ:[1.7,10.3],HND:[15.2,-86.2],HRV:[45.1,15.2],
    HTI:[19,-72.1],HUN:[47.2,19.5],IDN:[-0.8,113.9],IND:[20.6,79],IRN:[32.4,53.7],IRQ:[33.2,43.7],IRL:[53.4,-8.2],ISR:[31.1,34.8],ITA:[41.9,12.6],
    JAM:[18.1,-77.3],JOR:[30.6,36.2],JPN:[36.2,138.3],KAZ:[48.7,66.9],KEN:[-0.02,37.9],KGZ:[41.2,74.8],KHM:[12.6,105],KOR:[35.9,127.8],KWT:[29.3,47.5],
    LAO:[19.9,102.5],LBN:[33.9,35.9],LBR:[6.4,-9.4],LBY:[26.3,17.2],LKA:[7.9,80.8],LSO:[-29.6,28.2],LTU:[55.2,24],LUX:[49.8,6.1],LVA:[56.9,24.1],
    MAR:[31.8,-7.1],MDA:[47,28.4],MDG:[-18.8,46.9],MEX:[23.6,-102.6],MKD:[41.5,22],MLI:[17.6,-4],MMR:[19.8,96.1],MNE:[42.7,19.4],MNG:[46.9,103.8],
    MOZ:[-18.7,35.5],MRT:[21.1,-10.9],MWI:[-13.3,34.3],MYS:[4.2,101.9],NAM:[-22.6,17.1],NER:[17.6,8.1],NGA:[9.1,8.7],NIC:[12.9,-85.2],NLD:[52.1,5.3],
    NOR:[60.5,8.5],NPL:[28.4,84.1],NZL:[-40.9,174.9],OMN:[21.5,55.9],PAK:[30.4,69.3],PAN:[8.5,-80.8],PER:[-9.2,-75],PHL:[12.9,121.8],PLW:[7.5,134.6],
    PNG:[-6.3,143.9],POL:[51.9,19.1],PRK:[40,127],PRT:[39.4,-8.2],PRY:[-23.4,-58.4],PSE:[31.9,35.2],QAT:[25.4,51.2],ROU:[45.9,24.9],RUS:[61.5,105.3],
    RWA:[-1.9,29.9],SAU:[23.9,45],SDN:[12.9,30.2],SEN:[14.5,-14.5],SGP:[1.4,103.8],SLE:[8.5,-11.8],SLV:[13.8,-88.9],SOM:[5.2,46.2],SRB:[44.2,20.5],
    SSD:[6.9,31.3],SUR:[4,-56],SVK:[48.7,19.7],SVN:[46.2,14.8],SWE:[60.1,18.6],SWZ:[-26.5,31.5],SYR:[35,38.5],TCD:[15.5,18.7],TGO:[8.6,1.2],
    THA:[15.9,100.9],TJK:[38.9,71.3],TKM:[39,59.6],TUN:[33.9,9.5],TUR:[38.9,35.2],TZA:[-6.4,34.9],UGA:[1.4,32.3],UKR:[48.4,31.2],URY:[-32.5,-55.8],
    USA:[37.1,-95.7],UZB:[41.4,64.6],VEN:[6.4,-66.6],VNM:[14.1,108.3],YEM:[15.6,48.5],ZAF:[-30.6,22.9],ZMB:[-13.1,27.8],ZWE:[-19.0,29.2],
    SSD:[6.9,31.3],COD:[-4,21.8]
  };

  // ============================================================
  // ---- Humanitarian Zones Static Fallback ----
  // ============================================================
  var HUMANITARIAN_FALLBACK = [
    { name: 'Camp de Zaatari', country: 'Jordanie', lat: 32.3, lng: 36.3, type: 'camp', affected: 80000, date: '2012-07-01', source: 'UNHCR' },
    { name: 'Camp de Dadaab', country: 'Kenya', lat: 0.06, lng: 40.3, type: 'camp', affected: 230000, date: '1991-10-01', source: 'UNHCR' },
    { name: 'Camp de Kutupalong', country: 'Bangladesh', lat: 21.2, lng: 92.2, type: 'camp', affected: 600000, date: '2017-08-25', source: 'UNHCR' },
    { name: 'Famine au Darfour', country: 'Soudan', lat: 13.5, lng: 25.3, type: 'famine', affected: 5000000, date: '2023-04-15', source: 'WFP' },
    { name: 'Famine au Tigré', country: 'Éthiopie', lat: 13.5, lng: 39.5, type: 'famine', affected: 2000000, date: '2020-11-04', source: 'WFP' },
    { name: 'Crise alimentaire Gaza', country: 'Palestine', lat: 31.4, lng: 34.3, type: 'famine', affected: 2300000, date: '2023-10-07', source: 'WFP' },
    { name: 'Épidémie choléra en Haïti', country: 'Haïti', lat: 18.6, lng: -72.3, type: 'health', affected: 40000, date: '2022-10-01', source: 'WHO' },
    { name: 'Crise sanitaire au Yémen', country: 'Yémen', lat: 15.4, lng: 44.2, type: 'health', affected: 18000000, date: '2014-09-01', source: 'WHO' },
    { name: 'Camps IDP au Soudan du Sud', country: 'Soudan du Sud', lat: 4.9, lng: 31.6, type: 'camp', affected: 1600000, date: '2013-12-15', source: 'UNHCR' },
    { name: 'Camp de Bidi Bidi', country: 'Ouganda', lat: 3.4, lng: 31.4, type: 'camp', affected: 270000, date: '2016-08-01', source: 'UNHCR' },
    { name: 'Crise humanitaire au Sahel', country: 'Burkina Faso', lat: 12.3, lng: -1.5, type: 'famine', affected: 3500000, date: '2019-01-01', source: 'OCHA' },
    { name: 'Épidémie Ebola en RDC', country: 'RDC', lat: 0.5, lng: 29.5, type: 'health', affected: 3500, date: '2018-08-01', source: 'WHO' },
    { name: 'Camps de déplacés en RDC (Goma)', country: 'RDC', lat: -1.7, lng: 29.2, type: 'camp', affected: 700000, date: '2025-01-27', source: 'UNHCR' },
    { name: 'Famine en Afghanistan', country: 'Afghanistan', lat: 34.5, lng: 69.2, type: 'famine', affected: 6000000, date: '2021-08-15', source: 'WFP' },
    { name: 'Crise sanitaire au Myanmar', country: 'Myanmar', lat: 19.8, lng: 96.1, type: 'health', affected: 1200000, date: '2021-02-01', source: 'WHO' },
    { name: 'Camps en Colombie (Catatumbo)', country: 'Colombie', lat: 8.5, lng: -73.1, type: 'camp', affected: 300000, date: '2025-01-20', source: 'UNHCR' },
    { name: 'Famine en Somalie', country: 'Somalie', lat: 2.0, lng: 45.3, type: 'famine', affected: 4300000, date: '2022-01-01', source: 'WFP' },
    { name: 'Crise sanitaire au Mozambique', country: 'Mozambique', lat: -12.2, lng: 40.2, type: 'health', affected: 950000, date: '2017-10-05', source: 'WHO' },
    { name: 'Camps de réfugiés syriens (Liban)', country: 'Liban', lat: 34.0, lng: 36.2, type: 'camp', affected: 1500000, date: '2011-03-15', source: 'UNHCR' },
    { name: 'Crise alimentaire en RCA', country: 'RCA', lat: 6.6, lng: 20.9, type: 'famine', affected: 2800000, date: '2012-12-10', source: 'WFP' }
  ];

  // ============================================================
  // ---- Init ----
  // ============================================================
  async function init() {
    applyThemeOnLoad();
    var results = await Promise.all([loadData('data.json'), loadData('events.json')]);
    conflicts = results[0];
    events = results[1];
    filteredConflicts = conflicts;
    initMap();
    renderMarkers(conflicts);
    renderEventMarkers(filterEventsByTimeline(events));
    renderList(conflicts);
    updateStats(conflicts, events);
    updateIntensityBar(conflicts);
    bindEvents();
    animateCounters();
    startGdelt();
    applyLanguage();
    exposeGlobalState();
    initNotifications();
    initTicker();
    applyEducationOnLoad();
    // Register i18n for sub-modules
    if (window.GCT_Dashboard && window.GCT_Dashboard.addI18n) window.GCT_Dashboard.addI18n();
    if (window.GCT_ConflictPage && window.GCT_ConflictPage.addI18n) window.GCT_ConflictPage.addI18n();
  }

  function exposeGlobalState() {
    window.GCT = {
      conflicts: conflicts,
      filteredConflicts: filteredConflicts,
      events: events,
      gdeltEvents: gdeltEvents,
      refugeeData: refugeeData,
      humanitarianData: humanitarianData,
      map: map,
      COUNTRY_CENTROIDS: COUNTRY_CENTROIDS,
      i18n: i18n,
      currentLang: currentLang,
      currentTheme: currentTheme,
      t: t,
      getLocalizedField: getLocalizedField,
      formatNumber: formatNumber,
      esc: esc,
      educationMode: false,
      childrenMode: childrenMode,
      TICKER_DATA: TICKER_DATA
    };
  }

  // ---- Data ----
  async function loadData(url) {
    try {
      var res = await fetch(url);
      return res.json();
    } catch (e) {
      console.warn('Failed to load ' + url, e);
      return [];
    }
  }

  // ============================================================
  // ---- Theme ----
  // ============================================================
  var DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  var LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  function applyThemeOnLoad() {
    if (currentTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }

  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme', currentTheme === 'light');
    localStorage.setItem('theme', currentTheme);

    if (tileLayer) {
      tileLayer.setUrl(currentTheme === 'light' ? LIGHT_TILES : DARK_TILES);
    }

    // Update theme button icons
    var moonIcons = document.querySelectorAll('.icon-moon');
    var sunIcons = document.querySelectorAll('.icon-sun');
    for (var i = 0; i < moonIcons.length; i++) {
      moonIcons[i].style.display = currentTheme === 'light' ? 'none' : '';
    }
    for (var j = 0; j < sunIcons.length; j++) {
      sunIcons[j].style.display = currentTheme === 'light' ? '' : 'none';
    }

    // Update heatmap gradient if active
    if (heatLayer && showHeatmap) {
      heatLayer.setOptions({
        gradient: currentTheme === 'light'
          ? { 0.35: '#ffd700', 0.5: '#ff8c00', 0.65: '#ff4500', 0.8: '#dc143c', 1.0: '#8b0000' }
          : { 0.35: '#ffe066', 0.5: '#ff9933', 0.65: '#ff5533', 0.8: '#cc2222', 1.0: '#ff0000' }
      });
    }
  }

  // ============================================================
  // ---- Map ----
  // ============================================================
  function initMap() {
    var southWest = L.latLng(-60, -180);
    var northEast = L.latLng(85, 180);
    var bounds = L.latLngBounds(southWest, northEast);

    var isMobile = window.innerWidth <= 900;
    map = L.map('map', {
      center: isMobile ? [52, 10] : [20, 10],
      zoom: isMobile ? 4 : 3,
      minZoom: isMobile ? 2 : 3,
      maxZoom: 12,
      zoomControl: true,
      attributionControl: true,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      preferCanvas: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      updateWhenZooming: true,
      updateWhenIdle: false,
    });

    tileLayer = L.tileLayer(currentTheme === 'light' ? LIGHT_TILES : DARK_TILES, {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      subdomains: 'abcd',
      maxZoom: 19,
      noWrap: true,
      bounds: [[-90, -180], [90, 180]],
      keepBuffer: 8,
    }).addTo(map);
  }

  // ============================================================
  // ---- Conflict Markers ----
  // ============================================================
  function renderMarkers(data) {
    clearMarkers();
    if (showHeatmap) return;
    if (!showConflicts) return;
    for (var i = 0; i < data.length; i++) {
      var c = data[i];
      var icon = L.divIcon({
        className: 'pulse-marker',
        html: '<div class="pulse-dot ' + c.intensity + '"></div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      var marker = L.marker([c.lat, c.lng], { icon: icon }).addTo(map);
      (function (conflict, mk, idx) {
        mk.on('click', function () { openPopup(conflict, mk, idx); });
      })(c, marker, i);
      markers.push(marker);
    }
  }

  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) map.removeLayer(markers[i]);
    markers = [];
  }

  // ============================================================
  // ---- Event Markers (static from events.json) ----
  // ============================================================
  var EVENT_ICON_DATA = {
    manifestation: { bg: 'rgba(139,92,246,0.2)', stroke: '#a78bfa',
      icon: '<path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>' },
    attentat: { bg: 'rgba(239,68,68,0.2)', stroke: '#f87171',
      icon: '<circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/>' },
    emeute: { bg: 'rgba(249,115,22,0.2)', stroke: '#fb923c',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" style="stroke:#fbbf24;stroke-width:2"/>' },
    catastrophe_humanitaire: { bg: 'rgba(59,130,246,0.2)', stroke: '#60a5fa',
      icon: '<path d="M10 10H6"/><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>' },
    cessez_le_feu: { bg: 'rgba(34,197,94,0.2)', stroke: '#4ade80',
      icon: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>' },
    coup_etat: { bg: 'rgba(226,232,240,0.12)', stroke: '#e2e8f0',
      icon: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/><line x1="2" x2="22" y1="18" y2="18"/>' }
  };

  function eventIconSvg(type, size) {
    var d = EVENT_ICON_DATA[type] || { bg: 'rgba(148,163,178,0.2)', stroke: '#94a3b8', icon: '<circle cx="12" cy="12" r="3"/>' };
    var svgSize = Math.round(size * 0.5);
    var radius = Math.round(size * 0.16);
    return '<div style="width:' + size + 'px;height:' + size + 'px;transform:rotate(45deg);border-radius:' + radius + 'px;background:' + d.bg + ';display:flex;align-items:center;justify-content:center;">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + svgSize + '" height="' + svgSize + '" style="transform:rotate(-45deg);fill:none;stroke:' + d.stroke + ';stroke-width:2;stroke-linecap:round;stroke-linejoin:round;">' + d.icon + '</svg></div>';
  }

  function renderEventMarkers(data) {
    clearEventMarkers();
    if (!showEvents) return;
    for (var i = 0; i < data.length; i++) {
      var ev = data[i];
      var icon = L.divIcon({
        className: 'event-marker',
        html: '<div class="event-dot">' + eventIconSvg(ev.type, 22) + '</div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      var marker = L.marker([ev.lat, ev.lng], { icon: icon }).addTo(map);
      (function (event, mk) {
        mk.on('click', function () { openEventPopup(event, mk); });
      })(ev, marker);
      eventMarkers.push(marker);
    }
  }

  function clearEventMarkers() {
    for (var i = 0; i < eventMarkers.length; i++) map.removeLayer(eventMarkers[i]);
    eventMarkers = [];
  }

  function filterEventsByTimeline(evts) {
    var now = new Date();
    var cutoff = new Date(now.getTime() - timelineDays * 24 * 60 * 60 * 1000);
    return evts.filter(function (ev) { return new Date(ev.date) >= cutoff; });
  }

  // ============================================================
  // ---- Heatmap ----
  // ============================================================
  function toggleHeatmap() {
    showHeatmap = !showHeatmap;
    var btn = document.getElementById('btn-heatmap');
    if (btn) btn.classList.toggle('active', showHeatmap);
    var mob = document.getElementById('mob-heatmap');
    if (mob) mob.classList.toggle('active', showHeatmap);
    var cb = document.getElementById('layer-heatmap');
    if (cb) cb.checked = showHeatmap;

    if (showHeatmap) {
      clearMarkers();
      updateHeatmapData();
    } else {
      if (heatLayer) { map.removeLayer(heatLayer); heatLayer = null; }
      renderMarkers(filteredConflicts);
    }
  }

  function updateHeatmapData() {
    if (!showHeatmap) return;
    var points = [];
    var maxCas = 1;
    for (var i = 0; i < filteredConflicts.length; i++) {
      if (filteredConflicts[i].casualties > maxCas) maxCas = filteredConflicts[i].casualties;
    }
    for (var j = 0; j < filteredConflicts.length; j++) {
      var c = filteredConflicts[j];
      var weight = Math.max(0.1, c.casualties / maxCas);
      points.push([c.lat, c.lng, weight]);
    }
    // Add events at lower weight
    if (showEvents) {
      var visibleEvents = filterEventsByTimeline(events);
      for (var k = 0; k < visibleEvents.length; k++) {
        points.push([visibleEvents[k].lat, visibleEvents[k].lng, 0.06]);
      }
    }
    // Add GDELT at lowest weight
    if (showGdelt) {
      for (var g = 0; g < gdeltEvents.length; g++) {
        points.push([gdeltEvents[g].lat, gdeltEvents[g].lng, 0.03]);
      }
    }

    var gradient = currentTheme === 'light'
      ? { 0.35: '#ffd700', 0.5: '#ff8c00', 0.65: '#ff4500', 0.8: '#dc143c', 1.0: '#8b0000' }
      : { 0.35: '#ffe066', 0.5: '#ff9933', 0.65: '#ff5533', 0.8: '#cc2222', 1.0: '#ff0000' };

    if (heatLayer) {
      heatLayer.setLatLngs(points);
    } else {
      heatLayer = L.heatLayer(points, {
        radius: 22,
        blur: 25,
        maxZoom: 10,
        max: 1.0,
        minOpacity: 0.15,
        gradient: gradient
      }).addTo(map);
    }
  }

  // ============================================================
  // ---- Timelapse ----
  // ============================================================
  function startTimelapse() {
    if (timelapseActive) return;
    timelapseActive = true;
    timelapseMonth = 0;
    timelapsePlaying = true;

    // Disable other features during timelapse
    var _bh = document.getElementById('btn-heatmap'); if (_bh) _bh.disabled = true;
    document.getElementById('btn-refugees').disabled = true;
    var _bhu = document.getElementById('btn-humanitarian'); if (_bhu) _bhu.disabled = true;
    document.querySelectorAll('#filters-section select').forEach(function(s) { s.disabled = true; });

    var overlay = document.getElementById('timelapse-overlay');
    overlay.style.display = '';
    document.getElementById('timelapse-play').style.display = 'none';
    document.getElementById('timelapse-pause').style.display = '';

    clearMarkers();
    clearEventMarkers();
    timelapseMarkerMap = {};
    if (showHeatmap) { if (heatLayer) map.removeLayer(heatLayer); }

    timelapseLastTime = 0;
    timelapseRAF = requestAnimationFrame(timelapseStep);
  }

  function timelapseStep(timestamp) {
    if (!timelapsePlaying || !timelapseActive) return;
    if (!timelapseLastTime) timelapseLastTime = timestamp;

    var elapsed = timestamp - timelapseLastTime;
    var interval = 800 / timelapseSpeed;

    if (elapsed >= interval) {
      timelapseLastTime = timestamp;
      timelapseMonth++;

      if (timelapseMonth > TIMELAPSE_TOTAL_MONTHS) {
        stopTimelapse();
        return;
      }
      renderTimelapseFrame();
    }
    timelapseRAF = requestAnimationFrame(timelapseStep);
  }

  function renderTimelapseFrame() {
    var year = TIMELAPSE_START_YEAR + Math.floor((TIMELAPSE_START_MONTH - 1 + timelapseMonth) / 12);
    var month = ((TIMELAPSE_START_MONTH - 1 + timelapseMonth) % 12) + 1;

    document.getElementById('timelapse-date').textContent = t('months')[month] + ' ' + year;
    var progress = timelapseMonth / TIMELAPSE_TOTAL_MONTHS;
    var progressBar = document.getElementById('timelapse-progress');
    progressBar.style.transform = 'scaleX(' + progress + ')';

    // Incremental rendering: only add NEW markers, update size of existing ones
    var currentDate = new Date(year, month - 1, 28);
    for (var i = 0; i < filteredConflicts.length; i++) {
      var c = filteredConflicts[i];
      var start = new Date(c.startDate);
      if (start <= currentDate) {
        var durationMonths = (currentDate - start) / (30 * 24 * 60 * 60 * 1000);
        var sizeClass = durationMonths < 12 ? 'tl-small' : (durationMonths < 36 ? 'tl-medium' : 'tl-large');

        if (timelapseMarkerMap[i]) {
          // Marker exists — just update size class without recreating
          var dot = timelapseMarkerMap[i].getElement();
          if (dot) {
            var inner = dot.querySelector('.pulse-dot');
            if (inner) {
              inner.classList.remove('tl-small', 'tl-medium', 'tl-large');
              inner.classList.add(sizeClass);
              // Remove fadein class after first frame
              inner.classList.remove('tl-fadein');
            }
          }
        } else {
          // New marker — create with fadein animation
          var icon = L.divIcon({
            className: 'pulse-marker',
            html: '<div class="pulse-dot ' + c.intensity + ' ' + sizeClass + ' tl-fadein"></div>',
            iconSize: [0, 0],
            iconAnchor: [0, 0],
          });
          var marker = L.marker([c.lat, c.lng], { icon: icon }).addTo(map);
          (function (conflict, mk, idx) {
            mk.on('click', function () { openPopup(conflict, mk, idx); });
          })(c, marker, i);
          markers.push(marker);
          timelapseMarkerMap[i] = marker;
        }
      }
    }
  }

  function pauseTimelapse() {
    timelapsePlaying = false;
    document.getElementById('timelapse-play').style.display = '';
    document.getElementById('timelapse-pause').style.display = 'none';
  }

  function resumeTimelapse() {
    if (!timelapseActive) { startTimelapse(); return; }
    timelapsePlaying = true;
    timelapseLastTime = 0;
    document.getElementById('timelapse-play').style.display = 'none';
    document.getElementById('timelapse-pause').style.display = '';
    timelapseRAF = requestAnimationFrame(timelapseStep);
  }

  function stopTimelapse() {
    timelapseActive = false;
    timelapsePlaying = false;
    if (timelapseRAF) cancelAnimationFrame(timelapseRAF);
    timelapseRAF = null;
    timelapseMarkerMap = {};

    document.getElementById('timelapse-overlay').style.display = 'none';
    document.getElementById('timelapse-progress').style.transform = 'scaleX(0)';
    var _bh2 = document.getElementById('btn-heatmap'); if (_bh2) _bh2.disabled = false;
    document.getElementById('btn-refugees').disabled = false;
    var _bhu2 = document.getElementById('btn-humanitarian'); if (_bhu2) _bhu2.disabled = false;
    document.querySelectorAll('#filters-section select').forEach(function(s) { s.disabled = false; });

    document.getElementById('btn-timelapse').classList.remove('active');
    var mob = document.getElementById('mob-timelapse');
    if (mob) mob.classList.remove('active');

    // Restore normal view
    renderMarkers(filteredConflicts);
    if (showEvents) renderEventMarkers(filterEventsByTimeline(events));
    if (showHeatmap) updateHeatmapData();
  }

  // ============================================================
  // ---- UNHCR Refugee Flows ----
  // ============================================================
  function toggleRefugees() {
    showRefugees = !showRefugees;
    document.getElementById('btn-refugees').classList.toggle('active', showRefugees);
    var mob = document.getElementById('mob-refugees');
    if (mob) mob.classList.toggle('active', showRefugees);
    var cb = document.getElementById('layer-refugees');
    if (cb) cb.checked = showRefugees;

    // Show/hide full button
    var fullBtn = document.getElementById('btn-refugees-full');
    var mobFullBtn = document.getElementById('mob-refugees-full');
    var btnGroup = fullBtn ? fullBtn.parentElement : null;
    if (fullBtn) fullBtn.style.display = showRefugees ? '' : 'none';
    if (mobFullBtn) mobFullBtn.style.display = showRefugees ? '' : 'none';
    if (btnGroup) btnGroup.classList.toggle('show-full', showRefugees);

    if (showRefugees) {
      fetchRefugees();
    } else {
      showAllRefugees = false;
      if (fullBtn) fullBtn.classList.remove('active');
      if (mobFullBtn) mobFullBtn.classList.remove('active');
      if (btnGroup) btnGroup.classList.remove('show-full');
      clearRefugeeArcs();
    }
  }

  function toggleRefugeesFull() {
    showAllRefugees = !showAllRefugees;
    var fullBtn = document.getElementById('btn-refugees-full');
    var mobFullBtn = document.getElementById('mob-refugees-full');
    if (fullBtn) fullBtn.classList.toggle('active', showAllRefugees);
    if (mobFullBtn) mobFullBtn.classList.toggle('active', showAllRefugees);
    renderRefugeeArcs();
  }

  async function fetchRefugees() {
    var now = Date.now();
    if (refugeeData.length > 0 && (now - lastRefugeeFetch) < 3600000) {
      renderRefugeeArcs();
      return;
    }

    try {
      var url = 'https://api.unhcr.org/population/v1/population/?year=2023&limit=2000&coo_all=true&coa_all=true';
      var res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      var json = await res.json();
      var items = json.items || [];

      refugeeData = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var to = item.coa_iso;
        var origin = item.coo_iso;
        var refugees = parseInt(item.refugees, 10) || 0;

        if (!origin || !to || origin === to || refugees < 1000) continue;
        if (!COUNTRY_CENTROIDS[origin] || !COUNTRY_CENTROIDS[to]) continue;

        refugeeData.push({
          from: origin,
          to: to,
          fromName: item.coo_name || origin,
          toName: item.coa_name || to,
          refugees: refugees,
          fromLatLng: COUNTRY_CENTROIDS[origin],
          toLatLng: COUNTRY_CENTROIDS[to]
        });
      }

      lastRefugeeFetch = Date.now();
      if (window.GCT) window.GCT.refugeeData = refugeeData;
      if (showRefugees) renderRefugeeArcs();
    } catch (e) {
      console.warn('[UNHCR] Fetch failed:', e);
    }
  }

  function renderRefugeeArcs() {
    clearRefugeeArcs();
    if (!showRefugees || !refugeeData.length) return;

    var maxRef = 1;
    for (var i = 0; i < refugeeData.length; i++) {
      if (refugeeData[i].refugees > maxRef) maxRef = refugeeData[i].refugees;
    }

    var sorted = refugeeData.slice().sort(function(a, b) { return b.refugees - a.refugees; });
    if (!showAllRefugees) {
      sorted = sorted.filter(function(d) { return d.refugees >= 50000; });
    }
    var limit = showAllRefugees ? sorted.length : Math.min(sorted.length, 25);

    for (var j = 0; j < limit; j++) {
      var d = sorted[j];
      var points = quadraticBezier(d.fromLatLng, d.toLatLng, 30);
      var weight = Math.max(2, (d.refugees / maxRef) * 6);

      var polyline = L.polyline(points, {
        color: '#4a90d9',
        weight: weight,
        opacity: 0.35,
        dashArray: '8 6',
        className: 'refugee-arc'
      }).addTo(map);

      (function (data) {
        polyline.on('mouseover', function (e) {
          var popup = L.popup({ closeButton: false, offset: [0, -10] })
            .setLatLng(e.latlng)
            .setContent('<div style="font-size:12px;padding:4px 8px;">' +
              t('refugeesFrom').replace('{n}', formatNumber(data.refugees)).replace('{from}', esc(data.fromName)).replace('{to}', esc(data.toName)) +
              '</div>')
            .openOn(map);
        });
        polyline.on('mouseout', function () { map.closePopup(); });
      })(d);

      refugeeArcs.push(polyline);
    }
  }

  function clearRefugeeArcs() {
    for (var i = 0; i < refugeeArcs.length; i++) map.removeLayer(refugeeArcs[i]);
    refugeeArcs = [];
  }

  function quadraticBezier(from, to, segments) {
    var midLat = (from[0] + to[0]) / 2;
    var midLng = (from[1] + to[1]) / 2;
    var dx = to[1] - from[1];
    var dy = to[0] - from[0];
    var dist = Math.sqrt(dx * dx + dy * dy);
    var offset = dist * 0.18;
    var cpLat = midLat + (dx / dist) * offset;
    var cpLng = midLng - (dy / dist) * offset;

    var points = [];
    for (var i = 0; i <= segments; i++) {
      var t2 = i / segments;
      var inv = 1 - t2;
      var lat = inv * inv * from[0] + 2 * inv * t2 * cpLat + t2 * t2 * to[0];
      var lng = inv * inv * from[1] + 2 * inv * t2 * cpLng + t2 * t2 * to[1];
      points.push([lat, lng]);
    }
    return points;
  }

  // ============================================================
  // ---- Humanitarian Zones (ReliefWeb + fallback) ----
  // ============================================================
  function toggleHumanitarian() {
    showHumanitarian = !showHumanitarian;
    var btn = document.getElementById('btn-humanitarian');
    if (btn) btn.classList.toggle('active', showHumanitarian);
    var mob = document.getElementById('mob-humanitarian');
    if (mob) mob.classList.toggle('active', showHumanitarian);
    var cb = document.getElementById('layer-humanitarian');
    if (cb) cb.checked = showHumanitarian;

    // Toggle legend items
    var show = showHumanitarian ? '' : 'none';
    document.getElementById('legend-sep-humanitarian').style.display = show;
    document.getElementById('legend-title-humanitarian').style.display = show;
    document.getElementById('legend-camp').style.display = show;
    document.getElementById('legend-famine').style.display = show;
    document.getElementById('legend-health').style.display = show;

    if (showHumanitarian) {
      fetchHumanitarian();
    } else {
      clearHumanitarianMarkers();
    }
  }

  async function fetchHumanitarian() {
    var now = Date.now();
    if (humanitarianData.length > 0 && (now - lastHumanitarianFetch) < 1800000) {
      renderHumanitarianMarkers();
      return;
    }

    try {
      var url = 'https://api.reliefweb.int/v1/disasters?appname=gct-tracker&limit=30&filter[field]=status&filter[value]=current&fields[include][]=name&fields[include][]=country.name&fields[include][]=type.name&fields[include][]=date.created';
      var res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      var json = await res.json();
      if (json.data && json.data.length > 0) {
        // Process ReliefWeb data...
        humanitarianData = HUMANITARIAN_FALLBACK; // Still use fallback for geo-positioning
      } else {
        humanitarianData = HUMANITARIAN_FALLBACK;
      }
    } catch (e) {
      console.warn('[ReliefWeb] Fetch failed, using fallback:', e);
      humanitarianData = HUMANITARIAN_FALLBACK;
    }

    lastHumanitarianFetch = Date.now();
    if (window.GCT) window.GCT.humanitarianData = humanitarianData;
    if (showHumanitarian) renderHumanitarianMarkers();
  }

  function renderHumanitarianMarkers() {
    clearHumanitarianMarkers();
    if (!showHumanitarian || !humanitarianData.length) return;

    for (var i = 0; i < humanitarianData.length; i++) {
      var hz = humanitarianData[i];
      var icon = L.divIcon({
        className: 'humanitarian-marker',
        html: '<div class="hz-dot ' + hz.type + '"></div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      var marker = L.marker([hz.lat, hz.lng], { icon: icon }).addTo(map);
      (function (zone, mk) {
        mk.on('click', function () { openHumanitarianPopup(zone, mk); });
      })(hz, marker);
      humanitarianMarkers.push(marker);
    }
  }

  function clearHumanitarianMarkers() {
    for (var i = 0; i < humanitarianMarkers.length; i++) map.removeLayer(humanitarianMarkers[i]);
    humanitarianMarkers = [];
  }

  function openHumanitarianPopup(hz, marker) {
    var typeLabels = { camp: t('hzCamp'), famine: t('hzFamine'), health: t('hzHealth') };
    var typeColors = { camp: 'var(--hz-camp)', famine: 'var(--hz-famine)', health: 'var(--hz-health)' };

    var html = '<div class="popup-event">' +
      '<span class="popup-event-type" style="background:' + typeColors[hz.type] + '20;color:' + typeColors[hz.type] + '">' + (typeLabels[hz.type] || hz.type) + '</span>' +
      '<div class="popup-event-title">' + esc(hz.name) + '</div>' +
      '<div class="popup-event-date">' + esc(hz.country) + ' — ' + formatDateFull(hz.date) + '</div>' +
      '<p class="popup-event-summary">' + formatNumber(hz.affected) + ' ' + t('popupCasualties').toLowerCase() + '</p>' +
      '<div class="popup-event-source"><span style="font-size:10px;color:var(--text-muted);">' + esc(hz.source) + '</span></div>' +
    '</div>';

    marker.bindPopup(html, { maxWidth: 350, className: '' }).openPopup();
  }

  function findNearbyHumanitarianZones(lat, lng, radiusKm) {
    if (!humanitarianData.length) return [];
    var nearby = [];
    for (var i = 0; i < humanitarianData.length; i++) {
      var hz = humanitarianData[i];
      var dist = haversineKm(lat, lng, hz.lat, hz.lng);
      if (dist <= radiusKm) nearby.push(hz);
    }
    return nearby;
  }

  function haversineKm(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ============================================================
  // ---- GDELT API Integration ----
  // ============================================================
  var GDELT_GEO = 'https://api.gdeltproject.org/api/v2/geo/geo';

  var GDELT_QUERIES = [
    { q: '(bombing OR airstrike OR "suicide attack" OR "terrorist attack" OR shelling OR "car bomb" OR "missile strike")', dt: 'attentat' },
    { q: '(protest OR "mass demonstration" OR "anti-government" OR uprising OR "popular mobilization")', dt: 'manifestation' },
    { q: '(riot OR "violent clashes" OR "civil unrest" OR looting)', dt: 'emeute' },
    { q: '("ceasefire agreement" OR "peace agreement" OR "truce declaration" OR "peace negotiation" OR "peace deal")', dt: 'cessez_le_feu' },
    { q: '("humanitarian crisis" OR famine OR "refugee camp" OR "mass displacement" OR "food shortage")', dt: 'catastrophe_humanitaire' },
    { q: '("coup attempt" OR "military coup" OR junta OR "martial law" OR overthrow)', dt: 'coup_etat' }
  ];

  function startGdelt() {
    fetchGdelt();
    setInterval(fetchGdelt, 15 * 60 * 1000);
    setInterval(function () { updateLiveIndicator(!!lastGdeltUpdate); }, 60000);
  }

  async function fetchGdelt() {
    try {
      var sourceLang = currentLang === 'fr' ? 'sourcelang:french' : 'sourcelang:english';
      // GDELT PointData mode: min 2 days (API errors below), max 7 days
      var tsMins = Math.max(Math.min(timelineDays * 24 * 60, 10080), 2880);
      var promises = GDELT_QUERIES.map(function (item) {
        var url = GDELT_GEO +
          '?query=' + encodeURIComponent(item.q + ' ' + sourceLang) +
          '&mode=PointData&format=GeoJSON&timespan=' + tsMins + '&MAXROWS=75&_cb=' + Date.now();
        return fetch(url).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          return r.json();
        }).then(function (json) {
          var feats = (json && json.features) || [];
          // Reject GDELT error responses (error text in feature names)
          if (feats.length > 0 && feats[0].properties && /^ERROR:/i.test(feats[0].properties.name || '')) {
            return { features: [], dt: item.dt };
          }
          return { features: feats, dt: item.dt };
        }).catch(function () { return { features: [], dt: item.dt }; });
      });

      var results = await Promise.all(promises);
      var raw = [];

      for (var i = 0; i < results.length; i++) {
        var res = results[i];
        var maxPerQuery = 50;
        for (var j = 0; j < res.features.length && j < maxPerQuery; j++) {
          var f = res.features[j];
          if (!f.geometry || !f.geometry.coordinates) continue;
          var coords = f.geometry.coordinates;
          var props = f.properties || {};

          // Skip features with error or empty names
          var featureName = props.name || '';
          if (!featureName || /^ERROR:/i.test(featureName)) continue;

          var articles = parseGdeltHtml(props.html);
          var firstArticle = articles[0] || {};

          var classifiedType = classifyGdelt(firstArticle.title || featureName, res.dt);
          if (classifiedType === null) continue;

          raw.push({
            type: classifiedType,
            name: firstArticle.title || featureName || 'Événement',
            location: featureName,
            lat: coords[1],
            lng: coords[0],
            date: todayStr(),
            summary: firstArticle.title || featureName || '',
            source: domainFromUrl(firstArticle.url || ''),
            url: firstArticle.url || '',
            count: props.count || 1,
            isGdelt: true
          });
        }
      }

      var prevCount = gdeltEvents.length;
      gdeltEvents = dedupeGdelt(raw);
      lastGdeltUpdate = new Date();
      updateLiveIndicator(true);
      updateEventCount();

      if (showGdelt) renderGdeltMarkers(gdeltEvents);
      if (activeTab === 'gdelt') renderGdeltList();
      if (showHeatmap) updateHeatmapData();
      if (window.GCT) { window.GCT.gdeltEvents = gdeltEvents; }

      // Check for new events and send notifications
      if (prevCount > 0 && gdeltEvents.length > prevCount) {
        var newOnes = gdeltEvents.slice(prevCount);
        checkNewGdeltEvents(newOnes);
      }
    } catch (e) {
      console.warn('[GDELT] Fetch failed:', e);
      updateLiveIndicator(false);
    }
  }

  function parseGdeltHtml(html) {
    if (!html) return [];
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var links = doc.querySelectorAll('a');
    var articles = [];
    for (var i = 0; i < links.length && i < 3; i++) {
      var title = links[i].textContent.trim();
      var url = links[i].getAttribute('href') || '';
      if (title) articles.push({ title: title, url: url });
    }
    return articles;
  }

  function classifyGdelt(title, fallback) {
    var t2 = (title || '').toLowerCase();

    // ---- Negative filter: skip non-conflict content (EN + FR) ----
    // Sports
    if (/\b(nfl|nba|nhl|mlb|fifa|premier league|champions league|world cup|super bowl|tennis|golf|cricket|boxing|mma|ufc|ligue 1|ligue des champions|coupe du monde|rugby|olympi|ballon d.or|transfert|match nul|victoire .* but|football|basket|handball)\b/.test(t2)) return null;
    // Entertainment / celebrity
    if (/\b(movie|film|album|concert|grammy|oscar|emmy|celebrity|hollywood|broadway|netflix|spotify|acteur|actrice|cin[ée]ma|chanson|chanteur|chanteuse|spectacle|festival|s[ée]rie t[ée]l[ée])\b/.test(t2)) return null;
    // Business / finance / trade
    if (/\b(stock market|wall street|nasdaq|dow jones|ipo|quarterly earnings|startup|venture capital|cryptocurrency|bitcoin|bourse|cac 40|action en bourse|chiffre d.affaires|b[ée]n[ée]fice net|introduction en bourse|tariff|trade war|trade deal|import duties|economic sanction|customs|droits de douane|guerre commerciale|accord commercial)\b/.test(t2)) return null;
    // Obituary / natural death / general news
    if (/\b(d[ée]c[èe]d[ée]|mort .{0,15}(ans|[âa]ge)|doyenne?|obituary|passed away|dies at|dead at|fun[ée]railles|obs[èe]ques|hommage .{0,10}(d[ée]c[èe]s|mort)|repose en paix|rip)\b/.test(t2)) return null;
    // Weather / lifestyle / misc
    if (/\b(weather forecast|recipe|fashion|diet|fitness|real estate|mortgage|m[ée]t[ée]o|recette|immobilier|horoscope|soldes|vacances)\b/.test(t2)) return null;
    // Diplomacy / summits / routine politics (without violence terms)
    if (/\b(summit|sommet|diplomatic|diplomatie|bilateral|r[ée]unir .{0,20}dirigeant|meeting with leaders|state visit|visite d.[ée]tat|trade talk|n[ée]gociation commerciale|G7|G20|OTAN|NATO|ambassador|ambassadeur|sondage|poll results|approval rating|debate|primary election|campagne [ée]lectorale|r[ée]forme|projet de loi|vote de confiance|inaugurat|investi[gt]ure|[ée]lection|election result|swearing.in)\b/.test(t2) && !/\b(violen|protest|[ée]meute|riot|clash|attack|attentat|bomb|kill|dead|mort|tu[ée]|explos|frappe|strike|assault|armed)\b/.test(t2)) return null;

    // ---- Positive classification: specific conflict terms (EN + FR) ----
    // Evidence of casualties/injuries in the title
    var hasCasualties = /\b(killed|dead|deaths?|dies?\b|died|casualties|wounded|injured|bless[ée]s?|tu[ée]s?|mort[s]?\b|victim[es]?|fatalities|body|bodies|massacre|slaughter|carnage)\b/.test(t2);

    // Protests
    if (/\b(protest|demonstrat|anti-government|uprising|mobiliz|manifestation|cort[èe]ge|gr[èe]ve g[ée]n[ée]rale|soul[èe]vement|mouvement populaire)\b/.test(t2)) return 'manifestation';
    // Attacks — ONLY if clear evidence of violence with casualties, or unambiguous military strikes
    if (/\b(bombing|airstrike|shelling|suicide attack|car bomb|missile strike|kamikaze|bombardement|tir de roquette|explosion meurtri[èe]re|fusillade|drone strike|frappe de drone|artillerie|obus|roquette|raid a[ée]rien)\b/.test(t2)) return 'attentat';
    // Attacks — ambiguous terms only count if casualties are confirmed in title
    if (hasCasualties && /\b(gunmen|insurgent attack|ambush|attentat|attaque arm[ée]e|embuscade|frappe[s]?\s|d[ée]truit|d[ée]truite|terrorist)\b/.test(t2)) return 'attentat';
    // Riots
    if (/\b(riot|civil unrest|violent clash|loot|[ée]meute|violences urbaines|pillage|affrontements violents)\b/.test(t2)) return 'emeute';
    // Humanitarian
    if (/\b(humanitarian crisis|famine|refugee|displaced|food shortage|drought|mass displacement|crise humanitaire|r[ée]fugi[ée]|d[ée]plac[ée]s|p[ée]nurie alimentaire|s[ée]cheresse)\b/.test(t2)) return 'catastrophe_humanitaire';
    // Ceasefire
    if (/\b(ceasefire|peace agreement|peace deal|truce|peace negotiation|peace accord|cessez.le.feu|accord de paix|tr[êe]ve|n[ée]gociation de paix)\b/.test(t2)) return 'cessez_le_feu';
    // Political / coup
    if (/\b(coup|overthrow|junta|martial law|military takeover|seize power|coup d.[ée]tat|junte|loi martiale|putsch|prise de pouvoir)\b/.test(t2)) return 'coup_etat';

    // General conflict terms: if casualties are mentioned → use fallback, otherwise → politique
    if (/\b(guerre|war|offensive|combat|conflit|conflict|arm[ée]e|army|militaire|military|assault|assaut|invasion|occup|si[èe]ge|siege|r[ée]sistance|milice|militia|insurr|guerr?illa|terroris)\b/.test(t2)) {
      return hasCasualties ? (fallback || 'coup_etat') : 'coup_etat';
    }

    // Casualties mentioned but no specific category matched → fallback or politique
    if (hasCasualties) return fallback || 'coup_etat';

    // No match at all → reject
    return null;
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function domainFromUrl(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return 'GDELT'; }
  }

  function dedupeGdelt(arr) {
    var seen = {};
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var e = arr[i];
      var key = (e.lat).toFixed(1) + ',' + (e.lng).toFixed(1) + ',' + e.type + ',' + e.name.substring(0, 60);
      if (!seen[key]) { seen[key] = true; out.push(e); }
    }
    return out;
  }

  // ---- GDELT Markers ----
  function renderGdeltMarkers(data) {
    clearGdeltMarkers();
    if (!showGdelt || !data) return;
    var filtered = filterGdeltByTimeline(data);
    for (var i = 0; i < filtered.length; i++) {
      var ev = filtered[i];
      var icon = L.divIcon({
        className: 'gdelt-marker',
        html: '<div class="gdelt-dot">' + eventIconSvg(ev.type, 18) + '</div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      var marker = L.marker([ev.lat, ev.lng], { icon: icon }).addTo(map);
      (function (event, mk) {
        mk.on('click', function () { openEventPopup(event, mk); });
      })(ev, marker);
      gdeltMarkers.push(marker);
    }
  }

  function clearGdeltMarkers() {
    for (var i = 0; i < gdeltMarkers.length; i++) map.removeLayer(gdeltMarkers[i]);
    gdeltMarkers = [];
  }

  function filterGdeltByTimeline(data) {
    var now = new Date();
    var cutoff = new Date(now.getTime() - timelineDays * 24 * 60 * 60 * 1000);
    return data.filter(function (ev) { return new Date(ev.date) >= cutoff; });
  }

  // ---- GDELT Sidebar List ----
  function renderGdeltList() {
    var container = document.getElementById('gdelt-list');
    if (!container) return;

    if (gdeltEvents.length === 0) {
      container.innerHTML = '<div class="gdelt-status">' +
        (lastGdeltUpdate ? t('gdeltEmpty') : t('gdeltLoading')) + '</div>';
      return;
    }

    var sorted = gdeltEvents.slice().sort(function (a, b) { return (b.count || 0) - (a.count || 0); });
    var frag = document.createDocumentFragment();
    var limit = Math.min(sorted.length, 80);

    for (var i = 0; i < limit; i++) {
      var ev = sorted[i];
      var div = document.createElement('div');
      div.className = 'gdelt-item';
      div.style.animationDelay = (i * 20) + 'ms';

      var tl = t('typeLabels');
      div.innerHTML =
        '<div class="gdelt-item-header">' +
          '<span class="gdelt-type-badge ' + ev.type + '">' + ((tl && tl[ev.type]) || ev.type) + '</span>' +
          '<span class="gdelt-item-date">' + esc(ev.location) + '</span>' +
        '</div>' +
        '<div class="gdelt-item-title">' + esc(ev.name) + '</div>' +
        '<div class="gdelt-item-source">' + esc(ev.source) + (ev.count > 1 ? ' \u00b7 ' + ev.count + ' articles' : '') + '</div>';

      (function (event) {
        div.addEventListener('click', function () {
          map.flyTo([event.lat, event.lng], 6, { duration: 0.8 });
          if (window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open');
        });
      })(ev);

      frag.appendChild(div);
    }

    container.innerHTML = '';
    container.appendChild(frag);
  }

  // ---- LIVE Indicator ----
  function updateLiveIndicator(connected) {
    var badge = document.getElementById('live-badge');
    var updateEl = document.getElementById('last-update');
    if (!badge) return;

    badge.classList.toggle('active', connected && showGdelt);
    badge.classList.toggle('error', !connected);

    if (updateEl && lastGdeltUpdate) {
      var ago = Math.round((Date.now() - lastGdeltUpdate.getTime()) / 60000);
      if (ago < 1) {
        updateEl.textContent = t('updatedJustNow');
      } else {
        updateEl.textContent = t('updatedAgo').replace('{n}', ago);
      }
    }
  }

  function updateEventCount() {
    var el = document.getElementById('event-count');
    if (!el) return;
    el._animId = (el._animId || 0) + 1;
    var staticCount = filterEventsByTimeline(events).length;
    var gdeltCount = showGdelt ? filterGdeltByTimeline(gdeltEvents).length : 0;
    el.textContent = staticCount + gdeltCount;
  }

  // ============================================================
  // ---- Popups ----
  // ============================================================
  function openPopup(c, marker, idx) {
    var il = t('intensityLabels');
    var intensityLabel = (il && il[c.intensity]) || c.intensity;
    var tagClass = 'tag-' + c.intensity;

    var newsHtml = '';
    if (c.news && c.news.length > 0) {
      for (var n = 0; n < c.news.length; n++) {
        var news = c.news[n];
        newsHtml += '<div class="popup-news-item">' +
          '<div class="popup-news-date">' + esc(news.date) + '</div>' +
          '<div class="popup-news-title">' + esc(news.title) + '</div>' +
          '<div class="popup-news-source"><a href="' + esc(news.url) + '" target="_blank" rel="noopener">' + esc(news.source) + ' &rarr;</a></div>' +
        '</div>';
      }
    } else {
      newsHtml = '<p style="padding:12px;color:var(--text-muted);font-size:12px;">' + t('popupNoNews') + '</p>';
    }

    // Humanitarian impact section
    var hzHtml = '';
    if (showHumanitarian && humanitarianData.length > 0) {
      var nearby = findNearbyHumanitarianZones(c.lat, c.lng, 500);
      if (nearby.length > 0) {
        var typeColors = { camp: 'var(--hz-camp)', famine: 'var(--hz-famine)', health: 'var(--hz-health)' };
        hzHtml = '<div class="popup-hz-section"><div class="popup-hz-title">' + t('civilImpact') + '</div>';
        for (var h = 0; h < nearby.length; h++) {
          hzHtml += '<div class="popup-hz-item"><span class="popup-hz-dot" style="background:' + (typeColors[nearby[h].type] || 'var(--text-muted)') + '"></span>' + esc(nearby[h].name) + '</div>';
        }
        hzHtml += '</div>';
      }
    }

    var conflictName = getLocalizedField(c, 'name');
    var conflictSummary = getLocalizedField(c, 'summary');

    var html = '<div class="popup-intensity-bar ' + c.intensity + '"></div>' +
      '<div class="popup-tabs">' +
        '<button class="popup-tab active" onclick="this.parentElement.parentElement.querySelector(\'.popup-tab-infos\').style.display=\'block\';this.parentElement.parentElement.querySelector(\'.popup-tab-news\').style.display=\'none\';this.classList.add(\'active\');this.nextElementSibling.classList.remove(\'active\')">' + t('popupInfos') + '</button>' +
        '<button class="popup-tab" onclick="this.parentElement.parentElement.querySelector(\'.popup-tab-news\').style.display=\'block\';this.parentElement.parentElement.querySelector(\'.popup-tab-infos\').style.display=\'none\';this.classList.add(\'active\');this.previousElementSibling.classList.remove(\'active\')">' + t('popupNews') + '</button>' +
      '</div>' +
      '<div class="popup-tab-infos" style="display:block">' +
        '<div class="popup-content">' +
          '<div class="popup-title">' + esc(conflictName) + '</div>' +
          '<span class="popup-type-badge ' + tagClass + '">' + esc(c.type) + ' \u2014 ' + intensityLabel + '</span>' +
          '<dl class="popup-meta">' +
            '<dt>' + t('popupParties') + '</dt><dd>' + c.parties.map(esc).join(', ') + '</dd>' +
            '<dt>' + t('popupSince') + '</dt><dd>' + formatDate(c.startDate) + '</dd>' +
            '<dt>' + t('popupCasualties') + '</dt><dd class="casualties-val">' + formatNumber(c.casualties) + '</dd>' +
            '<dt>' + t('popupRegion') + '</dt><dd>' + esc(c.region) + '</dd>' +
          '</dl>' +
          '<p class="popup-summary">' + esc(conflictSummary) + '</p>' +
          hzHtml +
          '<button class="popup-more-btn" onclick="window.GCT_ConflictPage && window.GCT_ConflictPage.open(window.GCT.conflicts[' + conflicts.indexOf(c) + '])">' + t('cpMore') + ' &rarr;</button>' +
        '</div>' +
      '</div>' +
      '<div class="popup-tab-news" style="display:none">' +
        '<div class="popup-news">' + newsHtml + '</div>' +
      '</div>';

    marker.bindPopup(html, { maxWidth: 400, className: '' }).openPopup();
    highlightCard(idx);
  }

  function openEventPopup(ev, marker) {
    var tl = t('typeLabels');
    var sourceLabel = ev.isGdelt ? 'GDELT \u00b7 ' + esc(ev.source) : esc(ev.source);
    var locationLine = ev.location ? '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">' + esc(ev.location) + '</div>' : '';

    var evName = getLocalizedField(ev, 'name');
    var evSummary = getLocalizedField(ev, 'summary');

    var html = '<div class="popup-event">' +
      '<span class="popup-event-type ' + ev.type + '">' + ((tl && tl[ev.type]) || ev.type) + '</span>' +
      '<div class="popup-event-title">' + esc(evName) + '</div>' +
      locationLine +
      '<div class="popup-event-date">' + formatDateFull(ev.date) + '</div>' +
      '<p class="popup-event-summary">' + esc(evSummary) + '</p>' +
      '<div class="popup-event-source"><a href="' + esc(ev.url) + '" target="_blank" rel="noopener">' + sourceLabel + ' &rarr;</a></div>' +
    '</div>';

    marker.bindPopup(html, { maxWidth: 380, className: '' }).openPopup();
  }

  // ============================================================
  // ---- List ----
  // ============================================================
  function renderList(data) {
    var container = document.getElementById('conflict-list');

    if (data.length === 0) {
      container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">' + t('noConflictFound') + '</div>';
      return;
    }

    var frag = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var c = data[i];
      var idx = conflicts.indexOf(c);
      var card = document.createElement('div');
      card.className = 'conflict-card intensity-' + c.intensity;
      card.dataset.index = idx;
      card.style.animationDelay = (i * 30) + 'ms';

      var cName = getLocalizedField(c, 'name');
      var cSummary = getLocalizedField(c, 'summary') || '';
      var excerpt = cSummary.substring(0, 110);
      if (cSummary.length > 110) excerpt += '\u2026';

      card.innerHTML =
        '<div class="conflict-card-name">' + esc(cName) + '</div>' +
        '<div class="conflict-card-detail">' +
          '<span>' + esc(c.type) + '</span>' +
          '<span class="conflict-card-sep">\u00b7</span>' +
          '<span>' + esc(c.region) + '</span>' +
          '<span class="conflict-card-sep">\u00b7</span>' +
          '<span>' + t('since') + formatDate(c.startDate) + '</span>' +
        '</div>' +
        '<div class="conflict-card-excerpt">' + esc(excerpt) + '</div>' +
        '<div class="conflict-card-footer">' +
          (c.casualties > 0 ? '<span class="conflict-card-casualties">' + t('casualtiesEstimated').replace('{n}', formatNumber(c.casualties)) + '</span>' : '') +
          '<span class="conflict-card-parties">' + c.parties.slice(0, 2).map(esc).join(' vs ') + '</span>' +
        '</div>';

      (function (index) {
        card.addEventListener('click', function () { flyToConflict(index); });
      })(idx);

      frag.appendChild(card);
    }

    container.innerHTML = '';
    container.appendChild(frag);
  }

  // ---- News List ----
  function renderNews() {
    var container = document.getElementById('news-list');
    var allNews = [];

    for (var i = 0; i < conflicts.length; i++) {
      var c = conflicts[i];
      if (c.news) {
        for (var n = 0; n < c.news.length; n++) {
          allNews.push({
            title: c.news[n].title,
            date: c.news[n].date,
            source: c.news[n].source,
            url: c.news[n].url,
            conflictName: getLocalizedField(c, 'name'),
            conflictIndex: i
          });
        }
      }
    }

    allNews.sort(function (a, b) { return b.date.localeCompare(a.date); });

    var frag = document.createDocumentFragment();
    var limit = Math.min(allNews.length, 60);
    for (var j = 0; j < limit; j++) {
      var item = allNews[j];
      var div = document.createElement('div');
      div.className = 'news-item';
      div.style.animationDelay = (j * 25) + 'ms';

      div.innerHTML =
        '<div class="news-item-date">' + esc(item.date) + '</div>' +
        '<div class="news-item-title">' + esc(item.title) + '</div>' +
        '<div class="news-item-meta">' +
          '<span class="news-item-conflict">' + esc(item.conflictName) + '</span>' +
          '<span class="news-item-source">' + esc(item.source) + '</span>' +
        '</div>';

      (function (idx) {
        div.addEventListener('click', function () { flyToConflict(idx); });
      })(item.conflictIndex);

      frag.appendChild(div);
    }

    container.innerHTML = '';
    container.appendChild(frag);
  }

  function highlightCard(idx) {
    var cards = document.querySelectorAll('.conflict-card.active');
    for (var i = 0; i < cards.length; i++) cards[i].classList.remove('active');
    var target = document.querySelector('.conflict-card[data-index="' + idx + '"]');
    if (target) {
      target.classList.add('active');
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function flyToConflict(idx) {
    var c = conflicts[idx];
    if (!c) return;
    map.flyTo([c.lat, c.lng], 6, { duration: 0.8, easeLinearity: 0.5 });

    setTimeout(function () {
      var markerIdx = filteredConflicts.indexOf(c);
      if (markerIdx >= 0 && markers[markerIdx]) openPopup(c, markers[markerIdx], idx);
    }, 600);

    if (window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open');
  }

  // ============================================================
  // ---- Stats ----
  // ============================================================
  function updateStats(data, evts) {
    document.getElementById('conflict-count').textContent = data.length;
    var total = 0;
    for (var i = 0; i < data.length; i++) total += data[i].casualties;
    document.getElementById('casualty-count').dataset.target = total;
    updateEventCount();
  }

  function updateIntensityBar(data) {
    var haute = 0, moyenne = 0, basse = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].intensity === 'haute') haute++;
      else if (data[i].intensity === 'moyenne') moyenne++;
      else basse++;
    }
    var total = data.length || 1;
    document.getElementById('bar-haute').style.width = ((haute / total) * 100) + '%';
    document.getElementById('bar-moyenne').style.width = ((moyenne / total) * 100) + '%';
    document.getElementById('bar-basse').style.width = ((basse / total) * 100) + '%';
  }

  function animateCounters() {
    var countEl = document.getElementById('conflict-count');
    animateValue(countEl, 0, parseInt(countEl.textContent), 1200);
    var casualtyEl = document.getElementById('casualty-count');
    var target = parseInt(casualtyEl.dataset.target) || 0;
    animateValue(casualtyEl, 0, target, 2000, true);
    var eventEl = document.getElementById('event-count');
    animateValue(eventEl, 0, parseInt(eventEl.textContent), 800);
  }

  function animateValue(el, start, end, duration, formatNum) {
    var startTime = null;
    var animId = ++el._animId || (el._animId = 1);
    function step(ts) {
      if (el._animId !== animId) return;
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(start + (end - start) * ease);
      el.textContent = formatNum ? formatNumber(current) : current;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ============================================================
  // ---- Filters ----
  // ============================================================
  function applyFilters() {
    var region = document.getElementById('filter-region').value;
    var type = document.getElementById('filter-type').value;
    var intensity = document.getElementById('filter-intensity').value;
    var search = document.getElementById('search-input').value.toLowerCase().trim();

    // Advanced filters
    var dateMinEl = document.getElementById('filter-date-min');
    var dateMaxEl = document.getElementById('filter-date-max');
    var casMinEl = document.getElementById('filter-cas-min');
    var casMaxEl = document.getElementById('filter-cas-max');
    var dateMin = dateMinEl ? parseInt(dateMinEl.value) : 1950;
    var dateMax = dateMaxEl ? parseInt(dateMaxEl.value) : 2026;
    var casMin = casMinEl ? parseInt(casMinEl.value) : 0;
    var casMax = casMaxEl ? parseInt(casMaxEl.value) : 600000;

    // Update labels
    var dateLabelEl = document.getElementById('filter-date-label');
    if (dateLabelEl) dateLabelEl.textContent = dateMin + ' — ' + dateMax;
    var casLabelEl = document.getElementById('filter-cas-label');
    if (casLabelEl) casLabelEl.textContent = formatNumber(casMin) + ' — ' + formatNumber(casMax) + '+';

    var filtered = [];
    for (var i = 0; i < conflicts.length; i++) {
      var c = conflicts[i];
      if (region !== 'all' && c.region !== region) continue;
      if (type !== 'all' && c.type !== type) continue;
      if (intensity !== 'all' && c.intensity !== intensity) continue;
      if (search) {
        var nameMatch = c.name.toLowerCase().indexOf(search) !== -1;
        var nameEnMatch = c.name_en && c.name_en.toLowerCase().indexOf(search) !== -1;
        if (!nameMatch && !nameEnMatch) continue;
      }
      // Date range filter
      var startYear = parseInt(c.startDate.split('-')[0]);
      if (startYear < dateMin || startYear > dateMax) continue;
      // Casualties range filter
      if (c.casualties < casMin || c.casualties > casMax) continue;

      filtered.push(c);
    }

    filteredConflicts = filtered;
    renderMarkers(filtered);
    renderList(filtered);
    updateStats(filtered, filterEventsByTimeline(events));
    updateIntensityBar(filtered);
    if (showHeatmap) updateHeatmapData();
    if (window.GCT) { window.GCT.filteredConflicts = filtered; }
  }

  function applyFiltersDebounced() {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 120);
  }

  // ---- Tab switching ----
  function switchTab(tab) {
    activeTab = tab;
    var allTabs = document.querySelectorAll('.sidebar-tab');
    for (var i = 0; i < allTabs.length; i++) allTabs[i].classList.remove('active');

    var conflictList = document.getElementById('conflict-list');
    var newsList = document.getElementById('news-list');
    var gdeltList = document.getElementById('gdelt-list');
    var filtersSection = document.getElementById('filters-section');
    var searchBox = document.querySelector('.search-box');

    conflictList.style.display = 'none';
    newsList.style.display = 'none';
    gdeltList.style.display = 'none';
    filtersSection.style.display = 'none';
    searchBox.style.display = 'none';

    if (tab === 'conflicts') {
      document.getElementById('tab-conflicts').classList.add('active');
      conflictList.style.display = '';
      filtersSection.style.display = '';
      searchBox.style.display = '';
    } else if (tab === 'news') {
      document.getElementById('tab-news').classList.add('active');
      newsList.style.display = '';
    } else if (tab === 'gdelt') {
      document.getElementById('tab-gdelt').classList.add('active');
      gdeltList.style.display = '';
    }
  }

  // ============================================================
  // ---- Export / Share ----
  // ============================================================
  function exportPdf() {
    if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
      console.warn('html2canvas or jsPDF not loaded');
      return;
    }
    var mapEl = document.getElementById('map');
    html2canvas(mapEl, { useCORS: true, logging: false }).then(function (canvas) {
      var imgData = canvas.toDataURL('image/png');
      var pdf = new jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      var w = pdf.internal.pageSize.getWidth();
      var h = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, w, h - 20);
      pdf.setFontSize(14);
      pdf.setTextColor(30, 31, 38);
      pdf.text('Global Conflict Tracker', 10, h - 14);
      pdf.setFontSize(9);
      pdf.text(conflicts.length + ' ' + t('statConflicts').toLowerCase() + ' — ' + new Date().toLocaleDateString(), 10, h - 8);
      pdf.save('global-conflict-tracker.pdf');
    });
    closeExportDropdown();
  }

  function shareTwitter() {
    var text = 'Global Conflict Tracker: ' + conflicts.length + ' active conflicts worldwide. Real-time data from ACLED, GDELT & humanitarian sources.';
    var url = window.location.href;
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank', 'width=550,height=420');
    closeExportDropdown();
  }

  function shareLinkedIn() {
    var url = window.location.href;
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'width=550,height=420');
    closeExportDropdown();
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(function () {
      var fb = document.getElementById('copy-feedback');
      fb.textContent = t('linkCopied');
      fb.classList.add('show');
      setTimeout(function () { fb.classList.remove('show'); }, 2000);
    });
    closeExportDropdown();
  }

  function toggleExportDropdown() {
    document.getElementById('export-dropdown').classList.toggle('open');
  }

  function closeExportDropdown() {
    document.getElementById('export-dropdown').classList.remove('open');
  }

  // ============================================================
  // ---- Events / Bindings ----
  // ============================================================
  function bindEvents() {
    document.getElementById('filter-region').addEventListener('change', applyFilters, { passive: true });
    document.getElementById('filter-type').addEventListener('change', applyFilters, { passive: true });
    document.getElementById('filter-intensity').addEventListener('change', applyFilters, { passive: true });
    document.getElementById('search-input').addEventListener('input', applyFiltersDebounced, { passive: true });

    document.getElementById('sidebar-toggle').addEventListener('click', function () {
      document.getElementById('sidebar').classList.toggle('open');
    });
    document.getElementById('sidebar-close').addEventListener('click', function () {
      document.getElementById('sidebar').classList.remove('open');
    });

    // Tab switching
    document.getElementById('tab-conflicts').addEventListener('click', function () { switchTab('conflicts'); });
    document.getElementById('tab-news').addEventListener('click', function () {
      switchTab('news');
      if (document.getElementById('news-list').children.length === 0) renderNews();
    });
    document.getElementById('tab-gdelt').addEventListener('click', function () { switchTab('gdelt'); renderGdeltList(); });

    // GDELT LIVE toggle
    var liveBadge = document.getElementById('live-badge');
    if (liveBadge) {
      liveBadge.addEventListener('click', function () {
        showGdelt = !showGdelt;
        if (showGdelt) { renderGdeltMarkers(gdeltEvents); liveBadge.classList.add('active'); }
        else { clearGdeltMarkers(); liveBadge.classList.remove('active'); }
        updateEventCount();
        if (showHeatmap) updateHeatmapData();
      });
    }

    // Focus mode
    var focusToggle = document.getElementById('focus-toggle');
    function toggleFocusMode() {
      focusMode = !focusMode;
      document.body.classList.toggle('focus-mode', focusMode);
      focusToggle.classList.toggle('active', focusMode);
      if (focusMode && window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open');
      setTimeout(function () { map.invalidateSize(); }, 450);
    }
    focusToggle.addEventListener('click', toggleFocusMode);

    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) toggleFocusMode();
      if (e.key === 'Escape' && focusMode) toggleFocusMode();
    });

    // Timeline slider
    var slider = document.getElementById('timeline-slider');
    slider.addEventListener('input', function () {
      timelineDays = parseInt(slider.value);
      document.getElementById('timeline-label').textContent = formatTimelineLabel(timelineDays);
      if (showEvents) renderEventMarkers(filterEventsByTimeline(events));
      if (showGdelt) renderGdeltMarkers(gdeltEvents);
      updateEventCount();
      if (showHeatmap) updateHeatmapData();
      // Debounced GDELT re-fetch with updated timespan
      clearTimeout(gdeltRefetchTimer);
      gdeltRefetchTimer = setTimeout(function () { fetchGdelt(); }, 1500);
    }, { passive: true });

    // ---- Dashboard button ----
    document.getElementById('btn-dashboard').addEventListener('click', function () {
      if (window.GCT_Dashboard) window.GCT_Dashboard.open();
    });

    // ---- About button ----
    var btnAbout = document.getElementById('btn-about');
    if (btnAbout) btnAbout.addEventListener('click', function () {
      if (window.GCT_Pages) window.GCT_Pages.openAbout();
    });

    // ---- Support button (coming soon) ----
    var btnSupport = document.getElementById('btn-support');
    if (btnSupport) btnSupport.addEventListener('click', function () {
      showFeedback(currentLang === 'fr' ? 'Bientôt disponible !' : 'Coming soon!');
    });

    // ---- Sponsor CTA ----
    var sponsorCta = document.getElementById('sponsor-cta');
    if (sponsorCta) sponsorCta.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.GCT_Pages) window.GCT_Pages.openContact();
    });

    // ---- Minimal footer links ----
    var footerAbout = document.getElementById('footer-about');
    if (footerAbout) footerAbout.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.GCT_Pages) window.GCT_Pages.openAbout();
    });
    var footerContact = document.getElementById('footer-contact');
    if (footerContact) footerContact.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.GCT_Pages) window.GCT_Pages.openContact();
    });
    var footerSupport = document.getElementById('footer-support');
    if (footerSupport) footerSupport.addEventListener('click', function (e) {
      e.preventDefault();
      showFeedback(currentLang === 'fr' ? 'Bientôt disponible !' : 'Coming soon!');
    });

    // ---- Risk zones button (removed from UI) ----
    var btnRisk = document.getElementById('btn-risk-zones');
    if (btnRisk) btnRisk.addEventListener('click', toggleRiskZones);

    // ---- Education mode button ----
    var btnEducation = document.getElementById('btn-education');
    if (btnEducation) btnEducation.addEventListener('click', toggleEducation);

    // ---- Quiz button ----
    var btnQuiz = document.getElementById('btn-quiz');
    if (btnQuiz) btnQuiz.addEventListener('click', function () {
      if (window.GCT_Quiz) window.GCT_Quiz.open();
    });

    // ---- Children impact button ----
    var btnChildren = document.getElementById('btn-children');
    if (btnChildren) btnChildren.addEventListener('click', toggleChildrenMode);

    // ---- Footer glossary / teachers ----
    var footerGlossary = document.getElementById('footer-glossary');
    if (footerGlossary) footerGlossary.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.GCT_Glossary) window.GCT_Glossary.open();
    });
    var footerTeachers = document.getElementById('footer-teachers');
    if (footerTeachers) footerTeachers.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.GCT_Pages) window.GCT_Pages.openTeachers();
    });

    // ---- Notification button ----
    var notifBtn = document.getElementById('btn-notif');
    if (notifBtn) {
      notifBtn.addEventListener('click', function () {
        if (newEventCount > 0) { resetNotifCount(); }
        else { toggleNotifications(); }
      });
    }
    updateNotifBtn();

    // ---- Advanced filter sliders ----
    var dateMinSlider = document.getElementById('filter-date-min');
    var dateMaxSlider = document.getElementById('filter-date-max');
    var casMinSlider = document.getElementById('filter-cas-min');
    var casMaxSlider = document.getElementById('filter-cas-max');
    if (dateMinSlider) dateMinSlider.addEventListener('input', applyFiltersDebounced, { passive: true });
    if (dateMaxSlider) dateMaxSlider.addEventListener('input', applyFiltersDebounced, { passive: true });
    if (casMinSlider) casMinSlider.addEventListener('input', applyFiltersDebounced, { passive: true });
    if (casMaxSlider) casMaxSlider.addEventListener('input', applyFiltersDebounced, { passive: true });

    // ---- Advanced filter toggle ----
    var filterToggle = document.getElementById('filter-toggle-btn');
    var filterAdvanced = document.getElementById('filter-advanced');
    if (filterToggle && filterAdvanced) {
      filterToggle.addEventListener('click', function () {
        var open = filterAdvanced.classList.toggle('open');
        filterToggle.textContent = open ? '− ' + t('filterLess') : '+ ' + t('filterMore');
      });
    }

    var resetBtn = document.getElementById('filter-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        document.getElementById('filter-region').value = 'all';
        document.getElementById('filter-type').value = 'all';
        document.getElementById('filter-intensity').value = 'all';
        document.getElementById('search-input').value = '';
        if (dateMinSlider) dateMinSlider.value = 1945;
        if (dateMaxSlider) dateMaxSlider.value = 2026;
        if (casMinSlider) casMinSlider.value = 0;
        if (casMaxSlider) casMaxSlider.value = 600000;
        applyFilters();
      });
    }

    // ---- Header action buttons ----
    document.getElementById('btn-timelapse').addEventListener('click', function () {
      if (timelapseActive) { stopTimelapse(); }
      else {
        this.classList.add('active');
        var mob = document.getElementById('mob-timelapse');
        if (mob) mob.classList.add('active');
        startTimelapse();
      }
    });
    document.getElementById('btn-refugees').addEventListener('click', toggleRefugees);
    document.getElementById('btn-refugees-full').addEventListener('click', toggleRefugeesFull);
    document.getElementById('btn-lang').addEventListener('click', function () {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('lang', currentLang);
      applyLanguage();
    });

    document.getElementById('btn-theme').addEventListener('click', toggleTheme);
    document.getElementById('btn-export').addEventListener('click', toggleExportDropdown);

    // Export options
    document.getElementById('export-pdf').addEventListener('click', exportPdf);
    document.getElementById('export-twitter').addEventListener('click', shareTwitter);
    document.getElementById('export-linkedin').addEventListener('click', shareLinkedIn);
    document.getElementById('export-link').addEventListener('click', copyLink);

    // Close export dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#export-wrapper')) closeExportDropdown();
    });

    // Timelapse controls
    document.getElementById('timelapse-play').addEventListener('click', resumeTimelapse);
    document.getElementById('timelapse-pause').addEventListener('click', pauseTimelapse);
    document.getElementById('timelapse-stop').addEventListener('click', stopTimelapse);

    // Timelapse speed buttons
    var speedBtns = document.querySelectorAll('.timelapse-speed-btn');
    speedBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        speedBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        timelapseSpeed = parseInt(btn.dataset.speed);
      });
    });

    // ---- Mobile action buttons (mirror header actions) ----
    var mobDashboard = document.getElementById('mob-dashboard');
    if (mobDashboard) mobDashboard.addEventListener('click', function () {
      if (window.GCT_Dashboard) window.GCT_Dashboard.open();
    });

    var mobRiskZones = document.getElementById('mob-risk-zones');
    if (mobRiskZones) mobRiskZones.addEventListener('click', toggleRiskZones);

    var mobNotif = document.getElementById('mob-notif');
    if (mobNotif) mobNotif.addEventListener('click', function () {
      if (newEventCount > 0) { resetNotifCount(); }
      else { toggleNotifications(); }
    });

    var mobTimelapse = document.getElementById('mob-timelapse');
    if (mobTimelapse) mobTimelapse.addEventListener('click', function () {
      if (timelapseActive) stopTimelapse();
      else {
        this.classList.add('active');
        document.getElementById('btn-timelapse').classList.add('active');
        startTimelapse();
      }
    });

    var mobRefugees = document.getElementById('mob-refugees');
    if (mobRefugees) mobRefugees.addEventListener('click', toggleRefugees);

    var mobRefugeesFull = document.getElementById('mob-refugees-full');
    if (mobRefugeesFull) mobRefugeesFull.addEventListener('click', toggleRefugeesFull);

    var mobLang = document.getElementById('mob-lang');
    if (mobLang) mobLang.addEventListener('click', function () {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('lang', currentLang);
      applyLanguage();
    });

    var mobTheme = document.getElementById('mob-theme');
    if (mobTheme) mobTheme.addEventListener('click', toggleTheme);

    var mobExport = document.getElementById('mob-export');
    if (mobExport) mobExport.addEventListener('click', function () {
      exportPdf();
    });

    // ---- Layer toggle checkboxes ----
    var layerConflicts = document.getElementById('layer-conflicts');
    if (layerConflicts) layerConflicts.addEventListener('change', function () {
      showConflicts = this.checked;
      if (showConflicts) renderMarkers(filteredConflicts);
      else clearMarkers();
    });

    var layerEvents = document.getElementById('layer-events');
    if (layerEvents) layerEvents.addEventListener('change', function () {
      showEvents = this.checked;
      if (showEvents) renderEventMarkers(filterEventsByTimeline(events));
      else clearEventMarkers();
    });

    var layerGdelt = document.getElementById('layer-gdelt');
    if (layerGdelt) layerGdelt.addEventListener('change', function () {
      showGdelt = this.checked;
      if (showGdelt) renderGdeltMarkers(gdeltEvents);
      else clearGdeltMarkers();
    });

    var layerRefugees = document.getElementById('layer-refugees');
    if (layerRefugees) layerRefugees.addEventListener('change', function () {
      if (this.checked !== showRefugees) toggleRefugees();
    });

    var layerHumanitarian = document.getElementById('layer-humanitarian');
    if (layerHumanitarian) layerHumanitarian.addEventListener('change', function () {
      if (this.checked !== showHumanitarian) toggleHumanitarian();
    });

    var layerHeatmap = document.getElementById('layer-heatmap');
    if (layerHeatmap) layerHeatmap.addEventListener('change', function () {
      if (this.checked !== showHeatmap) toggleHeatmap();
    });
  }

  // ============================================================
  // ---- Helpers ----
  // ============================================================
  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return Math.round(n).toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US');
    return String(n);
  }

  function formatDate(dateStr) {
    var parts = dateStr.split('-');
    var months = t('months');
    return months[parseInt(parts[1])] + ' ' + parts[0];
  }

  function formatDateFull(dateStr) {
    var parts = dateStr.split('-');
    var months = t('months');
    return parseInt(parts[2]) + ' ' + months[parseInt(parts[1])] + ' ' + parts[0];
  }

  function formatTimelineLabel(days) {
    if (days <= 1) return t('timelineLast24h');
    if (days <= 90) return t('timelineLastDays').replace('{n}', days);
    if (days < 365) return t('timelineLastMonths').replace('{n}', Math.round(days / 30));
    var years = Math.round(days / 365 * 10) / 10;
    if (years <= 1) return t('timelineLastYear');
    var label = years % 1 === 0 ? String(years) : years.toFixed(1);
    return t('timelineLastYears').replace('{n}', label);
  }

  function esc(str) {
    if (str === undefined || str === null) return '';
    cachedEscDiv.textContent = String(str);
    return cachedEscDiv.innerHTML;
  }

  // ============================================================
  // ---- Notifications ----
  // ============================================================
  function initNotifications() {
    updateNotifBadge();
  }

  function toggleNotifications() {
    if (!notifEnabled) {
      if ('Notification' in window) {
        Notification.requestPermission().then(function (perm) {
          if (perm === 'granted') {
            notifEnabled = true;
            localStorage.setItem('notifEnabled', 'true');
            updateNotifBtn();
            showFeedback(t('notifEnabled'));
          }
        });
      }
    } else {
      notifEnabled = false;
      localStorage.setItem('notifEnabled', 'false');
      updateNotifBtn();
      showFeedback(t('notifDisabled'));
    }
  }

  function updateNotifBtn() {
    var btn = document.getElementById('btn-notif');
    var mobBtn = document.getElementById('mob-notif');
    if (btn) btn.classList.toggle('active', notifEnabled);
    if (mobBtn) mobBtn.classList.toggle('active', notifEnabled);
  }

  function updateNotifBadge() {
    var badge = document.getElementById('notif-badge');
    var mobBadge = document.getElementById('mob-notif-badge');
    if (newEventCount > 0) {
      if (badge) { badge.style.display = ''; badge.textContent = newEventCount > 99 ? '99+' : newEventCount; }
      if (mobBadge) { mobBadge.style.display = ''; mobBadge.textContent = newEventCount > 99 ? '99+' : newEventCount; }
    } else {
      if (badge) badge.style.display = 'none';
      if (mobBadge) mobBadge.style.display = 'none';
    }
  }

  function checkNewGdeltEvents(newEvents) {
    if (!notifEnabled || !newEvents || newEvents.length === 0) return;

    var now = Date.now();
    // Throttle: max 1 notification per 5 minutes
    if (now - lastNotifTime < 300000) return;

    // Find critical events (attacks, coups, major riots)
    var critical = newEvents.filter(function (ev) {
      return ev.type === 'attentat' || ev.type === 'coup_etat' || ev.type === 'emeute';
    });

    if (critical.length === 0) return;

    var ev = critical[0];
    var tl = t('typeLabels');
    var typeLabel = (tl && tl[ev.type]) || ev.type;

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(t('notifTitle'), {
        body: typeLabel + ' — ' + (ev.location || ev.name) + ' — ' + ev.date,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%237a9bb5" stroke-width="1.5"%3E%3Ccircle cx="12" cy="12" r="10"/%3E%3C/svg%3E',
        tag: 'gct-alert'
      });
      lastNotifTime = now;
    }

    newEventCount += critical.length;
    updateNotifBadge();
  }

  function resetNotifCount() {
    newEventCount = 0;
    lastNotifTimestamp = Date.now();
    localStorage.setItem('lastNotifTimestamp', lastNotifTimestamp);
    updateNotifBadge();
  }

  function showFeedback(msg) {
    var fb = document.getElementById('copy-feedback');
    if (!fb) return;
    fb.textContent = msg;
    fb.classList.add('show');
    setTimeout(function () { fb.classList.remove('show'); }, 2000);
  }

  // ============================================================
  // ---- Risk Zone Toggle ----
  // ============================================================
  function toggleRiskZones() {
    showRiskZones = !showRiskZones;
    var rBtn = document.getElementById('btn-risk-zones');
    if (rBtn) rBtn.classList.toggle('active', showRiskZones);
    var mob = document.getElementById('mob-risk-zones');
    if (mob) mob.classList.toggle('active', showRiskZones);

    if (showRiskZones) {
      renderRiskZoneOverlay();
    } else {
      clearRiskZoneOverlay();
    }
  }

  function renderRiskZoneOverlay() {
    clearRiskZoneOverlay();
    var riskData = window.GCT_RiskData;
    if (!riskData || riskData.length === 0) {
      // If dashboard hasn't been opened yet, compute risk from GDELT
      riskData = computeRiskFromGdelt();
    }
    if (!riskData) return;

    for (var i = 0; i < riskData.length; i++) {
      var r = riskData[i];
      if (!r.lat || !r.lng) continue;
      var icon = L.divIcon({
        className: 'risk-halo-marker',
        html: '<div class="risk-halo"></div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      var marker = L.marker([r.lat, r.lng], { icon: icon, interactive: false }).addTo(map);
      riskZoneMarkers.push(marker);
    }
  }

  function clearRiskZoneOverlay() {
    for (var i = 0; i < riskZoneMarkers.length; i++) map.removeLayer(riskZoneMarkers[i]);
    riskZoneMarkers = [];
  }

  function computeRiskFromGdelt() {
    if (!gdeltEvents || gdeltEvents.length === 0) return null;
    var countryEvents = {};
    for (var i = 0; i < gdeltEvents.length; i++) {
      var ev = gdeltEvents[i];
      var iso = findNearestCountryIso(ev.lat, ev.lng);
      if (iso) {
        countryEvents[iso] = (countryEvents[iso] || 0) + 1;
      }
    }
    var sorted = Object.keys(countryEvents).sort(function (a, b) { return countryEvents[b] - countryEvents[a]; }).slice(0, 5);
    var result = sorted.map(function (iso) {
      var coords = COUNTRY_CENTROIDS[iso];
      return { iso: iso, name: iso, count: countryEvents[iso], lat: coords ? coords[0] : 0, lng: coords ? coords[1] : 0 };
    });
    window.GCT_RiskData = result;
    return result;
  }

  function findNearestCountryIso(lat, lng) {
    var nearest = null;
    var minDist = Infinity;
    var keys = Object.keys(COUNTRY_CENTROIDS);
    for (var i = 0; i < keys.length; i++) {
      var c = COUNTRY_CENTROIDS[keys[i]];
      var d = Math.pow(lat - c[0], 2) + Math.pow(lng - c[1], 2);
      if (d < minDist) { minDist = d; nearest = keys[i]; }
    }
    return nearest;
  }

  // ============================================================
  // ---- Human Impact Ticker ----
  // ============================================================
  var TICKER_DATA = {
    displaced: 117.3,   // millions (UNHCR 2024)
    children: 43.3,     // millions
    schools: 15200,     // estimated
    hospitals: 1780     // WHO tracked
  };

  function initTicker() {
    // Set final values directly on originals BEFORE duplicating
    var displacedEl = document.getElementById('ticker-displaced');
    var childrenEl = document.getElementById('ticker-children');
    var schoolsEl = document.getElementById('ticker-schools');
    var hospitalsEl = document.getElementById('ticker-hospitals');

    // Write final values so clones get them too
    if (displacedEl) displacedEl.textContent = TICKER_DATA.displaced.toFixed(1);
    if (childrenEl) childrenEl.textContent = TICKER_DATA.children.toFixed(1);
    if (schoolsEl) schoolsEl.textContent = formatNumber(TICKER_DATA.schools);
    if (hospitalsEl) hospitalsEl.textContent = formatNumber(TICKER_DATA.hospitals);

    // Duplicate ticker content for seamless loop
    var track = document.getElementById('ticker-track');
    if (track) {
      var items = track.innerHTML;
      track.innerHTML = items + items;
    }

    // Now animate the first set (originals are first children after innerHTML reset)
    var allNums = track ? track.querySelectorAll('.ticker-num') : [];
    var half = allNums.length / 2;
    for (var i = 0; i < allNums.length; i++) {
      var el = allNums[i];
      var idx = i % half;
      if (idx === 0) animateTickerValue(el, 0, TICKER_DATA.displaced, 2500, true);
      else if (idx === 1) animateTickerValue(el, 0, TICKER_DATA.children, 2200, true);
      else if (idx === 2) animateTickerValue(el, 0, TICKER_DATA.schools, 2000, false);
      else if (idx === 3) animateTickerValue(el, 0, TICKER_DATA.hospitals, 1800, false);
    }
  }

  function animateTickerValue(el, start, end, duration, isDecimal) {
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = start + (end - start) * ease;
      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = formatNumber(Math.floor(current));
      }
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ============================================================
  // ---- Education Mode ----
  // ============================================================
  var educationMode = false;

  function toggleEducation() {
    // Education mode disabled — feature removed
  }

  function applyEducationOnLoad() {
    // Clean up any previous localStorage state
    localStorage.removeItem('educationMode');
    document.body.classList.remove('education-mode');
    var banner = document.getElementById('education-banner');
    if (banner) banner.remove();
  }

  // ============================================================
  // ---- Children Impact Mode ----
  // ============================================================
  var childrenMode = false;

  function toggleChildrenMode() {
    childrenMode = !childrenMode;
    document.body.classList.toggle('children-mode', childrenMode);
    var btn = document.getElementById('btn-children');
    if (btn) btn.classList.toggle('active', childrenMode);

    var banner = document.getElementById('children-banner');
    if (childrenMode) {
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'children-banner';
        banner.className = 'children-banner';
        banner.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg><span data-i18n="childrenBanner">' + t('childrenBanner') + '</span>';
        document.body.appendChild(banner);
      }
      banner.style.display = '';
    } else if (banner) {
      banner.style.display = 'none';
    }

    // Re-render markers with size adjustment
    renderMarkers(filteredConflicts);
    if (window.GCT) window.GCT.childrenMode = childrenMode;
  }

  // ---- Boot ----
  document.addEventListener('DOMContentLoaded', init);
})();
