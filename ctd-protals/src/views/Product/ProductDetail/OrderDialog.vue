<template>
  <el-dialog
    class="order-dialog-container"
    v-model="modelValue"
    width="100%"
    :lock-scroll="true"
    title="立即下单"
  >
    <div flex flex-col justify-start min-h-full>
      <span text-2xl font-bold>{{ productName }}</span>

      <div mt-4>
        <div
          flex
          flex-col
          items-start
          mb-4
          v-for="(group, groupIndex) in specGroups"
          :key="groupIndex"
        >
          <label text-base>{{ group.name }}</label>
          <div flex flex-row items-center flex-wrap gap-2 mt-2>
            <div
              v-for="(spec, specIndex) in group.specs"
              :key="specIndex"
              :class="['custom-radio-button', { selected: selectedSpecs[groupIndex] === spec }]"
              @click="selectSpec(groupIndex, spec)"
            >
              {{ spec }}
            </div>
          </div>
        </div>
      </div>

      <div flex-1></div>

      <div mt-4 h-10>
        <span v-if="!isLoading" font-bold text-red-500 text-4xl>￥{{ calculatedPrice }}</span>
        <i-eos-icons:loading v-else></i-eos-icons:loading>
      </div>

      <el-button mt-4 type="primary" size="large" @click="placeOrder">立即下单</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  productId: string
}>()
const modelValue = defineModel<boolean>({ required: true })

const productName = ref('')
const productShotDesc = ref('')
const productSelledCount = ref(0)
const productTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const specGroups = ref<{ name: string; specs: string[] }[]>([])
const selectedSpecs = ref<string[]>([])

// 计算价格
const calculatedPrice = ref(0.0) // 假设这是基础价格
const isLoading = ref(false)

// 模拟接口调用获取商品信息
const fetchProductInfo = async () => {
  console.log(`Fetching product info for ID: ${props.productId}`)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模拟返回的数据
  productName.value = '示例商品'
  productShotDesc.value = '这是一个示例商品的简短描述'
  productSelledCount.value = 100
  productTags.value = ['Tag 1', 'Tag 2', 'Tag 3']

  specGroups.value = [
    {
      name: '数据完整度',
      specs: ['完整', '精简']
    },
    {
      name: '购买方式',
      specs: ['包月', '包年', '永久']
    }
  ]

  // 初始化选中的规格
  selectedSpecs.value = specGroups.value.map((group) => group.specs[0])
}

// 模拟获取价格的接口调用
const fetchPrice = async () => {
  console.log('Fetching new price for specs:', selectedSpecs.value)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  calculatedPrice.value = Math.floor(Math.random() * 200) + 100
  isLoading.value = false
}

// 防抖处理
const debouncedFetchPrice = useDebounceFn(fetchPrice, 1000)

const selectSpec = (groupIndex: number, spec: string) => {
  selectedSpecs.value[groupIndex] = spec
  isLoading.value = true
  debouncedFetchPrice()
}

const placeOrder = () => {
  console.log(`下单 ${productName.value}，规格: ${selectedSpecs.value.join(', ')}`)
}

onMounted(async () => {
  await fetchProductInfo()
  fetchPrice()
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
:global(.order-dialog-container) {
  @apply fixed left-0 right-0 bottom-0 mb-0 h-80% flex flex-col;
}

:global(.order-dialog-container .el-dialog__body) {
  @apply h-full overflow-y-auto;
}

.custom-radio-button {
  @apply px-3 py-1 border-2 border-solid border-gray-300 rounded-md cursor-pointer text-gray-700 text-center;
}

.custom-radio-button:hover {
  @apply border-gray-500;
}

.custom-radio-button.selected {
  @apply border-blue-500 text-blue-500 font-bold;
}

.actions {
  @apply mt-6 flex;
}

.actions .el-button {
  @apply flex-1;
}

.loading-spinner {
  @apply text-xl text-red-500;
}
</style>
