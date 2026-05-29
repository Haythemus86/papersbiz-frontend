<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitted = ref(false)

const form = reactive({
  // Entreprise
  raisonSociale: '',
  siret: '',
  formeJuridique: '',
  secteurActivite: '',
  dateCreation: '',
  effectif: '',
  chiffreAffaires: '',
  resultatNet: '',

  // Contact
  civilite: '',
  nom: '',
  prenom: '',
  fonction: '',
  email: '',
  telephone: '',

  // Situation fiscale & comptable actuelle
  regimeFiscal: '',
  regimeTva: '',
  comptabiliteGeree: '',
  expertComptableActuel: '',
  logicielComptable: '',
  detientHolding: false,
  detientImmobilier: false,
  detientFiliales: false,

  // Objectifs
  objectifs: [],
  problematiques: '',
  echeance: '',

  // Pièces / consentement
  commentaire: '',
  consentement: false,
})

const formes = ['SARL', 'EURL', 'SAS', 'SASU', 'SA', 'SCI', 'SCS', 'Micro-entreprise', 'EI']
const secteurs = ['Commerce', 'Services', 'Industrie', 'BTP', 'Tech', 'Immobilier', 'Restauration', 'Conseil', 'Autre']
const objectifsList = [
  'Réduction de l\'IS', 'Optimisation TVA', 'Rémunération du dirigeant',
  'Création d\'une holding', 'Intégration fiscale', 'Pacte Dutreil / transmission',
  'Crédit d\'impôt (CIR, CII, mécénat)', 'Optimisation des charges sociales',
  'Audit fiscal / sécurisation', 'Préparation à la cession',
]

function toggle(field, value) {
  const arr = form[field]
  const i = arr.indexOf(value)
  if (i === -1) arr.push(value); else arr.splice(i, 1)
}

function submit() {
  const payload = { type: 'optimisation_fiscale', createdAt: new Date().toISOString(), data: { ...form } }
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
        <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Service 02</div></div>
        <h1>Optimisation <em>fiscale &amp; comptable</em></h1>
        <p>Décrivez la situation actuelle de votre entreprise et vos objectifs. Notre expert établira un diagnostic et une proposition d'optimisation adaptée sous 72 h ouvrées.</p>
      </div>
    </section>

    <section class="svc-form-wrap">
      <div v-if="submitted" class="svc-form">
        <div class="svc-success">
          <div class="svc-success-title">Demande enregistrée</div>
          <p>Merci {{ form.prenom }} ! Votre diagnostic fiscal est en cours de préparation. Un expert vous contactera prochainement.</p>
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
              <div class="svc-section-title">Votre entreprise</div>
              <div class="svc-section-sub">Identification de la société à analyser.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Raison sociale<span class="svc-required">*</span></label>
              <input v-model="form.raisonSociale" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">SIRET</label>
              <input v-model="form.siret" class="form-input" type="text" maxlength="14" placeholder="14 chiffres" />
            </div>
            <div class="form-group">
              <label class="form-label">Forme juridique<span class="svc-required">*</span></label>
              <select v-model="form.formeJuridique" class="form-select" required>
                <option value="">— Sélectionner —</option>
                <option v-for="f in formes" :key="f">{{ f }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Secteur</label>
              <select v-model="form.secteurActivite" class="form-select">
                <option value="">—</option>
                <option v-for="s in secteurs" :key="s">{{ s }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date de création</label>
              <input v-model="form.dateCreation" class="form-input" type="date" />
            </div>
            <div class="form-group">
              <label class="form-label">Effectif</label>
              <select v-model="form.effectif" class="form-select">
                <option value="">—</option>
                <option>1 (dirigeant seul)</option><option>2 à 9</option>
                <option>10 à 49</option><option>50 à 249</option><option>250+</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">CA annuel HT (€)</label>
              <input v-model="form.chiffreAffaires" class="form-input" type="number" min="0" />
            </div>
            <div class="form-group">
              <label class="form-label">Résultat net dernier exercice (€)</label>
              <input v-model="form.resultatNet" class="form-input" type="number" />
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">02.</div>
            <div>
              <div class="svc-section-title">Contact</div>
              <div class="svc-section-sub">Qui suit ce dossier au sein de l'entreprise ?</div>
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
              <label class="form-label">Fonction<span class="svc-required">*</span></label>
              <input v-model="form.fonction" class="form-input" type="text" required
                placeholder="Dirigeant, DAF, RAF…" />
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
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">03.</div>
            <div>
              <div class="svc-section-title">Situation fiscale &amp; comptable</div>
              <div class="svc-section-sub">Plus c'est précis, plus le diagnostic est pertinent.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Régime fiscal actuel</label>
              <select v-model="form.regimeFiscal" class="form-select">
                <option value="">—</option>
                <option>IS — Impôt sur les sociétés</option>
                <option>IR — Impôt sur le revenu</option>
                <option>Micro-fiscal</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Régime de TVA</label>
              <select v-model="form.regimeTva" class="form-select">
                <option value="">—</option>
                <option>Franchise en base</option>
                <option>Réel simplifié</option>
                <option>Réel normal</option>
                <option>Mini-réel</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Comptabilité gérée</label>
              <select v-model="form.comptabiliteGeree" class="form-select">
                <option value="">—</option>
                <option>En interne</option>
                <option>Par un expert-comptable</option>
                <option>Mixte</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Expert-comptable actuel</label>
              <input v-model="form.expertComptableActuel" class="form-input" type="text" placeholder="Cabinet (optionnel)" />
            </div>
            <div class="form-group">
              <label class="form-label">Logiciel comptable</label>
              <input v-model="form.logicielComptable" class="form-input" type="text" placeholder="Sage, EBP, Pennylane…" />
            </div>
          </div>
          <div class="svc-check-group" style="margin-top:20px;">
            <label class="svc-chip" :class="{ checked: form.detientHolding }">
              <input type="checkbox" v-model="form.detientHolding" /> Détient une holding
            </label>
            <label class="svc-chip" :class="{ checked: form.detientFiliales }">
              <input type="checkbox" v-model="form.detientFiliales" /> A des filiales
            </label>
            <label class="svc-chip" :class="{ checked: form.detientImmobilier }">
              <input type="checkbox" v-model="form.detientImmobilier" /> Détient de l'immobilier pro
            </label>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">04.</div>
            <div>
              <div class="svc-section-title">Objectifs d'optimisation</div>
              <div class="svc-section-sub">Cochez vos priorités.</div>
            </div>
          </div>
          <div class="svc-check-group">
            <label v-for="o in objectifsList" :key="o"
              class="svc-chip" :class="{ checked: form.objectifs.includes(o) }">
              <input type="checkbox" :checked="form.objectifs.includes(o)" @change="toggle('objectifs', o)" />
              {{ o }}
            </label>
          </div>
          <div class="svc-grid" style="margin-top:24px;">
            <div class="form-group svc-full">
              <label class="form-label">Problématiques spécifiques</label>
              <textarea v-model="form.problematiques" class="form-textarea"
                placeholder="Ex. : contrôle fiscal en cours, projet de cession, forte croissance…"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Échéance souhaitée</label>
              <select v-model="form.echeance" class="form-select">
                <option value="">—</option>
                <option>Urgent (&lt; 1 mois)</option>
                <option>Court terme (1 à 3 mois)</option>
                <option>Moyen terme (3 à 6 mois)</option>
                <option>Préparation prochain exercice</option>
              </select>
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="form-group">
            <label class="form-label">Commentaire libre</label>
            <textarea v-model="form.commentaire" class="form-textarea"></textarea>
          </div>
          <label class="svc-chip" :class="{ checked: form.consentement }" style="display:flex; margin-top:16px;">
            <input type="checkbox" v-model="form.consentement" />
            J'autorise Papers Biz à traiter ces informations dans le cadre de ma demande.
          </label>
          <div class="svc-actions">
            <button type="button" class="btn-outline" @click="router.push('/professionnels')">Annuler</button>
            <button type="submit" class="btn-gold" :disabled="!form.consentement">Demander mon diagnostic &rarr;</button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
