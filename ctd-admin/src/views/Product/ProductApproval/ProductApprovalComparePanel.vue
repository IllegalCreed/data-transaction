<template>
  <div class="product-approval-compare-root-container">
    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.version !== targetVersion.version }"
          >版本号：</span
        >
        <span class="value">{{ sourceVersion.version }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.version !== targetVersion.version">
        <span class="label">版本号：</span>
        <span class="value">{{ targetVersion.version }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.name !== targetVersion.name }"
          >产品名称：</span
        >
        <span class="value">{{ sourceVersion.name }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.name !== targetVersion.name">
        <span class="label">产品名称：</span>
        <span class="value">{{ targetVersion.name }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.showPrice !== targetVersion.showPrice }"
          >展示价格：</span
        >
        <span class="value">{{ sourceVersion.showPrice }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.showPrice !== targetVersion.showPrice">
        <span class="label">展示价格：</span>
        <span class="value">{{ targetVersion.showPrice }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.tags !== targetVersion.tags }"
          >产品标签：</span
        >
        <div flex flex-row flex-wrap gap-2>
          <el-tag v-for="item in sourceVersion.tags" :key="item" type="info">
            {{ item }}
          </el-tag>
        </div>
      </div>
      <div class="prop" v-if="sourceVersion.tags !== targetVersion.tags">
        <span class="label">产品标签：</span>
        <div flex flex-row flex-wrap gap-2>
          <el-tag v-for="item in targetVersion.tags" :key="item" type="info">
            {{ item }}
          </el-tag>
        </div>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.description !== targetVersion.description }"
          >产品描述：</span
        >
        <span class="value">{{ sourceVersion.description }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.description !== targetVersion.description">
        <span class="label">产品描述：</span>
        <span class="value">{{ targetVersion.description }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.coverImageUrl !== targetVersion.coverImageUrl }"
          >产品封面：</span
        >
        <el-image
          class="w-30 h-30"
          :src="sourceVersion.coverImageUrl"
          :preview-src-list="[sourceVersion.coverImageUrl]"
          fit="cover"
        />
      </div>
      <div class="prop" v-if="sourceVersion.coverImageUrl !== targetVersion.coverImageUrl">
        <span class="label">产品封面：</span>
        <el-image
          class="w-30 h-30"
          :src="targetVersion.coverImageUrl"
          :preview-src-list="[targetVersion.coverImageUrl]"
          fit="cover"
        />
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.imageUrls !== targetVersion.imageUrls }"
          >产品图片：</span
        >
        <div flex flex-row flex-wrap gap-4>
          <el-image
            class="w-30 h-30"
            v-for="(item, index) in sourceVersion.imageUrls"
            :key="index"
            :src="item"
            :preview-src-list="sourceVersion.imageUrls"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>
      <div class="prop" v-if="sourceVersion.imageUrls !== targetVersion.imageUrls">
        <span class="label">产品图片：</span>
        <div flex flex-row flex-wrap gap-4>
          <el-image
            class="w-30 h-30"
            v-for="(item, index) in targetVersion.imageUrls"
            :key="index"
            :src="item"
            :preview-src-list="targetVersion.imageUrls"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.detail !== targetVersion.detail }"
          >产品详情：</span
        >
        <div class="value" v-html="sourceVersion.detail"></div>
      </div>
      <div class="prop" v-if="sourceVersion.detail !== targetVersion.detail">
        <span class="label">产品详情：</span>
        <div class="value" v-html="targetVersion.detail"></div>
      </div>
    </div>

    <!-- 左侧加载覆盖层 -->
    <div class="loading-overlay left-overlay" v-if="getSourceVersionLoading">
      <i-line-md:loading-loop class="loading-icon" />
    </div>

    <!-- 右侧加载覆盖层 -->
    <div class="loading-overlay right-overlay" v-if="getTargetVersionLoading">
      <i-line-md:loading-loop class="loading-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { productId, source, target } = defineProps<{
  productId: number | string
  source: number | string
  target: number | string
}>()

import { ProductPriceTypes } from '@/constants/mapData/product'
import { useProductStore } from '@/stores/modules/product'
const { getVersion: getVersionAction } = useProductStore()
const defalutVersion = {
  version: 0,
  name: '',
  description: '',
  showPrice: 0,
  tags: [],
  coverImageUrl: '',
  imageUrls: [],
  detail: '',
  priceType: ProductPriceTypes.Specs,
  createTime: ''
}
const {
  state: sourceVersion,
  isLoading: getSourceVersionLoading,
  execute: executeGetSourceVersionAction
} = useAsyncState(() => getVersionAction(productId, source), defalutVersion, {
  immediate: false,
  onError: (e) => {
    const error = e as Error
    ElMessage.error(error.message)
  }
})
const {
  state: targetVersion,
  isLoading: getTargetVersionLoading,
  execute: executeGetTargetVersionAction
} = useAsyncState(() => getVersionAction(productId, target), defalutVersion, {
  immediate: false,
  onError: (e) => {
    const error = e as Error
    ElMessage.error(error.message)
  }
})

onMounted(() => {
  executeGetSourceVersionAction()
  executeGetTargetVersionAction()
})
</script>

<style scoped lang="scss">
.product-approval-compare-root-container {
  @apply relative flex flex-col;

  .prop-row {
    @apply py-8 grid grid-cols-2 gap-4 border-b border-b-dashed border-[var(--border-color)];
  }

  .change {
    @apply text-[var(--text-btn-primary-color)];
  }

  .loading-icon {
    @apply w-10 h-10 color-[var(--text-btn-primary-color)];
  }

  .loading-overlay {
    @apply absolute top-0 bottom-0 w-1/2 bg-[var(--mask-color)] flex justify-center items-center z-10;
  }

  .left-overlay {
    @apply left-0;
  }

  .right-overlay {
    @apply right-0;
  }
}
</style>
