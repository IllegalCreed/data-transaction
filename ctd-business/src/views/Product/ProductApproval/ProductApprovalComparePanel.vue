<template>
  <div class="product-approval-compare-root-container">
    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.version !== targetVersion.version && target }"
          >版本号：</span
        >
        <span class="value">{{ sourceVersion.version }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.version !== targetVersion.version && target">
        <span class="label">版本号：</span>
        <span class="value">{{ targetVersion.version }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.name !== targetVersion.name && target }"
          >产品名称：</span
        >
        <span class="value">{{ sourceVersion.name }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.name !== targetVersion.name && target">
        <span class="label">产品名称：</span>
        <span class="value">{{ targetVersion.name }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.showPrice !== targetVersion.showPrice && target }"
          >展示价格：</span
        >
        <span class="value">{{ sourceVersion.showPrice }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.showPrice !== targetVersion.showPrice && target">
        <span class="label">展示价格：</span>
        <span class="value">{{ targetVersion.showPrice }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.hasCount !== targetVersion.hasCount && target }"
          >数量是否可选：</span
        >
        <span class="value">{{ sourceVersion.hasCount ? '是' : '否' }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.hasCount !== targetVersion.hasCount && target">
        <span class="label">数量是否可选：</span>
        <span class="value">{{ targetVersion.hasCount ? '是' : '否' }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: !isEqual(sourceVersion.tags, targetVersion.tags) && target }"
          >产品标签：</span
        >
        <div flex flex-row flex-wrap gap-2>
          <el-tag v-for="item in sourceVersion.tags" :key="item" type="info">
            {{ item }}
          </el-tag>
        </div>
      </div>
      <div class="prop" v-if="!isEqual(sourceVersion.tags, targetVersion.tags) && target">
        <span class="label">产品标签：</span>
        <div flex flex-row flex-wrap gap-2>
          <el-tag v-for="item in targetVersion.tags" :key="item" type="info">
            {{ item }}
          </el-tag>
        </div>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.description !== targetVersion.description && target }"
          >产品描述：</span
        >
        <span class="value">{{ sourceVersion.description }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.description !== targetVersion.description && target">
        <span class="label">产品描述：</span>
        <span class="value">{{ targetVersion.description }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span class="label" :class="{ change: sourceVersion.form !== targetVersion.form && target }"
          >产品形态：</span
        >
        <span class="value">{{ formLabel(sourceVersion.form) }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.form !== targetVersion.form && target">
        <span class="label">产品形态：</span>
        <span class="value">{{ formLabel(targetVersion.form) }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{
            change: !isEqual(sourceVersion.dataFields, targetVersion.dataFields) && target
          }"
          >涉及领域：</span
        >
        <el-tag v-for="item in sourceVersion.dataFields" :key="item" type="info">
          {{ dataFieldLabel(item) }}
        </el-tag>
      </div>
      <div
        class="prop"
        v-if="!isEqual(sourceVersion.dataFields, targetVersion.dataFields) && target"
      >
        <span class="label">涉及领域：</span>
        <el-tag v-for="item in targetVersion.dataFields" :key="item" type="info">
          {{ dataFieldLabel(item) }}
        </el-tag>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{
            change: !isEqual(sourceVersion.dataSources, targetVersion.dataSources) && target
          }"
          >数据来源：</span
        >
        <el-tag v-for="item in sourceVersion.dataSources" :key="item" type="info">
          {{ dataSourceLabel(item) }}
        </el-tag>
      </div>
      <div
        class="prop"
        v-if="!isEqual(sourceVersion.dataSources, targetVersion.dataSources) && target"
      >
        <span class="label">数据来源：</span>
        <el-tag v-for="item in targetVersion.dataSources" :key="item" type="info">
          {{ dataSourceLabel(item) }}
        </el-tag>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{
            change: !isEqual(sourceVersion.regions, targetVersion.regions) && target
          }"
          >区域：</span
        >
        <el-tag v-for="item in sourceVersion.regions" :key="item" type="info">
          {{ regionLabel(item) }}
        </el-tag>
      </div>
      <div class="prop" v-if="!isEqual(sourceVersion.regions, targetVersion.regions) && target">
        <span class="label">区域：</span>
        <el-tag v-for="item in targetVersion.regions" :key="item" type="info">
          {{ regionLabel(item) }}
        </el-tag>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{
            change: !isEqual(sourceVersion.times, targetVersion.times) && target
          }"
          >时间：</span
        >
        <el-tag v-for="item in sourceVersion.times" :key="item" type="info">
          {{ timeLabel(item) }}
        </el-tag>
      </div>
      <div class="prop" v-if="!isEqual(sourceVersion.times, targetVersion.times) && target">
        <span class="label">时间：</span>
        <el-tag v-for="item in targetVersion.times" :key="item" type="info">
          {{ timeLabel(item) }}
        </el-tag>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.coverImageUrl !== targetVersion.coverImageUrl && target }"
          >产品封面：</span
        >
        <el-image
          class="w-30 h-30"
          :src="sourceVersion.coverImageUrl"
          :preview-src-list="[sourceVersion.coverImageUrl]"
          fit="cover"
        />
      </div>
      <div
        class="prop"
        v-if="sourceVersion.coverImageUrl !== targetVersion.coverImageUrl && target"
      >
        <span class="label">产品封面：</span>
        <el-image
          class="w-30 h-30"
          :src="targetVersion.coverImageUrl"
          :preview-src-list="[targetVersion.coverImageUrl]"
          fit="cover"
        />
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: !isEqual(sourceVersion.imageUrls, targetVersion.imageUrls) && target }"
          >产品图片：</span
        >
        <div flex flex-row flex-wrap gap-4>
          <el-image
            class="w-30 h-30"
            v-for="(item, index) in sourceVersion.imageUrls"
            :key="index"
            :src="item"
            :preview-src-list="sourceVersion.imageUrls"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>
      <div class="prop" v-if="!isEqual(sourceVersion.imageUrls, targetVersion.imageUrls) && target">
        <span class="label">产品图片：</span>
        <div flex flex-row flex-wrap gap-4>
          <el-image
            class="w-30 h-30"
            v-for="(item, index) in targetVersion.imageUrls"
            :key="index"
            :src="item"
            :preview-src-list="targetVersion.imageUrls"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.detail !== targetVersion.detail && target }"
          >产品详情：</span
        >
        <div class="value" v-html="sourceVersion.detail"></div>
      </div>
      <div class="prop" v-if="sourceVersion.detail !== targetVersion.detail && target">
        <span class="label">产品详情：</span>
        <div class="value" v-html="targetVersion.detail"></div>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourceVersion.priceType !== targetVersion.priceType && target }"
          >定价方式：</span
        >
        <span class="value">{{ priceTypeLabel(sourceVersion.priceType) }}</span>
      </div>
      <div class="prop" v-if="sourceVersion.priceType !== targetVersion.priceType && target">
        <span class="label">定价方式：</span>
        <span class="value">{{ priceTypeLabel(targetVersion.priceType) }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: sourcePrice.defaultPrice !== targetPrice.defaultPrice && target }"
          >默认价格：</span
        >
        <span class="value">{{ sourcePrice.defaultPrice }}</span>
      </div>
      <div class="prop" v-if="sourcePrice.defaultPrice !== targetPrice.defaultPrice && target">
        <span class="label">默认价格：</span>
        <span class="value">{{ targetPrice.defaultPrice }}</span>
      </div>
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: !isEqual(sourcePrice.specs, targetPrice.specs) && target }"
          >产品规格：</span
        >
        <div flex flex-col gap-4>
          <div class="spec-group-container" v-for="item in sourcePrice.specs" :key="item.id">
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
      <div class="prop" v-if="!isEqual(sourcePrice.specs, targetPrice.specs) && target">
        <span class="label">产品规格：</span>
        <div flex flex-col gap-4>
          <div class="spec-group-container" v-for="item in targetPrice.specs" :key="item.id">
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
    </div>

    <div class="prop-row">
      <div class="prop">
        <span
          class="label"
          :class="{ change: !isEqual(sourcePriceList, targetPriceList) && target }"
          >产品价格：</span
        >
        <div flex flex-col gap-4>
          <div class="spec-group-container" v-for="item in sourcePriceList" :key="item.specs.join">
            <div grid grid-cols-2 gap-4>
              <span class="value" font-bold>{{ item.specs.join(` / `) }}</span>
              <span class="value">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="prop" v-if="!isEqual(sourcePriceList, targetPriceList) && target">
        <span class="label">产品价格：</span>
        <div flex flex-col gap-4>
          <div class="spec-group-container" v-for="item in targetPriceList" :key="item.specs.join">
            <div grid grid-cols-2 gap-4>
              <span class="value" font-bold>{{ item.specs.join(` / `) }}</span>
              <span class="value">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 左侧加载覆盖层 -->
    <div
      class="loading-overlay left-overlay"
      v-if="getSourceVersionLoading || getSourcePriceLoading"
    >
      <i-line-md:loading-loop class="loading-icon" />
    </div>

    <!-- 右侧加载覆盖层 -->
    <div
      class="loading-overlay right-overlay"
      v-if="getTargetVersionLoading || getTargetPriceLoading"
    >
      <i-line-md:loading-loop class="loading-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEqual } from 'lodash-es'
const { productId, source, target } = defineProps<{
  productId: number | string
  source: number | string
  target: number | string | undefined
}>()

import {
  PRODUCT_DATA_FIELD_MAP,
  PRODUCT_DATA_SOURCE_MAP,
  PRODUCT_FORM_MAP,
  REGION_MAP,
  TIME_MAP,
  PRODUCT_PRICT_TYPES_MAP,
  ProductDataField,
  ProductDataSource,
  ProductForm,
  ProductPriceTypes,
  Region,
  Time
} from '@/constants/mapData/product'
import { useProductStore } from '@/stores/modules/product'
import { usePriceList } from '../ProductDetail/usePriceList'
const { getVersion: getVersionAction, getPriceDefinition: getPriceDefinitionAction } =
  useProductStore()
const defalutVersion = {
  version: 0,
  name: '',
  description: '',
  showPrice: 0,
  hasCount: false,
  tags: [],
  coverImageUrl: '',
  imageUrls: [],
  detail: '',
  form: ProductForm.Other,
  dataFields: [],
  dataSources: [],
  regions: [],
  times: [],
  priceType: ProductPriceTypes.Specs,
  createTime: ''
}
const {
  state: sourceVersion,
  isLoading: getSourceVersionLoading,
  execute: executeGetSourceVersionAction
} = useAsyncState(() => getVersionAction(productId, source), defalutVersion, {
  immediate: false,
  onError: (e) => {
    const error = e as Error
    ElMessage.error(error.message)
  }
})
const {
  state: targetVersion,
  isLoading: getTargetVersionLoading,
  execute: executeGetTargetVersionAction
} = useAsyncState(
  () => (target ? getVersionAction(productId, target) : Promise.reject()),
  defalutVersion,
  {
    immediate: false,
    onError: (e) => {
      if (e) {
        const error = e as Error
        ElMessage.error(error.message)
      }
    }
  }
)
const defaultPrice = {
  defaultPrice: 0,
  mainSpecGroupId: '',
  specs: [],
  prices: []
}
const {
  state: sourcePrice,
  isLoading: getSourcePriceLoading,
  execute: executeGetSourcePriceDefinitionAction
} = useAsyncState(() => getPriceDefinitionAction(productId, source), defaultPrice, {
  immediate: false,
  onError: (e) => {
    const error = e as Error
    ElMessage.error(error.message)
  }
})
const {
  state: targetPrice,
  isLoading: getTargetPriceLoading,
  execute: executeGetTargetPriceDefinitionAction
} = useAsyncState(
  () => (target ? getPriceDefinitionAction(productId, target) : Promise.reject()),
  defaultPrice,
  {
    immediate: false,
    onError: (e) => {
      if (e) {
        const error = e as Error
        ElMessage.error(error.message)
      }
    }
  }
)
const { priceList: sourcePriceList } = usePriceList(sourcePrice)
const { priceList: targetPriceList } = usePriceList(targetPrice)

watch(
  () => target,
  () => {
    executeGetTargetVersionAction()
    executeGetTargetPriceDefinitionAction()
  }
)

onMounted(() => {
  executeGetSourceVersionAction()
  executeGetTargetVersionAction()
  executeGetSourcePriceDefinitionAction()
  executeGetTargetPriceDefinitionAction()
})

const formLabel = (form: ProductForm) => PRODUCT_FORM_MAP[form]
const dataFieldLabel = (dataField: ProductDataField) => PRODUCT_DATA_FIELD_MAP[dataField]
const dataSourceLabel = (dataSource: ProductDataSource) => PRODUCT_DATA_SOURCE_MAP[dataSource]
const regionLabel = (region: Region) => REGION_MAP[region]
const timeLabel = (time: Time) => TIME_MAP[time]
const priceTypeLabel = (priceType: ProductPriceTypes) => PRODUCT_PRICT_TYPES_MAP[priceType]
</script>

<style scoped lang="scss">
.product-approval-compare-root-container {
  @apply relative flex flex-col;

  .prop-row {
    @apply py-8 grid grid-cols-2 gap-4 border-b border-b-dashed border-[var(--border-color)];
  }

  .spec-group-container {
    @apply flex flex-col gap-2 pb-4;

    &:not(:last-child) {
      @apply border-b border-b-dashed border-[var(--border-color)];
    }
  }

  .change {
    @apply text-[var(--text-btn-primary-color)];
  }

  .loading-icon {
    @apply w-10 h-10 color-[var(--text-btn-primary-color)];
  }

  .loading-overlay {
    @apply absolute top-0 bottom-0 w-1/2 bg-[var(--mask-color)] flex justify-center items-center z-10;
  }

  .left-overlay {
    @apply left-0;
  }

  .right-overlay {
    @apply right-0;
  }
}
</style>
