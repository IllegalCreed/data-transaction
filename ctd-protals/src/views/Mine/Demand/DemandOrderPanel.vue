<template>
  <div class="demand-panel-root-container">
    <demand-item
      v-for="item in demandOrders"
      :key="item.id"
      :order="item"
    ></demand-item>
  </div>
</template>

<script setup lang="ts">
import DemandItem from './DemandOrderItem.vue'
import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { demandOrders } = storeToRefs(orderStore)
</script>

<style lang="scss" scoped>
.demand-panel-root-container {
  @apply flex flex-col gap-4;
}
</style>
