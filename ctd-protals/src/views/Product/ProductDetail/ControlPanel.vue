<template>
  <el-card class="control-panel-root-container" body-class="control-panel-body-container">
    <span text-2xl font-bold>{{ productName }}</span>
    <span text-sm mt-2 text-gray-500>{{ productShotDesc }}</span>

    <label class="text-lg font-bold mt-5">规格</label>

    <!-- 规格选择 -->
    <div mt-4>
      <div flex flex-row items-start space-x-4 mb-2 v-for="(group, groupIndex) in specGroups" :key="groupIndex">
        <label mt-3.5 text-sm min-w-18>{{ group.name }}</label>
        <div flex flex-row items-center flex-wrap>
          <div v-for="(spec, specIndex) in group.specs" :key="specIndex"
            :class="['custom-radio-button', { 'selected': selectedSpecs[groupIndex] === spec }]"
            @click="selectSpec(groupIndex, spec)">
            {{ spec }}
          </div>
        </div>
      </div>
    </div>

    <!-- 实际价格 -->
    <div mt-4 h-10>
      <span v-if="!isLoading" font-bold text-red-500 text-4xl>￥{{ calculatedPrice }}</span>
      <i-eos-icons:loading v-else></i-eos-icons:loading>
    </div>

    <!-- 按钮 -->
    <div flex flex-row justify-stretch space-x-4 mt-6>
      <el-button flex-1 type="default" size="large" @click="addToCart">加入购物车</el-button>
      <el-button flex-1 type="primary" size="large" @click="placeOrder">立即下单</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  productId: string;
}>();

const productName = ref('');
const productShotDesc = ref('');
const specGroups = ref<{ name: string; specs: string[] }[]>([]);
const selectedSpecs = ref<string[]>([]);

// 计算价格
const calculatedPrice = ref(0.00); // 假设这是基础价格
const isLoading = ref(false);

// 模拟接口调用获取商品信息
const fetchProductInfo = async () => {
  console.log(`Fetching product info for ID: ${props.productId}`);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟返回的数据
  productName.value = '示例商品';
  productShotDesc.value = '这是一个示例商品的简短描述';

  specGroups.value = [
    {
      name: '数据完整度',
      specs: ['完整', '精简']
    },
    {
      name: '购买方式',
      specs: ['包月', '包年', '永久']
    }
  ];

  // 初始化选中的规格
  selectedSpecs.value = specGroups.value.map(group => group.specs[0]);
};

// 模拟获取价格的接口调用
const fetchPrice = async () => {
  console.log('Fetching new price for specs:', selectedSpecs.value);

  await new Promise(resolve => setTimeout(resolve, 1000));

  calculatedPrice.value = Math.floor(Math.random() * 200) + 100;
  isLoading.value = false;
};

// 防抖处理
const debouncedFetchPrice = useDebounceFn(fetchPrice, 1000);

const selectSpec = (groupIndex: number, spec: string) => {
  selectedSpecs.value[groupIndex] = spec;
  isLoading.value = true;
  debouncedFetchPrice();
}

const addToCart = () => {
  console.log(`将 ${productName.value} 添加到购物车，规格: ${selectedSpecs.value.join(', ')}`);
};

const placeOrder = () => {
  console.log(`下单 ${productName.value}，规格: ${selectedSpecs.value.join(', ')}`);
};

onMounted(async () => {
  await fetchProductInfo();
  fetchPrice();
});
</script>

<style scoped lang="scss">
.control-panel-root-container {
  @apply sticky top-30;
}

.wrap {
  :global(.control-panel-body-container) {
    @apply flex flex-col;
  }
}

.custom-radio-button {
  @apply px-3 py-1 mx-2 my-1 border-2 border-solid border-gray-300 rounded-md cursor-pointer text-gray-700 text-center;
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
