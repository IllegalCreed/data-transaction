<template>
  <div class="service-banner-root-container">
    <div class="inner-container">
      <div class="text-container">
        <span class="title">{{ banner?.title }}</span>
        <span class="desc">
          {{ banner?.description }}
        </span>
      </div>
      <img class="icon" :src="banner?.iconUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores/modules/service'
const serviceStore = useServiceStore()
const { banner } = storeToRefs(serviceStore)
const { getBanner: getBannerAction } = serviceStore

onMounted(() => {
  getBannerAction()
})
</script>

<style scoped lang="scss">
.service-banner-root-container {
  @apply flex flex-col items-center justify-center w-full h-120 bg-gradient-to-r from-[var(--color-service-banner-gradient-from)] to-[var(--color-service-banner-gradient-to)];

  .inner-container {
    @apply flex flex-row items-center w-full max-w-320 px-10 py-10 gap-20;

    .text-container {
      @apply flex flex-col items-start;

      .title {
        @apply relative text-5xl font-bold text-[var(--color-text-reverse)];

        &::before {
          @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-full h-1 rounded bg-[var(--color-text-reverse)];
        }
      }

      .desc {
        @apply mt-15 text-lg text-[var(--color-text-reverse)] line-clamp-5;
      }
    }

    .icon {
      @apply w-50% h-auto object-contain;
    }
  }

  @media (max-width: 75rem) {
    @apply h-auto aspect-[5/2];
  }

  @media (max-width: 60rem) {
    .inner-container {
      .text-container {
        .title {
          @apply text-4xl;
        }

        .desc {
          @apply text-base mt-10;
        }
      }

      .icon {
        @apply w-40%;
      }
    }
  }

  @media (max-width: 50rem) {
    .inner-container {
      .text-container {
        .title {
          @apply text-3xl;
        }

        .desc {
          @apply text-sm;
        }
      }
    }
  }

  @media (max-width: 40rem) {
    .inner-container {
      @apply px-5;

      .text-container {
        @apply items-center;
        .title {
          @apply text-3xl;
        }

        .desc {
          @apply text-sm text-justify;
        }
      }

      .icon {
        @apply hidden;
      }
    }
  }
}
</style>
