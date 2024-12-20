<template>
  <div flex flex-row justify-end gap-3>
    <el-popover
      :visible="columnVisible"
      popper-class="column-popover"
      placement="bottom"
      :width="300"
      @show="openColumnPopover"
    >
      <template #reference>
        <el-badge :value="columnCount" :show-zero="false">
          <el-button class="default-btn" @click="columnVisible = true">
            <template v-slot:icon>
              <i-streamline:visible />
            </template>
            列选择
          </el-button>
        </el-badge>
      </template>
      <div flex flex-col>
        <span class="title">选择列</span>
        <el-divider />
        <VueDraggable v-model="columnList" :animation="150" handle=".handle" class="flex flex-col">
          <div
            v-for="column in columnList"
            :key="column.prop"
            class="flex flex-row items-center border-b border-b-solid border-b-[var(--el-border-color)]"
          >
            <i-radix-icons:drag-handle-dots-2 class="handle" cursor-pointer ml-2 h-6 w-6 />
            <div class="panel" flex-1>
              <div flex flex-row items-center justify-between>
                <span class="label" shrink-0>{{ getColumnLabel(column.prop) }}</span>
                <el-switch v-model="column.visible" />
              </div>
            </div>
          </div>
        </VueDraggable>
        <div flex flex-row justify-between p-3>
          <el-button class="default-btn" size="small" @click="resetAllColumn">重置全部</el-button>
          <el-button type="primary" size="small" @click="applyColumn">应用</el-button>
        </div>
      </div>
    </el-popover>

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
            v-for="sort in sortList"
            :key="sort.prop"
            class="flex flex-row items-center border-b border-b-solid border-b-[var(--el-border-color)]"
          >
            <i-radix-icons:drag-handle-dots-2 class="handle" cursor-pointer ml-2 h-6 w-6 />
            <div class="panel" flex-1>
              <div flex flex-row items-center justify-between>
                <span class="label" shrink-0>{{ getColumnLabel(sort.prop) }}</span>
                <el-link class="reset" :underline="false" @click="resetSorting(sort)">重置</el-link>
              </div>
              <el-select clearable v-model="sort.order" placeholder="选择排序方式">
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
        <div
          v-for="filter in filterList"
          :key="filter.prop"
          class="panel border-b border-b-solid border-b-[var(--el-border-color)]"
        >
          <div flex flex-row items-center justify-between>
            <span class="label" shrink-0>{{ getColumnLabel(filter.prop) }}</span>
            <el-link class="reset" :underline="false" @click="resetFilter(filter)">重置</el-link>
          </div>
          <template v-if="filter.type === 'enum'">
            <el-select
              v-model="filter.value"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="4"
              clearable
              placeholder="选择筛选项"
            >
              <el-option
                v-for="item in filter.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

          <template v-else-if="filter.type === 'date'">
            <el-date-picker
              v-model="filter.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="!w-full"
            />
          </template>

          <template v-else-if="filter.type === 'input'">
            <el-input v-model="filter.value as string | undefined" placeholder="输入筛选内容" />
          </template>
        </div>
        <div flex flex-row justify-between p-3>
          <el-button class="default-btn" size="small" @click="resetAllFilter">重置全部</el-button>
          <el-button type="primary" size="small" @click="applyFilter">应用</el-button>
        </div>
      </div>
    </el-popover>

    <el-button class="default-btn" @click="resetAll">
      <template v-slot:icon>
        <i-carbon:reset />
      </template>
      重置全部
    </el-button>

    <div
      v-if="sortingVisible || filterVisible || columnVisible"
      class="modal-mask"
      @click="cancelChanges"
    ></div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { cloneDeep } from 'lodash-es'
import { VueDraggable } from 'vue-draggable-plus'
import type { IFilter, ITableColumn } from '@/types/table'
import type { ISort } from '@/types/table'
import type { IPropLabelMap } from '@/types/common'

const { propLabelMap } = defineProps<{
  propLabelMap: IPropLabelMap<T>
}>()

const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'apply'): void
}>()

const getColumnLabel = (key: keyof T) => {
  const result = propLabelMap[key] || key
  return String(result)
}

const resetAll = () => {
  resetAllColumn()
  resetAllFilter()
  resetAllSorting()
  columnCount.value = 0
  filterCount.value = 0
  sortingCount.value = 0
  emit('reset')
}

// 列选择
const columnList = defineModel<ITableColumn<T>[]>('columnList', {
  default: undefined
})
const columnListBackup = ref<ITableColumn<T>[]>([])
const columnVisible = ref<boolean>(false)
const columnCount = ref(0)

const openColumnPopover = () => {
  columnListBackup.value = cloneDeep(columnList.value)
  columnVisible.value = true
}

const resetAllColumn = () => {
  columnList.value.forEach((column) => {
    column.visible = true
  })
}

const applyColumn = () => {
  columnVisible.value = false
  columnCount.value = 0
  columnList.value.forEach((item) => {
    if (item.visible === false) {
      columnCount.value++
    }
  })
  emit('apply')
}

// 筛选
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
  emit('apply')
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
  emit('apply')
}

const cancelChanges = () => {
  if (columnVisible.value) {
    columnList.value = cloneDeep(columnListBackup.value) as ITableColumn<T>[]
    columnVisible.value = false
  }

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
