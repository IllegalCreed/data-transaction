<template>
  <el-card shadow="hover" class="product-card" @click="goToProductDetail">
    <div class="image-placeholder" bg-blueGray></div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-seller">商家: {{ product.seller }}</p>
      <span class="product-price">价格: ￥{{ product.price }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  product: {
    id: number;
    name: string;
    description: string;
    seller: string;
    price: number;
  };
}>();

const router = useRouter();

const goToProductDetail = () => {
  router.push(`/product/${props.product.id}`);
};
</script>

<style scoped lang="scss">
.product-card {
  @apply mb-5 mr-5 w-60 cursor-pointer;
}

.image-placeholder {
  @apply h-40 m--5 bg-blueGray rounded;
}

.product-info {
  @apply pt-2 mt-4;
}

.product-name {
  @apply font-bold text-lg;
}

.product-description {
  @apply mt-2 h-10 text-sm text-gray-600 overflow-hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.product-seller {
  @apply mt-1 text-sm text-gray-500 overflow-hidden whitespace-nowrap;
  text-overflow: ellipsis;
}

.product-price {
  @apply mt-2 font-bold text-red-600;
}
</style>
