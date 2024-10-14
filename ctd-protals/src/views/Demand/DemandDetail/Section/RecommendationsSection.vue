<template>
  <div class="recommendations-section-root-container">
    <demand-item
      class="recommend-demand-item"
      v-for="(demand, index) in recommendedDemands"
      :key="index"
      :demand="demand"
    />
  </div>
</template>

<script setup lang="ts">
import DemandItem from '../../DemandItem.vue'
import type { IDemand } from '@/types/demand'
import { useDemandStore } from '@/stores/modules/demand'
const { demands } = useDemandStore()

const props = defineProps<{
  demandId: string
}>()

const recommendedDemands = ref<IDemand[]>([])

const fetchRecommendedProducts = async (id: string) => {
  console.log('mock get recommendations for demandId:', id)
  // 模拟 API 请求，根据 productId 获取推荐商品
  recommendedDemands.value = demands.slice(0, 4)
}

onMounted(() => {
  fetchRecommendedProducts(props.demandId)
})
</script>

<style scoped lang="scss">
.recommendations-section-root-container {
  @apply flex flex-row justify-center flex-wrap;

  @media (min-width: 75rem) {
    .recommend-demand-item {
      @apply w-85;
    }
  }
}
</style>
