<template>
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
          <el-button class="default-btn" size="small" @click="resetAllSorting">重置全部</el-button>
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
          <el-select clearable v-model="statusToString" placeholder="选择产品状态">
            <el-option
              v-for="item in productStatusOptions"
              :key="item.label"
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
            v-model="sellerIdToString"
            placeholder="选择商家"
          >
            <el-option
              v-for="item in businessOptions"
              :key="item.label"
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

    <div v-if="sortingVisible || filterVisible" class="modal-mask"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const status = defineModel<ProductStatus | null>('status', { default: null })
const statusToString = computed<string | undefined>({
  get() {
    return status.value ?? undefined
  },
  set(newValue) {
    if (!newValue) {
      status.value = null
    } else {
      status.value = newValue as ProductStatus
    }
  }
})
const sellerId = defineModel<string | number | null>('sellerId', { default: null })
const sellerIdToString = computed<string | number | undefined>({
  get() {
    return sellerId.value ?? undefined
  },
  set(newValue) {
    if (!newValue) {
      sellerId.value = null
    } else {
      sellerId.value = newValue
    }
  }
})

// 筛选
const filterVisible = ref<boolean>(false)

import { ProductStatus, productStatusOptions } from '@/constants/mapData/product'
import { useBusinessStore } from '@/stores/modules/business'
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
  status.value = null
}

const resetSellerFilter = () => {
  sellerId.value = null
}

const resetAllFilter = () => {
  resetStatusFilter()
  resetSellerFilter()
}

const applyFilter = () => {
  filterVisible.value = false
  filterCount.value = 0
  if (status.value !== null) {
    filterCount.value++
  }
  if (sellerId.value !== null) {
    filterCount.value++
  }
  emit('refresh')
}

// 排序
const sortingVisible = ref<boolean>(false)
const sortingCount = ref(0)

const resetAllSorting = () => {}

const applySorting = () => {
  sortingVisible.value = false
}
</script>

<style scoped lang="scss"></style>
