<template>
  <el-card
    :shadow="cardShadow"
    class="product-item-root-container"
    body-class="product-item-body-container"
    @click="goToProductDetail"
  >
    <div class="img-container">
      <img :src="product.imageUrl" object-contain w-full />
    </div>
    <div class="text-container">
      <span class="title">{{ product.title }}</span>
      <div class="tag-container">
        <el-tag v-for="(tag, index) in product.tags" :key="index" type="primary" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span class="desc">{{ product.description }}</span>
      <div flex-1></div>
      <span class="price">￥{{ product.price }}</span>
    </div>
    <div class="bottom-container">
      <span class="company">服务商: {{ product.seller }}</span>
    </div>
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product'
import { useRouter } from 'vue-router'

const props = defineProps<{
  product: IProduct
}>()

const router = useRouter()

const goToProductDetail = () => {
  router.push(`/product/${props.product.id}`)
}

const cardShadow = ref<'always' | 'never' | 'hover'>('hover')
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    cardShadow.value = 'never'
  } else {
    cardShadow.value = 'hover'
  }
})
</script>

<style scoped lang="scss">
.product-item-root-container {
  @apply m-2 w-71 cursor-pointer relative border-0;

  .img-container {
    @apply aspect-square rounded bg-slate-300 overflow-hidden;
  }

  .text-container {
    @apply flex flex-col items-center flex-1 px-5 pb-5;

    .title {
      @apply font-bold text-lg line-clamp-1 mt-4;
    }

    .tag-container {
      @apply flex flex-row flex-wrap gap-2 mt-4;
    }

    .desc {
      @apply mt-4 text-sm text-[var(--color-text-light)] line-clamp-2 text-center;
    }

    .price {
      @apply mt-6 font-bold text-lg text-[var(--color-price)];
    }
  }

  .bottom-container {
    @apply flex justify-center items-center p-2 border-t-1 border-t-solid border-t-[var(--color-border)];

    .company {
      @apply text-sm text-[var(--color-text-lighter)] line-clamp-1;
    }
  }

  @media (max-width: 40rem) {
    @apply w-[calc(50%-10px)] m-1;

    .text-container {
      @apply items-start;

      .title {
        @apply mt-2 text-base;
      }

      .tag-container {
        @apply mt-2;
      }

      .desc {
        @apply mt-2 text-left text-xs;
      }

      .price {
        @apply mt-4 text-xl;
      }
    }

    .bottom-container {
      .company {
        @apply text-xs;
      }
    }
  }

  @media (max-width: 30rem) {
    .text-container {
      @apply p-2;
    }
  }
}
:deep(.product-item-body-container) {
  @apply flex flex-col h-full p-0;
}
</style>
