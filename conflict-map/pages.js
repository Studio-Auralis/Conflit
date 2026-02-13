(function () {
  'use strict';

  // ============================================================
  // ---- ABOUT PAGE ----
  // ============================================================
  var aboutOpen = false;

  function createAboutPanel() {
    if (document.getElementById('about-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'about-panel';
    panel.className = 'page-panel';
    panel.innerHTML = buildAboutHTML();
    document.body.appendChild(panel);
    document.getElementById('about-close').addEventListener('click', closeAbout);
    var partnerCta = document.getElementById('about-partners-cta');
    if (partnerCta) partnerCta.addEventListener('click', function (e) {
      e.preventDefault(); closeAbout(); openContact();
    });
    panel.querySelectorAll('.about-partner-slot').forEach(function (s) {
      s.addEventListener('click', function () { closeAbout(); openContact(); });
    });
  }

  function buildAboutHTML() {
    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var fr = lang === 'fr';

    return '<div class="page-header">' +
      '<button class="page-close" id="about-close" aria-label="Fermer">&times;</button>' +
    '</div>' +
    '<div class="page-body">' +
      // Hero
      '<div class="about-hero">' +
        '<div class="about-hero-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
        '</div>' +
        '<h1 class="about-title" data-i18n="aboutTitle">' + (fr ? 'Notre Mission' : 'Our Mission') + '</h1>' +
        '<p class="about-subtitle" data-i18n="headerSlogan">' + (fr ? 'Les conflits du monde, expliqu\u00e9s et visualis\u00e9s' : 'World conflicts, explained and visualized') + '</p>' +
      '</div>' +

      // Introduction
      '<section class="about-section">' +
        '<p class="about-intro" data-i18n="aboutIntro1">' + (fr
          ? 'Ce projet cartographie en temps r\u00e9el les conflits arm\u00e9s, les crises humanitaires et les \u00e9v\u00e9nements g\u00e9opolitiques du monde entier, pour informer, sensibiliser et agir.'
          : 'This project maps armed conflicts, humanitarian crises and geopolitical events worldwide in real time, to inform, raise awareness and drive action.') + '</p>' +
        '<p class="about-text" data-i18n="aboutIntro2">' + (fr
          ? 'Chaque jour, des millions de personnes sont touch\u00e9es par des conflits dont on ne parle pas. Notre carte interactive agrège des donn\u00e9es de sources multiples pour offrir une vue d\'ensemble actualis\u00e9e et accessible \u00e0 tous.'
          : 'Every day, millions of people are affected by conflicts that go unreported. Our interactive map aggregates data from multiple sources to provide an up-to-date overview accessible to everyone.') + '</p>' +
        '<p class="about-text" data-i18n="aboutIntro3">' + (fr
          ? 'Que vous soyez journaliste, chercheur, \u00e9tudiant ou citoyen concern\u00e9, cet outil est con\u00e7u pour vous donner les cl\u00e9s de compr\u00e9hension du monde tel qu\'il est.'
          : 'Whether you are a journalist, researcher, student or concerned citizen, this tool is designed to give you the keys to understanding the world as it is.') + '</p>' +
      '</section>' +

      // How it works
      '<section class="about-section">' +
        '<h2 class="about-section-title" data-i18n="aboutHowTitle">' + (fr ? 'Comment \u00e7a marche' : 'How It Works') + '</h2>' +
        '<div class="about-sources">' +
          '<div class="about-source-card">' +
            '<div class="about-source-icon">&#127760;</div>' +
            '<h3>GDELT</h3>' +
            '<p data-i18n="aboutGdelt">' + (fr ? '\u00c9v\u00e9nements g\u00e9opolitiques en temps r\u00e9el. Mis \u00e0 jour toutes les 15 minutes. Couverture mondiale des m\u00e9dias.' : 'Real-time geopolitical events. Updated every 15 minutes. Worldwide media coverage.') + '</p>' +
          '</div>' +
          '<div class="about-source-card">' +
            '<div class="about-source-icon">&#128101;</div>' +
            '<h3>UNHCR</h3>' +
            '<p data-i18n="aboutUnhcr">' + (fr ? 'Donn\u00e9es officielles de l\'ONU sur les flux de r\u00e9fugi\u00e9s. Statistiques bilat\u00e9rales par pays d\'origine et d\'asile.' : 'Official UN data on refugee flows. Bilateral statistics by country of origin and asylum.') + '</p>' +
          '</div>' +
          '<div class="about-source-card">' +
            '<div class="about-source-icon">&#128200;</div>' +
            '<h3>ACLED / UCDP</h3>' +
            '<p data-i18n="aboutAcled">' + (fr ? 'Bases de donn\u00e9es acad\u00e9miques sur les conflits arm\u00e9s. V\u00e9rification manuelle des conflits majeurs.' : 'Academic databases on armed conflicts. Manual verification of major conflicts.') + '</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Our Data
      '<section class="about-section">' +
        '<h2 class="about-section-title" data-i18n="aboutDataTitle">' + (fr ? 'Nos donn\u00e9es' : 'Our Data') + '</h2>' +
        '<div class="about-data-grid">' +
          '<div class="about-data-item">' +
            '<span class="about-data-num">15</span>' +
            '<span class="about-data-unit">min</span>' +
            '<span class="about-data-label" data-i18n="aboutDataFreq">' + (fr ? 'Fr\u00e9quence de mise \u00e0 jour GDELT' : 'GDELT update frequency') + '</span>' +
          '</div>' +
          '<div class="about-data-item">' +
            '<span class="about-data-num">51</span>' +
            '<span class="about-data-unit">+</span>' +
            '<span class="about-data-label" data-i18n="aboutDataConflicts">' + (fr ? 'Conflits suivis manuellement' : 'Manually tracked conflicts') + '</span>' +
          '</div>' +
          '<div class="about-data-item">' +
            '<span class="about-data-num">193</span>' +
            '<span class="about-data-unit"></span>' +
            '<span class="about-data-label" data-i18n="aboutDataCountries">' + (fr ? 'Pays couverts' : 'Countries covered') + '</span>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Methodology
      '<section class="about-section">' +
        '<h2 class="about-section-title" data-i18n="aboutMethodTitle">' + (fr ? 'M\u00e9thodologie' : 'Methodology') + '</h2>' +
        '<div class="about-method-list">' +
          '<div class="about-method-step">' +
            '<span class="about-method-num">1</span>' +
            '<div><strong data-i18n="aboutMethod1T">' + (fr ? 'Collecte' : 'Collection') + '</strong><p data-i18n="aboutMethod1">' + (fr ? 'Les donn\u00e9es GDELT sont r\u00e9cup\u00e9r\u00e9es via l\'API GEO v2 toutes les 15 minutes. Les conflits majeurs sont document\u00e9s manuellement \u00e0 partir de sources v\u00e9rifi\u00e9es (ACLED, UCDP, Crisis Group, HRW, ICRC).' : 'GDELT data is fetched via the GEO v2 API every 15 minutes. Major conflicts are manually documented from verified sources (ACLED, UCDP, Crisis Group, HRW, ICRC).') + '</p></div>' +
          '</div>' +
          '<div class="about-method-step">' +
            '<span class="about-method-num">2</span>' +
            '<div><strong data-i18n="aboutMethod2T">' + (fr ? 'Filtrage' : 'Filtering') + '</strong><p data-i18n="aboutMethod2">' + (fr ? 'Les \u00e9v\u00e9nements sont class\u00e9s par type (attentat, \u00e9meute, manifestation, cessez-le-feu) et g\u00e9olocalis\u00e9s. Les doublons sont \u00e9limin\u00e9s par proximit\u00e9 spatiale.' : 'Events are classified by type (attack, riot, protest, ceasefire) and geolocated. Duplicates are removed by spatial proximity.') + '</p></div>' +
          '</div>' +
          '<div class="about-method-step">' +
            '<span class="about-method-num">3</span>' +
            '<div><strong data-i18n="aboutMethod3T">' + (fr ? 'Classification' : 'Classification') + '</strong><p data-i18n="aboutMethod3">' + (fr ? 'Les conflits sont class\u00e9s en 3 niveaux d\'intensit\u00e9 (haute, moyenne, basse) selon le nombre de victimes, l\'\u00e9chelle et la dur\u00e9e. Les flux de r\u00e9fugi\u00e9s proviennent directement des donn\u00e9es UNHCR.' : 'Conflicts are classified into 3 intensity levels (high, medium, low) based on casualties, scale and duration. Refugee flows come directly from UNHCR data.') + '</p></div>' +
          '</div>' +
        '</div>' +
        '<div class="about-sources-links">' +
          '<a href="https://www.gdeltproject.org/" target="_blank" rel="noopener">GDELT Project</a>' +
          '<a href="https://www.unhcr.org/refugee-statistics/" target="_blank" rel="noopener">UNHCR</a>' +
          '<a href="https://acleddata.com/" target="_blank" rel="noopener">ACLED</a>' +
          '<a href="https://ucdp.uu.se/" target="_blank" rel="noopener">UCDP</a>' +
          '<a href="https://www.crisisgroup.org/" target="_blank" rel="noopener">Crisis Group</a>' +
        '</div>' +
      '</section>' +

      // Who we are
      '<section class="about-section">' +
        '<h2 class="about-section-title" data-i18n="aboutTeamTitle">' + (fr ? 'Qui sommes-nous' : 'Who We Are') + '</h2>' +
        '<div class="about-team">' +
          '<div class="about-team-logo">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
          '</div>' +
          '<div>' +
            '<p class="about-team-text" data-i18n="aboutTeam">' + (fr
              ? 'Un projet d\u00e9velopp\u00e9 par <strong>Studio Auralis</strong> \u2014 studio cr\u00e9atif sp\u00e9cialis\u00e9 en d\u00e9veloppement web et data visualization.'
              : 'A project developed by <strong>Studio Auralis</strong> \u2014 a creative studio specializing in web development and data visualization.') + '</p>' +
            '<a href="https://studio-auralis.com" target="_blank" rel="noopener" class="about-team-link">studio-auralis.com &rarr;</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // Limitations
      '<section class="about-section about-section-last">' +
        '<h2 class="about-section-title" data-i18n="aboutLimitsTitle">' + (fr ? 'Limites et avertissement' : 'Limitations & Disclaimer') + '</h2>' +
        '<div class="about-disclaimer">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
          '<p data-i18n="aboutLimits">' + (fr
            ? 'Les donn\u00e9es automatiques (GDELT) peuvent contenir des erreurs ou des biais m\u00e9diatiques. Les chiffres de victimes sont des estimations issues de sources multiples. Ce site ne remplace pas les analyses d\'experts et ne constitue pas une source primaire. Les zones \u00e0 risque sont des indicateurs de tendance, pas des pr\u00e9dictions formelles.'
            : 'Automated data (GDELT) may contain errors or media bias. Casualty figures are estimates from multiple sources. This site does not replace expert analysis and is not a primary source. Risk zones are trend indicators, not formal predictions.') + '</p>' +
        '</div>' +
      '</section>' +

      // Partners
      '<section class="about-section">' +
        '<h2 data-i18n="partnersTitle">' + (fr ? 'Nos Partenaires' : 'Our Partners') + '</h2>' +
        '<div class="about-partners-grid">' +
          '<div class="about-partner-slot"><span data-i18n="partnerSlot">' + (fr ? 'Votre logo ici' : 'Your logo here') + '</span></div>' +
          '<div class="about-partner-slot"><span data-i18n="partnerSlot">' + (fr ? 'Votre logo ici' : 'Your logo here') + '</span></div>' +
          '<div class="about-partner-slot"><span data-i18n="partnerSlot">' + (fr ? 'Votre logo ici' : 'Your logo here') + '</span></div>' +
          '<div class="about-partner-slot"><span data-i18n="partnerSlot">' + (fr ? 'Votre logo ici' : 'Your logo here') + '</span></div>' +
          '<div class="about-partner-slot"><span data-i18n="partnerSlot">' + (fr ? 'Votre logo ici' : 'Your logo here') + '</span></div>' +
          '<div class="about-partner-slot"><span data-i18n="partnerSlot">' + (fr ? 'Votre logo ici' : 'Your logo here') + '</span></div>' +
        '</div>' +
        '<a href="#" class="about-partner-cta" id="about-partners-cta">' + (fr ? 'Devenir partenaire \u2192' : 'Become a partner \u2192') + '</a>' +
      '</section>' +

      // Footer inside About
      '<div class="about-footer">' +
        '<div class="about-footer-col">' +
          '<h4 data-i18n="footerSources">' + (fr ? 'Sources' : 'Sources') + '</h4>' +
          '<a href="https://acleddata.com/" target="_blank" rel="noopener">ACLED</a>' +
          '<a href="https://ucdp.uu.se/" target="_blank" rel="noopener">UCDP</a>' +
          '<a href="https://www.gdeltproject.org/" target="_blank" rel="noopener">GDELT</a>' +
          '<a href="https://www.unhcr.org/" target="_blank" rel="noopener">UNHCR</a>' +
        '</div>' +
        '<div class="about-footer-col">' +
          '<h4 data-i18n="footerFollow">' + (fr ? 'Suivez-nous' : 'Follow us') + '</h4>' +
          '<a href="https://www.linkedin.com/in/martins-moragdo-stduo-auralis" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn</a>' +
          '<a href="https://github.com/studio-auralis" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> GitHub</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function openAbout() {
    createAboutPanel();
    aboutOpen = true;
    document.getElementById('about-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAbout() {
    aboutOpen = false;
    var p = document.getElementById('about-panel');
    if (p) p.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ============================================================
  // ---- CONTACT PAGE ----
  // ============================================================
  var contactOpen = false;

  function createContactPanel() {
    if (document.getElementById('contact-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'contact-panel';
    panel.className = 'page-panel';
    panel.innerHTML = buildContactHTML();
    document.body.appendChild(panel);
    document.getElementById('contact-close').addEventListener('click', closeContact);
    initContactForm();
  }

  function buildContactHTML() {
    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var fr = lang === 'fr';

    return '<div class="page-header">' +
      '<button class="page-close" id="contact-close" aria-label="Fermer">&times;</button>' +
    '</div>' +
    '<div class="page-body">' +
      '<div class="contact-hero">' +
        '<h1 class="contact-title" data-i18n="contactTitle">' + (fr ? 'Contactez-nous' : 'Contact Us') + '</h1>' +
        '<p class="contact-subtitle" data-i18n="contactSubtitle">' + (fr
          ? 'Vous \u00eates une ONG, une universit\u00e9, un m\u00e9dia ou une organisation ? Parlons de collaboration.'
          : 'Are you an NGO, university, media outlet or organization? Let\'s talk collaboration.') + '</p>' +
      '</div>' +

      '<div class="contact-grid">' +
        // Form
        '<div class="contact-form-wrap">' +
          '<form id="contact-form" action="https://formsubmit.co/contact@studio-auralis.com" method="POST">' +
            '<input type="hidden" name="_subject" value="Contact Global Conflict Tracker">' +
            '<input type="hidden" name="_captcha" value="false">' +
            '<input type="hidden" name="_template" value="table">' +
            '<input type="text" name="_honey" style="display:none">' +
            '<div class="form-group">' +
              '<label for="contact-name" data-i18n="contactName">' + (fr ? 'Nom' : 'Name') + ' *</label>' +
              '<input type="text" id="contact-name" name="name" required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="contact-email" data-i18n="contactEmail">Email *</label>' +
              '<input type="email" id="contact-email" name="email" required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="contact-org" data-i18n="contactOrg">' + (fr ? 'Organisation (optionnel)' : 'Organization (optional)') + '</label>' +
              '<input type="text" id="contact-org" name="organization">' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="contact-subject" data-i18n="contactSubject">' + (fr ? 'Sujet' : 'Subject') + ' *</label>' +
              '<select id="contact-subject" name="subject" required>' +
                '<option value="">' + (fr ? '-- Choisir --' : '-- Select --') + '</option>' +
                '<option value="partnership">' + (fr ? 'Partenariat' : 'Partnership') + '</option>' +
                '<option value="press">' + (fr ? 'Presse' : 'Press') + '</option>' +
                '<option value="feedback">' + (fr ? 'Bug / Feedback' : 'Bug / Feedback') + '</option>' +
                '<option value="other">' + (fr ? 'Autre' : 'Other') + '</option>' +
              '</select>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="contact-message">Message *</label>' +
              '<textarea id="contact-message" name="message" rows="5" required></textarea>' +
            '</div>' +
            '<button type="submit" class="form-submit" id="contact-submit" data-i18n="contactSend">' + (fr ? 'Envoyer' : 'Send') + '</button>' +
            '<div class="form-success" id="form-success" style="display:none" data-i18n="contactSuccess">' + (fr ? 'Merci ! Nous reviendrons vers vous rapidement.' : 'Thank you! We will get back to you soon.') + '</div>' +
          '</form>' +
        '</div>' +

        // Sidebar info
        '<div class="contact-info">' +
          '<div class="contact-info-card">' +
            '<h3 data-i18n="contactDirect">' + (fr ? 'Contact direct' : 'Direct Contact') + '</h3>' +
            '<a href="mailto:contact@studio-auralis.com" class="contact-link">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
              'contact@studio-auralis.com' +
            '</a>' +
            '<a href="https://www.linkedin.com/in/martins-moragdo-stduo-auralis" target="_blank" rel="noopener" class="contact-link">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' +
              'LinkedIn' +
            '</a>' +
          '</div>' +

          '<div class="contact-info-card">' +
            '<h3 data-i18n="contactPartner">' + (fr ? 'Devenir partenaire' : 'Become a Partner') + '</h3>' +
            '<p data-i18n="contactPartnerText">' + (fr
              ? 'Associez votre organisation \u00e0 un projet d\'int\u00e9r\u00eat public. Visibilit\u00e9 aupr\u00e8s d\'un public engag\u00e9, acc\u00e8s privil\u00e9gi\u00e9 aux donn\u00e9es et co-branding sur nos analyses.'
              : 'Associate your organization with a project of public interest. Visibility with an engaged audience, privileged data access and co-branding on our analyses.') + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('contact-submit');
      var success = document.getElementById('form-success');
      btn.disabled = true;
      btn.textContent = '...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          success.style.display = 'block';
          btn.style.display = 'none';
        } else {
          btn.disabled = false;
          btn.textContent = window.GCT && window.GCT.t ? window.GCT.t('contactSend') : 'Envoyer';
          alert(window.GCT && window.GCT.t ? window.GCT.t('contactErrorSend') : 'Error sending. Please try again.');
        }
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = window.GCT && window.GCT.t ? window.GCT.t('contactSend') : 'Envoyer';
        alert(window.GCT && window.GCT.t ? window.GCT.t('contactErrorNetwork') : 'Network error. Please try again.');
      });
    });
  }

  function openContact() {
    createContactPanel();
    contactOpen = true;
    document.getElementById('contact-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeContact() {
    contactOpen = false;
    var p = document.getElementById('contact-panel');
    if (p) p.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ============================================================
  // ---- SUPPORT MODAL ----
  // ============================================================
  var supportOpen = false;

  function createSupportModal() {
    if (document.getElementById('support-modal')) return;
    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var fr = lang === 'fr';

    var overlay = document.createElement('div');
    overlay.id = 'support-modal';
    overlay.className = 'support-overlay';
    overlay.innerHTML =
      '<div class="support-modal">' +
        '<button class="support-close" id="support-close">&times;</button>' +
        '<div class="support-icon">&#9749;</div>' +
        '<h2 class="support-title" data-i18n="supportTitle">' + (fr ? 'Soutenir le projet' : 'Support the Project') + '</h2>' +
        '<p class="support-text" data-i18n="supportText">' + (fr
          ? 'Ce projet est ind\u00e9pendant et gratuit. Si vous le trouvez utile, vous pouvez soutenir son d\u00e9veloppement.'
          : 'This project is independent and free. If you find it useful, you can support its development.') + '</p>' +
        '<div class="support-buttons">' +
          '<a href="https://buymeacoffee.com/studioauralis" target="_blank" rel="noopener" class="support-btn support-btn-coffee">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>' +
            'Buy Me a Coffee' +
          '</a>' +
          '<a href="https://paypal.me/studioauralis" target="_blank" rel="noopener" class="support-btn support-btn-paypal">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.48A.776.776 0 0 1 5.709 1.8h7.373c2.612 0 4.439 1.06 4.892 3.323.224 1.12.09 2.063-.346 2.873-.457.845-1.281 1.476-2.347 1.897a.31.31 0 0 0-.156.399c.67 1.76-.196 3.903-2.135 4.833-.812.39-1.752.575-2.767.575H9.4a.776.776 0 0 0-.766.68l-.758 4.957a.641.641 0 0 1-.633.54z"/></svg>' +
            'PayPal' +
          '</a>' +
        '</div>' +
        '<p class="support-thanks" data-i18n="supportThanks">' + (fr
          ? 'Chaque contribution aide \u00e0 maintenir les serveurs et am\u00e9liorer les donn\u00e9es. Merci \u2764\ufe0f'
          : 'Every contribution helps maintain servers and improve data. Thank you \u2764\ufe0f') + '</p>' +
      '</div>';
    document.body.appendChild(overlay);

    document.getElementById('support-close').addEventListener('click', closeSupport);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSupport();
    });
  }

  function openSupport() {
    createSupportModal();
    supportOpen = true;
    document.getElementById('support-modal').classList.add('open');
  }

  function closeSupport() {
    supportOpen = false;
    var m = document.getElementById('support-modal');
    if (m) m.classList.remove('open');
  }

  // ============================================================
  // ---- TEACHER RESOURCES PAGE ----
  // ============================================================
  var teachersOpen = false;

  function createTeachersPanel() {
    if (document.getElementById('teachers-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'teachers-panel';
    panel.className = 'page-panel';
    panel.innerHTML = buildTeachersHTML();
    document.body.appendChild(panel);
    document.getElementById('teachers-close').addEventListener('click', closeTeachers);
    var ctaBtn = document.getElementById('teachers-contact-btn');
    if (ctaBtn) ctaBtn.addEventListener('click', function (e) {
      e.preventDefault(); closeTeachers(); openContact();
    });
  }

  function buildTeachersHTML() {
    var G = window.GCT;
    var lang = (G && G.currentLang) || 'fr';
    var fr = lang === 'fr';

    return '<div class="page-header">' +
      '<button class="page-close" id="teachers-close" aria-label="Fermer">&times;</button>' +
    '</div>' +
    '<div class="page-body">' +
      '<div class="about-hero">' +
        '<div class="about-hero-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>' +
        '</div>' +
        '<h1 class="about-title">' + (fr ? 'Espace Enseignants' : 'Teacher Resources') + '</h1>' +
        '<p class="about-subtitle">' + (fr
          ? 'Global Conflict Tracker est un outil gratuit pour enseigner la g\u00e9opolitique, l\'histoire contemporaine et l\'\u00e9ducation civique.'
          : 'Global Conflict Tracker is a free tool for teaching geopolitics, contemporary history and civic education.') + '</p>' +
      '</div>' +

      '<section class="about-section">' +
        '<h2 class="about-section-title">' + (fr ? 'Comment utiliser en cours' : 'How to use in class') + '</h2>' +

        '<div class="teachers-activity">' +
          '<h4>' + (fr ? '1. Pr\u00e9sentation \u00e9clair d\'un conflit' : '1. Quick conflict presentation') + '</h4>' +
          '<p>' + (fr
            ? 'Demandez aux \u00e9l\u00e8ves de choisir un conflit, lire la fiche \u00e9ducative, et pr\u00e9senter en 5 minutes devant la classe. Activez le Mode \u00c9ducation pour afficher les fiches simplifi\u00e9es.'
            : 'Ask students to choose a conflict, read the educational sheet, and present it in 5 minutes. Enable Education Mode to display simplified sheets.') + '</p>' +
        '</div>' +

        '<div class="teachers-activity">' +
          '<h4>' + (fr ? '2. \u00c9valuation diagnostique avec le Quiz' : '2. Diagnostic assessment with the Quiz') + '</h4>' +
          '<p>' + (fr
            ? 'Utilisez le Quiz en d\u00e9but de cours comme \u00e9valuation diagnostique. Les 10 questions g\u00e9n\u00e9r\u00e9es al\u00e9atoirement couvrent les conflits, r\u00e9gions et chiffres cl\u00e9s. Le score donne un aper\u00e7u du niveau de connaissances de la classe.'
            : 'Use the Quiz at the start of class as a diagnostic assessment. The 10 randomly generated questions cover conflicts, regions and key figures. The score gives an overview of the class knowledge level.') + '</p>' +
        '</div>' +

        '<div class="teachers-activity">' +
          '<h4>' + (fr ? '3. Exercice de synth\u00e8se comparative' : '3. Comparative synthesis exercise') + '</h4>' +
          '<p>' + (fr
            ? 'Comparez deux conflits : causes, cons\u00e9quences, dur\u00e9e. La section \u00ab Pour mieux comprendre \u00bb permet de rendre les chiffres concrets gr\u00e2ce aux comparaisons avec des villes fran\u00e7aises.'
            : 'Compare two conflicts: causes, consequences, duration. The "Putting it in perspective" section makes numbers concrete through comparisons with familiar cities.') + '</p>' +
        '</div>' +

        '<div class="teachers-activity">' +
          '<h4>' + (fr ? '4. Analyse chronologique avec le Timelapse' : '4. Chronological analysis with Timelapse') + '</h4>' +
          '<p>' + (fr
            ? 'Analysez l\'\u00e9volution d\'un conflit gr\u00e2ce au timelapse. Les \u00e9l\u00e8ves observent l\'apparition progressive des conflits de 2020 \u00e0 2026 et identifient les p\u00e9riodes d\'escalade.'
            : 'Analyze the evolution of a conflict using the timelapse. Students observe the progressive appearance of conflicts from 2020 to 2026 and identify escalation periods.') + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="about-section">' +
        '<h2 class="about-section-title">' + (fr ? 'Programmes scolaires' : 'School Programs') + '</h2>' +
        '<div class="teachers-programs">' +
          '<h4>' + (fr ? 'Programmes fran\u00e7ais concern\u00e9s' : 'Relevant French curricula') + '</h4>' +
          '<ul>' +
            '<li>' + (fr ? '<strong>Terminale HGGSP</strong> \u2014 Th\u00e8me 2 : Faire la guerre, faire la paix' : '<strong>Terminale HGGSP</strong> \u2014 Theme 2: Making war, making peace') + '</li>' +
            '<li>' + (fr ? '<strong>Terminale HGGSP</strong> \u2014 Th\u00e8me 6 : L\'environnement, entre exploitation et protection' : '<strong>Terminale HGGSP</strong> \u2014 Theme 6: The environment, exploitation and protection') + '</li>' +
            '<li>' + (fr ? '<strong>3\u00e8me EMC</strong> \u2014 Les droits de l\'Homme et la d\u00e9fense de la paix' : '<strong>3\u00e8me EMC</strong> \u2014 Human rights and defence of peace') + '</li>' +
            '<li>' + (fr ? '<strong>1\u00e8re HGGSP</strong> \u2014 Comprendre un r\u00e9gime politique : la d\u00e9mocratie' : '<strong>1\u00e8re HGGSP</strong> \u2014 Understanding political regimes: democracy') + '</li>' +
            '<li>' + (fr ? '<strong>Coll\u00e8ge 4\u00e8me</strong> \u2014 G\u00e9ographie : les dynamiques d\'un monde en recomposition' : '<strong>Coll\u00e8ge 4\u00e8me</strong> \u2014 Geography: dynamics of a changing world') + '</li>' +
          '</ul>' +
        '</div>' +
      '</section>' +

      '<section class="about-section">' +
        '<h2 class="about-section-title">' + (fr ? 'Ressources' : 'Resources') + '</h2>' +
        '<p>' + (fr
          ? 'Utilisez la fonction d\'export PDF pour g\u00e9n\u00e9rer des captures de la carte et les int\u00e9grer dans vos supports de cours. Le Glossaire est \u00e9galement un outil pr\u00e9cieux pour d\u00e9finir les termes cl\u00e9s.'
          : 'Use the PDF export function to generate map captures and integrate them into your course materials. The Glossary is also a valuable tool for defining key terms.') + '</p>' +
        '<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">' +
          '<a href="#" id="teachers-contact-btn" class="support-btn support-btn-coffee" style="text-decoration:none;">' + (fr ? 'Contacter pour un partenariat \u00e9ducatif' : 'Contact for educational partnership') + '</a>' +
        '</div>' +
      '</section>' +
    '</div>';
  }

  function openTeachers() {
    createTeachersPanel();
    teachersOpen = true;
    document.getElementById('teachers-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeTeachers() {
    teachersOpen = false;
    var p = document.getElementById('teachers-panel');
    if (p) p.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ============================================================
  // ---- Expose ----
  // ============================================================
  window.GCT_Pages = {
    openAbout: openAbout,
    closeAbout: closeAbout,
    openContact: openContact,
    closeContact: closeContact,
    openSupport: openSupport,
    closeSupport: closeSupport,
    openTeachers: openTeachers,
    closeTeachers: closeTeachers
  };
})();
