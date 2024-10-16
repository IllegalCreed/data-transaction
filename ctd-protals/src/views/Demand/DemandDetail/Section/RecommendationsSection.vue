<template>
  <el-skeleton :loading="getRecommendDemandsActionLoading" animated>
    <template #template>
      <div class="recommendations-section-root-container" gap-4>
        <el-skeleton-item
          v-for="n in 4"
          :key="n"
          variant="rect"
          class="!w-92 !h-61"
        ></el-skeleton-item>
      </div>
    </template>
    <template #default>
      <div class="recommendations-section-root-container">
        <demand-item
          class="recommend-demand-item"
          v-for="(demand, index) in recommendedDemands"
          :key="index"
          :demand="demand"
        />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import DemandItem from '../../DemandItem.vue'

const { demandId } = defineProps<{
  demandId: string
}>()
watch(
  () => demandId,
  () => {
    executeGetRecommendDemandsAction()
  }
)

import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { getRecommendDemands: getRecommendDemandsAction } = demandStore

const {
  state: recommendedDemands,
  isLoading: getRecommendDemandsActionLoading,
  execute: executeGetRecommendDemandsAction
} = useAsyncState(() => getRecommendDemandsAction(demandId), undefined)

onMounted(() => {
  try {
    executeGetRecommendDemandsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.recommendations-section-root-container {
  @apply flex flex-row justify-center flex-wrap;

  @media (min-width: 75rem) {
    .recommend-demand-item {
      @apply w-92;
    }
  }
}
</style>
