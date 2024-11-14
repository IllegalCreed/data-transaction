<template>
  <div class="product-detail-version-root-container">
    <span class="panel-title">当前版本信息</span>
    <div flex flex-row items-start gap-1 v-if="!version" v-loading="loading">
      <span text-sm>暂无，请先</span>
      <el-link type="primary">去审核</el-link>
    </div>
    <div v-else class="props-container" v-loading="loading || getVersionLoading">
      <div class="prop">
        <span class="label">版本号：</span>
        <span class="value">{{ versionInfo.version }}</span>
      </div>
      <div class="prop">
        <span class="label">产品名称：</span>
        <span class="value">{{ versionInfo.name }}</span>
      </div>
      <div class="prop">
        <span class="label">展示价格：</span>
        <span class="value">{{ versionInfo.showPrice }}</span>
      </div>
      <div class="prop" items-start>
        <span class="label">产品标签：</span>
        <el-tag v-for="item in versionInfo.tags" :key="item" type="info">
          {{ item }}
        </el-tag>
      </div>
      <div class="prop" items-start>
        <span class="label">产品描述：</span>
        <span class="value">{{ versionInfo.description }}</span>
      </div>
      <div class="prop" items-start grid-col-span-3>
        <span class="label">产品封面：</span>
        <el-image
          class="w-30 h-30"
          :src="versionInfo.coverImageUrl"
          :preview-src-list="[versionInfo.coverImageUrl]"
          fit="cover"
        />
      </div>

      <div class="prop" items-start grid-col-span-3>
        <span class="label">产品图片：</span>
        <div flex flex-row flex-wrap gap-4>
          <el-image
            class="w-30 h-30"
            v-for="(item, index) in versionInfo.imageUrls"
            :key="index"
            :src="item"
            :preview-src-list="versionInfo.imageUrls"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>

      <div class="prop" items-start grid-col-span-3>
        <span class="label">产品详情：</span>
        <div v-html="versionInfo.detail"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { productId, version } = defineProps<{
  productId: number | string
  version: number | string | undefined
  loading: boolean
}>()

watch(
  () => version,
  () => {
    if (version) {
      executeGetVersionAction()
    }
  }
)

import { ProductPriceTypes } from '@/constants/mapData/product'
import { useProductStore } from '@/stores/modules/product'
const { getVersion: getVersionAction } = useProductStore()
const {
  state: versionInfo,
  isLoading: getVersionLoading,
  execute: executeGetVersionAction
} = useAsyncState(
  () =>
    version ? getVersionAction(productId, version) : Promise.reject(new Error('暂无版本信息')),
  {
    version: version ? version : 0,
    name: '',
    description: '',
    showPrice: 0,
    tags: [],
    coverImageUrl: '',
    imageUrls: [],
    detail: '',
    priceType: ProductPriceTypes.Specs,
    createTime: ''
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    }
  }
)
</script>

<style lang="scss" scoped>
.product-detail-version-root-container {
  @apply flex flex-col gap-4;

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
