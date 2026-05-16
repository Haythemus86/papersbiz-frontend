<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav :class="{ scrolled }">
    <RouterLink to="/" class="nav-logo">
      <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="height:52px;width:auto;">
        <circle cx="110" cy="76" r="10" fill="#B8922A"/>
        <line x1="110" y1="91" x2="110" y2="128" stroke="#B8922A" stroke-width="2.2"/>
        <text x="136" y="90" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="700" fill="#FFFFFF" letter-spacing="5">PAPERS</text>
        <rect x="136" y="108" width="309" height="1.5" fill="#B8922A" opacity="0.7"/>
        <text x="136" y="132" font-family="'DM Sans', Arial, sans-serif" font-size="16" font-weight="300" fill="#B8922A" letter-spacing="12">BIZ</text>
        <text x="136" y="164" font-family="'DM Sans', Arial, sans-serif" font-size="10" fill="#FFFFFF" opacity="0.5" letter-spacing="2.5">SOLUTIONS &amp; FORMALITÉS ADMINISTRATIVES</text>
      </svg>
    </RouterLink>
    <ul class="nav-links">
      <li><RouterLink to="/a-propos">À propos</RouterLink></li>
      <li><RouterLink to="/professionnels">Professionnels</RouterLink></li>
      <li><RouterLink to="/particuliers">Particuliers</RouterLink></li>
      <li><RouterLink to="/contact" class="nav-cta">Nous contacter</RouterLink></li>
    </ul>
  </nav>
</template>
