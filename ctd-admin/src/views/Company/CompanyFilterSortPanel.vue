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
          <el-select clearable v-model="statusToString" placeholder="选择场景状态">
            <el-option
              v-for="item in activeStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-divider />
        <div class="panel">
          <div flex flex-row justify-between>
            <span class="label" shrink-0>合作伙伴</span>
            <el-link class="reset" :underline="false" @click="resetPartnerTypeFilter">重置</el-link>
          </div>
          <el-select clearable v-model="partnerTypeToString" placeholder="选择合作伙伴类型">
            <el-option
              v-for="item in partnerTypesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-divider />
        <div class="panel">
          <div flex flex-row justify-between>
            <span class="label" shrink-0>友情链接</span>
            <el-link class="reset" :underline="false" @click="resetIsShowInFooterFilter"
              >重置</el-link
            >
          </div>
          <el-select clearable v-model="isShowInFooterToBoolean" placeholder="选择是否为友情链接">
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
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

const partnerType = defineModel<PartnerTypes | null>('partnerType', { default: null })
const partnerTypeToString = computed<string | undefined>({
  get() {
    return partnerType.value ?? undefined
  },
  set(newValue) {
    if (!newValue) {
      partnerType.value = null
    } else {
      partnerType.value = newValue as PartnerTypes
    }
  }
})
const status = defineModel<ActiveStatus | null>('status', { default: null })
const statusToString = computed<string | undefined>({
  get() {
    return status.value ?? undefined
  },
  set(newValue) {
    if (!newValue) {
      status.value = null
    } else {
      status.value = newValue as ActiveStatus
    }
  }
})
const isShowInFooter = defineModel<boolean | null>('isShowInFooter', { default: null })
const isShowInFooterToBoolean = computed<boolean | undefined>({
  get() {
    return isShowInFooter.value ?? undefined
  },
  set(newValue) {
    if (newValue === undefined) {
      isShowInFooter.value = null
    } else {
      isShowInFooter.value = newValue
    }
  }
})

// 筛选
const filterVisible = ref<boolean>(false)
import { ActiveStatus, activeStatusOptions } from '@/constants/mapData'
import { PartnerTypes, partnerTypesOptions } from '@/constants/mapData/company'

const filterCount = ref(0)

const resetStatusFilter = () => {
  status.value = null
}

const resetPartnerTypeFilter = () => {
  partnerType.value = null
}

const resetIsShowInFooterFilter = () => {
  isShowInFooter.value = null
}

const resetAllFilter = () => {
  resetStatusFilter()
  resetPartnerTypeFilter()
  resetIsShowInFooterFilter()
}

const applyFilter = () => {
  filterVisible.value = false
  filterCount.value = 0
  if (status.value !== null) {
    filterCount.value++
  }
  if (partnerType.value !== null) {
    filterCount.value++
  }
  if (isShowInFooter.value !== null) {
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
