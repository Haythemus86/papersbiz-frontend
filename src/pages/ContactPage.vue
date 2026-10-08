<script setup>
import { onMounted, reactive, ref } from 'vue'
import { submitRequest } from '../services/api.js'

const form = reactive({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  profil: '',
  message: '',
  consentement: false,
})
const submitted = ref(false)
const submitting = ref(false)
const errorMessage = ref('')

async function submit() {
  if (submitting.value) return
  submitting.value = true
  errorMessage.value = ''

  try {
    await submitRequest('CONTACT', form)
    submitted.value = true
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    submitting.value = false
  }
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
        <div v-if="submitted" class="contact-form">
          <div class="svc-success">
            <div class="svc-success-title">Message envoyé</div>
            <p>Merci {{ form.prenom }}. Votre demande a bien été transmise à notre équipe.</p>
          </div>
        </div>
        <form v-else class="contact-form" @submit.prevent="submit">
          <div class="form-row">
            <div class="form-group"><label class="form-label">Prénom<span class="svc-required">*</span></label><input v-model="form.prenom" class="form-input" type="text" placeholder="Jean" required /></div>
            <div class="form-group"><label class="form-label">Nom<span class="svc-required">*</span></label><input v-model="form.nom" class="form-input" type="text" placeholder="Dupont" required /></div>
          </div>
          <div class="form-group"><label class="form-label">Email<span class="svc-required">*</span></label><input v-model="form.email" class="form-input" type="email" placeholder="jean.dupont@email.fr" required /></div>
          <div class="form-group"><label class="form-label">Téléphone</label><input v-model="form.telephone" class="form-input" type="tel" placeholder="+33 6 XX XX XX XX" /></div>
          <div class="form-group">
            <label class="form-label">Vous êtes</label>
            <select v-model="form.profil" class="form-select">
              <option value="">Sélectionnez votre profil</option>
              <option>Particulier — Démarche administrative</option>
              <option>Professionnel — Création d'entreprise</option>
              <option>Professionnel — Optimisation fiscale</option>
              <option>Professionnel — Apport d'affaires</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Votre demande<span class="svc-required">*</span></label><textarea v-model="form.message" class="form-textarea" placeholder="Décrivez brièvement votre situation et ce dont vous avez besoin..." required></textarea></div>
          <label class="svc-chip" :class="{ checked: form.consentement }" style="display:flex;">
            <input v-model="form.consentement" type="checkbox" />
            J'accepte que Papers Biz me recontacte au sujet de ma demande.
          </label>
          <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
          <button type="submit" class="btn-gold" style="justify-content:center;text-align:center;" :disabled="!form.consentement || submitting">
            {{ submitting ? 'Envoi en cours...' : 'Envoyer ma demande →' }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
