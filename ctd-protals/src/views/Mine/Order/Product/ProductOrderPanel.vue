<template>
  <div class="product-panel-root-container">
    <product-item
      v-for="item in productOrders"
      :key="item.id"
      :order="item"
    ></product-item>
  </div>
</template>

<script setup lang="ts">
import ProductItem from './ProductOrderItem.vue'
import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { productOrders } = storeToRefs(orderStore)
</script>

<style lang="scss" scoped>
.product-panel-root-container {
  @apply grid grid-cols-2 gap-4;

  @media (max-width: 50rem) {
    @apply grid-cols-1;
  }
}
</style>
