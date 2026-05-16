<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90)
    })
  }, { threshold: 0.08 })
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>

<template>
  <div style="padding-top:80px;">
    <section class="pro-section" style="padding-top:80px;">
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
          <p class="pro-card-desc">Accompagnement complet dans la création et les démarches administratives de votre société. Choix du statut juridique, rédaction des statuts, immatriculation, ouverture de comptes — nous gérons l'ensemble du processus.</p>
          <div class="pro-card-tags"><span class="pro-tag">SARL / SAS</span><span class="pro-tag">Auto-entrepreneur</span><span class="pro-tag">Statuts</span><span class="pro-tag">Immatriculation</span></div>
        </div>
        <div class="pro-card reveal delay-1">
          <div class="pro-card-num">02</div>
          <span class="pro-card-icon">📊</span>
          <div class="pro-card-title">Optimisation fiscale &amp; comptable</div>
          <p class="pro-card-desc">Conseil en optimisation fiscale et comptable pour maximiser la performance financière de votre entreprise. Nous analysons votre situation et identifions les leviers d'optimisation adaptés.</p>
          <div class="pro-card-tags"><span class="pro-tag">Fiscalité</span><span class="pro-tag">Comptabilité</span><span class="pro-tag">TVA</span><span class="pro-tag">IS / IR</span></div>
        </div>
        <div class="pro-card reveal delay-1">
          <div class="pro-card-num">03</div>
          <span class="pro-card-icon">🤝</span>
          <div class="pro-card-title">Conseil en négoce</div>
          <p class="pro-card-desc">Expertise stratégique dans le négoce et les transactions commerciales complexes. Structuration des opérations commerciales, négociation de contrats, sécurisation des transactions import/export.</p>
          <div class="pro-card-tags"><span class="pro-tag">Import / Export</span><span class="pro-tag">Contrats</span><span class="pro-tag">Stratégie commerciale</span></div>
        </div>
        <div class="pro-card reveal delay-2">
          <div class="pro-card-num">04</div>
          <span class="pro-card-icon">🚀</span>
          <div class="pro-card-title">Apport d'affaires</div>
          <p class="pro-card-desc">Mise en relation et développement de partenariats pour accélérer votre croissance. Notre réseau permet d'identifier les opportunités pertinentes et de structurer des partenariats durables.</p>
          <div class="pro-card-tags"><span class="pro-tag">Mise en relation</span><span class="pro-tag">Partenariats</span><span class="pro-tag">Développement</span></div>
        </div>
      </div>
    </section>

    <section class="why-section">
      <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Pourquoi nous choisir</div></div>
      <h2 class="section-title">Expertise · Proximité · <em>Résultats</em></h2>
      <div class="why-grid">
        <div class="why-card reveal"><div class="why-icon">🎯</div><div class="why-title">Expertise reconnue</div><p class="why-text">Une connaissance approfondie des réglementations et des procédures administratives françaises, mise à jour en permanence.</p></div>
        <div class="why-card reveal delay-1"><div class="why-icon">👤</div><div class="why-title">Accompagnement personnalisé</div><p class="why-text">Un interlocuteur dédié pour chaque client. Pas de centre d'appels — un suivi humain, direct et bienveillant.</p></div>
        <div class="why-card reveal delay-2"><div class="why-icon">⚡</div><div class="why-title">Rapidité &amp; efficacité</div><p class="why-text">Nous optimisons chaque étape pour vous faire gagner du temps. Vos dossiers sont traités avec rigueur et célérité.</p></div>
      </div>
    </section>
  </div>
</template>
