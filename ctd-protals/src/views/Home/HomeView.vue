<template>
  <div class="home-root-container">
    <el-carousel height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 justify-center text-2xl>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <module-panel mt-20 self-center></module-panel>

    <el-card shadow="always" data-aos="fade-up" self-center h-80 text-8 mt-10>政策与资讯</el-card>

    <div flex justify-center items-center min-w-full bg-blueGray min-h-100 text-8 mt-10>
      商业模式闭环图
    </div>

    <div self-center flex flex-row space-x-10 mt-10>
      <el-card shadow="always" data-aos="fade-up" h-50 text-8>顶级合作伙伴</el-card>
      <el-card shadow="always" data-aos="fade-up" data-aos-delay="100" h-50 text-8
        >顶级合作伙伴</el-card
      >
    </div>

    <el-card
      shadow="always"
      data-aos="fade-up"
      flex
      justify-center
      items-center
      self-center
      h-80
      text-8
      mt-10
      >合作伙伴列表</el-card
    >
  </div>
</template>

<script setup lang="ts">
import ModulePanel from './ModulePanel.vue'
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
