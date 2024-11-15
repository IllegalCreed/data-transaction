<template>
  <div class="product-detail-baseinfo-root-container">
    <span class="panel-title">产品基本信息</span>
    <div class="props-container" v-loading="loading">
      <div class="prop">
        <span class="label">ID：</span>
        <span class="value">{{ data.id }}</span>
      </div>
      <div class="prop">
        <span class="label">当前版本：</span>
        <span class="value">{{ data.currentVersion ?? '暂无' }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(data.status)">{{ statusLabel(data.status) }}</el-tag>
      </div>
      <div class="prop" items-center>
        <span class="label">综合评价：</span>
        <el-rate :model-value="data.rating" allow-half disabled show-score text-color="#ff9900" />
      </div>
      <div class="prop">
        <span class="label">已售数量：</span>
        <span class="value">{{ data.soldCount }}</span>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ data.createTime }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ data.updateTime }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IProductDetail } from '@/types/product'

defineProps<{
  data: IProductDetail
  loading: boolean
}>()

import {
  PRODUCT_STATUS_COLOR_MAP,
  PRODUCT_STATUS_MAP,
  ProductStatus
} from '@/constants/mapData/product'
const stautsColor = (status: ProductStatus) => PRODUCT_STATUS_COLOR_MAP[status]
const statusLabel = (status: ProductStatus) => PRODUCT_STATUS_MAP[status]
</script>

<style lang="scss" scoped>
.product-detail-baseinfo-root-container {
  @apply flex flex-col gap-4;

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
