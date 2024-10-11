<template>
  <el-skeleton :loading="getSellerActionLoading" animated flex flex-col gap-10>
    <template #template>
      <el-skeleton-item variant="rect" class="!h-25"></el-skeleton-item>
      <el-skeleton-item variant="rect" class="!h-30"></el-skeleton-item>
      <div flex flex-col gap-4>
        <el-skeleton-item v-for="n in 10" :key="n" variant="p"></el-skeleton-item>
      </div>
    </template>

    <template #default>
      <div class="seller-section-root-container">
        <div class="seller-body-container">
          <img :src="seller.avatar" />
          <div flex flex-col flex-1 min-w-0>
            <span text-lg font-bold mb-2>{{ seller.title }}</span>
            <div flex flex-row flex-wrap items-center gap-2>
              <el-tag v-for="(tag, index) in seller.tags" :key="index" type="info">{{
                tag
              }}</el-tag>
            </div>
          </div>
          <el-button class="detail-btn" type="primary" @click="viewSellerDetails"
            >查看详情</el-button
          >
        </div>

        <div class="stats-container">
          <div v-for="(stat, index) in seller.stats" :key="index" flex flex-col items-center>
            <span class="value">{{ stat.value }}</span>
            <span class="label">{{ stat.title }}</span>
          </div>
        </div>

        <div v-html="sanitizedContent" overflow-hidden></div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const { sellerId } = defineProps<{
  sellerId: string | number
}>()
watch(
  () => sellerId,
  () => {
    executeGetSellerAction()
  }
)

import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { getSeller: getSellerAction } = productStore

const {
  state: seller,
  isLoading: getSellerActionLoading,
  execute: executeGetSellerAction
} = useAsyncState(() => getSellerAction(sellerId), {
  id: '',
  title: '',
  avatar: '',
  tags: [],
  content: '',
  stats: []
})

const sanitizedContent = computed(() => {
  return seller.value.content ? DOMPurify.sanitize(seller.value.content) : ''
})

const router = useRouter()

const viewSellerDetails = () => {
  router.push(`/seller/${sellerId}`)
}

onMounted(() => {
  try {
    executeGetSellerAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.seller-section-root-container {
  @apply flex flex-col;

  .seller-body-container {
    @apply flex flex-row items-center p-5 shadow bg-[var(--color-background-alternating)];

    img {
      @apply w-16 h-16 object-contain rounded-full mr-4;
    }
  }

  .stats-container {
    @apply grid grid-cols-4 gap-6 my-10;

    .value {
      @apply text-[var(--color-price)] block text-2xl font-bold mb-4;
    }

    .label {
      @apply text-[var(--color-text-lighter)] text-sm;
    }
  }

  @media (max-width: 40rem) {
    .seller-body-container {
      @apply cursor-pointer;

      img {
        @apply hidden;
      }
      .detail-btn {
        @apply hidden;
      }
    }

    .stats-container {
      @apply grid-cols-2;
    }
  }
}
</style>
