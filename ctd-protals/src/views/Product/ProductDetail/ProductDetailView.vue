<template>
  <div class="product-detail-root-container">

    <div flex-1 pr-8 min-w-0>
      <image-gallery :images="productImages" />

      <tab-bar mt-10 :links="links" />

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

    <control-panel class="control-panel" :product-id="productId" />
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue';
import ImageGallery from './ImageGallery.vue';
import TabBar from './TabBar.vue';

const route = useRoute()
const productId = ref(route.params.id ? route.params.id as string : '');

const productImages = ref([
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
]);

const links = ref([
  { id: 'details', label: '产品详情' },
  { id: 'safety', label: '安全保障' },
  { id: 'reviews', label: '客户评价' },
  { id: 'seller', label: '关于商家' },
  { id: 'recommendations', label: '为您推荐' },
]);
</script>

<style scoped lang="scss">
.product-detail-root-container {
  @apply flex flex-row items-start w-300 mx-auto pt-30
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
