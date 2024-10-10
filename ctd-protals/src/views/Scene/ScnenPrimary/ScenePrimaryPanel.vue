<template>
  <div class="scene-primary-panel-root-container">
    <span class="page-title">优秀场景展示</span>
    <el-skeleton :loading="getPrimaryCasesActionLoading" animated>
      <template #template>
        <div class="scene-list">
          <el-skeleton-item v-for="n in 2" :key="n" variant="rect" class="!h-75"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="scene-list">
          <scene-primary-item
            v-for="(item, index) in primaryCases"
            :key="item.id"
            :scene="item"
            data-aos="fade-up"
            :data-aos-delay="aosDelay(index)"
          />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import ScenePrimaryItem from './ScenePrimaryItem.vue'
import { useSceneStore } from '@/stores/modules/scene'

const sceneStore = useSceneStore()
const { primaryCases } = storeToRefs(sceneStore)
const { getPrimaryCases: getPrimaryCasesAction } = sceneStore

const { isLoading: getPrimaryCasesActionLoading, execute: executeGetPrimaryCasesAction } =
  useAsyncState(getPrimaryCasesAction(), undefined)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  try {
    executeGetPrimaryCasesAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.scene-primary-panel-root-container {
  @apply flex flex-col items-center w-full max-w-320 px-10;

  .scene-list {
    @apply grid grid-cols-2 gap-20 mt-20;
  }

  @media (max-width: 60rem) {
    .scene-list {
      @apply gap-5;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
    .scene-list {
      @apply grid-cols-1;
    }
  }
}
</style>
