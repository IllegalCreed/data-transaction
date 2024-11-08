<template>
  <div class="favorite-product-root-container">
    <span text-xl font-bold>产品收藏</span>

    <div class="search-filter">
      <el-input
        class="search-input"
        v-model="searchQuery"
        placeholder="请输入关键字搜索"
        clearable
      >
        <template #append>
          <el-button>
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>

      <el-button type="danger">全部删除</el-button>
    </div>

    <el-divider />

    <el-skeleton :loading="getFavoriteProductsActionLoading" animated>
      <template #template>
        <div flex flex-col gap-4>
          <el-skeleton-item
            v-for="n in 4"
            :key="n"
            variant="rect"
            class="!h-50"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="product-list-panel" v-if="favoriteProducts.length > 0">
          <product-item
            class="product-item"
            v-for="(product, index) in favoriteProducts"
            :key="index"
            :product="product"
          >
            <i-mingcute:delete-2-line
              class="delete-icon"
              @click.stop="deleteProduct(product.id)"
            ></i-mingcute:delete-2-line>
          </product-item>
        </div>

        <div v-else class="no-data">
          <img :src="bg" alt="暂无数据" />
          <span>暂无订单</span>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import ProductItem from '@/views/Product/ProductItem.vue'
import { useFavoriteStore } from '@/stores/modules/favorite'
const favoriteStore = useFavoriteStore()
const { favoriteProducts } = storeToRefs(favoriteStore)
const { getFavoriteProducts: getFavoriteProductsAction } = favoriteStore

const searchQuery = ref('')
const bg = new URL('@/assets/placeholder/noOrder.png', import.meta.url).href

const paginationLayout = ref('total, prev, pager, next')
const showPaginationBackground = ref(true)
const pagerCount = ref(7)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    paginationLayout.value = 'prev, pager, next'
    showPaginationBackground.value = false
    pagerCount.value = 5
  } else {
    paginationLayout.value = 'total, prev, pager, next'
    showPaginationBackground.value = true
    pagerCount.value = 7
  }
})

const {
  isLoading: getFavoriteProductsActionLoading,
  execute: executeGetFavoriteProductsAction,
} = useAsyncState(() => getFavoriteProductsAction(), undefined)

onMounted(() => {
  try {
    executeGetFavoriteProductsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

const deleteProduct = (id: string | number) => {
  try {
    console.log('删除产品：', id)
  } catch (error: unknown) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.favorite-product-root-container {
  @apply flex flex-col p-10;

  .search-filter {
    @apply flex flex-row items-center justify-between w-full gap-4 mt-10;

    .search-input {
      @apply w-100 border-1 border-solid border-[--color-border] rounded;

      :deep(.el-input__wrapper) {
        @apply border-none shadow-none text-base;
      }

      :deep(.el-input-group__append) {
        @apply rounded-r-full bg-[var(--color-background-alternating)] border-none shadow-none;
      }

      :deep(.el-button) {
        @apply flex items-center justify-center;
      }

      :deep(.el-icon) {
        width: 1.2rem;
        height: 1.2rem;
      }

      :deep(.el-icon svg) {
        width: 1.2rem;
        height: 1.2rem;
      }
    }

    .label {
      @apply text-lg text-[--color-text-lighter];
    }

    .status-select {
      @apply w-30;
    }

    @media (max-width: 60rem) {
      .search-input {
        @apply w-70;
      }
    }

    @media (max-width: 40rem) {
      @apply flex-col items-end;

      .search-input {
        @apply w-full;
      }
    }
  }

  .no-data {
    @apply flex flex-col items-center justify-center;

    img {
      @apply mt-30 w-full max-w-80;
    }

    span {
      @apply text-[--color-text-lighter] mt-10 mb-20;
    }
  }

  .product-list-panel {
    @apply flex flex-row justify-center flex-wrap;

    @media (min-width: 40rem) {
      .product-item {
        @apply w-67;
      }
    }
  }

  .delete-icon {
    @apply absolute right-2 top-2 w-8 h-8 text-[--color-logout-text] cursor-pointer;
  }

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
