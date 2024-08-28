<template>
  <el-card
    shadow="hover"
    class="demand-item-root-container"
    body-class="demand-item-body-container"
    @click="goToDemandDetail"
  >
    <div flex flex-col flex-1 pt-2 mt-4>
      <span font-bold text-lg mt-2>{{ demand.name }}</span>
      <div flex flex-row flex-wrap gap-2 mt-2>
        <el-tag v-for="(tag, index) in demand.tags" :key="index" type="danger" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span mt-6 text-sm text-gray-700 line-clamp-2 text-ellipsis>{{ demand.description }}</span>
      <div flex-1></div>
      <span mt-4 font-bold text-red-600 self-end>￥{{ demand.price }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { IDemand } from '@/types/demand'
import { useRouter } from 'vue-router'

const props = defineProps<{
  demand: IDemand
}>()

const router = useRouter()

const goToDemandDetail = () => {
  router.push(`/demand/${props.demand.id}`)
}
</script>

<style scoped lang="scss">
.demand-item-root-container {
  @apply mb-5 mx-2 w-60 cursor-pointer;
}

.wrap {
  :global(.demand-item-body-container) {
    @apply flex flex-col h-full;
  }
}
</style>
