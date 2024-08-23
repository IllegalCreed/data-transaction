<template>
  <div class="recommendations-section-root-container">
    <ProductItem v-for="(product, index) in recommendedProducts" :key="index" :product="product" />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductItem from '../ProductItem.vue';
import type { IProduct } from '@/types/product';

const props = defineProps<{
  productId: string;
}>();

const recommendedProducts = ref<IProduct[]>([]);

const fetchRecommendedProducts = async (id: string) => {
  console.log('mock get recommendations for productId:', id);
  // 模拟 API 请求，根据 productId 获取推荐商品
  recommendedProducts.value = [
    {
      id: 1,
      name: '智能手表X100',
      tags: ['新款', '限量', '独家'],
      description: '先进的智能手表，支持多种健康监测功能。',
      seller: '智能科技有限公司',
      price: 2999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+1'
    },
    {
      id: 2,
      name: '智能音箱V3',
      tags: ['热门', '推荐'],
      description: '高音质智能音箱，支持语音控制。',
      seller: '智能科技有限公司',
      price: 799,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+2'
    },
    {
      id: 3,
      name: '智能家居套装',
      tags: ['热门', '推荐'],
      description: '全屋智能家居解决方案，便捷、安全。',
      seller: '智能科技有限公司',
      price: 9999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+3'
    },
    {
      id: 4,
      name: '智能跑步机F1',
      tags: ['热门', '推荐'],
      description: '支持实时心率监测的智能跑步机。',
      seller: '智能科技有限公司',
      price: 4999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+4'
    },
    {
      id: 5,
      name: '智能门锁Pro',
      tags: ['热门', '推荐'],
      description: '高安全性的智能门锁，支持多种开锁方式。',
      seller: '智能科技有限公司',
      price: 1599,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+5'
    },
    {
      id: 6,
      name: '智能电视QLED 55寸',
      tags: ['热门', '推荐'],
      description: '超高清智能电视，支持HDR10+。',
      seller: '智能科技有限公司',
      price: 6999,
      imageUrl: 'https://via.placeholder.com/600x400?text=Product+6'
    },
  ];
};

onMounted(() => {
  fetchRecommendedProducts(props.productId);
});
</script>


<style scoped lang="scss">
.recommendations-section-root-container {
  @apply flex flex-row flex-wrap;
}
</style>
