<template>
  <div class="product-root-container">
    <div flex flex-row justify-between>
      <el-input
        class="search-input"
        @keyup.enter="handleSearch"
        @clear="handleSearch"
        v-model="searchQuery"
        placeholder="请输入关键字搜索"
        clearable
      >
        <template #append>
          <el-button @click="handleSearch" :loading="getListLoading">
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>
    </div>

    <el-divider class="!my-0" />

    <product-filter-sort-panel
      v-model:status="status"
      v-model:seller-id="sellerId"
      @refresh="reset"
    />

    <product-tabel-panel
      :data="data"
      :loading="getListLoading"
      @delete="handleDelete"
    ></product-tabel-panel>

    <el-pagination
      self-center
      background
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40, 50]"
    />
  </div>
</template>

<script setup lang="ts">
import ProductFilterSortPanel from './ProductFilterSortPanel.vue'
import ProductTabelPanel from './ProductTabelPanel.vue'
import type { apiListResult } from '@/types/common'

// 获取列表
const getListLoading = ref<boolean>(false)
const data = ref<IProductItem[]>([])
import { useProductStore } from '@/stores/modules/product'
const { getProducts: getProductsAction, deleteProducts: deleteProductsAction } = useProductStore()
const getList = async (): Promise<apiListResult<IProductItem>> => {
  getListLoading.value = true
  const res = await getProductsAction(
    searchQuery.value,
    status.value,
    sellerId.value,
    pageNum.value,
    pageSize.value
  )

  data.value = res.rows
  getListLoading.value = false
  return res
}

import { usePager } from '@/composables/usePager'
import type { IProductItem } from '@/types/product'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
import { useDelete } from '@/composables/useDelete'
const delName = ref('')
const delId = ref<string | number>('')
const { doDelAction } = useDelete(
  () => `是否确认删除 ${delName.value} ？`,
  async () => {
    await deleteProductsAction([delId.value])
    refresh()
  }
)
const handleDelete = (id: string | number, name: string) => {
  delName.value = name
  delId.value = id
  doDelAction()
}

// 搜索
const searchQuery = ref<string>('')
const handleSearch = () => {
  refresh()
}

const status = ref<string>('')
const sellerId = ref<string | number>('')
const reset = () => {
  pageNum.value = 1
  refresh()
}
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
