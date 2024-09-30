<template>
  <div class="advertisement-panel-root-container" :style="{ backgroundImage: `url('${bg}')` }">
    <div class="inner-container" data-aos="fade-up">
      <div class="header-container">
        <span class="pre-title">我们的</span>
        <span class="title">四大优势</span>
      </div>

      <div class="main-container">
        <ad-item v-for="item in ads" :key="item.id" :advertisement="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdItem from './AdItem.vue'
const bg = ref(new URL('@/assets/background/homeAdBackground.png', import.meta.url).href)

const homeStore = useHomeStore()
const { ads } = storeToRefs(homeStore)
const { getAds: getAdsAction } = homeStore

onMounted(() => {
  getAdsAction()
})
</script>

<style scoped lang="scss">
.advertisement-panel-root-container {
  @apply flex flex-col items-center w-full py-20 bg-cover bg-bottom;

  .inner-container {
    @apply flex flex-row gap-35 items-center w-full max-w-320 px-10;

    .header-container {
      @apply flex-shrink-0 relative flex flex-col gap-6 pl-6;

      &::before {
        @apply content-[''] absolute left-0 top-2.5 w-1 h-24 rounded bg-white;
      }

      .pre-title {
        @apply text-3xl text-[var(--color-background)];
      }

      .title {
        @apply text-5xl text-[var(--color-background)];
      }
    }

    .main-container {
      @apply flex-1 grid grid-cols-4 gap-10;
    }
  }

  @media (max-width: 75rem) {
    .inner-container {
      @apply gap-15 w-auto;
      .main-container {
        @apply grid-cols-2 gap-6;
      }
    }
  }

  @media (max-width: 50rem) {
    .inner-container {
      @apply flex-col;

      .header-container {
        @apply items-center pl-0;

        &::before {
          @apply content-[''] absolute left-1/2 translate-x--1/2 top-33 w-40 h-1 rounded bg-white;
        }
      }

      .main-container {
        @apply grid-cols-2 gap-6 mt-10;
      }
    }
  }

  @media (max-width: 40rem) {
    .inner-container {
      @apply px-5;
    }
  }

  @media (max-width: 30rem) {
    .inner-container {
      @apply self-stretch;

      .header-container {
        &::before {
          @apply top-30 w-30;
        }

        .pre-title {
          @apply text-2xl;
        }

        .title {
          @apply text-4xl;
        }
      }

      .main-container {
        @apply self-stretch;
      }
    }
  }
}
</style>
