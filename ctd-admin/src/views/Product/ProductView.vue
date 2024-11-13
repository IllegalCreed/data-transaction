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
          <el-button @click="handleSearch">
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>
    </div>

    <el-divider class="!my-0" />

    <div flex flex-row justify-end gap-3>
      <el-popover
        :visible="sortingVisible"
        popper-class="sorting-popover"
        placement="bottom"
        :width="300"
      >
        <template #reference>
          <el-badge :value="sortingCount" :show-zero="false">
            <el-button class="default-btn" @click="sortingVisible = true">
              <template v-slot:icon>
                <i-hugeicons:sorting-05></i-hugeicons:sorting-05>
              </template>
              排序</el-button
            >
          </el-badge>
        </template>
        <div flex flex-col>
          <span class="title">排序</span>
          <el-divider />
          <div flex flex-row justify-between p-3>
            <el-button class="default-btn" size="small" @click="resetAllSorting"
              >重置全部</el-button
            >
            <el-button type="primary" size="small" @click="applySorting">应用</el-button>
          </div>
        </div>
      </el-popover>
      <el-popover
        :visible="filterVisible"
        popper-class="filter-popover"
        placement="bottom"
        :width="300"
      >
        <template #reference>
          <el-badge :value="filterCount" :show-zero="false">
            <el-button class="default-btn" @click="filterVisible = true">
              <template v-slot:icon>
                <i-hugeicons:filter-horizontal></i-hugeicons:filter-horizontal>
              </template>
              筛选</el-button
            >
          </el-badge>
        </template>
        <div flex flex-col>
          <span class="title">筛选</span>
          <el-divider />
          <div class="panel">
            <div flex flex-row justify-between>
              <span class="label" shrink-0>状态</span>
              <el-link class="reset" :underline="false" @click="resetStatusFilter">重置</el-link>
            </div>
            <el-select clearable v-model="status" placeholder="选择产品状态">
              <el-option
                v-for="item in productStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-divider />
          <div class="panel">
            <div flex flex-row justify-between>
              <span class="label">商家</span>
              <el-link class="reset" :underline="false" @click="resetSellerFilter">重置</el-link>
            </div>
            <el-select
              filterable
              remote
              remote-show-suffix
              clearable
              :remote-method="remoteMethod"
              :loading="getBusinessOptionsByNameActionLoading"
              v-model="sellerId"
              placeholder="选择商家"
            >
              <el-option
                v-for="item in businessOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-divider />
          <div flex flex-row justify-between p-3>
            <el-button class="default-btn" size="small" @click="resetAllFilter">重置全部</el-button>
            <el-button type="primary" size="small" @click="applyFilter">应用</el-button>
          </div>
        </div>
      </el-popover>
    </div>

    <product-tabel-panel :data="data" @delete="handleDelete"></product-tabel-panel>

    <el-pagination
      self-center
      background
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40, 50]"
    />

    <div v-if="sortingVisible || filterVisible" class="modal-mask"></div>
  </div>
</template>

<script setup lang="ts">
import ProductTabelPanel from './ProductTabelPanel.vue'

// 获取列表

const data = ref<IProductItem[]>([])
import { useProductStore } from '@/stores/modules/product'
const { getProducts: getProductsAction, delProducts: delProductsAction } = useProductStore()
const getList = async (): Promise<apiListResult<IProductItem>> => {
  const res = await getProductsAction(
    searchQuery.value,
    status.value,
    sellerId.value,
    pageNum.value,
    pageSize.value
  )

  data.value = res.rows
  return res
}

import { usePager } from '@/composables/usePager'
import type { IProductItem } from '@/types/product'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
import { useDelete } from '@/composables/useDelete'
const delName = ref('')
const delId = ref<string | number>('')
const { doDelAction } = useDelete(`是否确认删除${delName.value}？`, async () => {
  await delProductsAction([delId.value])
  refresh()
})
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

// 筛选
const filterVisible = ref<boolean>(false)
const status = ref<string>('')
const sellerId = ref<string | number>('')
import { productStatusOptions } from '@/constants/mapData/product'
import { useBusinessStore } from '@/stores/modules/business'
import type { apiListResult } from '@/types/common'
const { getBusinessOptionsByName: getBusinessOptionsByNameAction } = useBusinessStore()
const {
  state: businessOptions,
  isLoading: getBusinessOptionsByNameActionLoading,
  execute: executeGetBusinessOptionsByNameAction
} = useAsyncState(getBusinessOptionsByNameAction, [], {
  immediate: false,
  throwError: true
})

const remoteMethod = (query: string) => {
  if (query) {
    executeGetBusinessOptionsByNameAction(0, query)
  } else {
    businessOptions.value = []
  }
}

const filterCount = ref(0)

const resetStatusFilter = () => {
  status.value = ''
}

const resetSellerFilter = () => {
  sellerId.value = ''
}

const resetAllFilter = () => {
  resetStatusFilter()
  resetSellerFilter()
}

const applyFilter = () => {
  filterVisible.value = false
  filterCount.value = 0
  if (status.value) {
    filterCount.value++
  }
  if (sellerId.value) {
    filterCount.value++
  }
  pageNum.value = 1
  refresh()
}

// 排序
const sortingVisible = ref<boolean>(false)
const sortingCount = ref(0)

const resetAllSorting = () => {}

const applySorting = () => {
  sortingVisible.value = false
}
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
