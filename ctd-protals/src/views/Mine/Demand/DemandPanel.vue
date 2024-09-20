<template>
  <div class="demand-panel-root-container">
    <demand-item v-for="item in orderDemands" :key="item.id" :order="item"></demand-item>
  </div>
</template>

<script setup lang="ts">
import DemandItem from './DemandItem.vue'

import { useOrderDemandStore } from '@/stores/modules/orderDemand'
const { orderDemands } = useOrderDemandStore()
</script>

<style lang="scss" scoped>
.demand-panel-root-container {
  @apply grid grid-cols-2 gap-4;

  @media (max-width: 50rem) {
    @apply grid-cols-1;
  }
}
</style>
