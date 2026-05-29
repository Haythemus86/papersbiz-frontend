<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitted = ref(false)

const form = reactive({
  // Rôle
  role: '', // 'apporteur' | 'demandeur'

  // Identité (commune)
  civilite: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  raisonSociale: '',
  siret: '',
  siteWeb: '',
  linkedin: '',

  // Apporteur (profil)
  experienceAnnees: '',
  secteursExpertise: [],
  reseauDescription: '',
  zoneGeographique: [],

  // Demandeur (besoin)
  secteurEntreprise: '',
  produitsServices: '',
  cibleClient: '',
  zoneCible: [],
  tailleClientCible: [],

  // Conditions du partenariat
  typeRemuneration: '',
  commissionProposee: '',
  exclusivite: '',
  dureeEngagement: '',
  volumeAttendu: '',

  // Commentaire
  commentaire: '',
  consentement: false,
})

const secteursList = [
  'BTP', 'Industrie', 'Tech / SaaS', 'Finance / Assurance',
  'Immobilier', 'Distribution', 'Santé', 'Conseil',
  'Restauration / Hôtellerie', 'Énergie', 'Logistique', 'Luxe', 'Autre',
]
const zonesList = [
  'France entière', 'Île-de-France', 'Grand Est', 'Sud / PACA',
  'Auvergne-Rhône-Alpes', 'Europe', 'Maghreb', 'Afrique', 'International',
]
const taillesList = ['TPE', 'PME', 'ETI', 'Grands comptes']

function toggle(field, value) {
  const arr = form[field]
  const i = arr.indexOf(value)
  if (i === -1) arr.push(value); else arr.splice(i, 1)
}

const isApporteur = computed(() => form.role === 'apporteur')
const isDemandeur = computed(() => form.role === 'demandeur')

function submit() {
  const payload = { type: 'apport_affaires', createdAt: new Date().toISOString(), data: { ...form } }
  console.log('[PapersBiz] Submission', payload)
  submitted.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <section class="svc-hero">
      <div class="svc-hero-inner">
        <a class="svc-back" @click="router.push('/professionnels')">&larr; Services professionnels</a>
        <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Service 04</div></div>
        <h1>Apport <em>d'affaires</em></h1>
        <p>Que vous soyez apporteur d'affaires souhaitant rejoindre notre réseau ou une entreprise à la recherche de nouvelles opportunités, ce formulaire nous permet de qualifier votre profil et d'établir un partenariat sur mesure.</p>
      </div>
    </section>

    <section class="svc-form-wrap">
      <div v-if="submitted" class="svc-form">
        <div class="svc-success">
          <div class="svc-success-title">Profil enregistré</div>
          <p>Merci {{ form.prenom }} ! Votre profil a bien été reçu. Nous reviendrons vers vous pour étudier les opportunités de partenariat.</p>
          <div class="svc-actions" style="justify-content:flex-start;">
            <button class="btn-outline" @click="router.push('/professionnels')">Retour aux services</button>
          </div>
        </div>
      </div>

      <form v-else class="svc-form" @submit.prevent="submit">
        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">01.</div>
            <div>
              <div class="svc-section-title">Votre rôle</div>
              <div class="svc-section-sub">Sélectionnez ce qui vous correspond.</div>
            </div>
          </div>
          <div class="svc-grid">
            <label class="svc-chip" :class="{ checked: form.role === 'apporteur' }"
              style="display:flex; padding:20px; flex-direction:column; align-items:flex-start; gap:6px;">
              <input type="radio" value="apporteur" v-model="form.role" />
              <strong style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;">Je suis apporteur d'affaires</strong>
              <span style="font-size:0.8rem;color:var(--text-muted);">Je souhaite rejoindre votre réseau et apporter des opportunités.</span>
            </label>
            <label class="svc-chip" :class="{ checked: form.role === 'demandeur' }"
              style="display:flex; padding:20px; flex-direction:column; align-items:flex-start; gap:6px;">
              <input type="radio" value="demandeur" v-model="form.role" />
              <strong style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;">Je recherche des apporteurs</strong>
              <span style="font-size:0.8rem;color:var(--text-muted);">Mon entreprise cherche à développer son CA via un réseau d'apporteurs.</span>
            </label>
          </div>
        </div>

        <div v-if="form.role" class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">02.</div>
            <div>
              <div class="svc-section-title">Identité</div>
              <div class="svc-section-sub">Vos coordonnées et celles de votre structure.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Civilité</label>
              <select v-model="form.civilite" class="form-select">
                <option value="">—</option><option>M.</option><option>Mme</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Raison sociale</label>
              <input v-model="form.raisonSociale" class="form-input" type="text"
                placeholder="Si vous opérez sous une structure" />
            </div>
            <div class="form-group">
              <label class="form-label">Nom<span class="svc-required">*</span></label>
              <input v-model="form.nom" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">Prénom<span class="svc-required">*</span></label>
              <input v-model="form.prenom" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email<span class="svc-required">*</span></label>
              <input v-model="form.email" class="form-input" type="email" required />
            </div>
            <div class="form-group">
              <label class="form-label">Téléphone<span class="svc-required">*</span></label>
              <input v-model="form.telephone" class="form-input" type="tel" required />
            </div>
            <div class="form-group">
              <label class="form-label">SIRET</label>
              <input v-model="form.siret" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Site web</label>
              <input v-model="form.siteWeb" class="form-input" type="url" placeholder="https://" />
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Profil LinkedIn</label>
              <input v-model="form.linkedin" class="form-input" type="url" placeholder="https://linkedin.com/in/…" />
            </div>
          </div>
        </div>

        <div v-if="isApporteur" class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">03.</div>
            <div>
              <div class="svc-section-title">Votre profil d'apporteur</div>
              <div class="svc-section-sub">Aidez-nous à évaluer la complémentarité avec notre réseau.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Années d'expérience</label>
              <input v-model="form.experienceAnnees" class="form-input" type="number" min="0" />
            </div>
            <div class="form-group">
              <label class="form-label">Volume d'affaires apporté / an</label>
              <input v-model="form.volumeAttendu" class="form-input" type="text" placeholder="ex. 15 dossiers / 500k€" />
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Secteurs d'expertise</label>
              <div class="svc-check-group">
                <label v-for="s in secteursList" :key="s"
                  class="svc-chip" :class="{ checked: form.secteursExpertise.includes(s) }">
                  <input type="checkbox" :checked="form.secteursExpertise.includes(s)" @change="toggle('secteursExpertise', s)" />
                  {{ s }}
                </label>
              </div>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Zones géographiques couvertes</label>
              <div class="svc-check-group">
                <label v-for="z in zonesList" :key="z"
                  class="svc-chip" :class="{ checked: form.zoneGeographique.includes(z) }">
                  <input type="checkbox" :checked="form.zoneGeographique.includes(z)" @change="toggle('zoneGeographique', z)" />
                  {{ z }}
                </label>
              </div>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Présentation de votre réseau</label>
              <textarea v-model="form.reseauDescription" class="form-textarea"
                placeholder="Type de contacts, fonction des décideurs, qualité du carnet d'adresses…"></textarea>
            </div>
          </div>
        </div>

        <div v-if="isDemandeur" class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">03.</div>
            <div>
              <div class="svc-section-title">Votre entreprise &amp; cibles</div>
              <div class="svc-section-sub">Quel type d'affaires recherchez-vous ?</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Secteur de votre entreprise<span class="svc-required">*</span></label>
              <select v-model="form.secteurEntreprise" class="form-select" required>
                <option value="">— Sélectionner —</option>
                <option v-for="s in secteursList" :key="s">{{ s }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Cible client</label>
              <input v-model="form.cibleClient" class="form-input" type="text"
                placeholder="Décideur, fonction, persona…" />
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Produits / services à promouvoir<span class="svc-required">*</span></label>
              <textarea v-model="form.produitsServices" class="form-textarea" required></textarea>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Zones géographiques cibles</label>
              <div class="svc-check-group">
                <label v-for="z in zonesList" :key="z"
                  class="svc-chip" :class="{ checked: form.zoneCible.includes(z) }">
                  <input type="checkbox" :checked="form.zoneCible.includes(z)" @change="toggle('zoneCible', z)" />
                  {{ z }}
                </label>
              </div>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Taille des clients ciblés</label>
              <div class="svc-check-group">
                <label v-for="t in taillesList" :key="t"
                  class="svc-chip" :class="{ checked: form.tailleClientCible.includes(t) }">
                  <input type="checkbox" :checked="form.tailleClientCible.includes(t)" @change="toggle('tailleClientCible', t)" />
                  {{ t }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="form.role" class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">04.</div>
            <div>
              <div class="svc-section-title">Conditions de partenariat</div>
              <div class="svc-section-sub">Indications souhaitées — tout reste à négocier.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Type de rémunération</label>
              <select v-model="form.typeRemuneration" class="form-select">
                <option value="">—</option>
                <option>Commission au % du CA</option>
                <option>Forfait par dossier</option>
                <option>Mixte (forfait + variable)</option>
                <option>À discuter</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Commission envisagée</label>
              <input v-model="form.commissionProposee" class="form-input" type="text" placeholder="ex. 5 % HT" />
            </div>
            <div class="form-group">
              <label class="form-label">Exclusivité</label>
              <select v-model="form.exclusivite" class="form-select">
                <option value="">—</option>
                <option>Non exclusif</option>
                <option>Exclusivité sectorielle</option>
                <option>Exclusivité géographique</option>
                <option>Exclusivité totale</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Durée d'engagement</label>
              <select v-model="form.dureeEngagement" class="form-select">
                <option value="">—</option>
                <option>Mission ponctuelle</option>
                <option>6 mois</option>
                <option>12 mois renouvelable</option>
                <option>Indéterminée</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="form.role" class="svc-section">
          <div class="form-group">
            <label class="form-label">Commentaire libre</label>
            <textarea v-model="form.commentaire" class="form-textarea"
              placeholder="Précisions, attentes spécifiques…"></textarea>
          </div>
          <label class="svc-chip" :class="{ checked: form.consentement }" style="display:flex; margin-top:16px;">
            <input type="checkbox" v-model="form.consentement" />
            J'accepte que Papers Biz me recontacte pour étudier un partenariat.
          </label>
          <div class="svc-actions">
            <button type="button" class="btn-outline" @click="router.push('/professionnels')">Annuler</button>
            <button type="submit" class="btn-gold" :disabled="!form.consentement">Envoyer mon profil &rarr;</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
