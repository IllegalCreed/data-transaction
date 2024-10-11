<template>
  <el-dialog class="order-dialog-container" v-model="modelValue" width="100%" title="立即下单">
    <div class="order-content-root-container">
      <span class="title">{{ baseInfo.title }}</span>
      <span class="desc">{{ baseInfo.description }}</span>

      <div class="spec-groups-container">
        <div class="spec-group" v-for="group in baseInfo.specGroups" :key="group.key">
          <label class="spec-group-label">{{ group.label }}</label>
          <div class="spec-props-container">
            <div
              v-for="prop in group.specs"
              :key="prop.key"
              :class="['custom-radio-button', { selected: selectedSpecs[group.key] === prop.key }]"
              @click="selectSpec(group.key, prop.key)"
            >
              {{ prop.label }}
            </div>
          </div>
        </div>
      </div>

      <span class="number-label">数量</span>
      <number-input mt-2 v-model="count" :min="1" v-if="baseInfo.hasCount"></number-input>

      <div class="bottom-container">
        <span v-if="!getPriceActionLoading" class="price">￥{{ price }}</span>
        <i-eos-icons:loading self-end text-3xl mr-8 v-else></i-eos-icons:loading>
        <el-button class="action-button" type="primary" size="large" @click="placeOrder"
          >立即下单</el-button
        >
      </div>
    </div>
  </el-dialog>
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
}>()

const modelValue = defineModel<boolean>({ required: true })

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

const placeOrder = () => {}

const isMobileDevice = useMediaQuery('(max-width: 65rem)')

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

.order-content-root-container {
  @apply flex flex-col justify-start min-h-full pb-20;

  .title {
    @apply text-2xl font-bold;
  }

  .desc {
    @apply text-sm mt-4 text-[var(--color-text-light)] text-base leading-relaxed line-clamp-2;
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

  .bottom-container {
    @apply fixed bottom-0 left-0 right-0 p-5 flex flex-row justify-end items-center mt-10 bg-[var(--color-background-alternating)];

    .price {
      @apply font-bold text-[var(--color-price)] text-3xl select-none;
    }

    .action-button {
      @apply self-center w-60 ml-10;
    }
  }
}

.custom-radio-button {
  @apply px-4 py-1 border-2 border-solid border-[var(--color-border)] rounded-md cursor-pointer text-center hover:opacity-60;
}

.custom-radio-button.selected {
  @apply border-[var(--color-primary)] text-[var(--color-primary)];
}
</style>
