<template>
  <div class="product-detail-info-root-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div flex flex-col gap-4>
          <el-skeleton-item variant="h1" class="!w-50"></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-30"></el-skeleton-item>
          <div flex flex-row gap-4>
            <el-skeleton-item v-for="n in 3" :key="n" variant="p" class="!w-10"></el-skeleton-item>
          </div>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-50"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <span class="title">{{ baseInfo.title }}</span>
        <span class="sold-count">已售 {{ baseInfo.soldCount }}</span>
        <div class="tag-container">
          <el-tag v-for="(tag, index) in baseInfo.tags" :key="index" type="primary" size="default">
            {{ tag }}
          </el-tag>
        </div>
        <span class="desc">{{ baseInfo.description }}</span>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts" setup>
import type { IProductBaseInfo } from '@/types/product'

const { baseInfo } = defineProps<{
  productId: string
  baseInfo: IProductBaseInfo
  loading: boolean
}>()
</script>

<style lang="scss" scoped>
.product-detail-info-root-container {
  @apply flex flex-col gap-4;

  .title {
    @apply text-2xl font-bold;
  }

  .sold-count {
    @apply text-base text-[var(--color-text-lighter)];
  }

  .tag-container {
    @apply flex flex-row flex-wrap gap-2;
  }

  .desc {
    @apply text-[var(--color-text-light)] text-base leading-loose;
  }
}
</style>
