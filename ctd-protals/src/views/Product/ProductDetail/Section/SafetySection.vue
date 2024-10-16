<template>
  <div class="safety-section-root-container">
    <PhaseFlow :steps="safes" />
  </div>
</template>

<script setup lang="ts">
import PhaseFlow from '@/components/PhaseFlow.vue'
import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { safes } = storeToRefs(productStore)
const { getSafes: getSafesAction } = productStore

onMounted(() => {
  getSafesAction()
})
</script>

<style lang="scss" scoped>
.safety-section-root-container {
  @apply px-5 py-20 bg-[var(--color-background-alternating)] shadow bg-gradient-to-b from-[var(--color-module-gradient-from)] to-[var(--color-module-gradient-to)];

  @media (max-width: 40rem) {
    @apply px-2.5;
  }
}
</style>
