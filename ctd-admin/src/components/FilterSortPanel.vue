<template>
  <div flex flex-row justify-end gap-3>
    <el-popover
      :visible="sortingVisible"
      popper-class="sorting-popover"
      placement="bottom"
      :width="300"
      @show="openSortingPopover"
    >
      <template #reference>
        <el-badge :value="sortingCount" :show-zero="false">
          <el-button class="default-btn" @click="sortingVisible = true">
            <template v-slot:icon>
              <i-hugeicons:sorting-05></i-hugeicons:sorting-05>
            </template>
            排序
          </el-button>
        </el-badge>
      </template>
      <div flex flex-col>
        <span class="title">排序</span>
        <el-divider />
        <VueDraggable v-model="sortList" :animation="150" handle=".handle" class="flex flex-col">
          <div
            v-for="item in sortList"
            :key="item.columns.key"
            class="flex flex-row items-center border-b border-b-solid border-b-[var(--el-border-color)]"
          >
            <i-radix-icons:drag-handle-dots-2 class="handle" cursor-pointer ml-2 h-6 w-6 />
            <div class="panel" flex-1>
              <div flex flex-row justify-between>
                <span class="label" shrink-0>{{ item.columns.label }}</span>
                <el-link class="reset" :underline="false" @click="resetSorting(item)">重置</el-link>
              </div>
              <el-select clearable v-model="item.order" placeholder="选择排序方式">
                <el-option label="升序" value="asc" />
                <el-option label="降序" value="desc" />
              </el-select>
            </div>
          </div>
        </VueDraggable>
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
      @show="openFilterPopover"
    >
      <template #reference>
        <el-badge :value="filterCount" :show-zero="false">
          <el-button class="default-btn" @click="filterVisible = true">
            <template v-slot:icon>
              <i-hugeicons:filter-horizontal></i-hugeicons:filter-horizontal>
            </template>
            筛选
          </el-button>
        </el-badge>
      </template>
      <div flex flex-col>
        <span class="title">筛选</span>
        <el-divider />
        <div v-for="filter in filterList" :key="filter.columns.key" class="panel">
          <div flex flex-row justify-between>
            <span class="label" shrink-0>{{ filter.columns.label }}</span>
            <el-link class="reset" :underline="false" @click="resetFilter(filter)">重置</el-link>
          </div>
          <template v-if="filter.columns.type === 'enum'">
            <el-select clearable v-model="filter.value" placeholder="选择筛选项">
              <el-option
                v-for="item in filter.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

          <template v-else-if="filter.columns.type === 'date'">
            <el-date-picker
              v-model="filter.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="!w-full"
            />
          </template>

          <template v-else-if="filter.columns.type === 'input'">
            <el-input v-model="filter.value as string | undefined" placeholder="输入筛选内容" />
          </template>
        </div>
        <el-divider />
        <div flex flex-row justify-between p-3>
          <el-button class="default-btn" size="small" @click="resetAllFilter">重置全部</el-button>
          <el-button type="primary" size="small" @click="applyFilter">应用</el-button>
        </div>
      </div>
    </el-popover>

    <div v-if="sortingVisible || filterVisible" class="modal-mask" @click="cancelChanges"></div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { cloneDeep } from 'lodash-es'
import { VueDraggable } from 'vue-draggable-plus'
import type { IFilter } from '@/types/table'
import type { ISort } from '@/types/table'

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const filterList = defineModel<IFilter<T>[]>('filterList', {
  default: undefined
})
const filterListBackup = ref<IFilter<T>[]>([])
const filterVisible = ref<boolean>(false)
const filterCount = ref(0)

const openFilterPopover = () => {
  filterListBackup.value = cloneDeep(filterList.value)
  filterVisible.value = true
}

const resetFilter = (filter: IFilter<T>) => {
  filter.value = undefined
}

const resetAllFilter = () => {
  filterList.value.forEach((filter) => {
    filter.value = undefined
  })
}

const applyFilter = () => {
  filterVisible.value = false
  filterCount.value = 0
  filterList.value.forEach((item) => {
    if (item.value !== undefined && item.value !== '') {
      filterCount.value++
    }
  })
  emit('refresh')
}

// 排序
const sortList = defineModel<ISort<T>[]>('sortList', {
  default: undefined
})
const sortListBackup = ref<ISort<T>[]>([])
const sortingVisible = ref<boolean>(false)
const sortingCount = ref(0)

const openSortingPopover = () => {
  sortListBackup.value = cloneDeep(sortList.value)
  sortingVisible.value = true
}

const resetSorting = (item: ISort<T>) => {
  item.order = undefined
}

const resetAllSorting = () => {
  sortList.value.forEach((item) => {
    item.order = undefined
  })
}

const applySorting = () => {
  sortingVisible.value = false
  sortingCount.value = 0
  sortList.value.forEach((item) => {
    if (item.order !== undefined) {
      sortingCount.value++
    }
  })
  emit('refresh')
}

const cancelChanges = () => {
  if (filterVisible.value) {
    filterList.value = cloneDeep(filterListBackup.value) as IFilter<T>[]
    filterVisible.value = false
  }

  if (sortingVisible.value) {
    sortList.value = cloneDeep(sortListBackup.value) as ISort<T>[]
    sortingVisible.value = false
  }
}
</script>

<style scoped lang="scss"></style>
