<template>
  <el-table :data="data" header-cell-class-name="table-header-row" cell-class-name="table-row-cell">
    <el-table-column prop="icon" label="封面" width="80" align="center">
      <template #default="scope">
        <img class="icon" :src="scope.row.imageUrl" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" width="120" />
    <el-table-column prop="showPrice" label="展示售价" width="100" />
    <el-table-column prop="soldCount" label="已售" width="80" />
    <el-table-column prop="rating" label="评价" width="130">
      <template #default="scope">
        <el-rate v-model="scope.row.rating" size="small" disabled />
      </template>
    </el-table-column>
    <el-table-column prop="currentVersion" label="当前版本" />
    <el-table-column prop="createTime" label="创建时间" width="130" />
    <el-table-column prop="updateTime" label="更新时间" width="130" />
    <el-table-column label="状态" width="120">
      <template #default="scope">
        <el-tag :type="stautsColor(scope.row.status)">{{ statusLabel(scope.row.status) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="250">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="showEdit(scope.row.id)">
          编辑
        </el-button>
        <el-button link type="primary" size="small" @click="changeState(scope.row)">{{
          scope.row.status === 0 ? '下架' : '上架'
        }}</el-button>
        <el-button link type="primary" size="small" @click="goDetail(scope.row.id)"
          >查看详情</el-button
        >
        <el-button link type="primary" size="small" @click="deleteRow(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IProductItem, ProductStatus } from '@/types/product'
import { PRODUCT_STATUS_COLOR_MAP, PRODUCT_STATUS_MAP } from '@/constants/mapData/product'

defineProps<{ data: IProductItem[] }>()

const stautsColor = (status: ProductStatus) => PRODUCT_STATUS_COLOR_MAP[status]
const statusLabel = (status: ProductStatus) => PRODUCT_STATUS_MAP[status]

const showEdit = (id: number) => {
  console.log(id)
}

const changeState = (row: IProductItem) => {
  console.log(row)
}

const goDetail = (id: number) => {
  console.log(id)
}

const deleteRow = (row: IProductItem) => {
  console.log(row)
}
</script>

<style scoped lang="scss">
.icon {
  @apply w-14 h-14 object-cover;
}
</style>
