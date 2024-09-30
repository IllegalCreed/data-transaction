<template>
  <div class="partner-top-item-root-container" @click="goPartner">
    <img :src="partner.imageUrl" />
    <div class="main-container">
      <span class="title">{{ partner.title }}</span>
      <div flex-1></div>
      <span class="desc">{{ partner.description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPartner } from '@/types/home'

const { partner } = defineProps<{ partner: IPartner }>()

const goPartner = () => {
  window.location.href = partner.link
}
</script>

<style lang="scss" scoped>
.partner-top-item-root-container {
  @apply flex flex-row items-center gap-10 px-10 py-6 bg-[var(--color-background-alternating)] shadow-md cursor-pointer;

  img {
    @apply w-40 h-20 object-contain;
  }

  .main-container {
    @apply flex flex-col;

    .title {
      @apply text-2xl font-bold line-clamp-1 tracking-widest;
    }

    .desc {
      @apply text-sm line-clamp-1 mt-4 text-[var(--color-text-light)];
    }
  }

  @media (max-width: 75rem) {
    @apply flex-col gap-4;

    .main-container {
      @apply items-center;

      .desc {
        @apply mt-2;
      }
    }
  }

  @media (max-width: 50rem) {
    @apply flex-row gap-10;

    .main-container {
      @apply items-start;

      .desc {
        @apply mt-4;
      }
    }
  }

  @media (max-width: 30rem) {
    @apply flex-col gap-4;

    .main-container {
      @apply items-center;

      .desc {
        @apply mt-2;
      }
    }
  }
}
</style>
