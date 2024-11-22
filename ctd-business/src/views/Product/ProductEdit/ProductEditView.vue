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
      <el-form-item label="标签" prop="showPrice" max-w-120>
        <div flex flex-row flex-wrap gap-2>
          <el-tag v-for="tag in versionInfo.tags" :key="tag" closable @close="handleTagClose(tag)">
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
      <el-form-item label="需求详情" prop="detail">
        <quill-editor
          class="editor"
          v-model:content="versionInfo.detail"
          theme="snow"
          :toolbar="toolbar"
          w-full
          max-w-200
        ></quill-editor>
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
      <div flex flex-col gap-4 mb-5>
        <span text-sm>规格列表</span>
        <product-spec-item
          v-for="item in priceInfo.specs"
          :key="item.id"
          :id="item.id"
          @delete="handleSpecGroupDelete"
          v-model:children="item.children"
          v-model:label="item.label"
          v-model:affectsPrice="item.affectsPrice"
        />
        <div flex flex-row gap-4 max-w-120>
          <el-input
            v-model="newSpecGroupLabel"
            placeholder="输入规格名称回车添加"
            @keyup.enter="newSpecGroup"
          />
          <el-button type="primary" @click="newSpecGroup"> + 添加规格 </el-button>
        </div>
      </div>
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
    <p>
      {{ JSON.stringify(priceList) }}
    </p>

    {{ JSON.stringify(priceInfo.prices) }}
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
import ProductSpecItem from './ProductSpecItem.vue'
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

import { useProductStore } from '@/stores/modules/product'
const { getVersion: getVersionAction, getPriceDefinition: getPriceDefinitionAction } =
  useProductStore()
const versionInfo = reactive<IProductVersion>({
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

// 标签相关
const customTag = ref('')
const maxTags = 5
const tagInputVisible = ref(false)
const tagInputRef = useTemplateRef('TagInputRef')
const isTagLimitReached = computed(() => versionInfo.tags.length >= maxTags)
const showTagInput = () => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value!.input!.focus()
  })
}
const addCustomTag = () => {
  const tag = customTag.value.trim()
  if (tag) {
    if (!versionInfo.tags.includes(tag)) {
      if (versionInfo.tags.length < maxTags) {
        versionInfo.tags.push(tag)
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
  versionInfo.tags.splice(versionInfo.tags.indexOf(tag), 1)
}

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
const imagePreviewVisible = ref(false)
const imagePreviewInitIndex = ref(0)
const imagePreviewUrlList = ref<string[]>([])

const coverImage = ref<IUploadFile>()
const imageList = ref<IUploadFile[]>([])

// 富文本相关
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'video', 'image'],

  ['clean']
]

// 价格相关
import { usePriceListReactive } from '../ProductDetail/usePriceList'

const newSpecGroupLabel = ref('')
const newSpecGroup = () => {
  if (newSpecGroupLabel.value) {
    priceInfo.specs.push({
      id: uuidv4(),
      label: newSpecGroupLabel.value,
      affectsPrice: false,
      children: []
    })
    newSpecGroupLabel.value = ''
  } else {
    ElMessage.warning('请输入规格名称')
  }
}

const handleSpecGroupDelete = (id: string | number) => {
  const index = priceInfo.specs.findIndex((item) => item.id === id)
  if (index !== -1) {
    priceInfo.specs.splice(index, 1)

    // 检查被删除的规格组是否是当前的主规格
    if (priceInfo.mainSpecGroupId === id) {
      const nextMainSpecGroup = priceInfo.specs.find((item) => item.affectsPrice === true)
      if (nextMainSpecGroup) {
        // 设置新的主规格
        priceInfo.mainSpecGroupId = nextMainSpecGroup.id
      }
    }
  }
}

const mainSpecGroupOptions = computed(() => {
  return priceInfo.specs
    .filter((item) => item.affectsPrice === true)
    .map((item) => {
      return {
        value: item.id,
        label: item.label
      }
    })
})

watch(mainSpecGroupOptions, () => {
  if (mainSpecGroupOptions.value.length === 0) {
    priceInfo.mainSpecGroupId = undefined
  }
})

const { priceList } = usePriceListReactive(priceInfo)
</script>

<style scoped lang="scss">
.product-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}

:deep(.ql-toolbar) {
  @apply w-full max-w-200 sticky top--5 bg-[var(--background-page-color)] z-10;
}

:deep(.ql-editor) {
  @apply min-h-100;
}
</style>
