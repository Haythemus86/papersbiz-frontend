<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="timeline">
    <div v-for="(step, index) in steps" :key="step" class="timeline__item">
      <div class="timeline__marker" :class="{ 'is-active': index === currentStep, 'is-done': index < currentStep }">
        {{ index < currentStep ? '✓' : index + 1 }}
      </div>
      <div v-if="index < steps.length - 1" class="timeline__line" :class="{ 'is-done': index < currentStep }"></div>
      <p class="timeline__label" :class="{ 'is-active': index === currentStep }">{{ step }}</p>
    </div>
  </div>
</template>