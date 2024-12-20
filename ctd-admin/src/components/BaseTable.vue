<template>
  <el-table
    :data="data"
    v-loading="loading"
    header-cell-class-name="table-header-row"
    cell-class-name="table-row-cell"
  >
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="String(column.prop)"
      :label="column.label"
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
    <el-table-column fixed="right" label="操作" align="right" width="220">
      <template #default="scope">
        <slot name="actions" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts" generic="T">
import type { ITableColumn } from '@/types/table'

defineProps<{
  data: T[]
  loading: boolean
  columns: ITableColumn<T>[]
}>()
</script>

<style scoped lang="scss"></style>
