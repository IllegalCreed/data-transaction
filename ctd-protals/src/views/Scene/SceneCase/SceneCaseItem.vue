<template>
  <div class="scene-item-root-container" @click="goToProductDetail">
    <div class="img-container">
      <img :src="scene.imageUrl" object-contain h-full w-full />
    </div>
    <div class="text-container">
      <span class="title">{{ scene.title }}</span>
      <span class="desc">{{ scene.description }}</span>
      <div flex-1></div>
      <span class="company">{{ scene.companyName }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { IScene } from '@/types/scene'
import { useRouter } from 'vue-router'

const { scene } = defineProps<{
  scene: IScene
}>()

const router = useRouter()

const goToProductDetail = () => {
  router.push(`/scene/${scene.id}`)
}
</script>

<style scoped lang="scss">
.scene-item-root-container {
  @apply m-2 w-71 cursor-pointer relative border-0 flex flex-col h-full p-0 bg-[var(--color-background-alternating)];

  .img-container {
    @apply aspect-square rounded bg-slate-300 overflow-hidden;
  }

  .text-container {
    @apply flex flex-col items-start flex-1 px-8 pb-5;

    .title {
      @apply font-bold text-2xl line-clamp-1 mt-6;
    }

    .desc {
      @apply mt-6 text-base text-[var(--color-text-light)] line-clamp-3 leading-loose;
    }

    .company {
      @apply mt-6 text-base text-[var(--color-text-lighter)] line-clamp-1;
    }
  }

  @media (max-width: 40rem) {
    @apply w-[calc(50%-8px)] m-1;

    .text-container {
      @apply items-start px-4;

      .title {
        @apply mt-4 text-lg;
      }

      .desc {
        @apply mt-4 text-sm;
      }

      .company {
        @apply text-sm;
      }
    }
  }

  @media (max-width: 30rem) {
    .text-container {
      @apply p-2;

      .title {
        @apply mt-2 text-lg;
      }

      .desc {
        @apply mt-2 text-sm;
      }

      .company {
        @apply text-sm;
      }
    }
  }
}
</style>
