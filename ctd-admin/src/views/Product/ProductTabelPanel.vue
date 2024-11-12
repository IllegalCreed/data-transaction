<template>
  <el-table :data="data" header-cell-class-name="table-header-row" cell-class-name="table-row-cell">
    <el-table-column prop="icon" label="封面" width="80" align="center">
      <template #default="scope">
        <img class="icon" :src="scope.row.imageUrl" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="showPrice" label="展示售价" width="100" />
    <el-table-column prop="soldCount" label="已售" width="80" />
    <el-table-column prop="rating" label="综合评价" width="130">
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
    <el-table-column fixed="right" label="操作" align="right" width="250">
      <template #default="scope">
        <el-button
          v-if="scope.row.status === ProductStatus.Approving"
          link
          type="primary"
          size="small"
          @click="approval(scope.row.id)"
        >
          审核
        </el-button>
        <el-button
          v-if="
            scope.row.status === ProductStatus.OnSale || scope.row.status === ProductStatus.OffSale
          "
          link
          type="primary"
          size="small"
          @click="reject(scope.row.id)"
          >强制驳回</el-button
        >
        <el-button
          v-if="scope.row.status === ProductStatus.Rejected"
          link
          type="primary"
          size="small"
          @click="rejectReason(scope.row.id)"
          >驳回原因</el-button
        >
        <el-button link type="primary" size="small" @click="goDetail(scope.row.id)"
          >查看详情</el-button
        >
        <el-button link type="primary" size="small" @click="deleteRow(scope.row.id, scope.row.name)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <product-reject-dialog v-model="rejectDialogVisible" :id="currentProductId" />
  <product-reason-dialog v-model="reasonDialogVisible" :id="currentProductId" />
</template>

<script setup lang="ts">
import ProductRejectDialog from './ProductRejectDialog.vue'
import ProductReasonDialog from './ProductReasonDialog.vue'
import { type IProductItem, ProductStatus } from '@/types/product'
defineProps<{ data: IProductItem[] }>()

import { PRODUCT_STATUS_COLOR_MAP, PRODUCT_STATUS_MAP } from '@/constants/mapData/product'
const stautsColor = (status: ProductStatus) => PRODUCT_STATUS_COLOR_MAP[status]
const statusLabel = (status: ProductStatus) => PRODUCT_STATUS_MAP[status]

const rejectDialogVisible = ref<boolean>(false)
const reasonDialogVisible = ref<boolean>(false)
const currentProductId = ref<number | string>(0)

const approval = (id: number | string) => {
  console.log(id)
}

const reject = (id: number | string) => {
  currentProductId.value = id
  rejectDialogVisible.value = true
}

const goDetail = (id: number | string) => {
  console.log(id)
}

const rejectReason = (id: number | string) => {
  currentProductId.value = id
  reasonDialogVisible.value = true
}

const emit = defineEmits<{
  (e: 'delete', id: number | string, name: string): void
}>()

const deleteRow = (id: number | string, name: string) => {
  emit('delete', id, name)
}
</script>

<style scoped lang="scss">
.icon {
  @apply w-14 h-14 object-cover;
}
</style>
