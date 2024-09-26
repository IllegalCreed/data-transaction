<template>
  <div class="scene-primary-panel-root-container">
    <span text-4xl font-bold self-center>优秀场景展示</span>
    <div class="scene-list">
      <scene-primary-item v-for="item in scenes" :key="item.id" :scene="item" data-aos="fade-up" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ScenePrimaryItem from './ScenePrimaryItem.vue'
import type { IScene } from '@/types/scene'

const scenes = ref<IScene[]>([
  {
    id: 1,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  },
  {
    id: 2,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  }
])
</script>

<style scoped lang="scss">
.scene-primary-panel-root-container {
  @apply flex flex-col items-center;

  .scene-list {
    @apply grid grid-cols-2 gap-20 w-full max-w-300 px-10 mt-10;

    @media (max-width: 40rem) {
      @apply grid-cols-1 gap-5;
    }
  }
}
</style>
