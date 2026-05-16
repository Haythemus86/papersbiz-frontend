<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <div style="margin-bottom:16px;">
          <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="width:220px;height:auto;">
            <circle cx="110" cy="76" r="10" fill="#B8922A"/>
            <line x1="110" y1="91" x2="110" y2="128" stroke="#B8922A" stroke-width="2.2"/>
            <text x="136" y="90" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="700" fill="#FFFFFF" letter-spacing="5">PAPERS</text>
            <rect x="136" y="108" width="309" height="1.5" fill="#B8922A" opacity="0.7"/>
            <text x="136" y="132" font-family="'DM Sans', Arial, sans-serif" font-size="16" font-weight="300" fill="#B8922A" letter-spacing="12">BIZ</text>
            <text x="136" y="164" font-family="'DM Sans', Arial, sans-serif" font-size="10" fill="#FFFFFF" opacity="0.45" letter-spacing="2.5">SOLUTIONS &amp; FORMALITÉS ADMINISTRATIVES</text>
          </svg>
        </div>
        <p class="footer-brand-desc">Structure de conseil et de prestation de services, dédiée à l'accompagnement des professionnels et des particuliers dans leurs démarches administratives et projets de développement.</p>
      </div>
      <div>
        <div class="footer-col-title">Services Pro</div>
        <ul class="footer-links">
          <li><RouterLink to="/professionnels">Création d'entreprise</RouterLink></li>
          <li><RouterLink to="/professionnels">Optimisation fiscale</RouterLink></li>
          <li><RouterLink to="/professionnels">Conseil en négoce</RouterLink></li>
          <li><RouterLink to="/professionnels">Apport d'affaires</RouterLink></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Particuliers</div>
        <ul class="footer-links">
          <li><RouterLink to="/particuliers">CNI &amp; Passeport</RouterLink></li>
          <li><RouterLink to="/particuliers">Dossier logement</RouterLink></li>
          <li><RouterLink to="/particuliers">Déclaration d'impôts</RouterLink></li>
          <li><RouterLink to="/particuliers">Toutes les formalités</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">©️ 2025 Papers Biz · Conseil · Création · Accompagnement administratif</div>
      <div class="footer-legal">
        <a href="#">Mentions légales</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">RGPD</a>
      </div>
    </div>
  </footer>
</template>
