<template>
  <div class="product-detail-info-root-container">
    <span class="title">{{ baseInfo.title }}</span>
    <span class="sold-count">已售 {{ baseInfo.soldCount }}</span>
    <div class="tag-container">
      <el-tag v-for="(tag, index) in baseInfo.tags" :key="index" type="primary" size="default">
        {{ tag }}
      </el-tag>
    </div>
    <span class="desc">{{ baseInfo.description }}</span>
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
