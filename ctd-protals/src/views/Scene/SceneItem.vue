<template>
  <el-card
    :shadow="cardShadow"
    class="scene-item-root-container"
    body-class="scene-item-body-container"
    @click="goToProductDetail"
  >
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
  </el-card>
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

const cardShadow = ref<'always' | 'never' | 'hover'>('hover')
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    cardShadow.value = 'never'
  } else {
    cardShadow.value = 'hover'
  }
})
</script>

<style scoped lang="scss">
.scene-item-root-container {
  @apply mb-5 mx-2 w-60 cursor-pointer relative;

  .img-container {
    @apply aspect-square m--5 rounded bg-slate-300 overflow-hidden;
  }

  .text-container {
    @apply flex flex-col flex-1 pt-2 mt-4;

    .title {
      @apply font-bold text-lg mt-2;
    }

    .desc {
      @apply mt-6 text-sm text-gray-700 line-clamp-3 text-ellipsis;
    }

    .company {
      @apply mt-2 text-sm text-gray-400 line-clamp-1 text-ellipsis;
    }
  }

  @media (max-width: 40rem) {
    @apply w-[calc(50%-20px)] mx-1 mb-2 border-0;

    .img-container {
      @apply m--1;
    }

    .text-container {
      @apply pt-0 mt-4;

      .title {
        @apply mt-0;
      }

      .desc {
        @apply text-sm mt-2;
      }

      .company {
        @apply text-sm;
      }
    }
  }

  @media (max-width: 30rem) {
    .text-container {
      .title {
        @apply font-bold text-base mt-0;
      }

      .desc {
        @apply text-xs mt-2;
      }

      .company {
        @apply text-xs;
      }
    }
  }
}
:deep(.scene-item-body-container) {
  @apply flex flex-col h-full;

  @media (max-width: 40rem) {
    @apply p-2;
  }
}
</style>
