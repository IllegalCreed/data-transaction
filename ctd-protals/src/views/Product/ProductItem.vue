<template>
  <el-card
    :shadow="cardShadow"
    class="product-item-root-container"
    body-class="product-item-body-container"
    @click="goToProductDetail"
  >
    <div class="img-container">
      <img :src="product.imageUrl" object-contain h-full w-full />
    </div>
    <div class="text-container">
      <span class="title">{{ product.name }}</span>
      <div class="tag-container">
        <el-tag v-for="(tag, index) in product.tags" :key="index" type="danger" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span class="desc">{{ product.description }}</span>
      <div flex-1></div>
      <span mt-2 font-bold text-red-600>￥{{ product.price }}</span>

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
  @apply mb-5 mx-2 w-60 cursor-pointer relative;

  .img-container {
    @apply aspect-square m--5 rounded bg-slate-300 overflow-hidden;
  }

  .text-container {
    @apply flex flex-col flex-1 pt-2 mt-4;

    .title {
      @apply font-bold text-lg mt-2;
    }

    .tag-container {
      @apply flex flex-row flex-wrap gap-2 mt-2;
    }

    .desc {
      @apply mt-6 text-sm text-gray-700 line-clamp-2 text-ellipsis;
    }

    .company {
      @apply mt-2 text-sm text-gray-400 line-clamp-1 text-ellipsis;
    }
  }

  @media (max-width: 40rem) {
    @apply w-[calc(50%-20px)] mx-1 mb-2 border-0;

    .img-container {
      @apply m--1;
    }

    .text-container {
      @apply pt-0 mt-4;

      .title {
        @apply mt-0;
      }

      .desc {
        @apply text-sm mt-2;
      }

      .company {
        @apply text-sm;
      }
    }
  }

  @media (max-width: 30rem) {
    .text-container {
      @apply pt-0 mt-4;

      .title {
        @apply font-bold text-base mt-0;
      }

      .tag-container {
        @apply gap-1 mt-1;
      }

      .desc {
        @apply text-xs mt-2;
      }

      .company {
        @apply text-xs;
      }
    }
  }
}
:deep(.product-item-body-container) {
  @apply flex flex-col h-full;

  @media (max-width: 40rem) {
    @apply p-2;
  }

  @media (max-width: 30rem) {
    @apply p-1;
  }
}
</style>
