<template>
  <div class="home-root-container">
    <home-carousel />

    <module-panel class="module"></module-panel>

    <news-panel mt-20 self-center></news-panel>

    <ad-panel mt-20 self-center></ad-panel>

    <partner-panel mt-20 self-center />
  </div>
</template>

<script setup lang="ts">
import HomeCarousel from './HomeCarousel.vue'
import ModulePanel from './Module/ModulePanel.vue'
import NewsPanel from './News/NewsPanel.vue'
import AdPanel from './Advertisement/AdPanel.vue'
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
