<template>
  <div class="home-root-container">
    <home-carousel />

    <module-panel class="module"></module-panel>

    <news-panel mt-20 self-center></news-panel>

    <div
      flex
      flex-col
      justify-center
      items-center
      min-w-full
      bg-blueGray
      min-h-100
      mt-20
      px-10
      space-y-4
      data-aos="fade-up"
    >
      <span text-4xl font-bold mb-10>广告图 </span>
      <span text-lg>严选商家：精选优质商家，确保每一次交易都值得信赖</span>
      <span text-lg>资金安全：多重安全保障，每笔交易可追溯，让您更放心</span>
      <span text-lg>国资背书：国资企业背书，政府信用保证，品质无忧 </span>
      <span text-lg>全程保障：从签约到交付，平台全程护航，安全无忧</span>
    </div>

    <partner-panel mt-20 self-center />
  </div>
</template>

<script setup lang="ts">
import HomeCarousel from './HomeCarousel.vue'
import ModulePanel from './Module/ModulePanel.vue'
import NewsPanel from './News/NewsPanel.vue'
import PartnerPanel from './Partner/PartnerPanel.vue'

onMounted(() => {})
</script>

<style scoped lang="scss">
.home-root-container {
  @apply flex flex-col items-center;

  .module {
    @apply mt-20 self-center;
  }

  @media (max-width: 40rem) {
    .module {
      @apply mt-10;
    }
  }
}
</style>
