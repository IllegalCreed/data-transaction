<template>
  <div class="product-approval-root-container">
    <span class="panel-title">产品审核</span>
    <div class="prop-row">
      <span>待审核版本</span>
      <span>{{ baseInfo.currentVersion ? '当前版本' : '暂无当前版本' }}</span>
    </div>
    <product-approval-compare-panel
      v-loading="getProductLoading"
      :product-id="id"
      :source="0"
      :target="baseInfo.currentVersion"
    />
    <div class="action-container">
      <el-button w-30 type="primary" @click="approval()"> 通过 </el-button>
      <el-button w-30 class="default-btn" @click="reject()"> 驳回 </el-button>
    </div>

    <product-reject-dialog v-model="rejectDialogVisible" :id="id" @reject="goBack" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'product-approval'
})

import ProductApprovalComparePanel from './ProductApprovalComparePanel.vue'
import ProductRejectDialog from '../ProductRejectDialog.vue'

const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetProductAction()
// })

onMounted(() => {
  executeGetProductAction()
})

import { ProductStatus } from '@/constants/mapData/product'
import { useProductStore } from '@/stores/modules/product'
const { getProduct: getProductAction } = useProductStore()
const {
  state: baseInfo,
  isLoading: getProductLoading,
  execute: executeGetProductAction
} = useAsyncState(
  () => getProductAction(id.value),
  {
    id: id.value,
    sellerId: 0,
    status: ProductStatus.Approving,
    rating: 0,
    soldCount: 0,
    sellerName: '',
    createTime: '',
    updateTime: ''
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    }
  }
)

const rejectDialogVisible = ref<boolean>(false)

const approval = () => {
  ElMessage.success('通过成功')
  goBack()
}

const reject = () => {
  rejectDialogVisible.value = true
}

import { useRouterStore } from '@/stores/modules/router'
const { deleteView } = useRouterStore()
const router = useRouter()
const route = useRoute()
const goBack = () => {
  router.push({
    name: 'product'
  })
  deleteView(route)
}
</script>

<style scoped lang="scss">
.product-approval-root-container {
  @apply flex-1 flex flex-col p-4 bg-[var(--background-page-color)];

  .prop-row {
    @apply py-8 grid grid-cols-2 gap-4 border-b border-b-dashed border-[var(--border-color)];
  }

  .action-container {
    @apply p-4 flex flex-row justify-center items-center gap-4;
  }
}
</style>
