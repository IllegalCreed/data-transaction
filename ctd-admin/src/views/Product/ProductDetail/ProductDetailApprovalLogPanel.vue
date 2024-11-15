<template>
  <div class="product-detail-approval-log-root-container">
    <span class="panel-title">审核日志</span>
    <el-table
      :data="approvalLogs"
      v-loading="getLogsLoading"
      header-cell-class-name="table-header-row"
      cell-class-name="table-row-cell"
    >
      <el-table-column prop="submitTime" label="提交时间">
        <template #default="scope">
          {{ scope.row.submitTime ?? '强制驳回' }}
        </template>
      </el-table-column>
      <el-table-column prop="approvalTime" label="审核时间" />
      <el-table-column prop="result" label="审核结果">
        <template #default="scope">
          <el-tag :type="scope.row.result ? 'success' : 'danger'">{{
            scope.row.result ? '通过' : '驳回'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createVersion" label="生成的版本">
        <template #default="scope">
          {{ scope.row.createVersion ?? '--' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="right" width="250">
        <template #default="scope">
          <el-button
            v-if="scope.row.result"
            link
            type="primary"
            size="small"
            @click="compareVersion(scope.row.createVersion)"
          >
            对比当前版本
          </el-button>
          <el-button
            v-if="!scope.row.result"
            link
            type="primary"
            size="small"
            @click="rejectReason(scope.row.id)"
            >驳回原因</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <product-reason-dialog v-model="reasonDialogVisible" :id="reasonId" />
    <product-approval-compare-dialog
      v-model="compareDialogVisible"
      :product-id="productId"
      :source="sourceVersion"
      :target="targetVersion"
    />
  </div>
</template>

<script lang="ts" setup>
import ProductReasonDialog from '../ProductReasonDialog.vue'
import ProductApprovalCompareDialog from '../ProductApproval/ProductApprovalCompareDialog.vue'

const { productId, version } = defineProps<{
  productId: number | string
  version: number | string | undefined
}>()

watch(
  () => productId,
  () => {
    if (productId) {
      executeGetProductApprovalLogsAction()
    }
  }
)

onMounted(() => {
  executeGetProductApprovalLogsAction()
})

import { useProductStore } from '@/stores/modules/product'
const { getProductApprovalLogs: getProductApprovalLogsAction } = useProductStore()
const {
  state: approvalLogs,
  isLoading: getLogsLoading,
  execute: executeGetProductApprovalLogsAction
} = useAsyncState(() => getProductApprovalLogsAction(productId), [], {
  immediate: false,
  onError: (e) => {
    const error = e as Error
    ElMessage.error(error.message)
  }
})

const reasonId = ref<number | string>(0)
const reasonDialogVisible = ref<boolean>(false)
const rejectReason = (id: number | string) => {
  reasonId.value = id
  reasonDialogVisible.value = true
}

const sourceVersion = ref<number | string>(0)
const targetVersion = ref<number | string>(0)
const compareDialogVisible = ref<boolean>(false)
const compareVersion = (createVersion: number | string) => {
  if (version) {
    sourceVersion.value = version
    targetVersion.value = createVersion
    compareDialogVisible.value = true
  }
}
</script>

<style lang="scss" scoped>
.product-detail-approval-log-root-container {
  @apply flex flex-col gap-4;
}
</style>
