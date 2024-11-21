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
      <el-form-item label="产品名称" prop="name" max-w-120>
        <el-input v-model="data.name" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item label="产品描述" prop="description" max-w-120>
        <el-input
          v-model="data.description"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="展示价格" prop="showPrice" max-w-120>
        <el-input-number v-model="data.showPrice" :min="0" :controls="false" :precision="2">
          <template #prefix>
            <span>￥</span>
          </template>
        </el-input-number>
      </el-form-item>
      <el-form-item label="标签" prop="showPrice" max-w-120>
        <div flex flex-row flex-wrap gap-2>
          <el-tag v-for="tag in data.tags" :key="tag" closable @close="handleTagClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            class="!w-20"
            v-if="tagInputVisible"
            ref="TagInputRef"
            v-model="customTag"
            size="small"
            @keyup.enter="addCustomTag"
            @blur="addCustomTag"
          />
          <el-button
            v-if="!tagInputVisible && !isTagLimitReached"
            type="primary"
            size="small"
            @click="showTagInput"
          >
            + 添加标签
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="产品形态" prop="form" max-w-120>
        <el-select v-model="data.form" placeholder="请选择">
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
          v-model="data.dataFields"
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
          v-model="data.dataSources"
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
          v-model="data.regions"
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
          v-model="data.times"
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
      <el-form-item label="定价方式" prop="priceType" max-w-120>
        <el-select v-model="data.priceType" placeholder="请选择">
          <el-option
            v-for="item in productPriceTypeOptions"
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
    </el-form>
    <el-image-viewer
      v-if="imagePreviewVisible"
      @close="imagePreviewVisible = false"
      :url-list="imagePreviewUrlList"
      :initial-index="imagePreviewInitIndex"
    />
  </div>
</template>

<script setup lang="ts">
import ImagePicker from '@/components/ImagePicker.vue'
import ImageArrayPicker from '@/components/ImageArrayPicker.vue'
import { v4 as uuidv4 } from 'uuid'
import { type FormInstance, type FormRules } from 'element-plus'
import type { IProductVersion } from '@/types/product'
import { ProductForm, ProductPriceTypes } from '@/constants/mapData/product'

const id = useRouteParams<string>('id')

const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<IProductVersion>>({
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入产品描述', trigger: 'blur' }],
  showPrice: [{ required: true, message: '请输入展示价格', trigger: 'blur' }]
})

import { useProductStore } from '@/stores/modules/product'
const { getVersion: getVersionAction } = useProductStore()
const {
  state: data,
  isLoading: getVersionLoading,
  execute: executeGetVersionAction
} = useAsyncState(
  () => getVersionAction(id.value, 0),
  {
    version: 0,
    name: '',
    description: '',
    showPrice: 0,
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
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    },
    onSuccess: (data) => {
      if (data.coverImageUrl) {
        coverImage.value = {
          id: uuidv4(),
          url: data.coverImageUrl,
          name: data.coverImageUrl,
          raw: undefined
        }
      }
      imageList.value = data.imageUrls.map((url) => {
        return {
          id: uuidv4(),
          url,
          name: url,
          raw: undefined
        }
      })
    }
  }
)

onMounted(async () => {
  if (id.value !== '-1') {
    await executeGetVersionAction()
  }
})

// 标签相关
const customTag = ref('')
const maxTags = 5
const tagInputVisible = ref(false)
const tagInputRef = useTemplateRef('TagInputRef')
const isTagLimitReached = computed(() => data.value.tags.length >= maxTags)
const showTagInput = () => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value!.input!.focus()
  })
}
const addCustomTag = () => {
  const tag = customTag.value.trim()
  if (tag) {
    if (!data.value.tags.includes(tag)) {
      if (data.value.tags.length < maxTags) {
        data.value.tags.push(tag)
        tagInputVisible.value = false
        customTag.value = ''
      }
    } else {
      ElMessage.warning('该标签已存在')
    }
  } else {
    ElMessage.warning('请输入标签')
  }
  tagInputVisible.value = false
  customTag.value = ''
}
const handleTagClose = (tag: string) => {
  data.value.tags.splice(data.value.tags.indexOf(tag), 1)
}

// 选项
import {
  productPriceTypeOptions,
  productFormOptions,
  productDataFieldOptions,
  productDataSourceOptions,
  regionOptions,
  timeOptions
} from '@/constants/mapData/product'
import type { IUploadFile } from '@/types/common'

// 封面相关
const coverImage = ref<IUploadFile>()

// 图片预览
const imagePreviewVisible = ref(false)
const imagePreviewInitIndex = ref(0)
const imagePreviewUrlList = ref<string[]>([])

// 图片相关
const imageList = ref<IUploadFile[]>([])
</script>

<style scoped lang="scss">
.product-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}

.avatar-uploader-actions {
  @apply absolute left-0 top-0 w-full h-full cursor-default flex justify-center items-center opacity-0 color-white text-xl gap-4 bg-[var(--background-image-upload-action-color)] transition-opacity;
}

:deep(.avatar-uploader .el-upload) {
  @apply w-36.5 h-36.5 relative overflow-hidden bg-transparent border border-dashed border-[var(--border-color)] rounded cursor-pointer;
}

:deep(.avatar-uploader .el-upload:hover) {
  @apply border-[var(--border-btn-primary-color)];

  .avatar-uploader-actions {
    @apply opacity-100;
  }
}
</style>
