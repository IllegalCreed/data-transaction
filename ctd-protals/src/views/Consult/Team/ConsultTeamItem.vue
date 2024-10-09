<template>
  <div class="consult-team-item-container">
    <div class="image-container">
      <img :src="data.imageUrl" />
    </div>

    <div class="text-container">
      <span class="title">{{ data.title }}</span>
      <span class="desc">{{ data.description }}</span>
      <div flex-1></div>
      <el-button self-center mt-5 type="primary" text>了解更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITeam } from '@/types/consult'

defineProps<{
  data: ITeam
}>()
</script>

<style lang="scss" scoped>
.consult-team-item-container {
  @apply flex flex-col items-center bg-[var(--color-background-alternating)] max-w-70 rounded;

  .image-container {
    @apply flex items-center justify-center p-10;

    img {
      @apply w-full object-contain;
    }
  }

  .text-container {
    @apply flex-1 flex flex-col items-center p-5 pt-0;

    .title {
      @apply text-lg font-bold mb-4 line-clamp-1;
    }

    .desc {
      @apply text-[var(--color-text-light)] leading-relaxed line-clamp-3;
    }
  }

  @media (max-width: 40rem) {
    @apply max-w-100;

    .desc {
      @apply h-auto;
    }
  }
}
</style>
