<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getAdminRequests,
  logoutAdmin,
  updateAdminRequestPriority,
  updateAdminRequestStatus,
} from '../../services/api.js'

const router = useRouter()
const filters = reactive({ status: '', type: '', page: 0, size: 20 })
const result = ref({ content: [], page: 0, totalPages: 0, totalElements: 0 })
const loading = ref(false)
const errorMessage = ref('')
const updatingId = ref('')

const statuses = [
  { value: '', label: 'Tous les statuts' },
  { value: 'NOUVEAU', label: 'Nouveau' },
  { value: 'EN_COURS', label: 'En cours' },
  { value: 'TRAITE', label: 'Traité' },
  { value: 'ARCHIVE', label: 'Archivé' },
]
const types = [
  { value: '', label: 'Tous les services' },
  { value: 'CREATION_ENTREPRISE', label: "Création d'entreprise" },
  { value: 'OPTIMISATION_FISCALE', label: 'Optimisation fiscale' },
  { value: 'APPORT_AFFAIRES', label: "Apport d'affaires" },
  { value: 'CONTACT', label: 'Contact' },
]
const priorities = ['NORMALE', 'HAUTE', 'URGENTE']

function labelFor(options, value) {
  return options.find((option) => option.value === value)?.label || value
}

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

async function loadRequests() {
  loading.value = true
  errorMessage.value = ''
  try {
    result.value = await getAdminRequests(filters)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

async function updateStatus(request, status) {
  updatingId.value = request.id
  try {
    await updateAdminRequestStatus(request.id, status)
    await loadRequests()
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    updatingId.value = ''
  }
}

async function updatePriority(request, priority) {
  updatingId.value = request.id
  try {
    await updateAdminRequestPriority(request.id, priority)
    await loadRequests()
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    updatingId.value = ''
  }
}

function logout() {
  logoutAdmin()
  router.replace('/admin/login')
}

onMounted(loadRequests)
</script>

<template>
  <main class="admin-page">
    <div class="admin-container">
      <header class="admin-header">
        <div>
          <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Administration</div></div>
          <h1>Demandes <em>entrantes</em></h1>
          <p class="admin-muted">{{ result.totalElements }} demande(s) enregistrée(s)</p>
        </div>
        <button class="btn-outline admin-logout" @click="logout">Se déconnecter</button>
      </header>

      <section class="admin-toolbar">
        <select v-model="filters.status" class="form-select" @change="filters.page = 0; loadRequests()">
          <option v-for="status in statuses" :key="status.value" :value="status.value">{{ status.label }}</option>
        </select>
        <select v-model="filters.type" class="form-select" @change="filters.page = 0; loadRequests()">
          <option v-for="type in types" :key="type.value" :value="type.value">{{ type.label }}</option>
        </select>
        <button class="btn-outline" @click="loadRequests">Actualiser</button>
      </section>

      <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
      <div v-if="loading" class="admin-state">Chargement des demandes...</div>
      <div v-else-if="!result.content.length" class="admin-state">Aucune demande pour ces filtres.</div>
      <section v-else class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Demandeur</th><th>Service</th><th>Reçue le</th><th>Statut</th><th>Priorité</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="request in result.content" :key="request.id">
              <td>
                <strong>{{ request.firstName || '' }} {{ request.lastName || 'Demande sans nom' }}</strong>
                <span>{{ request.email }}</span>
              </td>
              <td>{{ labelFor(types, request.type) }}</td>
              <td>{{ formatDate(request.createdAt) }}</td>
              <td>
                <select class="admin-select" :value="request.status" :disabled="updatingId === request.id" @change="updateStatus(request, $event.target.value)">
                  <option v-for="status in statuses.slice(1)" :key="status.value" :value="status.value">{{ status.label }}</option>
                </select>
              </td>
              <td>
                <select class="admin-select" :value="request.priority" :disabled="updatingId === request.id" @change="updatePriority(request, $event.target.value)">
                  <option v-for="priority in priorities" :key="priority" :value="priority">{{ priority }}</option>
                </select>
              </td>
              <td><button class="admin-link" @click="router.push(`/admin/requests/${request.id}`)">Détail →</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer class="admin-pagination">
        <button class="btn-outline" :disabled="filters.page === 0 || loading" @click="filters.page--; loadRequests()">Précédent</button>
        <span>Page {{ result.page + 1 }} / {{ Math.max(result.totalPages, 1) }}</span>
        <button class="btn-outline" :disabled="filters.page + 1 >= result.totalPages || loading" @click="filters.page++; loadRequests()">Suivant</button>
      </footer>
    </div>
  </main>
</template>
