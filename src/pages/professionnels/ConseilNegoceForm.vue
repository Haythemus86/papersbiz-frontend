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
  paysSiege: 'France',
  siteWeb: '',
  effectif: '',
  chiffreAffaires: '',
  anneesActivite: '',

  // Contact
  civilite: '',
  nom: '',
  prenom: '',
  fonction: '',
  email: '',
  telephone: '',

  // Activité commerciale
  typeNegoce: '',
  produits: '',
  marches: [],
  paysCibles: '',
  volumeAnnuel: '',
  incotermsHabituels: '',
  devisesUtilisees: [],

  // Besoins
  besoins: [],
  problematiques: '',
  urgence: '',
  budget: '',

  // Consentement
  commentaire: '',
  consentement: false,
})

const formes = ['SARL', 'EURL', 'SAS', 'SASU', 'SA', 'SCS', 'Autre']
const typesNegoce = ['Import', 'Export', 'Import-Export', 'Négoce national', 'Trading / matières premières', 'Négoce B2B', 'Négoce B2C']
const marchesList = ['Europe (UE)', 'Royaume-Uni', 'Amérique du Nord', 'Amérique latine', 'Maghreb', 'Afrique subsaharienne', 'Moyen-Orient', 'Asie', 'Océanie']
const devisesList = ['EUR', 'USD', 'GBP', 'CHF', 'CNY', 'AED', 'Autres']
const besoinsList = [
  'Structuration des opérations commerciales',
  'Négociation et rédaction de contrats',
  'Sécurisation des transactions (crédit doc., SBLC)',
  'Conseil incoterms & logistique',
  'Conformité douanière',
  'Couverture des risques de change',
  'Recherche de partenaires / fournisseurs',
  'Compliance & sanctions internationales',
  'Stratégie commerciale et go-to-market',
]

function toggle(field, value) {
  const arr = form[field]
  const i = arr.indexOf(value)
  if (i === -1) arr.push(value); else arr.splice(i, 1)
}

function submit() {
  const payload = { type: 'conseil_negoce', createdAt: new Date().toISOString(), data: { ...form } }
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
        <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Service 03</div></div>
        <h1>Conseil <em>en négoce</em></h1>
        <p>Présentez votre activité de négoce et vos enjeux. Un consultant senior vous proposera une feuille de route adaptée à vos opérations sous 72 h ouvrées.</p>
      </div>
    </section>

    <section class="svc-form-wrap">
      <div v-if="submitted" class="svc-form">
        <div class="svc-success">
          <div class="svc-success-title">Demande envoyée</div>
          <p>Merci {{ form.prenom }} ! Votre demande de conseil en négoce a bien été reçue. Nous revenons vers vous rapidement.</p>
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
              <div class="svc-section-sub">Pour mieux cerner votre profil.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Raison sociale<span class="svc-required">*</span></label>
              <input v-model="form.raisonSociale" class="form-input" type="text" required />
            </div>
            <div class="form-group">
              <label class="form-label">SIRET / N° d'enregistrement</label>
              <input v-model="form.siret" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Forme juridique</label>
              <select v-model="form.formeJuridique" class="form-select">
                <option value="">—</option>
                <option v-for="f in formes" :key="f">{{ f }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Pays du siège</label>
              <input v-model="form.paysSiege" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label class="form-label">Site web</label>
              <input v-model="form.siteWeb" class="form-input" type="url" placeholder="https://" />
            </div>
            <div class="form-group">
              <label class="form-label">Effectif</label>
              <select v-model="form.effectif" class="form-select">
                <option value="">—</option>
                <option>1 à 9</option><option>10 à 49</option>
                <option>50 à 249</option><option>250+</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">CA annuel HT (€)</label>
              <input v-model="form.chiffreAffaires" class="form-input" type="number" min="0" />
            </div>
            <div class="form-group">
              <label class="form-label">Années d'activité</label>
              <input v-model="form.anneesActivite" class="form-input" type="number" min="0" />
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">02.</div>
            <div>
              <div class="svc-section-title">Contact</div>
              <div class="svc-section-sub">Votre interlocuteur dédié.</div>
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
              <input v-model="form.fonction" class="form-input" type="text" required />
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
              <div class="svc-section-title">Votre activité de négoce</div>
              <div class="svc-section-sub">Décrivez ce que vous achetez, vendez et où.</div>
            </div>
          </div>
          <div class="svc-grid">
            <div class="form-group">
              <label class="form-label">Type de négoce<span class="svc-required">*</span></label>
              <select v-model="form.typeNegoce" class="form-select" required>
                <option value="">— Sélectionner —</option>
                <option v-for="t in typesNegoce" :key="t">{{ t }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Volume / fréquence d'opérations</label>
              <input v-model="form.volumeAnnuel" class="form-input" type="text" placeholder="ex. 50 conteneurs / an" />
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Produits / marchandises négociés<span class="svc-required">*</span></label>
              <textarea v-model="form.produits" class="form-textarea" required
                placeholder="Nature des produits, codes douaniers si connus…"></textarea>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Marchés / zones géographiques</label>
              <div class="svc-check-group">
                <label v-for="m in marchesList" :key="m"
                  class="svc-chip" :class="{ checked: form.marches.includes(m) }">
                  <input type="checkbox" :checked="form.marches.includes(m)" @change="toggle('marches', m)" />
                  {{ m }}
                </label>
              </div>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Pays cibles précis</label>
              <input v-model="form.paysCibles" class="form-input" type="text" placeholder="ex. Maroc, Allemagne, Côte d'Ivoire" />
            </div>
            <div class="form-group">
              <label class="form-label">Incoterms habituels</label>
              <input v-model="form.incotermsHabituels" class="form-input" type="text" placeholder="EXW, FOB, CIF, DDP…" />
            </div>
            <div class="form-group">
              <label class="form-label">Devises utilisées</label>
              <div class="svc-check-group">
                <label v-for="d in devisesList" :key="d"
                  class="svc-chip" :class="{ checked: form.devisesUtilisees.includes(d) }">
                  <input type="checkbox" :checked="form.devisesUtilisees.includes(d)" @change="toggle('devisesUtilisees', d)" />
                  {{ d }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="svc-section">
          <div class="svc-section-head">
            <div class="svc-section-num">04.</div>
            <div>
              <div class="svc-section-title">Vos besoins</div>
              <div class="svc-section-sub">Sur quoi souhaitez-vous être accompagné ?</div>
            </div>
          </div>
          <div class="svc-check-group">
            <label v-for="b in besoinsList" :key="b"
              class="svc-chip" :class="{ checked: form.besoins.includes(b) }">
              <input type="checkbox" :checked="form.besoins.includes(b)" @change="toggle('besoins', b)" />
              {{ b }}
            </label>
          </div>
          <div class="svc-grid" style="margin-top:24px;">
            <div class="form-group">
              <label class="form-label">Urgence</label>
              <select v-model="form.urgence" class="form-select">
                <option value="">—</option>
                <option>Immédiate (opération en cours)</option>
                <option>Court terme (&lt; 1 mois)</option>
                <option>Planifiée (1 à 3 mois)</option>
                <option>Conseil ponctuel</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Budget enveloppe (€)</label>
              <select v-model="form.budget" class="form-select">
                <option value="">— À discuter —</option>
                <option>&lt; 2 000 €</option>
                <option>2 000 – 5 000 €</option>
                <option>5 000 – 15 000 €</option>
                <option>15 000 € et +</option>
              </select>
            </div>
            <div class="form-group svc-full">
              <label class="form-label">Contexte / problématiques</label>
              <textarea v-model="form.problematiques" class="form-textarea"
                placeholder="Détaillez votre situation, vos contraintes, vos objectifs"></textarea>
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
            J'accepte d'être recontacté par Papers Biz.
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
