<template>
  <div class="product-detail-root-container">

    <div flex-1 pr-8 min-w-0>
      <image-gallery :images="productImages" />

      <tab-bar mt-10 :links="links" />

      <div class="content-sections">
        <section id="details">
          <span>产品详情</span>
          <details-section />
        </section>
        <section id="safety">
          <span>安全保障</span>
          <safety-section />
        </section>
        <section id="reviews">
          <span>客户评价</span>
          <reviews-section />
        </section>
        <section id="seller">
          <span>关于商家</span>
          <seller-section />
        </section>
        <section id="recommendations">
          <span>为您推荐</span>
          <recommendations-section />
        </section>
      </div>
    </div>

    <control-panel :product-id="productId" />
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

.content-sections {
  @apply pt-10;

  section {
    @apply mb-16;
  }

  section>span {
    @apply block text-6 font-bold text-dark mb-4;
  }
}
</style>
