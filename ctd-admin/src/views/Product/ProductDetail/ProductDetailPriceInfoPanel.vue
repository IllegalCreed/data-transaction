<template>
  <div class="product-detail-price-root-container">
    <span class="panel-title">产品价格定义</span>
    <div flex flex-row items-start gap-1 v-if="!version" v-loading="loading">
      <span text-sm>暂无，请先</span>
      <el-link type="primary" @click="approval">去审核</el-link>
    </div>
    <div v-else class="props-container" v-loading="loading || getPriceLoading">
      <div class="prop">
        <span class="label">默认价格：</span>
        <span class="value">{{ priceInfo.defaultPrice }}</span>
      </div>
      <div class="prop">
        <span class="label">产品规格：</span>
        <div flex flex-col gap-4>
          <div class="spec-group-container" v-for="item in priceInfo.specs" :key="item.id">
            <div grid grid-cols-2 gap-4>
              <span class="value" font-bold>{{ item.label }}</span>
              <el-tag class="value" :type="item.affectsPrice ? 'success' : 'danger'">{{
                item.affectsPrice ? '价格相关' : '价格无关'
              }}</el-tag>
            </div>
            <span text-sm>{{ item.children.map((item) => item.label).join(` / `) }}</span>
          </div>
        </div>
      </div>
      <div class="prop" grid-row-span-2>
        <span class="label">产品价格：</span>
        <div flex flex-col gap-4>
          <div class="spec-group-container" v-for="item in priceList" :key="item.specs.join">
            <div grid grid-cols-2 gap-4>
              <span class="value" font-bold>{{ item.specs.join(` / `) }}</span>
              <span class="value">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { productId, version } = defineProps<{
  productId: number | string
  version: number | string | undefined
  loading: boolean
}>()

watch(
  () => version,
  () => {
    if (version) {
      executeGetPriceDefinitionAction()
    }
  }
)

import { useProductStore } from '@/stores/modules/product'
import { usePriceList } from './usePriceList'
const { getPriceDefinition: getPriceDefinitionAction } = useProductStore()
const {
  state: priceInfo,
  isLoading: getPriceLoading,
  execute: executeGetPriceDefinitionAction
} = useAsyncState(
  () =>
    version
      ? getPriceDefinitionAction(productId, version)
      : Promise.reject(new Error('暂无版本信息')),
  {
    defaultPrice: 0,
    mainSpecGroupId: '',
    specs: [],
    prices: []
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    }
  }
)

const { priceList } = usePriceList(priceInfo)

const router = useRouter()
const approval = () => {
  router.push({
    name: 'product-approval',
    params: {
      id: productId
    }
  })
}
</script>

<style scoped lang="scss">
.product-detail-price-root-container {
  @apply flex flex-col gap-4;

  .props-container {
    @apply grid grid-flow-col gap-4 items-start;
  }

  .spec-group-container {
    @apply flex flex-col gap-2 pb-4;

    &:not(:last-child) {
      @apply border-b border-b-dashed border-[var(--border-color)];
    }
  }
}
</style>
