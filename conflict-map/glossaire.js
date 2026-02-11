(function () {
  'use strict';

  var glossaryOpen = false;

  function G() { return window.GCT || {}; }
  function t(key) { return G().t ? G().t(key) : key; }
  function esc(s) { return G().esc ? G().esc(s) : s; }
  function lang() { return (G().currentLang) || 'fr'; }

  var TERMS = [
    { fr: 'Blocus', en: 'Blockade', def_fr: "Encerclement militaire ou \u00e9conomique emp\u00eachant l'acc\u00e8s \u00e0 un territoire.", def_en: 'Military or economic encirclement preventing access to a territory.', ex_fr: 'Le blocus de Gaza par Isra\u00ebl depuis 2007.', ex_en: 'The blockade of Gaza by Israel since 2007.' },
    { fr: 'Cessez-le-feu', en: 'Ceasefire', def_fr: "Accord temporaire ou permanent d'arr\u00eat des hostilit\u00e9s entre parties bellig\u00e9rantes.", def_en: 'Temporary or permanent agreement to stop hostilities between warring parties.', ex_fr: 'Le cessez-le-feu \u00e0 Gaza en janvier 2025.', ex_en: 'The Gaza ceasefire in January 2025.' },
    { fr: 'Conflit arm\u00e9', en: 'Armed conflict', def_fr: 'Affrontement entre forces arm\u00e9es, internes ou internationales, causant des victimes.', def_en: 'Confrontation between armed forces, internal or international, causing casualties.', ex_fr: 'La guerre en Ukraine est un conflit arm\u00e9 international.', ex_en: 'The war in Ukraine is an international armed conflict.' },
    { fr: 'Conflit gel\u00e9', en: 'Frozen conflict', def_fr: "Conflit o\u00f9 les combats actifs ont cess\u00e9 sans r\u00e9solution politique, avec risque de reprise.", def_en: 'Conflict where active fighting has stopped without political resolution, with risk of resumption.', ex_fr: 'Le conflit du Haut-Karabakh avant 2020.', ex_en: 'The Nagorno-Karabakh conflict before 2020.' },
    { fr: 'Corridor humanitaire', en: 'Humanitarian corridor', def_fr: "Zone s\u00e9curis\u00e9e temporaire permettant l'acheminement d'aide ou l'\u00e9vacuation de civils.", def_en: 'Temporary secured zone allowing aid delivery or civilian evacuation.', ex_fr: "Les corridors humanitaires tent\u00e9s \u00e0 Marioupol en 2022.", ex_en: 'Humanitarian corridors attempted in Mariupol in 2022.' },
    { fr: 'Crime de guerre', en: 'War crime', def_fr: 'Violation grave du droit international humanitaire : attaques d\u00e9lib\u00e9r\u00e9es contre des civils, torture, etc.', def_en: 'Serious violation of international humanitarian law: deliberate attacks on civilians, torture, etc.', ex_fr: "Enqu\u00eates de la CPI sur des crimes de guerre en Ukraine et \u00e0 Gaza.", ex_en: 'ICC investigations into war crimes in Ukraine and Gaza.' },
    { fr: 'D\u00e9plac\u00e9 interne', en: 'Internally displaced person (IDP)', def_fr: "Personne forc\u00e9e de fuir son domicile mais restant dans son propre pays.", def_en: 'Person forced to flee their home but remaining within their own country.', ex_fr: 'Plus de 10 millions de d\u00e9plac\u00e9s internes au Soudan.', ex_en: 'Over 10 million internally displaced in Sudan.' },
    { fr: 'Droit international humanitaire', en: 'International humanitarian law (IHL)', def_fr: "Ensemble de r\u00e8gles limitant les effets des conflits arm\u00e9s, notamment les Conventions de Gen\u00e8ve.", def_en: 'Set of rules limiting the effects of armed conflicts, particularly the Geneva Conventions.', ex_fr: "Les Conventions de Gen\u00e8ve prot\u00e8gent les prisonniers de guerre.", ex_en: 'The Geneva Conventions protect prisoners of war.' },
    { fr: 'Embargo', en: 'Embargo', def_fr: "Interdiction de commerce ou de livraison d'armes impos\u00e9e \u00e0 un pays.", def_en: 'Ban on trade or arms delivery imposed on a country.', ex_fr: "Embargo sur les armes en R\u00e9publique centrafricaine.", ex_en: 'Arms embargo on the Central African Republic.' },
    { fr: '\u00c9puration ethnique', en: 'Ethnic cleansing', def_fr: "Expulsion syst\u00e9matique d'un groupe ethnique d'un territoire par la violence.", def_en: 'Systematic expulsion of an ethnic group from a territory through violence.', ex_fr: "\u00c9puration ethnique des Rohingyas au Myanmar en 2017.", ex_en: 'Ethnic cleansing of Rohingya in Myanmar in 2017.' },
    { fr: 'G\u00e9nocide', en: 'Genocide', def_fr: "Destruction d\u00e9lib\u00e9r\u00e9e d'un groupe national, ethnique, racial ou religieux.", def_en: 'Deliberate destruction of a national, ethnic, racial or religious group.', ex_fr: 'Le g\u00e9nocide des Tutsis au Rwanda en 1994.', ex_en: 'The Tutsi genocide in Rwanda in 1994.' },
    { fr: 'Groupe arm\u00e9 non \u00e9tatique', en: 'Non-state armed group', def_fr: "Organisation arm\u00e9e agissant en dehors du contr\u00f4le d'un \u00c9tat.", def_en: 'Armed organization acting outside state control.', ex_fr: 'Le JNIM au Sahel, les RSF au Soudan.', ex_en: 'JNIM in the Sahel, RSF in Sudan.' },
    { fr: 'Guerre civile', en: 'Civil war', def_fr: "Conflit arm\u00e9 entre groupes organis\u00e9s \u00e0 l'int\u00e9rieur d'un m\u00eame pays.", def_en: 'Armed conflict between organized groups within the same country.', ex_fr: 'La guerre civile au Soudan depuis 2023.', ex_en: 'The civil war in Sudan since 2023.' },
    { fr: 'Guerre par procuration', en: 'Proxy war', def_fr: "Conflit o\u00f9 des puissances ext\u00e9rieures soutiennent des parties locales.", def_en: 'Conflict where external powers support local parties.', ex_fr: 'Le Y\u00e9men, th\u00e9\u00e2tre de rivalit\u00e9 entre Iran et Arabie saoudite.', ex_en: 'Yemen, theater of rivalry between Iran and Saudi Arabia.' },
    { fr: 'Insurrection', en: 'Insurgency', def_fr: "R\u00e9volte arm\u00e9e organis\u00e9e contre un gouvernement en place.", def_en: 'Organized armed revolt against an established government.', ex_fr: "L'insurrection djihadiste au Sahel.", ex_en: 'The jihadist insurgency in the Sahel.' },
    { fr: 'Maintien de la paix', en: 'Peacekeeping', def_fr: "Op\u00e9rations militaires ou civiles de l'ONU d\u00e9ploy\u00e9es pour stabiliser une zone de conflit.", def_en: 'UN military or civilian operations deployed to stabilize a conflict zone.', ex_fr: 'La MINUSMA au Mali (2013-2023).', ex_en: 'MINUSMA in Mali (2013-2023).' },
    { fr: 'Milice', en: 'Militia', def_fr: "Groupe arm\u00e9 non r\u00e9gulier, souvent li\u00e9 \u00e0 une communaut\u00e9 ou faction politique.", def_en: 'Irregular armed group, often linked to a community or political faction.', ex_fr: 'Les milices Fano en r\u00e9gion Amhara, \u00c9thiopie.', ex_en: 'The Fano militias in the Amhara region, Ethiopia.' },
    { fr: 'Nettoyage ethnique', en: 'Ethnic cleansing', def_fr: "Politique visant \u00e0 rendre une zone ethniquement homog\u00e8ne par l'expulsion forc\u00e9e.", def_en: 'Policy aimed at making an area ethnically homogeneous through forced expulsion.', ex_fr: 'Accusations de nettoyage ethnique au Darfour.', ex_en: 'Accusations of ethnic cleansing in Darfur.' },
    { fr: 'ONU', en: 'United Nations (UN)', def_fr: "Organisation internationale fond\u00e9e en 1945 pour maintenir la paix et la s\u00e9curit\u00e9 internationales.", def_en: 'International organization founded in 1945 to maintain international peace and security.', ex_fr: "Le Conseil de s\u00e9curit\u00e9 de l'ONU vote des r\u00e9solutions sur les conflits.", ex_en: 'The UN Security Council votes on conflict resolutions.' },
    { fr: 'OTAN', en: 'NATO', def_fr: "Alliance militaire de 32 pays d'Am\u00e9rique du Nord et d'Europe.", def_en: 'Military alliance of 32 North American and European countries.', ex_fr: "L'OTAN soutient l'Ukraine depuis 2022.", ex_en: 'NATO has supported Ukraine since 2022.' },
    { fr: 'R\u00e9fugi\u00e9', en: 'Refugee', def_fr: "Personne ayant fui son pays en raison de pers\u00e9cutions, de conflits ou de violences.", def_en: 'Person who fled their country due to persecution, conflict or violence.', ex_fr: 'Plus de 6 millions de r\u00e9fugi\u00e9s syriens dans le monde.', ex_en: 'Over 6 million Syrian refugees worldwide.' },
    { fr: 'Sanctions', en: 'Sanctions', def_fr: "Mesures punitives (gel des avoirs, interdiction de voyager, embargo) impos\u00e9es par des \u00c9tats ou l'ONU.", def_en: 'Punitive measures (asset freezes, travel bans, embargoes) imposed by states or the UN.', ex_fr: 'Sanctions internationales contre la Russie depuis 2022.', ex_en: 'International sanctions against Russia since 2022.' },
    { fr: 'S\u00e9cessionnisme', en: 'Secessionism', def_fr: "Mouvement politique visant l'ind\u00e9pendance d'une r\u00e9gion par rapport \u00e0 un \u00c9tat.", def_en: 'Political movement seeking independence of a region from a state.', ex_fr: 'La crise anglophone au Cameroun.', ex_en: 'The Anglophone crisis in Cameroon.' },
    { fr: 'Terrorisme', en: 'Terrorism', def_fr: "Usage de la violence contre des civils pour atteindre des objectifs politiques ou id\u00e9ologiques.", def_en: 'Use of violence against civilians to achieve political or ideological goals.', ex_fr: "Les attaques de l'\u00c9tat islamique au Sahel.", ex_en: 'Islamic State attacks in the Sahel.' },
    { fr: 'Transition politique', en: 'Political transition', def_fr: "P\u00e9riode de changement de r\u00e9gime, souvent apr\u00e8s un coup d'\u00c9tat ou des \u00e9lections.", def_en: "Period of regime change, often after a coup or elections.", ex_fr: 'Les transitions militaires au Mali, Burkina Faso et Niger.', ex_en: 'Military transitions in Mali, Burkina Faso and Niger.' },
    { fr: 'UNHCR', en: 'UNHCR', def_fr: "Haut Commissariat des Nations unies pour les r\u00e9fugi\u00e9s, principal organe de protection des r\u00e9fugi\u00e9s.", def_en: 'UN High Commissioner for Refugees, main body for refugee protection.', ex_fr: "L'UNHCR g\u00e8re les camps de r\u00e9fugi\u00e9s dans le monde.", ex_en: 'UNHCR manages refugee camps worldwide.' },
    { fr: 'UNICEF', en: 'UNICEF', def_fr: "Fonds des Nations unies pour l'enfance, agence d\u00e9di\u00e9e \u00e0 la protection des enfants.", def_en: "United Nations Children's Fund, agency dedicated to child protection.", ex_fr: "L'UNICEF intervient dans les zones de conflit pour prot\u00e9ger les enfants.", ex_en: 'UNICEF operates in conflict zones to protect children.' },
    { fr: 'Zone d\u00e9militaris\u00e9e', en: 'Demilitarized zone (DMZ)', def_fr: "Territoire o\u00f9 la pr\u00e9sence militaire est interdite par accord.", def_en: 'Territory where military presence is prohibited by agreement.', ex_fr: 'La zone d\u00e9militaris\u00e9e entre les deux Cor\u00e9es.', ex_en: 'The demilitarized zone between the two Koreas.' },
    { fr: 'Coup d\'\u00c9tat', en: "Coup d'\u00e9tat", def_fr: "Prise de pouvoir ill\u00e9gale et soudaine, g\u00e9n\u00e9ralement par des militaires.", def_en: 'Illegal and sudden seizure of power, usually by the military.', ex_fr: 'Le coup d\'\u00c9tat au Myanmar en f\u00e9vrier 2021.', ex_en: "The coup d'\u00e9tat in Myanmar in February 2021." },
    { fr: 'Djihadisme', en: 'Jihadism', def_fr: "Id\u00e9ologie pr\u00f4nant la lutte arm\u00e9e au nom d'une interpr\u00e9tation radicale de l'islam.", def_en: 'Ideology advocating armed struggle in the name of a radical interpretation of Islam.', ex_fr: 'Le JNIM et l\'\u00c9tat islamique au Sahel.', ex_en: 'JNIM and the Islamic State in the Sahel.' },
    { fr: 'Famine', en: 'Famine', def_fr: "Crise alimentaire extr\u00eame caus\u00e9e par le conflit, le climat ou l'\u00e9chec des syst\u00e8mes alimentaires.", def_en: 'Extreme food crisis caused by conflict, climate or food system failure.', ex_fr: 'Famine d\u00e9clar\u00e9e au Darfour en 2024.', ex_en: 'Famine declared in Darfur in 2024.' },
    { fr: 'CPI', en: 'ICC', def_fr: "Cour p\u00e9nale internationale : tribunal jugeant les crimes de guerre, g\u00e9nocides et crimes contre l'humanit\u00e9.", def_en: 'International Criminal Court: tribunal judging war crimes, genocides and crimes against humanity.', ex_fr: "Mandats d'arr\u00eat de la CPI en 2024.", ex_en: 'ICC arrest warrants in 2024.' },
    { fr: 'MSF', en: 'MSF', def_fr: "M\u00e9decins Sans Fronti\u00e8res : ONG m\u00e9dicale humanitaire intervenant dans les zones de conflit.", def_en: 'Doctors Without Borders: medical humanitarian NGO operating in conflict zones.', ex_fr: 'MSF op\u00e8re dans les h\u00f4pitaux du Soudan et du Y\u00e9men.', ex_en: 'MSF operates hospitals in Sudan and Yemen.' }
  ];

  function createPanel() {
    if (document.getElementById('glossary-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'glossary-panel';
    panel.className = 'glossary-panel';
    panel.innerHTML =
      '<div class="glossary-header">' +
        '<div class="glossary-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><span data-i18n="glossaryTitle">' + t('glossaryTitle') + '</span></div>' +
        '<button class="glossary-close" id="glossary-close">&times;</button>' +
      '</div>' +
      '<div class="glossary-search"><input type="text" id="glossary-search-input" placeholder="' + (lang() === 'fr' ? 'Rechercher un terme...' : 'Search a term...') + '"></div>' +
      '<div class="glossary-body" id="glossary-body"></div>';
    document.body.appendChild(panel);
    document.getElementById('glossary-close').addEventListener('click', closeGlossary);
    document.getElementById('glossary-search-input').addEventListener('input', renderTerms);
  }

  function openGlossary() {
    createPanel();
    glossaryOpen = true;
    document.getElementById('glossary-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderTerms();
  }

  function closeGlossary() {
    glossaryOpen = false;
    var panel = document.getElementById('glossary-panel');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderTerms() {
    var body = document.getElementById('glossary-body');
    if (!body) return;

    var searchInput = document.getElementById('glossary-search-input');
    var filter = searchInput ? searchInput.value.toLowerCase() : '';
    var fr = lang() === 'fr';

    var sorted = TERMS.slice().sort(function (a, b) {
      var na = fr ? a.fr : a.en;
      var nb = fr ? b.fr : b.en;
      return na.localeCompare(nb);
    });

    if (filter) {
      sorted = sorted.filter(function (term) {
        var name = fr ? term.fr : term.en;
        var def = fr ? term.def_fr : term.def_en;
        return name.toLowerCase().indexOf(filter) !== -1 || def.toLowerCase().indexOf(filter) !== -1;
      });
    }

    var html = '';
    var currentLetter = '';

    for (var i = 0; i < sorted.length; i++) {
      var term = sorted[i];
      var name = fr ? term.fr : term.en;
      var def = fr ? term.def_fr : term.def_en;
      var ex = fr ? term.ex_fr : term.ex_en;
      var letter = name.charAt(0).toUpperCase();

      if (letter !== currentLetter) {
        currentLetter = letter;
        html += '<div class="glossary-letter">' + esc(letter) + '</div>';
      }

      html += '<div class="glossary-term">' +
        '<div class="glossary-term-name">' + esc(name) + '</div>' +
        '<div class="glossary-term-def">' + esc(def) + '</div>' +
        '<div class="glossary-term-example">' + esc(ex) + '</div>' +
      '</div>';
    }

    body.innerHTML = html;
  }

  // ---- Tooltip system ----
  function addGlossaryTooltips(container) {
    if (!container) return;
    var fr = lang() === 'fr';
    var textNodes = [];
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (var i = 0; i < textNodes.length; i++) {
      var node = textNodes[i];
      var parent = node.parentNode;
      if (!parent || parent.classList && parent.classList.contains('glossary-highlight')) continue;
      if (parent.tagName === 'A' || parent.tagName === 'BUTTON') continue;

      var text = node.textContent;
      var replaced = false;

      for (var j = 0; j < TERMS.length; j++) {
        var term = TERMS[j];
        var termName = fr ? term.fr : term.en;
        var termDef = fr ? term.def_fr : term.def_en;
        var regex = new RegExp('\\b(' + escapeRegex(termName) + ')\\b', 'gi');

        if (regex.test(text)) {
          var frag = document.createDocumentFragment();
          var parts = text.split(regex);
          for (var k = 0; k < parts.length; k++) {
            if (parts[k].toLowerCase() === termName.toLowerCase()) {
              var span = document.createElement('span');
              span.className = 'glossary-highlight';
              span.textContent = parts[k];
              span.setAttribute('data-glossary-def', termDef);
              span.addEventListener('mouseenter', showTooltip);
              span.addEventListener('mouseleave', hideTooltip);
              frag.appendChild(span);
            } else {
              frag.appendChild(document.createTextNode(parts[k]));
            }
          }
          parent.replaceChild(frag, node);
          replaced = true;
          break;
        }
      }
    }
  }

  function showTooltip(e) {
    var def = this.getAttribute('data-glossary-def');
    if (!def) return;
    var tip = document.createElement('div');
    tip.className = 'glossary-tooltip';
    tip.textContent = def;
    this.appendChild(tip);
  }

  function hideTooltip() {
    var tip = this.querySelector('.glossary-tooltip');
    if (tip) tip.remove();
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ---- Expose ----
  window.GCT_Glossary = {
    open: openGlossary,
    close: closeGlossary,
    addTooltips: addGlossaryTooltips,
    TERMS: TERMS
  };
})();
