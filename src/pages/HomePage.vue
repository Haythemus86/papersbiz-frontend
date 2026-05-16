<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

function useReveal() {
  onMounted(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90)
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
  })
}
useReveal()
</script>

<template>
  <!-- HERO -->
  <section class="hero">
    <div class="hero-orb hero-orb-1"></div>
    <div class="hero-orb hero-orb-2"></div>
    <div class="hero-stripe"></div>
    <div class="hero-content">
      <div style="margin-bottom:40px;">
        <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="width:340px;max-width:100%;height:auto;">
          <circle cx="110" cy="76" r="10" fill="#B8922A"/>
          <line x1="110" y1="91" x2="110" y2="128" stroke="#B8922A" stroke-width="2.2"/>
          <text x="136" y="90" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="700" fill="#FFFFFF" letter-spacing="5">PAPERS</text>
          <rect x="136" y="108" width="309" height="1.5" fill="#B8922A" opacity="0.7"/>
          <text x="136" y="132" font-family="'DM Sans', Arial, sans-serif" font-size="16" font-weight="300" fill="#B8922A" letter-spacing="12">BIZ</text>
          <text x="136" y="164" font-family="'DM Sans', Arial, sans-serif" font-size="10" fill="#FFFFFF" opacity="0.55" letter-spacing="2.5">SOLUTIONS &amp; FORMALITÉS ADMINISTRATIVES</text>
        </svg>
      </div>
      <div class="hero-eyebrow">
        <div class="eyebrow-line"></div>
        <div class="eyebrow-text">Votre partenaire de confiance</div>
      </div>
      <h1>L'expertise qui <em>simplifie</em>,<br />le conseil qui <em>fait la différence</em></h1>
      <div class="hero-tagline">Conseil · Création · Accompagnement administratif</div>
      <p>Papers Biz accompagne professionnels et particuliers dans leurs démarches administratives et projets de développement. Une écoute attentive, une expertise reconnue, un engagement sans faille.</p>
      <div class="hero-pills">
        <div class="hero-pill">Professionnels</div>
        <div class="hero-pill">Particuliers</div>
        <div class="hero-pill">Démarches administratives</div>
        <div class="hero-pill">Conseil &amp; Création</div>
      </div>
      <div class="hero-actions">
        <RouterLink to="/contact" class="btn-gold">Prendre contact →</RouterLink>
        <RouterLink to="/professionnels" class="btn-outline">Nos services</RouterLink>
      </div>
    </div>
    <!-- Carte flottante droite -->
    <div class="hero-card">
      <div style="margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--gold-border);">
        <svg viewBox="0 0 600 145" xmlns="http://www.w3.org/2000/svg" style="width:160px;height:auto;">
          <circle cx="110" cy="76" r="10" fill="#B8922A"/>
          <line x1="110" y1="91" x2="110" y2="128" stroke="#B8922A" stroke-width="2.2"/>
          <text x="136" y="90" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="700" fill="#FFFFFF" letter-spacing="5">PAPERS</text>
          <rect x="136" y="108" width="309" height="1.5" fill="#B8922A" opacity="0.7"/>
          <text x="136" y="132" font-family="'DM Sans', Arial, sans-serif" font-size="16" font-weight="300" fill="#B8922A" letter-spacing="12">BIZ</text>
        </svg>
      </div>
      <div class="hero-card-title">Nos domaines</div>
      <div class="hero-card-list">
        <div class="hero-card-item">
          <div class="hci-num">01</div>
          <div class="hci-text"><strong>Création d'entreprise</strong>Accompagnement complet des démarches administratives</div>
        </div>
        <div class="hero-card-item">
          <div class="hci-num">02</div>
          <div class="hci-text"><strong>Optimisation fiscale</strong>Conseil et maximisation de la performance financière</div>
        </div>
        <div class="hero-card-item">
          <div class="hci-num">03</div>
          <div class="hci-text"><strong>Conseil en négoce</strong>Expertise dans les transactions commerciales complexes</div>
        </div>
        <div class="hero-card-item">
          <div class="hci-num">04</div>
          <div class="hci-text"><strong>Particuliers</strong>Simplification de toutes vos démarches administratives</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ANCHOR BAR -->
  <div class="anchor-bar">
    <RouterLink to="/a-propos" class="anchor-link">Qui sommes-nous</RouterLink>
    <RouterLink to="/professionnels" class="anchor-link">Services Pro</RouterLink>
    <RouterLink to="/particuliers" class="anchor-link">Particuliers</RouterLink>
    <RouterLink to="/contact" class="anchor-link">Contact</RouterLink>
  </div>

  <!-- À PROPOS -->
  <section class="about-section" id="apropos">
    <div class="about-left reveal">
      <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Qui sommes-nous</div></div>
      <h2 class="section-title">Une structure au service<br />de vos <em>ambitions</em></h2>
      <p class="section-text">Papers Biz est une structure de conseil et de prestation de services, dédiée à l'accompagnement des professionnels et des particuliers dans leurs démarches administratives et leurs projets de développement.</p>
      <p class="section-text">Notre approche est fondée sur une écoute attentive, une expertise reconnue et un engagement sans faille envers nos clients. Nous intervenons avec rigueur et bienveillance, pour que chaque démarche soit une réussite.</p>
      <div class="about-values">
        <div class="about-value"><div class="about-value-title">Expertise</div><div class="about-value-text">Une connaissance approfondie des réglementations et procédures administratives.</div></div>
        <div class="about-value"><div class="about-value-title">Proximité</div><div class="about-value-text">Un interlocuteur dédié, disponible et à l'écoute de vos besoins spécifiques.</div></div>
        <div class="about-value"><div class="about-value-title">Résultats</div><div class="about-value-text">Un suivi rigoureux de chaque dossier jusqu'à son aboutissement complet.</div></div>
        <div class="about-value"><div class="about-value-title">Confiance</div><div class="about-value-text">Discrétion et confidentialité garanties sur l'ensemble de nos prestations.</div></div>
      </div>
    </div>
    <div class="about-right reveal delay-2">
      <div class="about-quote">« L'expertise qui <span>simplifie</span>, le conseil qui fait la <span>différence</span>. »</div>
      <div class="about-stats">
        <div class="astat"><div class="astat-num">2</div><div class="astat-label">Pôles d'expertise</div></div>
        <div class="astat"><div class="astat-num">4</div><div class="astat-label">Services Pro</div></div>
        <div class="astat"><div class="astat-num">100%</div><div class="astat-label">Engagement client</div></div>
      </div>
    </div>
  </section>

  <!-- SERVICES PROFESSIONNELS -->
  <section class="pro-section" id="professionnels">
    <div class="pro-header">
      <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Services professionnels</div></div>
      <h2 class="section-title">Nous intervenons auprès<br />des <em>entreprises</em></h2>
      <p>De la création de votre structure à l'optimisation de sa performance, Papers Biz vous accompagne à chaque étape de votre développement.</p>
    </div>
    <div class="pro-grid">
      <div class="pro-card reveal">
        <div class="pro-card-num">01</div>
        <span class="pro-card-icon">🏛️</span>
        <div class="pro-card-title">Création d'entreprise</div>
        <p class="pro-card-desc">Accompagnement complet dans la création et les démarches administratives de votre société. Choix du statut juridique, rédaction des statuts, immatriculation, ouverture de comptes — nous gérons l'ensemble du processus pour vous permettre de vous concentrer sur votre activité.</p>
        <div class="pro-card-tags"><span class="pro-tag">SARL / SAS</span><span class="pro-tag">Auto-entrepreneur</span><span class="pro-tag">Statuts</span><span class="pro-tag">Immatriculation</span></div>
      </div>
      <div class="pro-card reveal delay-1">
        <div class="pro-card-num">02</div>
        <span class="pro-card-icon">📊</span>
        <div class="pro-card-title">Optimisation fiscale &amp; comptable</div>
        <p class="pro-card-desc">Conseil en optimisation fiscale et comptable pour maximiser la performance financière de votre entreprise. Nous analysons votre situation, identifions les leviers d'optimisation et vous proposons des stratégies adaptées à votre structure et à vos objectifs.</p>
        <div class="pro-card-tags"><span class="pro-tag">Fiscalité</span><span class="pro-tag">Comptabilité</span><span class="pro-tag">TVA</span><span class="pro-tag">IS / IR</span></div>
      </div>
      <div class="pro-card reveal delay-1">
        <div class="pro-card-num">03</div>
        <span class="pro-card-icon">🤝</span>
        <div class="pro-card-title">Conseil en négoce</div>
        <p class="pro-card-desc">Expertise stratégique dans le négoce et les transactions commerciales complexes. Nous vous conseillons dans la structuration de vos opérations commerciales, la négociation de contrats et la sécurisation de vos transactions à l'import comme à l'export.</p>
        <div class="pro-card-tags"><span class="pro-tag">Import / Export</span><span class="pro-tag">Contrats</span><span class="pro-tag">Stratégie commerciale</span></div>
      </div>
      <div class="pro-card reveal delay-2">
        <div class="pro-card-num">04</div>
        <span class="pro-card-icon">🚀</span>
        <div class="pro-card-title">Apport d'affaires</div>
        <p class="pro-card-desc">Mise en relation et développement de partenariats pour accélérer votre croissance. Notre réseau et notre expertise permettent d'identifier les opportunités pertinentes, de faciliter les introductions et de structurer des partenariats durables au service de votre développement.</p>
        <div class="pro-card-tags"><span class="pro-tag">Mise en relation</span><span class="pro-tag">Partenariats</span><span class="pro-tag">Développement</span></div>
      </div>
    </div>
  </section>

  <!-- PARTICULIERS -->
  <section class="part-section" id="particuliers">
    <div class="part-intro">
      <div class="reveal">
        <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Particuliers</div></div>
        <h2 class="section-title">Un accompagnement<br /><em>humain et efficace</em></h2>
      </div>
      <div class="part-intro-right reveal delay-1">
        <p>Pour les particuliers, Papers Biz simplifie chaque démarche administrative grâce à un accompagnement personnalisé, efficace et humain.</p>
        <br />
        <p>Quel que soit votre besoin — constitution de dossier, démarche en ligne, formulaire administratif — notre équipe prend en charge chaque étape pour vous.</p>
      </div>
    </div>
    <div class="part-steps-title">Notre méthode</div>
    <div class="part-steps">
      <div class="part-step reveal">
        <div class="step-indicator"><div class="step-circle">01</div><div class="step-connector"></div></div>
        <div><div class="step-title">Évaluation de votre situation</div><p class="step-desc">Analyse complète de vos besoins et de votre dossier administratif. Nous prenons le temps de comprendre votre situation pour vous proposer la solution la mieux adaptée.</p></div>
      </div>
      <div class="part-step reveal">
        <div class="step-indicator"><div class="step-circle">02</div><div class="step-connector"></div></div>
        <div><div class="step-title">Constitution du dossier</div><p class="step-desc">Collecte et préparation de l'ensemble des documents nécessaires. Nous vérifions la conformité de chaque pièce et anticipons les demandes de l'administration.</p></div>
      </div>
      <div class="part-step reveal">
        <div class="step-indicator"><div class="step-circle">03</div></div>
        <div><div class="step-title">Suivi &amp; aboutissement</div><p class="step-desc">Prise en charge des démarches jusqu'à leur résolution complète. Vous êtes informé à chaque étape et recevez un compte-rendu final de votre dossier.</p></div>
      </div>
    </div>
    <div class="formalites-title reveal">Les formalités que nous traitons</div>
    <p class="formalites-sub reveal">Un large spectre de démarches administratives pour simplifier votre quotidien</p>
    <div class="formalites-grid">
      <div class="formalite-card reveal"><span class="formalite-icon">🪪</span><div class="formalite-name">Carte nationale d'identité</div><p class="formalite-desc">Renouvellement ou première demande de CNI. Constitution du dossier, prise de rendez-vous et suivi de la demande.</p></div>
      <div class="formalite-card reveal delay-1"><span class="formalite-icon">✈️</span><div class="formalite-name">Passeport</div><p class="formalite-desc">Demande ou renouvellement de passeport biométrique. Vérification des pièces requises et accompagnement complet.</p></div>
      <div class="formalite-card reveal delay-2"><span class="formalite-icon">🏠</span><div class="formalite-name">Dossier de logement</div><p class="formalite-desc">Constitution de dossiers de location, demande d'aide au logement (APL, CAF) et démarches auprès des bailleurs.</p></div>
      <div class="formalite-card reveal"><span class="formalite-icon">💼</span><div class="formalite-name">Dossier France Travail</div><p class="formalite-desc">Inscription, mise à jour de situation, demande d'allocations et suivi des droits auprès de France Travail.</p></div>
      <div class="formalite-card reveal delay-1"><span class="formalite-icon">🏥</span><div class="formalite-name">Sécurité sociale &amp; Mutuelle</div><p class="formalite-desc">Affiliation, changement de situation, remboursements et démarches liées à la couverture santé.</p></div>
      <div class="formalite-card reveal delay-2"><span class="formalite-icon">🧾</span><div class="formalite-name">Déclaration d'impôts</div><p class="formalite-desc">Aide à la déclaration de revenus, vérification des informations et optimisation des déductions légales.</p></div>
      <div class="formalite-card reveal"><span class="formalite-icon">🎓</span><div class="formalite-name">Dossiers scolaires &amp; universitaires</div><p class="formalite-desc">Inscription, bourses, Parcoursup, demandes de bourse CROUS et dossiers administratifs liés aux études.</p></div>
      <div class="formalite-card reveal delay-1"><span class="formalite-icon">🚗</span><div class="formalite-name">Permis de conduire &amp; véhicule</div><p class="formalite-desc">Démarches ANTS : carte grise, duplicata de permis, immatriculation, changement d'adresse.</p></div>
      <div class="formalite-card reveal delay-2"><span class="formalite-icon">📜</span><div class="formalite-name">Actes d'état civil</div><p class="formalite-desc">Demande d'extrait de naissance, de mariage, de PACS, ou tout autre acte auprès des mairies et consulats.</p></div>
    </div>
  </section>

  <!-- POURQUOI NOUS -->
  <section class="why-section">
    <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Pourquoi nous choisir</div></div>
    <h2 class="section-title">Expertise · Proximité · <em>Résultats</em></h2>
    <div class="why-grid">
      <div class="why-card reveal"><div class="why-icon">🎯</div><div class="why-title">Expertise reconnue</div><p class="why-text">Une connaissance approfondie des réglementations et des procédures administratives françaises, mise à jour en permanence.</p></div>
      <div class="why-card reveal delay-1"><div class="why-icon">👤</div><div class="why-title">Accompagnement personnalisé</div><p class="why-text">Un interlocuteur dédié pour chaque client. Pas de centre d'appels — un suivi humain, direct et bienveillant.</p></div>
      <div class="why-card reveal delay-2"><div class="why-icon">⚡</div><div class="why-title">Rapidité &amp; efficacité</div><p class="why-text">Nous optimisons chaque étape pour vous faire gagner du temps. Vos dossiers sont traités avec rigueur et célérité.</p></div>
    </div>
  </section>

  <!-- CONTACT CTA -->
  <section class="contact-section" id="contact">
    <div class="contact-left reveal">
      <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Contact</div></div>
      <h2 class="section-title">Contactez-nous<br /><em>dès aujourd'hui</em></h2>
      <p class="contact-tagline">« Votre partenaire de confiance »</p>
      <p style="font-size:0.9rem;color:var(--text-light);line-height:1.82;font-weight:300;margin-bottom:28px;">Décrivez-nous votre besoin et nous vous recontactons rapidement pour vous proposer la solution la mieux adaptée à votre situation.</p>
      <div class="contact-infos">
        <a href="mailto:contact@papers-biz.com" class="contact-info-item">
          <div class="ci-icon">✉️</div>
          <div><div class="ci-label">Email</div><div class="ci-value">contact@papers-biz.com</div></div>
        </a>
        <a href="https://www.papers-biz.com" class="contact-info-item">
          <div class="ci-icon">🌐</div>
          <div><div class="ci-label">Site internet</div><div class="ci-value">www.papers-biz.com</div></div>
        </a>
        <div class="contact-info-item">
          <div class="ci-icon">🇫🇷</div>
          <div><div class="ci-label">Zone d'intervention</div><div class="ci-value">France — Accompagnement à distance disponible</div></div>
        </div>
      </div>
    </div>
    <div class="contact-right reveal delay-1">
      <div class="contact-form">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Prénom</label><input class="form-input" type="text" placeholder="Jean" /></div>
          <div class="form-group"><label class="form-label">Nom</label><input class="form-input" type="text" placeholder="Dupont" /></div>
        </div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="jean.dupont@email.fr" /></div>
        <div class="form-group"><label class="form-label">Téléphone</label><input class="form-input" type="tel" placeholder="+33 6 XX XX XX XX" /></div>
        <div class="form-group">
          <label class="form-label">Vous êtes</label>
          <select class="form-select">
            <option value="">Sélectionnez votre profil</option>
            <option>Particulier — Démarche administrative</option>
            <option>Professionnel — Création d'entreprise</option>
            <option>Professionnel — Optimisation fiscale</option>
            <option>Professionnel — Conseil en négoce</option>
            <option>Professionnel — Apport d'affaires</option>
          </select>
        </div>
        <div class="form-group"><label class="form-label">Votre demande</label><textarea class="form-textarea" placeholder="Décrivez brièvement votre situation et ce dont vous avez besoin..."></textarea></div>
        <a href="mailto:contact@papers-biz.com" class="btn-gold" style="justify-content:center;text-align:center;">Envoyer ma demande →</a>
      </div>
    </div>
  </section>
</template>
