<template>
  <div class="product-price-group-root-container">
    <div flex flex-row items-center>
      <span flex-shrink-0>规格名称：{{ modelGroup.label }}</span>
      <div flex-1></div>
      <el-input-number
        v-if="modelGroup.children.length > 1"
        v-model="newPrice"
        :placeholder="pricesRange"
        @keyup.enter="setPrice"
        :min="0"
        :controls="false"
        :precision="2"
      >
        <template #prefix>
          <span>￥</span>
        </template>
      </el-input-number>
      <el-button ml-4 v-if="modelGroup.children.length > 1" type="primary" @click="setPrice"
        >设置全部</el-button
      >
      <el-button v-if="modelGroup.children.length > 1" type="danger" @click="clearPrices"
        >清除全部</el-button
      >
      <el-input-number
        v-else
        v-model="modelGroup.children[0].price"
        :placeholder="defaultPrice.toFixed(2)"
        @change="updateItemPrice(modelGroup.children[0])"
        :min="0"
        :controls="false"
        :precision="2"
      >
        <template #prefix>
          <span>￥</span>
        </template>
      </el-input-number>
    </div>
    <div flex flex-col gap-4 v-if="modelGroup.children.length > 1">
      <div
        flex
        flex-row
        justify-between
        items-center
        gap-4
        v-for="item in modelGroup.children"
        :key="item.specs.map((spec) => spec.label).join(' / ')"
      >
        <span flex-shrink-0>{{ item.specs.map((spec) => spec.label).join(' / ') }}</span>
        <div flex-1></div>
        <el-input-number
          v-model="item.price"
          :placeholder="defaultPrice.toFixed(2)"
          @change="updateItemPrice(item)"
          :min="0"
          :controls="false"
          :precision="2"
        >
          <template #prefix>
            <span>￥</span>
          </template>
        </el-input-number>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProductSpecsPrice, IProductSpecsPriceFrontendGroup } from '@/types/product'
import { updatePriceInfoPrices } from './usePriceGroup'

interface IItem {
  price?: number
  specs: { groupId: string; specId: string; label: string }[]
}

const { prices, defaultPrice } = defineProps<{
  prices: IProductSpecsPrice[]
  defaultPrice: number
}>()

const modelGroup = defineModel<IProductSpecsPriceFrontendGroup>('group', {
  default: {
    groupId: '',
    label: '',
    priceRange: '',
    children: []
  }
})

const pricesRange = computed(() => {
  const totalChildren = modelGroup.value.children.length
  const prices = modelGroup.value.children
    .map((item) => item.price)
    .filter((price): price is number => price !== undefined)

  if (prices.length < totalChildren) {
    prices.push(defaultPrice)
  }

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  return minPrice === maxPrice
    ? minPrice.toFixed(2)
    : `${minPrice.toFixed(2)}-${maxPrice.toFixed(2)}`
})

const newPrice = ref<number>()
const setPrice = () => {
  modelGroup.value.children.forEach((item) => {
    item.price = newPrice.value
    updatePriceInfoPrices(prices, modelGroup.value, item)
  })
  newPrice.value = undefined
}

const clearPrices = () => {
  modelGroup.value.children.forEach((item) => {
    item.price = undefined
    updatePriceInfoPrices(prices, modelGroup.value, item)
  })
}

const updateItemPrice = (item: IItem) => {
  updatePriceInfoPrices(prices, modelGroup.value, item)
}
</script>

<style lang="scss" scoped>
.product-price-group-root-container {
  @apply flex flex-col p-5 gap-4 max-w-200 rounded border border-dashed border-[var(--border-color)];
}
</style>
