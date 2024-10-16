<template>
  <div class="service-step-panel-root-container">
    <span class="page-title">服务流程</span>
    <span class="desc">以下是我们为您提供的数据处理服务的完整流程，确保每一步都精准有效。</span>
    <div class="step-panel-container">
      <service-step-item
        v-for="(item, index) in steps"
        :key="item.id"
        :step="item"
        data-aos="fade-up"
        :data-aos-delay="aosDelay(index)"
      ></service-step-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceStepItem from './ServiceStepItem.vue'

import { useServiceStore } from '@/stores/modules/service'

const serviceStore = useServiceStore()
const { steps } = storeToRefs(serviceStore)
const { getSteps: getStepsAction } = serviceStore

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  getStepsAction()
})
</script>

<style lang="scss" scoped>
.service-step-panel-root-container {
  @apply flex flex-col items-center w-full max-w-320 px-10 mt-20;

  .desc {
    @apply text-center mt-10 mx-10 text-[var(--color-text-light)];
  }

  .step-panel-container {
    @apply mt-20 grid grid-cols-4 gap-6;

    @media (max-width: 75rem) {
      @apply grid-cols-2;
    }

    @media (max-width: 30rem) {
      @apply grid-cols-1;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
