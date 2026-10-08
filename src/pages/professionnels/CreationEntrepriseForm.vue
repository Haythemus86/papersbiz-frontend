<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { submitRequest } from '../../services/api.js'

const router = useRouter()
const submitted = ref(false)
const submitting = ref(false)
const errorMessage = ref('')

const form = reactive({
  // Demandeur
  civilite: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  nationalite: 'Française',
  affiliationGerant: {
    nomPere: '',
    prenomPere: '',
    nomNaissanceMere: '',
    prenomMere: '',
  },
  adresse: '',
  codePostal: '',
  ville: '',

  // Projet
  nomEntreprise: '',
  nomAlternatif: '',
  secteurActivite: '',
  descriptionActivite: '',
  dateDemarrage: '',
  villeSiege: '',

  // Structure
  formeJuridique: '',
  capitalSocial: '',
  nombreAssocies: 1,
  regimeFiscal: '',
  regimeTva: '',

  // Commentaire
  commentaire: '',
  consentement: false,
})

const secteurs = [
  'Commerce / Négoce', 'Services aux entreprises', 'Restauration / CHR',
  'BTP / Artisanat', 'Tech / Numérique', 'Conseil', 'Santé / Bien-être',
  'Immobilier', 'Transport / Logistique', 'E-commerce', 'Autre',
]
const formes = ['SARL', 'EURL', 'SAS', 'SASU', 'SA', 'SCI', 'Micro-entreprise', 'Entreprise individuelle']
const regimesFiscaux = [
  'IS — Impôt sur les sociétés',
  'IR — Impôt sur le revenu',
  'Micro-fiscal',
]
const regimeFiscalParForme = {
  SARL: 'IS — Impôt sur les sociétés',
  EURL: 'IR — Impôt sur le revenu',
  SAS: 'IS — Impôt sur les sociétés',
  SASU: 'IS — Impôt sur les sociétés',
  SA: 'IS — Impôt sur les sociétés',
  SCI: 'IR — Impôt sur le revenu',
  'Micro-entreprise': 'Micro-fiscal',
  'Entreprise individuelle': 'IR — Impôt sur le revenu',
}

watch(() => form.formeJuridique, (formeJuridique) => {
  form.regimeFiscal = regimeFiscalParForme[formeJuridique] || ''
})

async function submit() {
  if (submitting.value) return
  submitting.value = true
  errorMessage.value = ''

  try {
    await submitRequest('CREATION_ENTREPRISE', form)
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <section class="svc-hero">
      <div class="svc-hero-inner">
        <a class="svc-back" @click="router.push('/professionnels')">&larr; Services professionnels</a>
        <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Service 01</div></div>
        <h1>Création <em>d'entreprise</em></h1>
        <p>Remplissez ce formulaire pour démarrer votre projet. Un conseiller dédié vous recontactera sous 48 h ouvrées avec un devis personnalisé et la liste des pièces à fournir.</p>
      </div>
    </section>

    <section class="svc-form-wrap">
      <div v-if="submitted" class="svc-form">
        <div class="svc-success">
          <div class="svc-success-title">Demande envoyée</div>
          <p>Merci {{ form.prenom }} ! Votre dossier de création d'entreprise a bien été enregistré. Un conseiller vous contactera très prochainement.</p>
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
              <div class="svc-section-title">Vos coordonnées</div>
              <div class="svc-section-sub">Coordonnées du gérant ou du représentant légal.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Civilité<span class="svc-required">*</span></label>
              <select v-model="form.civilite" name="civilite" class="form-select" required>
                <option value="">—</option><option>M.</option><option>Mme</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Nationalité</label>
              <input v-model="form.nationalite" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Nom<span class="svc-required">*</span></label>
              <input v-model="form.nom" name="nom" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">Prénom<span class="svc-required">*</span></label>
              <input v-model="form.prenom" name="prenom" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email<span class="svc-required">*</span></label>
              <input v-model="form.email" name="email" class="form-input" type="email" required />
            </div>
            <div class="form-group">
              <label class="form-label">Téléphone<span class="svc-required">*</span></label>
              <input v-model="form.telephone" name="telephone" class="form-input" type="tel" required />
            </div>
            <div class="form-group">
              <label class="form-label">Date de naissance</label>
              <input v-model="form.dateNaissance" class="form-input" type="date" />
            </div>
            <div class="form-group">
              <label class="form-label">Adresse personnelle</label>
              <input v-model="form.adresse" class="form-input" type="text" placeholder="N°, rue" />
            </div>
            <div class="form-group">
              <label class="form-label">Code postal</label>
              <input v-model="form.codePostal" class="form-input" type="text" />
            </div>
            <div class="affiliation-box svc-full">
              <div class="affiliation-box-title">Affiliation du gérant</div>
              <div class="affiliation-box-sub">Pour l’affiliation du gérant, renseignez le nom et le prénom de ses parents. Le nom de naissance de la mère correspond à son nom de jeune fille.</div>
              <div class="affiliation-box-grid">
                <div class="form-group">
                  <label class="form-label">Nom du père<span class="svc-required">*</span></label>
                  <input v-model="form.affiliationGerant.nomPere" name="nomPere" class="form-input" type="text" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Prénom du père<span class="svc-required">*</span></label>
                  <input v-model="form.affiliationGerant.prenomPere" name="prenomPere" class="form-input" type="text" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Nom de naissance de la mère<span class="svc-required">*</span></label>
                  <input v-model="form.affiliationGerant.nomNaissanceMere" name="nomNaissanceMere" class="form-input" type="text" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Prénom de la mère<span class="svc-required">*</span></label>
                  <input v-model="form.affiliationGerant.prenomMere" name="prenomMere" class="form-input" type="text" required />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Ville</label>
              <input v-model="form.ville" class="form-input" type="text" />
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">02.</div>
            <div>
              <div class="svc-section-title">Votre projet</div>
              <div class="svc-section-sub">Décrivez l'activité que vous souhaitez exercer.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Dénomination souhaitée<span class="svc-required">*</span></label>
              <input v-model="form.nomEntreprise" name="nomEntreprise" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">Alternative (au cas où)</label>
              <input v-model="form.nomAlternatif" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Secteur d'activité<span class="svc-required">*</span></label>
              <select v-model="form.secteurActivite" name="secteurActivite" class="form-select" required>
                <option value="">— Sélectionner —</option>
                <option v-for="s in secteurs" :key="s">{{ s }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date de démarrage envisagée</label>
              <input v-model="form.dateDemarrage" class="form-input" type="date" />
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Description de l'activité<span class="svc-required">*</span></label>
              <textarea v-model="form.descriptionActivite" name="descriptionActivite" class="form-textarea" required
                placeholder="Quels produits / services ? Quelle clientèle ?"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Ville du siège social</label>
              <input v-model="form.villeSiege" class="form-input" type="text" />
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">03.</div>
            <div>
              <div class="svc-section-title">Structure juridique</div>
              <div class="svc-section-sub">Si vous hésitez, laissez-nous vous conseiller.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Forme juridique souhaitée</label>
              <select v-model="form.formeJuridique" name="formeJuridique" class="form-select">
                <option value="">— À conseiller —</option>
                <option v-for="f in formes" :key="f">{{ f }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Nombre d'associés</label>
              <input v-model.number="form.nombreAssocies" class="form-input" type="number" min="1" />
            </div>
            <div class="form-group">
              <label class="form-label">Capital social envisagé (€)</label>
              <input v-model="form.capitalSocial" class="form-input" type="number" min="0" placeholder="ex. 1000" />
            </div>
            <div class="form-group">
              <label class="form-label">Régime fiscal</label>
              <select v-model="form.regimeFiscal" name="regimeFiscal" class="form-select">
                <option value="">— À conseiller —</option>
                <option v-for="regime in regimesFiscaux" :key="regime">{{ regime }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Régime de TVA</label>
              <select v-model="form.regimeTva" class="form-select">
                <option value="">— À conseiller —</option>
                <option>Franchise en base</option>
                <option>Réel simplifié</option>
                <option>Réel normal</option>
              </select>
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="form-group svc-full">
            <label class="form-label">Commentaire libre</label>
            <textarea v-model="form.commentaire" class="form-textarea"
              placeholder="Toute information utile à votre dossier"></textarea>
          </div>
          <label class="svc-chip" :class="{ checked: form.consentement }" style="display:flex;">
            <input type="checkbox" name="consentement" v-model="form.consentement" />
            J'accepte d'être recontacté par Papers Biz au sujet de ma demande.
          </label>
          <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
          <div class="svc-actions">
            <button type="button" class="btn-outline" @click="router.push('/professionnels')">Annuler</button>
            <button type="submit" class="btn-gold" :disabled="!form.consentement || submitting">
              {{ submitting ? 'Envoi en cours...' : 'Envoyer ma demande →' }}
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
