<template>
  <div class="home-root-container">
    <el-carousel height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 justify-center text-2xl>{{ item }}</h3>
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
</script>

<style scoped lang="scss">
.home-root-container {
  @apply flex flex-col;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  @apply bg-blueGray;
}

.el-carousel__item:nth-child(2n + 1) {
  @apply bg-slate-300;
}
</style>
