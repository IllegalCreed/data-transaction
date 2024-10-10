<template>
  <div class="scene-panel-root-container">
    <span class="page-title">场景展示</span>

    <el-skeleton :loading="getCasesActionLoading" animated>
      <template #template>
        <div class="scene-list" gap-4>
          <el-skeleton-item
            v-for="n in 8"
            :key="n"
            variant="rect"
            class="!w-71 !h-131"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="scene-list">
          <scene-item v-for="item in cases" :key="item.id" :scene="item" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import SceneItem from './SceneCaseItem.vue'

import { useSceneStore } from '@/stores/modules/scene'
const sceneStore = useSceneStore()
const { cases } = storeToRefs(sceneStore)
const { getCases: getCasesAction } = sceneStore

const { isLoading: getCasesActionLoading, execute: executeGetCasesAction } = useAsyncState(
  () => getCasesAction(),
  undefined
)

onMounted(() => {
  try {
    executeGetCasesAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.scene-panel-root-container {
  @apply flex flex-col items-center w-full max-w-320 px-10;

  .scene-list {
    @apply flex flex-row justify-center self-center flex-wrap mt-20;
  }

  @media (max-width: 40rem) {
    @apply px-4;
  }
}
</style>
