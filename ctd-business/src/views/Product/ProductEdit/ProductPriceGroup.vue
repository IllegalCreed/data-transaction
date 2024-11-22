<template>
  <div class="product-price-group-root-container">
    <div flex flex-row items-center gap-4>
      <span min-w-80>规格名称：{{ modelGroup.label }}</span>
      <el-input :placeholder="pricesRange" v-model="newPrice" @keyup.enter="setPrice" />
      <el-button type="danger" @click="clearPrices">清除价格</el-button>
    </div>
    <div flex flex-col gap-4>
      <div flex flex-row justify-between items-center gap-4 v-for="item in modelGroup.children">
        <span flex-shrink-0>{{ item.specs.map((spec) => spec.label).join(' / ') }}</span>
        <div flex-1></div>
        <el-input
          class="max-w-50"
          :placeholder="defaultPrice.toFixed(2)"
          v-model="item.price"
          @input="updateItemPrice(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProductSpecsPrice, IProductSpecsPriceGroup } from '@/types/product'

interface IItem {
  price?: number
  specs: { groupId: string; specId: string; label: string }[]
}

const { prices } = defineProps<{
  prices: IProductSpecsPrice[]
  defaultPrice: number
}>()

const modelGroup = defineModel<IProductSpecsPriceGroup>('group', {
  default: {
    groupId: '',
    label: '',
    priceRange: '',
    children: []
  }
})

const pricesRange = computed(() => {
  const prices = modelGroup.value.children
    .map((item) => item.price)
    .filter((price): price is number => price !== undefined && price !== null)

  if (prices.length === 0) {
    return '0'
  }

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  return minPrice === maxPrice ? `${minPrice}` : `${minPrice}-${maxPrice}`
})

const newPrice = ref<number>()
const setPrice = () => {
  modelGroup.value.children.forEach((item) => {
    item.price = newPrice.value
  })
  newPrice.value = undefined
}

const clearPrices = () => {
  modelGroup.value.children.forEach((item) => {
    item.price = undefined
  })
}

const updateItemPrice = (item: IItem) => {
  updatePriceInfoPrices(item)
}

const updatePriceInfoPrices = (item: IItem) => {
  // 构建完整的规格列表，包括主规格
  const fullSpecs = [
    {
      groupId: modelGroup.value.groupId, // 主规格组ID
      specId: modelGroup.value.specId,
      label: modelGroup.value.label
    },
    ...item.specs
  ]

  // 在 priceInfo.prices 中查找对应的价格项
  const priceEntry = prices.find((entry: IProductSpecsPrice) => {
    return compareSpecs(entry.specs, fullSpecs)
  })

  if (priceEntry) {
    // 更新价格
    if (item.price) {
      priceEntry.price = item.price
    } else {
      // 如果价格为空，则删除价格项
      prices.splice(prices.indexOf(priceEntry), 1)
    }
  } else {
    // 添加新的价格项
    if (item.price) {
      prices.push({
        price: item.price,
        specs: fullSpecs.map(({ groupId, specId }) => ({ groupId, specId }))
      })
    }
  }
}

const compareSpecs = (
  specsA: { groupId: string; specId: string }[],
  specsB: { groupId: string; specId: string; label: string }[]
) => {
  if (specsA.length !== specsB.length) return false
  const sortedA = specsA.slice().sort((a, b) => a.groupId.localeCompare(b.groupId))
  const sortedB = specsB.slice().sort((a, b) => a.groupId.localeCompare(b.groupId))
  return sortedA.every((spec, index) => {
    return spec.groupId === sortedB[index].groupId && spec.specId === sortedB[index].specId
  })
}
</script>

<style lang="scss" scoped>
.product-price-group-root-container {
  @apply flex flex-col p-5 gap-4 max-w-160 rounded border border-dashed border-[var(--border-color)];
}
</style>
