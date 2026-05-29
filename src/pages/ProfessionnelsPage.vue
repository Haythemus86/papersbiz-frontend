<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const services = [
  { num: '01', icon: '🏛️', title: "Création d'entreprise",
    desc: "Accompagnement complet dans la création et les démarches administratives de votre société. Choix du statut juridique, rédaction des statuts, immatriculation, ouverture de comptes — nous gérons l'ensemble du processus.",
    tags: ['SARL / SAS', 'Auto-entrepreneur', 'Statuts', 'Immatriculation'],
    route: '/professionnels/creation-entreprise', delay: '' },
  { num: '02', icon: '📊', title: "Optimisation fiscale & comptable",
    desc: "Conseil en optimisation fiscale et comptable pour maximiser la performance financière de votre entreprise. Nous analysons votre situation et identifions les leviers d'optimisation adaptés.",
    tags: ['Fiscalité', 'Comptabilité', 'TVA', 'IS / IR'],
    route: '/professionnels/optimisation-fiscale', delay: 'delay-1' },
  { num: '03', icon: '🤝', title: "Conseil en négoce",
    desc: "Expertise stratégique dans le négoce et les transactions commerciales complexes. Structuration des opérations commerciales, négociation de contrats, sécurisation des transactions import/export.",
    tags: ['Import / Export', 'Contrats', 'Stratégie commerciale'],
    route: '/professionnels/conseil-negoce', delay: 'delay-1' },
  { num: '04', icon: '🚀', title: "Apport d'affaires",
    desc: "Mise en relation et développement de partenariats pour accélérer votre croissance. Notre réseau permet d'identifier les opportunités pertinentes et de structurer des partenariats durables.",
    tags: ['Mise en relation', 'Partenariats', 'Développement'],
    route: '/professionnels/apport-affaires', delay: 'delay-2' },
]

function go(path) {
  router.push(path)
}

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
        <div v-for="s in services" :key="s.num"
          class="pro-card clickable reveal" :class="s.delay"
          role="link" tabindex="0"
          @click="go(s.route)" @keyup.enter="go(s.route)">
          <div class="pro-card-num">{{ s.num }}</div>
          <span class="pro-card-icon">{{ s.icon }}</span>
          <div class="pro-card-title">{{ s.title }}</div>
          <p class="pro-card-desc">{{ s.desc }}</p>
          <div class="pro-card-tags">
            <span v-for="t in s.tags" :key="t" class="pro-tag">{{ t }}</span>
          </div>
          <div class="pro-card-cta">Démarrer ma demande &rarr;</div>
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
