<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '../../services/api.js'

const router = useRouter()
const form = reactive({ username: '', password: '' })
const loading = ref(false)
const errorMessage = ref('')

async function submit() {
  if (loading.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    await loginAdmin(form.username, form.password)
    await router.replace('/admin/requests')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="admin-page admin-login-page">
    <section class="admin-login-card">
      <div class="section-eyebrow"><div class="ey-line"></div><div class="ey-text">Espace équipe</div></div>
      <h1>Connexion <em>administration</em></h1>
      <p class="admin-muted">Accédez au suivi des demandes Papers Biz.</p>
      <form class="admin-form" @submit.prevent="submit">
        <label class="form-group">
          <span class="form-label">Identifiant</span>
          <input v-model="form.username" class="form-input" autocomplete="username" required />
        </label>
        <label class="form-group">
          <span class="form-label">Mot de passe</span>
          <input v-model="form.password" class="form-input" type="password" autocomplete="current-password" required />
        </label>
        <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
        <button class="btn-gold admin-submit" type="submit" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </section>
  </main>
</template>
