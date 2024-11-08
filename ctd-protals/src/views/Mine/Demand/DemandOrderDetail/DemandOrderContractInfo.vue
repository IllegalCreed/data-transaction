<template>
  <div class="demand-order-detail-contract-root-container">
    <span text-lg font-bold>合同信息</span>

    <el-skeleton :loading="getDemandOrderContractActionLoading" animated>
      <template #template>
        <div flex flex-col>
          <div grid grid-cols-2 gap-6>
            <el-skeleton-item
              v-for="n in 4"
              :key="n"
              variant="p"
            ></el-skeleton-item>
          </div>
          <el-skeleton-item
            variant="rect"
            class="self-center mt-10 !w-30 !h-8"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="contract-info-container">
          <div>
            <span class="label">合同编号：</span>
            <span class="value">{{ contractDetails.contractNum }}</span>
          </div>
          <div>
            <span class="label">签署时间：</span>
            <span class="value">{{ contractDetails.signingTime }}</span>
          </div>
          <div>
            <span class="label">甲方：</span>
            <span class="value">{{ contractDetails.partyA }}</span>
          </div>
          <div>
            <span class="label">乙方：</span>
            <span class="value">{{ contractDetails.partyB }}</span>
          </div>
        </div>

        <el-button self-center class="btn default-btn">
          查看合同详情
        </el-button>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { getDemandOrderContract: getDemandOrderContractAction } = orderStore

const { orderId } = defineProps<{
  orderId: number | string
}>()

const {
  state: contractDetails,
  isLoading: getDemandOrderContractActionLoading,
  execute: executeGetDemandOrderContractAction,
} = useAsyncState(() => getDemandOrderContractAction(orderId), {
  id: 0,
  contractNum: '',
  contractUrl: '',
  signingTime: '',
  partyA: '',
  partyB: '',
})

onMounted(() => {
  try {
    executeGetDemandOrderContractAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.demand-order-detail-contract-root-container {
  @apply flex flex-col gap-4;

  .contract-info-container {
    @apply grid grid-cols-2 gap-4;
  }

  .label {
    @apply text-sm text-[var(--color-text-lighter)];
  }

  .value {
    @apply text-sm text-[var(--color-text)];
  }

  .btn {
    @apply mt-5;
  }

  @media (max-width: 40rem) {
    .contract-info-container {
      @apply grid-cols-1;
    }

    .btn {
      @apply self-start;
    }
  }
}
</style>
