<template>
  <div class="product-root-container">
    <div class="filter-container">
      <el-button class="default-btn" round>新建产品</el-button>

      <span class="label">状态：</span>
      <el-select v-model="status" placeholder="选择产品状态">
        <el-option
          v-for="status in productStatusOptions"
          :key="status.value"
          :label="status.label"
          :value="status.value"
        />
      </el-select>
    </div>

    <product-tabel-panel :data="data"></product-tabel-panel>

    <el-pagination
      self-center
      background
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script setup lang="ts">
import ProductTabelPanel from './ProductTabelPanel.vue'
import type { apiListResult } from '@/types/common'
import { usePager } from '@/composables/usePager'
import type { IProduct } from '@/types/product'
import { productStatusOptions } from '@/constants/mapData/product'

const title = ref('')
const status = ref('')
const sellerId = ref('')

import { useProductStore } from '@/stores/modules/product'
const { getProducts: getProductsAction } = useProductStore()
const getList = (pageNum: number, pageSize: number): Promise<apiListResult<IProduct>> => {
  return getProductsAction(title.value, status.value, sellerId.value, pageNum, pageSize)
}

const { pageNum, pageSize, total, data } = usePager(getList)
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
