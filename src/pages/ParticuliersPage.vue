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
    <section class="part-section" style="padding-top:80px;">
      <div class="part-intro">
        <div class="reveal">
          <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Particuliers</div></div>
          <h2 class="section-title">Un accompagnement<br /><em>humain et efficace</em></h2>
        </div>
        <div class="part-intro-right reveal delay-1">
          <p>Pour les particuliers, Papers Biz simplifie chaque démarche administrative grâce à un accompagnement personnalisé, efficace et humain. De l'analyse de votre dossier à la résolution complète, nous sommes à vos côtés.</p>
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
  </div>
</template>
