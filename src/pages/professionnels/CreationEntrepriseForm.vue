<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitted = ref(false)

const form = reactive({
  // Demandeur
  civilite: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  nationalite: 'Française',
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
  domiciliationSouhaitee: '',

  // Structure
  formeJuridique: '',
  capitalSocial: '',
  nombreAssocies: 1,
  regimeFiscal: '',
  regimeTva: '',
  regimeSocialDirigeant: '',

  // Prestations
  prestations: [],

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
const prestationsList = [
  'Rédaction des statuts', 'Dépôt de capital', 'Annonce légale',
  'Immatriculation (greffe)', 'Domiciliation commerciale',
  'Ouverture de compte bancaire pro', 'Comptabilité', 'Conseil juridique',
]

function toggle(field, value) {
  const arr = form[field]
  const i = arr.indexOf(value)
  if (i === -1) arr.push(value); else arr.splice(i, 1)
}

function submit() {
  // TODO: POST /api/requests/creation-entreprise
  const payload = { type: 'creation_entreprise', createdAt: new Date().toISOString(), data: { ...form } }
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
              <div class="svc-section-sub">Le fondateur ou le représentant du projet.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Civilité<span class="svc-required">*</span></label>
              <select v-model="form.civilite" class="form-select" required>
                <option value="">—</option><option>M.</option><option>Mme</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Nationalité</label>
              <input v-model="form.nationalite" class="form-input" type="text" />
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
              <input v-model="form.nomEntreprise" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">Alternative (au cas où)</label>
              <input v-model="form.nomAlternatif" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Secteur d'activité<span class="svc-required">*</span></label>
              <select v-model="form.secteurActivite" class="form-select" required>
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
              <textarea v-model="form.descriptionActivite" class="form-textarea" required
                placeholder="Quels produits / services ? Quelle clientèle ?"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Ville du siège social</label>
              <input v-model="form.villeSiege" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Type de domiciliation</label>
              <select v-model="form.domiciliationSouhaitee" class="form-select">
                <option value="">—</option>
                <option>À mon domicile personnel</option>
                <option>Local commercial / professionnel</option>
                <option>Société de domiciliation</option>
                <option>À définir avec le conseiller</option>
              </select>
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
              <select v-model="form.formeJuridique" class="form-select">
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
              <select v-model="form.regimeFiscal" class="form-select">
                <option value="">— À conseiller —</option>
                <option>IS — Impôt sur les sociétés</option>
                <option>IR — Impôt sur le revenu</option>
                <option>Micro-fiscal</option>
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
            <div class="form-group">
              <label class="form-label">Régime social du dirigeant</label>
              <select v-model="form.regimeSocialDirigeant" class="form-select">
                <option value="">— À conseiller —</option>
                <option>Assimilé salarié</option>
                <option>Travailleur non salarié (TNS)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">04.</div>
            <div>
              <div class="svc-section-title">Prestations souhaitées</div>
              <div class="svc-section-sub">Cochez tout ce qui vous intéresse.</div>
            </div>
          </div>
          <div class="svc-check-group">
            <label v-for="p in prestationsList" :key="p"
              class="svc-chip" :class="{ checked: form.prestations.includes(p) }">
              <input type="checkbox" :checked="form.prestations.includes(p)" @change="toggle('prestations', p)" />
              {{ p }}
            </label>
          </div>
          <div class="form-group svc-full" style="margin-top:24px;">
            <label class="form-label">Commentaire libre</label>
            <textarea v-model="form.commentaire" class="form-textarea"
              placeholder="Toute information utile à votre dossier"></textarea>
          </div>
        </div>

        <div class="svc-section">
          <label class="svc-chip" :class="{ checked: form.consentement }" style="display:flex;">
            <input type="checkbox" v-model="form.consentement" />
            J'accepte d'être recontacté par Papers Biz au sujet de ma demande.
          </label>
          <div class="svc-actions">
            <button type="button" class="btn-outline" @click="router.push('/professionnels')">Annuler</button>
            <button type="submit" class="btn-gold" :disabled="!form.consentement">Envoyer ma demande &rarr;</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
