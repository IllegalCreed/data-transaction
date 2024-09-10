<template>
  <div class="home-root-container">
    <el-carousel class="home-carousel" height="300px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item" alt="Banner" class="banner-image" />
      </el-carousel-item>
    </el-carousel>

    <module-panel mt-20 self-center></module-panel>

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
import ModulePanel from './ModulePanel.vue'
import NewsPanel from './NewsPanel.vue'
import PartnerPanel from './PartnerPanel.vue'

const banners = [
  new URL('@/assets/banner1.jpg', import.meta.url).href,
  new URL('@/assets/banner2.jpg', import.meta.url).href
]
</script>

<style scoped lang="scss">
.home-root-container {
  @apply flex flex-col;

  @media (max-width: 40rem) {
    .home-carousel {
      @apply hidden;
    }
  }
}

.banner-image {
  @apply w-full h-full object-contain;
}

.el-carousel__item:nth-child(2n) {
  @apply bg-#114064;
}

.el-carousel__item:nth-child(2n + 1) {
  @apply bg-#053A89;
}
</style>
