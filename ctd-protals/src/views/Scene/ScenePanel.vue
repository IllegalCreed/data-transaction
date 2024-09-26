<template>
  <div class="scene-panel-root-container">
    <span text-4xl font-bold self-center>场景展示</span>

    <div class="scene-list">
      <scene-item v-for="item in scenes" :key="item.id" :scene="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SceneItem from './SceneItem.vue'
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
  },
  {
    id: 3,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  },
  {
    id: 4,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  },
  {
    id: 5,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  },
  {
    id: 6,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  },
  {
    id: 7,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description:
      '测试场景描述，测试场景描述，测试场景描述，测试场景描述,测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  },
  {
    id: 8,
    title: '测试场景名称',
    companyName: '测试公司名称',
    description: '测试场景描述，测试场景描述，测试场景描述，测试场景描述',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://www.baidu.com'
  }
])
</script>

<style scoped lang="scss">
.scene-panel-root-container {
  @apply flex flex-col items-center;

  .scene-list {
    @apply flex flex-row justify-center flex-wrap w-full max-w-300 px-10 mt-10;

    @media (max-width: 40rem) {
      @apply px-0;
    }
  }
}
</style>
