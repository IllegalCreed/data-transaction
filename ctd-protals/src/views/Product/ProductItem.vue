<template>
  <el-card shadow="hover" class="product-item-root-container" body-class="product-item-body-container"
    @click="goToProductDetail">
    <div h-40 m--5 rounded bg-slate-300>
      <img :src="product.imageUrl" object-contain h-full w-full />
    </div>
    <div flex flex-col flex-1 pt-2 mt-4>
      <span font-bold text-lg mt-2>{{ product.name }}</span>
      <div flex flex-row flex-wrap gap-2 mt-2>
        <el-tag v-for="(tag, index) in product.tags" :key="index" type="danger" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span mt-6 text-sm text-gray-700 line-clamp-2 text-ellipsis>{{ product.description }}</span>
      <span mt-2 text-sm text-gray-400 line-clamp-1 text-ellipsis>服务商: {{ product.seller }}</span>
      <div flex-1></div>
      <span mt-4 font-bold text-red-600 self-end>￥{{ product.price }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product';
import { useRouter } from 'vue-router';

const props = defineProps<{
  product: IProduct;
}>();

const router = useRouter();

const goToProductDetail = () => {
  router.push(`/product/${props.product.id}`);
};
</script>

<style scoped lang="scss">
.product-item-root-container {
  @apply mb-5 mx-2 w-60 cursor-pointer;
}

.wrap {
  :global(.product-item-body-container) {
    @apply flex flex-col h-full;
  }
}
</style>
