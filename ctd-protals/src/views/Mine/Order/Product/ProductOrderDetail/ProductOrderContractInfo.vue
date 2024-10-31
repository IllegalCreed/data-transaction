<template>
  <div class="product-order-detail-contract-root-container">
    <span text-lg font-bold>合同信息</span>

    <div class="contract-info-container">
      <div>
        <span class="label">合同编号：</span>
        <span class="value">{{ contractDetails.contractId }}</span>
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

    <el-button self-center class="btn default-btn"> 查看合同详情 </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orderId: number
}>()

const contractDetails = ref({
  contractId: 'C-20240425-001',
  signingTime: '2024-04-25 10:30:00',
  partyA: '消费者名称',
  partyB: '科技商家有限公司',
})
</script>

<style scoped lang="scss">
.product-order-detail-contract-root-container {
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
    @apply p-0;

    .contract-info-container {
      @apply grid-cols-1;
    }

    .btn {
      @apply self-start;
    }
  }
}
</style>
