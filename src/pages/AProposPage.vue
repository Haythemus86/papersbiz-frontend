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
    <section class="about-section" style="padding-top:80px;">
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
  </div>
</template>
