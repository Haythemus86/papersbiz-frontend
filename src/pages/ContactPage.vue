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
    <section class="contact-section" style="padding-top:80px;">
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
  </div>
</template>
