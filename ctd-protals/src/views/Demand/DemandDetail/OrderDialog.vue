<template>
  <el-dialog
    class="order-dialog-container"
    v-model="modelValue"
    width="100%"
    :lock-scroll="true"
    title="承接需求"
  >
    <div flex flex-col justify-start min-h-full>
      <span text-2xl font-bold>{{ demandName }}</span>
      <span text-sm mt-2 text-gray-500>{{ demandShotDesc }}</span>

      <label text-lg font-bold mt-5>交易模式：招标</label>

      <div flex-1></div>

      <div mt-4 h-10>
        <span font-bold text-red-500 text-4xl>￥{{ budget }}</span>
      </div>

      <el-button mt-4 type="primary" size="large" @click="placeOrder">承接需求</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const { demandId } = defineProps<{
  demandId: string
}>()
const modelValue = defineModel<boolean>({ required: true })

const demandName = ref('')
const demandShotDesc = ref('')
const budget = ref(10000.0)

// 模拟接口调用获取商品信息
const fetchProductInfo = async () => {
  console.log(`Fetching product info for ID: ${demandId}`)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模拟返回的数据
  demandName.value = '示例需求'
  demandShotDesc.value = '这是一个示例商品的简短描述'
}

const placeOrder = () => {
  console.log(`承接 ${demandName.value}`)
}

onMounted(async () => {
  await fetchProductInfo()
})

const isMobileDevice = useMediaQuery('(max-width: 75rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (!isMobileDevice.value) {
    modelValue.value = false
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  :global(.order-dialog-container) {
    @apply fixed left-0 right-0 bottom-0 mb-0 h-80% flex flex-col;
  }

  :global(.order-dialog-container .el-dialog__body) {
    @apply h-full overflow-y-auto;
  }
}
</style>
