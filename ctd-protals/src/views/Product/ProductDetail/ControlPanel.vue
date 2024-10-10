<template>
  <div class="control-panel-root-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div flex flex-col gap-6 mt-2>
          <el-skeleton-item variant="p" class="!w-50"></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-30"></el-skeleton-item>
          <div flex flex-row gap-4>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
          </div>
          <el-skeleton-item variant="p" mt-5></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-50"></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-30" mt-10></el-skeleton-item>
          <div flex flex-row gap-4>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
          </div>
          <el-skeleton-item variant="p" class="!w-30" mt-4></el-skeleton-item>
          <div flex flex-row gap-4>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-10"></el-skeleton-item>
          </div>

          <el-skeleton-item variant="p" class="!w-40" mt-8 self-end></el-skeleton-item>

          <div flex flex-row gap-4 mt-4>
            <el-skeleton-item variant="rect" class="!h-10" flex-1></el-skeleton-item>
            <el-skeleton-item variant="rect" class="!h-10" flex-1></el-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <span class="title">{{ baseInfo.title }}</span>
        <span class="sold-count">已售 {{ baseInfo.soldCount }}</span>
        <div class="tag-container">
          <el-tag v-for="(tag, index) in baseInfo.tags" :key="index" type="primary" size="default">
            {{ tag }}
          </el-tag>
        </div>
        <span class="desc">{{ baseInfo.description }}</span>

        <div class="spec-groups-container">
          <div class="spec-group" v-for="group in baseInfo.specGroups" :key="group.key">
            <label class="spec-group-label">{{ group.label }}</label>
            <div class="spec-props-container">
              <div
                v-for="prop in group.specs"
                :key="prop.key"
                :class="[
                  'custom-radio-button',
                  { selected: selectedSpecs[group.key] === prop.key }
                ]"
                @click="selectSpec(group.key, prop.key)"
              >
                {{ prop.label }}
              </div>
            </div>
          </div>
        </div>

        <div flex flex-row justify-between mt-10>
          <number-input v-model="count" :min="1" v-if="baseInfo.hasCount"></number-input>
          <span v-if="!getPriceActionLoading" class="price">￥{{ price }}</span>
          <i-eos-icons:loading self-end text-3xl mr-8 v-else></i-eos-icons:loading>
        </div>

        <div class="actions-container">
          <el-button flex-1 type="default" size="large" @click="addToFav">收藏产品</el-button>
          <el-button flex-1 type="primary" size="large" @click="placeOrder">立即下单</el-button>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import NumberInput from '@/components/NumberInput.vue'
import type { IProductBaseInfo } from '@/types/product'
import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const { getPrice: getPriceAction } = productStore

const { baseInfo } = defineProps<{
  productId: string
  baseInfo: IProductBaseInfo
  loading: boolean
}>()

const count = ref(1)
const price = computed(() => {
  if (priceRaw.value) {
    return priceRaw.value * count.value
  } else {
    return 0
  }
})

const selectedSpecs = ref<Record<string, string>>({})
watch(
  () => baseInfo,
  (newValue: IProductBaseInfo) => {
    selectedSpecs.value = newValue.specGroups.reduce(
      (acc, group) => {
        acc[group.key] = group.specs[0].key
        return acc
      },
      {} as Record<string, string>
    )
  }
)

const {
  state: priceRaw,
  isLoading: getPriceActionLoading,
  execute: executeGetPriceActionRaw
} = useAsyncState(() => getPriceAction(selectedSpecs.value), undefined)
const executeGetPriceAction = useDebounceFn(executeGetPriceActionRaw, 1000)

watch(
  () => selectedSpecs.value,
  () => {
    getPriceActionLoading.value = true
    executeGetPriceAction()
  },
  {
    deep: true
  }
)

const selectSpec = (groupKey: string, propKey: string) => {
  selectedSpecs.value[groupKey] = propKey
}

const addToFav = () => {}

const placeOrder = () => {}
</script>

<style scoped lang="scss">
.control-panel-root-container {
  @apply sticky top-30 w-100 flex flex-col gap-2 p-8 rounded shadow bg-[var(--color-background-alternating)];

  .title {
    @apply text-2xl font-bold;
  }

  .sold-count {
    @apply text-base text-[var(--color-text-lighter)];
  }

  .tag-container {
    @apply flex flex-row flex-wrap gap-2 mt-2;
  }

  .desc {
    @apply mt-6 text-[var(--color-text-light)] text-base leading-loose;
  }

  .spec-groups-container {
    @apply mt-10;

    .spec-group {
      @apply flex flex-col mb-4;

      .spec-group-label {
        @apply text-lg;
      }

      .spec-props-container {
        @apply flex flex-row items-center flex-wrap gap-2 my-2;
      }
    }
  }

  .number-label {
    @apply text-lg;
  }

  .price {
    @apply self-end font-bold text-[var(--color-price)] text-3xl select-none;
  }

  .actions-container {
    @apply flex flex-row justify-stretch gap-4 mt-4;
  }
}

.custom-radio-button {
  @apply px-4 py-1 border-2 border-solid border-[var(--color-border)] rounded-md cursor-pointer text-center hover:opacity-60;
}

.custom-radio-button.selected {
  @apply border-[var(--color-primary)] text-[var(--color-primary)];
}
</style>
