<template>
  <el-table
    :data="data"
    v-loading="loading"
    header-cell-class-name="table-header-row"
    cell-class-name="table-row-cell"
    @selection-change="handleSelectionChange"
    :row-key="rowKey"
  >
    <!-- 多选列 -->
    <el-table-column type="selection" width="55" />

    <!-- 数据列 -->
    <el-table-column
      v-for="column in visibleColumns"
      :key="column.prop"
      :prop="String(column.prop)"
      :label="getColumnLabel(column.prop)"
      :width="column.width"
      :min-width="column.minWidth"
      :align="column.align"
      :show-overflow-tooltip="column.showOverflowTooltip"
      :formatter="column.formatter"
    >
      <template v-if="column.slot" #default="scope">
        <slot :name="column.slot" :scope="scope" />
      </template>
    </el-table-column>

    <!-- 操作列 -->
    <el-table-column fixed="right" label="操作" align="right" min-width="220">
      <template #default="scope">
        <slot name="actions" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts" generic="T">
import type { IPropLabelMap } from '@/types/common'
import type { ITableColumn } from '@/types/table'

const { propLabelMap, columns, rowKey } = defineProps<{
  data: T[]
  rowKey: (row: T) => string
  loading: boolean
  columns: ITableColumn<T>[]
  propLabelMap: IPropLabelMap<T>
}>()

const selectedIds = defineModel<string[]>({
  default: []
})

const handleSelectionChange = (selectedItems: T[]) => {
  selectedIds.value = selectedItems.map(rowKey)
}

const getColumnLabel = (key: keyof T) => {
  const result = propLabelMap[key] || key
  return String(result)
}

const visibleColumns = computed(() => columns.filter((column) => column.visible))
</script>

<style scoped lang="scss"></style>
