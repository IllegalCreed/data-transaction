<template>
  <div class="product-detail-root-container">

    <div flex-1 pr-8 min-w-0>
      <image-gallery :images="productImages" />

      <tab-bar mt-10 :links="links" />

      <div class="content-sections">
        <section id="details">
          <span>产品详情</span>
          <details-section :product-id="productId" />
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
          <seller-section :seller-id="productId" />
        </section>
        <section id="recommendations">
          <span>为您推荐</span>
          <recommendations-section :product-id="productId" />
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
import DetailsSection from './DetailsSection.vue';
import SafetySection from './SafetySection.vue';
import ReviewsSection from './ReviewsSection.vue';
import SellerSection from './SellerSection.vue';
import RecommendationsSection from './RecommendationsSection.vue';

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
    @apply block relative h-10 text-5 leading-10 font-bold text-dark mb-4 pl-4 bg-slate-100 rounded-r;

    &::before {
      @apply absolute bg-orange-500 h-10 top-0 left-0 w-1 content-[''];
    }
  }
}
</style>
