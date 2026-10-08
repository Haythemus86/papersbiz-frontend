<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAdminRequest } from '../../services/api.js'

const route = useRoute()
const router = useRouter()
const request = ref(null)
const loading = ref(true)
const errorMessage = ref('')

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

onMounted(async () => {
  try {
    request.value = await getAdminRequest(route.params.id)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="admin-page">
    <div class="admin-container">
      <button class="admin-back" @click="router.push('/admin/requests')">← Retour aux demandes</button>
      <div v-if="loading" class="admin-state">Chargement du dossier...</div>
      <p v-else-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
      <template v-else-if="request">
        <header class="admin-header admin-detail-header">
          <div>
            <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Dossier {{ request.id.slice(0, 8) }}</div></div>
            <h1>Détail de la <em>demande</em></h1>
            <p class="admin-muted">Reçue le {{ formatDate(request.createdAt) }}</p>
          </div>
          <div class="admin-badges"><span>{{ request.status }}</span><span>{{ request.priority }}</span></div>
        </header>
        <section class="admin-detail-grid">
          <div class="admin-panel">
            <h2>Coordonnées</h2>
            <dl class="admin-definition-list">
              <div><dt>Nom</dt><dd>{{ request.firstName }} {{ request.lastName }}</dd></div>
              <div><dt>Email</dt><dd>{{ request.email }}</dd></div>
              <div><dt>Téléphone</dt><dd>{{ request.phone || 'Non renseigné' }}</dd></div>
              <div><dt>Consentement</dt><dd>{{ request.consentGiven ? `Oui, version ${request.consentVersion}` : 'Non' }}</dd></div>
            </dl>
          </div>
          <div class="admin-panel admin-payload">
            <h2>Données du formulaire</h2>
            <pre>{{ JSON.stringify(request.payload, null, 2) }}</pre>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>
