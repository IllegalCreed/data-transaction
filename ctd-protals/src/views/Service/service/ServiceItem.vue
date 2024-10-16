<template>
  <div
    class="service-item-root-container"
    :class="[
      imagePosition === 'right'
        ? 'bg-[var(--color-background)]'
        : 'bg-[var(--color-background-alternating)]'
    ]"
    data-aos="fade-up"
  >
    <div class="inner-container" :class="[imagePosition === 'right' ? '' : 'right']">
      <div class="text-container" :class="[imagePosition === 'right' ? '' : 'right']">
        <span class="title">{{ service.title }}</span>
        <span class="desc">{{ service.description }}</span>

        <div v-for="(sellingPoint, index) in service.sellingPoints" :key="index" class="slogan">
          <i-iconamoon:shield-yes-fill text-green-500 mr-2></i-iconamoon:shield-yes-fill>
          <span line-clamp-1>{{ sellingPoint }}</span>
        </div>

        <el-button class="inner-btn default-btn" size="large">立即咨询</el-button>
      </div>

      <img :src="service.imageUrl" />
    </div>
    <el-button class="outer-btn default-btn" :size="btnSize">立即咨询</el-button>
  </div>
</template>

<script setup lang="ts">
import type { IService } from '@/types/service'

defineProps<{
  service: IService
  imagePosition: 'left' | 'right'
}>()

const btnSize = ref<'large' | 'default' | 'small'>('large')
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    btnSize.value = 'default'
  } else {
    btnSize.value = 'large'
  }
})
</script>

<style scoped lang="scss">
.service-item-root-container {
  @apply flex flex-col justify-center items-center w-full py-20;

  .inner-container {
    @apply flex flex-row items-center max-w-320 px-10;

    &.right {
      @apply flex-row-reverse;
    }

    .text-container {
      @apply flex-1 flex flex-col items-start mr-20;

      &.right {
        @apply mr-0 ml-20 items-end text-right;
      }

      @media (max-width: 75rem) {
        @apply mr-10;

        &.right {
          @apply mr-0 ml-10 items-end;
        }
      }

      @media (max-width: 40rem) {
        @apply mr-0;

        &.right {
          @apply ml-0 items-start text-left;
        }
      }
    }

    .title {
      @apply relative text-4xl font-bold;

      &::before {
        @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-full h-1 rounded bg-[var(--color-primary)];
      }
    }

    .desc {
      @apply mt-10 mb-10 text-[var(--color-text-light)] line-clamp-2;
    }

    .slogan {
      @apply flex flex-row items-center text-lg mb-2;
    }

    img {
      @apply w-50% h-auto object-cover;
    }

    @media (max-width: 60rem) {
      .title {
        @apply text-3xl;
      }

      .desc {
        @apply text-sm;
      }

      .slogan {
        @apply text-base;
      }
    }

    @media (max-width: 50rem) {
      .title {
        @apply text-2xl;
      }

      .desc {
        @apply text-sm mb-5;
      }

      .slogan {
        @apply text-sm;
      }
    }

    @media (max-width: 40rem) {
      @apply px-5;

      .title {
        @apply text-3xl;
      }

      .desc {
        @apply line-clamp-none;
      }

      img {
        @apply hidden;
      }
    }
  }

  .inner-btn {
    @apply w-50 mt-10;

    @media (max-width: 75rem) {
      @apply hidden;
    }
  }

  .outer-btn {
    @apply hidden w-50;

    @media (max-width: 75rem) {
      @apply block mt-10;
    }

    @media (max-width: 40rem) {
      @apply w-35 mt-5 self-start ml-5;
    }
  }

  @media (max-width: 40rem) {
    @apply py-15;
  }
}
</style>
