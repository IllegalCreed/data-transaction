<template>
  <div class="product-edit-root-container">
    <span class="panel-title">{{ id === '-1' ? '新建产品' : '编辑产品' }}</span>
    <el-form
      @submit.prevent
      :model="data"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { IProductVersion } from '@/types/product'
import { ProductForm, ProductPriceTypes } from '@/constants/mapData/product'

const id = useRouteParams<string | number>('id')

const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<IProductVersion>>({
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }]
})

const data = reactive<IProductVersion>({
  version: 0,
  name: '',
  description: '',
  showPrice: 0,
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
})
</script>

<style scoped lang="scss">
.product-edit-root-container {
  @apply flex-1 flex flex-col p-4 bg-[var(--background-page-color)];
}
</style>
