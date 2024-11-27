<template>
  <div class="product-edit-root-container">
    <span class="panel-title">{{ id === '-1' ? '新建产品' : '编辑产品' }}</span>
    <el-form
      @submit.prevent
      :model="versionInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="产品名称" prop="name" max-w-120>
        <el-input v-model="versionInfo.name" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item label="产品描述" prop="description" max-w-120>
        <el-input
          v-model="versionInfo.description"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="展示价格" prop="showPrice" max-w-120>
        <el-input-number v-model="versionInfo.showPrice" :min="0" :controls="false" :precision="2">
          <template #prefix>
            <span>￥</span>
          </template>
        </el-input-number>
      </el-form-item>
      <el-form-item label="数量是否可选" prop="hasCount">
        <el-switch v-model="versionInfo.hasCount" />
      </el-form-item>
      <el-form-item label="标签" prop="tags" max-w-120>
        <product-tag-panel v-model:tags="versionInfo.tags" :max-tags="5"></product-tag-panel>
      </el-form-item>
      <el-form-item label="产品形态" prop="form" max-w-120>
        <el-select v-model="versionInfo.form" placeholder="请选择">
          <el-option
            v-for="item in productFormOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="涉及领域：" prop="dataFields" max-w-120>
        <el-select
          v-model="versionInfo.dataFields"
          placeholder="请选择"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="5"
        >
          <el-option
            v-for="item in productDataFieldOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据来源：" prop="dataSources" max-w-120>
        <el-select
          v-model="versionInfo.dataSources"
          placeholder="请选择"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="3"
        >
          <el-option
            v-for="item in productDataSourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域：" prop="regions" max-w-120>
        <el-select
          v-model="versionInfo.regions"
          placeholder="请选择"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="4"
        >
          <el-option
            v-for="item in regionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间：" prop="times" max-w-120>
        <el-select
          v-model="versionInfo.times"
          placeholder="请选择"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="5"
        >
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="coverImageUrl">
        <image-picker v-model="coverImage" />
      </el-form-item>
      <el-form-item label="图片集" prop="imageUrls">
        <image-array-picker v-model="imageList" />
      </el-form-item>
      <el-form-item label="产品详情" prop="detail">
        <product-rich-edit-panel v-model:content="versionInfo.detail" />
      </el-form-item>
      <el-form-item label="定价方式" prop="priceType" max-w-120>
        <el-select v-model="versionInfo.priceType" placeholder="请选择">
          <el-option
            v-for="item in productPriceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-divider />
      <product-spec-panel
        v-model:specs="priceInfo.specs"
        v-model:main-spec-group-id="priceInfo.mainSpecGroupId"
      />
      <el-form-item label="默认价格" prop="defaultPrice" max-w-120>
        <el-input-number v-model="priceInfo.defaultPrice" :min="0" :controls="false" :precision="2">
          <template #prefix>
            <span>￥</span>
          </template>
        </el-input-number>
      </el-form-item>
      <el-form-item
        v-if="mainSpecGroupOptions.length > 0"
        label="主规格"
        prop="mainSpecGroupId"
        max-w-120
      >
        <el-select v-model="priceInfo.mainSpecGroupId" placeholder="请选择">
          <el-option
            v-for="item in mainSpecGroupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div flex flex-col gap-4 mb-5 v-if="priceInfo.mainSpecGroupId">
        <span text-sm>价格列表</span>
        <product-price-group
          v-for="(item, index) in priceList"
          :key="item.specId"
          :prices="priceInfo.prices"
          :defaultPrice="priceInfo.defaultPrice"
          v-model:group="priceList[index]"
        />
      </div>
    </el-form>
    <div>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button class="default-btn" @click="submit">提交审核</el-button>
    </div>
    <pre
      >{{ JSON.stringify(priceInfo.specs, null, 2) }}
    </pre>
    <pre
      >{{ JSON.stringify(priceInfo.prices, null, 2) }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import ProductTagPanel from './ProductTagPanel.vue'
import ProductRichEditPanel from './ProductRichEditPanel.vue'
import ImagePicker from '@/components/ImagePicker.vue'
import ImageArrayPicker from '@/components/ImageArrayPicker.vue'
import ProductSpecPanel from './ProductSpecPanel.vue'
import ProductPriceGroup from './ProductPriceGroup.vue'
import { v4 as uuidv4 } from 'uuid'
import { type FormInstance, type FormRules } from 'element-plus'
import type { IProductSpecsPriceDefinition, IProductVersion } from '@/types/product'
import { ProductForm, ProductPriceTypes } from '@/constants/mapData/product'

const id = useRouteParams<string>('id')

const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<IProductVersion & IProductSpecsPriceDefinition>>({
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入产品描述', trigger: 'blur' }],
  showPrice: [{ required: true, message: '请输入展示价格', trigger: 'blur' }]
})

const save = async () => {
  await uploadImage()
  await setVersionAction(id.value, versionInfo)
  await setPriceDefinitionAction(id.value, priceInfo)
}

const submit = async () => {
  if (await form.value?.validate()) {
    await uploadImage()
    await setVersionAction(id.value, versionInfo)
    await setPriceDefinitionAction(id.value, priceInfo)
  }
}

import { useProductStore } from '@/stores/modules/product'
const {
  getVersion: getVersionAction,
  getPriceDefinition: getPriceDefinitionAction,
  setVersion: setVersionAction,
  setPriceDefinition: setPriceDefinitionAction
} = useProductStore()
const versionInfo = reactive<IProductVersion>({
  version: 0,
  name: '',
  description: '',
  showPrice: 0,
  hasCount: false,
  tags: [],
  coverImageUrl: '',
  imageUrls: [],
  detail: '',
  form: ProductForm.Package,
  dataFields: [],
  dataSources: [],
  regions: [],
  times: [],
  priceType: ProductPriceTypes.Specs,
  createTime: ''
})
const priceInfo = reactive<IProductSpecsPriceDefinition>({
  defaultPrice: 0,
  mainSpecGroupId: '',
  specs: [],
  prices: []
})

onMounted(async () => {
  if (id.value !== '-1') {
    const fetchedVersionData = await getVersionAction(id.value, 0)
    Object.assign(versionInfo, fetchedVersionData)
    if (versionInfo.coverImageUrl) {
      coverImage.value = {
        id: uuidv4(),
        url: versionInfo.coverImageUrl,
        name: versionInfo.coverImageUrl,
        raw: undefined
      }
    }
    imageList.value = versionInfo.imageUrls.map((url) => {
      return {
        id: uuidv4(),
        url,
        name: url,
        raw: undefined
      }
    })
    const fetchedPriceData = await getPriceDefinitionAction(id.value, 0)
    Object.assign(priceInfo, fetchedPriceData)
  }
})

// 选项相关
import {
  productPriceTypeOptions,
  productFormOptions,
  productDataFieldOptions,
  productDataSourceOptions,
  regionOptions,
  timeOptions
} from '@/constants/mapData/product'
import type { IUploadFile } from '@/types/common'

// 图片相关
const coverImage = ref<IUploadFile>()
const imageList = ref<IUploadFile[]>([])

import { useFileStore } from '@/stores/modules/file'
const { uploadFile: uploadFileAction } = useFileStore()
const uploadImage = async () => {
  if (coverImage.value) {
    if (coverImage.value.raw) {
      const url = await uploadFileAction(coverImage.value.raw)
      coverImage.value.url = url
      coverImage.value.name = url
      coverImage.value.raw = undefined
      versionInfo.coverImageUrl = url
    }
  }
  versionInfo.imageUrls = []
  imageList.value.forEach(async (item) => {
    if (item.raw) {
      const url = await uploadFileAction(item.raw)
      item.url = url
      item.name = url
      item.raw = undefined
      versionInfo.imageUrls.push(url)
    } else {
      versionInfo.imageUrls.push(item.url)
    }
  })
}

// 价格相关
import { usePriceGroup } from './usePriceGroup'
const { priceList, mainSpecGroupOptions } = usePriceGroup(priceInfo)
</script>

<style scoped lang="scss">
.product-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
