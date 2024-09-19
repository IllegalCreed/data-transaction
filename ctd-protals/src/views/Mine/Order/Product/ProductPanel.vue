<template>
  <div class="product-panel-root-container">
    <product-item v-for="item in orderProducts" :key="item.id" :order="item"></product-item>
  </div>
</template>

<script setup lang="ts">
import ProductItem from './ProductItem.vue'

import { useOrderProductStore } from '@/stores/modules/orderProduct'
const { orderProducts } = useOrderProductStore()
</script>

<style lang="scss" scoped>
.product-panel-root-container {
  @apply grid grid-cols-2 gap-4;

  @media (max-width: 50rem) {
    @apply grid-cols-1;
  }
}
</style>
