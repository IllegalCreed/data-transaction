<template>
  <el-card
    shadow="hover"
    class="demand-item-root-container"
    body-class="demand-item-body-container"
    @click="goToDemandDetail"
  >
    <div flex flex-col flex-1>
      <span font-bold text-lg>{{ demand.name }}</span>
      <div flex flex-row flex-wrap gap-2 mt-2>
        <el-tag v-for="(tag, index) in demand.tags" :key="index" type="danger" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span mt-6 text-sm text-gray-700 line-clamp-2 text-ellipsis>{{ demand.description }}</span>
      <div flex-1></div>
      <div flex flex-row justify-between items-center mt-4 mb-10>
        <span text-sm text-gray-500>{{ demand.createTime }}</span>
        <span font-bold text-red-600 self-end>￥{{ demand.budget }}</span>
      </div>
    </div>
    <div
      absolute
      flex
      flex-row
      items-center
      justify-between
      px-4
      left-0
      bottom-0
      right-0
      h-10
      bg-blueGray
    >
      <el-tag type="success">{{ demand.status }}</el-tag>
      <span font-bold text-base text-white>{{ demand.transactionMode.type }}</span>
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
  @apply mb-5 mx-2 w-82 cursor-pointer;
}

.wrap {
  :global(.demand-item-body-container) {
    @apply flex flex-col h-full relative;
  }
}
</style>
