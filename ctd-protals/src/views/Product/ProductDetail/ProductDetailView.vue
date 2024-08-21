<template>
  <div class="product-detail-root-container">
    <!-- 左侧内容区域 -->
    <div class="left-content flex-1 pr-8">
      <!-- 图片集 -->
      <div class="image-gallery mb-8">
        <div class="main-image bg-gray-200 h-96 mb-4 flex items-center justify-center">
          <!-- 大图显示区 -->
          <span>大图显示区</span>
        </div>
        <div class="thumbnail-list flex items-center">
          <button class="prev-button mr-4" @click="scrollThumbnails('prev')">←</button>
          <div class="thumbnails flex space-x-2 overflow-hidden">
            <!-- 缩略图 -->
            <div class="thumbnail bg-gray-300 h-24 w-24 flex-shrink-0"></div>
            <div class="thumbnail bg-gray-300 h-24 w-24 flex-shrink-0"></div>
            <div class="thumbnail bg-gray-300 h-24 w-24 flex-shrink-0"></div>
            <div class="thumbnail bg-gray-300 h-24 w-24 flex-shrink-0"></div>
            <!-- 更多缩略图... -->
          </div>
          <button class="next-button ml-4" @click="scrollThumbnails('next')">→</button>
        </div>
      </div>

      <!-- 锚点导航的Tab栏 -->
      <div class="tab-bar sticky top-0 bg-white z-10">
        <nav class="flex space-x-8 py-4 border-b">
          <a href="#details" class="tab-item">产品详情</a>
          <a href="#safety" class="tab-item">安全保障</a>
          <a href="#reviews" class="tab-item">客户评价</a>
          <a href="#seller" class="tab-item">关于商家</a>
          <a href="#recommendations" class="tab-item">为您推荐</a>
        </nav>
      </div>

      <!-- 各部分内容 -->
      <div class="content-sections">
        <section id="details" class="py-8">
          <h2>产品详情</h2>
          <p>这里是产品详情的内容...</p>
        </section>
        <section id="safety" class="py-8">
          <h2>安全保障</h2>
          <p>这里是安全保障的内容...</p>
        </section>
        <section id="reviews" class="py-8">
          <h2>客户评价</h2>
          <p>这里是客户评价的内容...</p>
        </section>
        <section id="seller" class="py-8">
          <h2>关于商家</h2>
          <p>这里是关于商家的内容...</p>
        </section>
        <section id="recommendations" class="py-8">
          <h2>为您推荐</h2>
          <p>这里是推荐产品的内容...</p>
        </section>
      </div>
    </div>

    <control-panel :product-id="productId" />
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue';

const route = useRoute()
const productId = ref(route.params.id ? route.params.id as string : '');

const scrollThumbnails = (direction: 'prev' | 'next') => {
  console.log(`Scrolling thumbnails to the ${direction}`);
  // 缩略图滚动逻辑
};
</script>

<style scoped lang="scss">
.product-detail-root-container {
  @apply flex flex-row items-start w-300 mx-auto pt-30
}

.left-content {
  @apply flex-1 pr-8;
}

.image-gallery {
  @apply mb-8;
}

.main-image {
  @apply bg-gray-200 h-96 mb-4 flex items-center justify-center;
}

.thumbnail-list {
  @apply flex items-center;
}

.thumbnail {
  @apply bg-gray-300 h-24 w-24 flex-shrink-0;
}

.tab-bar {
  @apply sticky top-0 bg-white z-10;
}

.tab-item {
  @apply py-4 border-b-2 border-transparent hover:border-blue-500;
}

.content-sections section {
  @apply py-8;
}

.control-panel {
  @apply sticky top-30 w-1/3;
}
</style>
