<template>
  <div class="consult-service-panel">
    <div class="consult-service-inner-panel" :style="{ backgroundImage: `url('${bg}')` }">
      <span class="title">我们提供哪些咨询服务</span>
      <div class="grid-panel">
        <consult-service-item
          v-for="(item, index) in services"
          :key="index"
          :service="item"
          data-aos="fade-up"
          :data-aos-delay="aosDelay(index)"
        >
        </consult-service-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConsultServiceItem from './ConsultServiceItem.vue'
import { useConsultStore } from '@/stores/modules/consult'

const bg = ref(new URL('@/assets/background/consultBackground.png', import.meta.url).href)

const consultStore = useConsultStore()
const { services } = storeToRefs(consultStore)
const { getServices: getServicesAction } = consultStore

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  getServicesAction()
})
</script>

<style lang="scss" scoped>
.consult-service-panel {
  @apply min-w-full bg-[var(--color-background-darker)];

  .consult-service-inner-panel {
    @apply flex flex-col items-center min-w-full bg-cover bg-center py-20;
  }

  .title {
    @apply relative text-4xl font-bold text-[var(--color-text-reverse)];

    &::before {
      @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-40 h-1 rounded bg-[var(--color-text-reverse)];
    }
  }

  .grid-panel {
    @apply grid grid-cols-2 gap-6 mt-20 max-w-300 w-full px-10;
  }

  @media (max-width: 60rem) {
    .grid-panel {
      @apply grid-cols-1 gap-4 w-auto;
    }
  }

  @media (max-width: 40rem) {
    .grid-panel {
      @apply px-5;
    }
  }

  @media (max-width: 25rem) {
    .title {
      @apply text-3xl;
    }
  }
}
</style>
