<template>
  <div class="product-order-detail-contract-root-container">
    <span text-xl font-bold>合同信息</span>

    <div class="contract-info-container">
      <div><strong>合同编号：</strong> {{ contractDetails.contractId }}</div>
      <div><strong>签署时间：</strong> {{ contractDetails.signingTime }}</div>
      <div><strong>甲方：</strong> {{ contractDetails.partyA }}</div>
      <div><strong>乙方：</strong> {{ contractDetails.partyB }}</div>
    </div>

    <el-button self-center class="btn"> 查看合同详情 </el-button>
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
  partyB: '科技商家有限公司'
})
</script>

<style scoped lang="scss">
.product-order-detail-contract-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md gap-4;

  .contract-info-container {
    @apply grid grid-cols-2 gap-4;
  }

  .btn {
    @apply mt-4;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;

    .contract-info-container {
      @apply grid-cols-1;
    }

    .btn {
      @apply self-start;
    }
  }
}
</style>
