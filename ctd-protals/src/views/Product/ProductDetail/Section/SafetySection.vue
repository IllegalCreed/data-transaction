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
  @apply p-5 bg-[var(--color-background-alternating)] shadow;
}
</style>
