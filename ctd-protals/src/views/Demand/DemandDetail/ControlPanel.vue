<template>
  <el-card class="control-panel-root-container" body-class="control-panel-body-container">
    <span text-2xl font-bold>{{ demandName }}</span>
    <span text-sm mt-2 text-gray-500>{{ demandShotDesc }}</span>

    <label text-lg font-bold mt-5>交易模式：{{ transactionMode?.type }}</label>

    <label text-lg font-bold mt-5>预算</label>

    <div mt-4 h-10>
      <span font-bold text-red-500 text-4xl>￥{{ budget }}</span>
    </div>

    <el-button mt-10 type="primary" size="large" @click="placeOrder">承接需求</el-button>
  </el-card>
</template>

<script setup lang="ts">
import type { TransactionMode } from '@/types/demand'
const props = defineProps<{
  demandId: string
}>()

const demandName = ref('')
const demandShotDesc = ref('')
const transactionMode = ref<TransactionMode>()
const budget = ref(10000.0)

// 模拟接口调用获取商品信息
const fetchProductInfo = async () => {
  console.log(`Fetching demand info for ID: ${props.demandId}`)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模拟返回的数据
  demandName.value = '示例需求'
  demandShotDesc.value = '这是一个示例需求的简短描述'
  transactionMode.value = { type: '招标', tenderType: '按时间' }
}

const placeOrder = () => {
  console.log(`承接需求 ${demandName.value}`)
}

onMounted(async () => {
  fetchProductInfo()
})
</script>

<style scoped lang="scss">
.control-panel-root-container {
  @apply sticky top-30 w-1/3;
}

.wrap {
  :global(.control-panel-body-container) {
    @apply flex flex-col;
  }
}
</style>
