import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProfessionnelsPage from '../pages/ProfessionnelsPage.vue'
import ParticuliersPage from '../pages/ParticuliersPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import AProposPage from '../pages/AProposPage.vue'
import CreationEntrepriseForm from '../pages/professionnels/CreationEntrepriseForm.vue'
import OptimisationFiscaleForm from '../pages/professionnels/OptimisationFiscaleForm.vue'
import ApportAffairesForm from '../pages/professionnels/ApportAffairesForm.vue'
import AdminLoginPage from '../pages/admin/AdminLoginPage.vue'
import AdminRequestsPage from '../pages/admin/AdminRequestsPage.vue'
import AdminRequestDetailPage from '../pages/admin/AdminRequestDetailPage.vue'
import { getAdminSession } from '../services/api.js'

const routes = [
  { path: '/', component: HomePage },
  { path: '/a-propos', component: AProposPage },
  { path: '/professionnels', component: ProfessionnelsPage },
  { path: '/professionnels/creation-entreprise', component: CreationEntrepriseForm },
  { path: '/professionnels/optimisation-fiscale', component: OptimisationFiscaleForm },
  { path: '/professionnels/apport-affaires', component: ApportAffairesForm },
  { path: '/particuliers', component: ParticuliersPage },
  { path: '/contact', component: ContactPage },
  { path: '/admin/login', component: AdminLoginPage, meta: { guestOnly: true } },
  { path: '/admin/requests', component: AdminRequestsPage, meta: { requiresAdmin: true } },
  { path: '/admin/requests/:id', component: AdminRequestDetailPage, meta: { requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const authenticated = Boolean(getAdminSession()?.accessToken)
  if (to.meta.requiresAdmin && !authenticated) return '/admin/login'
  if (to.meta.guestOnly && authenticated) return '/admin/requests'
  return true
})

export default router
