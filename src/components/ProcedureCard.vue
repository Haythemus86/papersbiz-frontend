<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])
</script>

<template>
  <button class="procedure-card" :class="{ 'is-selected': selected }" @click="emit('select', item)">
    <span class="procedure-card__icon">{{ item.icon }}</span>
    <span class="procedure-card__title">{{ item.label }}</span>
    <span class="procedure-card__description">{{ item.desc }}</span>
    <span v-if="item.meta" class="procedure-card__meta">{{ item.meta }}</span>
  </button>
</template>