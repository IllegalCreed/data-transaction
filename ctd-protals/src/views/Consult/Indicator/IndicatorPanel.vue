<template>
  <div class="consult-ad-panel">
    <img :src="bg" data-aos="fade-up" />
    <div class="text-container">
      <span class="title" data-aos="fade-up">为什么选择我们</span>
      <p class="desc" data-aos="fade-up">
        我们的咨询服务致力于帮助企业实现数据驱动决策，提升数据治理水平，确保数据合规性，并最大化数据资产的商业价值。
      </p>
      <div flex-1></div>
      <div class="ad-grid">
        <indicator-item
          v-for="(item, index) in indicators"
          :key="item.id"
          :indicator="item"
          data-aos="fade-up"
          :data-aos-delay="aosDelay(index)"
        ></indicator-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IndicatorItem from './IndicatorItem.vue'
import { useConsultStore } from '@/stores/modules/consult'

const bg = new URL('@/assets/icon/consult/indicatorBackground.png', import.meta.url).href

const consultStore = useConsultStore()
const { indicators } = storeToRefs(consultStore)
const { getIndicators: getIndicatorsAction } = consultStore

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  getIndicatorsAction()
})
</script>

<style lang="scss" scoped>
.consult-ad-panel {
  @apply flex flex-row max-w-300 w-full px-10;

  img {
    @apply flex-shrink-0 rounded-2xl h-150 w-100 object-cover;
  }

  .text-container {
    @apply flex flex-col ml-20;

    .title {
      @apply relative text-4xl font-bold self-start;

      &::before {
        @apply content-[''] absolute bottom--5 w-40 h-1 rounded bg-[var(--color-primary)];
      }
    }

    .desc {
      @apply mt-10 text-base text-gray-400;
    }

    .ad-grid {
      @apply grid grid-cols-2 gap-6;
    }
  }

  @media (max-width: 75rem) {
    @apply justify-center;

    img {
      @apply hidden;
    }

    .text-container {
      @apply items-center ml-0;

      .title {
        @apply relative text-4xl font-bold self-center;

        &::before {
          @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-40 h-1 rounded bg-[var(--color-primary)];
        }
      }

      .ad-grid {
        @apply mt-10;
      }
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;

    .text-container {
      .title {
        @apply text-3xl;
      }

      .ad-grid {
        @apply grid-cols-1;
      }
    }
  }
}
</style>
