import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProfessionnelsPage from '../pages/ProfessionnelsPage.vue'
import ParticuliersPage from '../pages/ParticuliersPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import AProposPage from '../pages/AProposPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/a-propos', component: AProposPage },
  { path: '/professionnels', component: ProfessionnelsPage },
  { path: '/particuliers', component: ParticuliersPage },
  { path: '/contact', component: ContactPage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
