<template>
  <div class="banner-edit-root-container">
    <span class="panel-title">{{ id === '-1' ? '新建横幅' : '编辑横幅' }}</span>
    <el-form
      @submit.prevent
      :model="bannerInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="横幅标题" prop="title" max-w-120>
        <el-input v-model="bannerInfo.title" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item label="链接类型" prop="linkType" max-w-120>
        <el-select v-model="bannerInfo.linkType" placeholder="请选择">
          <el-option
            v-for="item in linkTypesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="bannerInfo.linkType === LinkTypes.OuterLink"
        label="链接地址"
        prop="data"
        max-w-120
      >
        <el-input v-model="bannerInfo.data" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item
        v-if="
          bannerInfo.linkType === LinkTypes.Scene ||
          bannerInfo.linkType === LinkTypes.Product ||
          bannerInfo.linkType === LinkTypes.Demand
        "
        label="关联数据"
        prop="data.id"
        max-w-120
        :rules="[
          {
            required: true,
            message: '请选择关联数据',
            trigger: 'blur'
          }
        ]"
      >
        <el-select
          filterable
          remote
          remote-show-suffix
          clearable
          :remote-method="remoteMethod"
          :loading="getOptionsLoading"
          v-model="bannerInfo.data.id"
          placeholder="请输入关键字搜索"
        >
          <el-option
            v-for="item in dataOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" max-w-120>
        <el-select v-model="bannerInfo.status" placeholder="请选择">
          <el-option
            v-for="item in activeStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图片" prop="imageUrl">
        <image-picker v-model="coverImage" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagePicker from '@/components/ImagePicker.vue'
import { v4 as uuidv4 } from 'uuid'
import { type FormInstance, type FormRules } from 'element-plus'
import type { IBannerDTO } from '@/types/banner'

const id = useRouteParams<string>('id')
const form = useTemplateRef<FormInstance>('form')

const checkImageRequired = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (!coverImage.value) {
    callback(new Error('请选择图片'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<IBannerDTO>>({
  title: [{ required: true, message: '请输入场景名称', trigger: 'blur' }],
  imageUrl: [{ required: true, validator: checkImageRequired, trigger: 'blur' }]
})

import { useBannerStore } from '@/stores/modules/banner'
const { getBanner: getBannerAction, upsertBanner: upsertBannerAction } = useBannerStore()
const bannerInfo = reactive<IBannerDTO>({
  title: '',
  imageUrl: '',
  status: ActiveStatus.Inactive,
  linkType: LinkTypes.None
})

onMounted(async () => {
  if (id.value !== '-1') {
    const fetchedNewsDetailData = await getBannerAction(id.value)
    Object.assign(bannerInfo, fetchedNewsDetailData)
    if (bannerInfo.imageUrl) {
      coverImage.value = {
        id: uuidv4(),
        url: bannerInfo.imageUrl,
        name: bannerInfo.imageUrl,
        raw: undefined
      }
    }
    if (
      bannerInfo.linkType === LinkTypes.Scene ||
      bannerInfo.linkType === LinkTypes.Product ||
      bannerInfo.linkType === LinkTypes.Demand
    ) {
      getOptionsLoading.value = true
      switch (bannerInfo.linkType) {
        case LinkTypes.Demand:
          dataOptions.value = [await getDemandOptionsByIDAction(bannerInfo.data.id)]
          break
        case LinkTypes.Product:
          dataOptions.value = [await getProductOptionsByIDAction(bannerInfo.data.id)]
          break
        case LinkTypes.Scene:
          dataOptions.value = [await getSceneOptionsByIDAction(bannerInfo.data.id)]
          break
      }
      getOptionsLoading.value = false
    }
  }
  watch(
    () => bannerInfo.linkType,
    () => {
      if (bannerInfo.linkType === LinkTypes.OuterLink) {
        bannerInfo.data = ''
      } else if (
        bannerInfo.linkType === LinkTypes.Scene ||
        bannerInfo.linkType === LinkTypes.Demand ||
        bannerInfo.linkType === LinkTypes.Product
      ) {
        bannerInfo.data = { id: '' }
      }
    }
  )
})

// 内部链接关联选择
import { useProductStore } from '@/stores/modules/product'
const {
  getProductOptionsByName: getProductOptionsByNameAction,
  getProductOptionsByID: getProductOptionsByIDAction
} = useProductStore()
import { useDemandStore } from '@/stores/modules/demand'
const {
  getDemandOptionsByName: getDemandOptionsByNameAction,
  getDemandOptionsByID: getDemandOptionsByIDAction
} = useDemandStore()
import { useSceneStore } from '@/stores/modules/scene'
const {
  getSceneOptionsByName: getSceneOptionsByNameAction,
  getSceneOptionsByID: getSceneOptionsByIDAction
} = useSceneStore()
const getOptionsLoading = ref(false)
const dataOptions = ref<IOption[]>([])

const remoteMethod = async (query: string) => {
  if (query) {
    getOptionsLoading.value = true
    switch (bannerInfo.linkType) {
      case LinkTypes.Demand:
        dataOptions.value = await getDemandOptionsByNameAction(query)
        break
      case LinkTypes.Product:
        dataOptions.value = await getProductOptionsByNameAction(query)
        break
      case LinkTypes.Scene:
        dataOptions.value = await getSceneOptionsByNameAction(query)
        break
      default:
        break
    }
    getOptionsLoading.value = false
  } else {
    dataOptions.value = []
  }
}

// 图片相关
const coverImage = ref<IUploadFile>()

import { useFileStore } from '@/stores/modules/file'
import { ActiveStatus } from '@/constants/mapData'
import type { IOption, IUploadFile } from '@/types/common'
const { uploadFile: uploadFileAction } = useFileStore()
const uploadImage = async () => {
  if (coverImage.value) {
    if (coverImage.value.raw) {
      const url = await uploadFileAction(coverImage.value.raw)
      coverImage.value.url = url
      coverImage.value.name = url
      coverImage.value.raw = undefined
      bannerInfo.imageUrl = url
    }
  }
}

import { activeStatusOptions } from '@/constants/mapData'
import { LinkTypes, linkTypesOptions } from '@/constants/mapData/banner'
import type { InternalRuleItem } from 'async-validator'

const submit = async () => {
  if (await form.value?.validate()) {
    await uploadImage()
    await upsertBannerAction(id.value, bannerInfo)
    ElMessage.success('提交成功')
    goBack()
  }
}

import { useRouterStore } from '@/stores/modules/router'
const { deleteView } = useRouterStore()
const router = useRouter()
const route = useRoute()
const goBack = () => {
  router.push({
    name: 'banner'
  })
  deleteView(route)
}
</script>

<style scoped lang="scss">
.banner-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
