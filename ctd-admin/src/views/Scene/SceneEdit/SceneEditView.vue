<template>
  <div class="scene-edit-root-container">
    <span class="panel-title">{{ id === '-1' ? '新建场景' : '编辑场景' }}</span>
    <el-form
      @submit.prevent
      :model="sceneInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="场景标题" prop="title" max-w-120>
        <el-input v-model="sceneInfo.title" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary" max-w-120>
        <el-input
          v-model="sceneInfo.summary"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="关联公司" prop="companyId" max-w-120>
        <el-select
          filterable
          remote
          remote-show-suffix
          clearable
          :remote-method="remoteMethod"
          :loading="getCompanyOptionsByNameActionLoading"
          v-model="sceneInfo.companyId"
          placeholder="输入公司名称搜索"
        >
          <el-option
            v-for="item in companyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" max-w-120>
        <el-select v-model="sceneInfo.status" placeholder="请选择">
          <el-option
            v-for="item in activeStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="场景封面" prop="coverImageUrl">
        <image-picker v-model="coverImage" />
      </el-form-item>
      <el-form-item label="场景头图" prop="headerImageUrl">
        <image-picker v-model="headerImage" />
      </el-form-item>
      <el-form-item label="是否为外链" prop="hasCount">
        <el-switch v-model="sceneInfo.isOuterLink" />
      </el-form-item>
      <el-form-item v-if="sceneInfo.isOuterLink" label="外部链接" prop="link" max-w-120>
        <el-input v-model="sceneInfo.link" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item v-else label="场景正文" prop="content">
        <scene-rich-edit-panel v-model:content="sceneInfo.content" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagePicker from '@/components/ImagePicker.vue'
import SceneRichEditPanel from './SceneRichEditPanel.vue'
import { v4 as uuidv4 } from 'uuid'
import { type FormInstance, type FormRules } from 'element-plus'
import type { IScene, ISceneDTO } from '@/types/scene'

const id = useRouteParams<string>('id')
const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<ISceneDTO>>({
  title: [{ required: true, message: '请输入场景名称', trigger: 'blur' }],
  summary: [{ required: true, message: '请输入摘要', trigger: 'blur' }]
})

import { useSceneStore } from '@/stores/modules/scene'
const { getScene: getSceneAction, upsertScene: upsertSceneAction } = useSceneStore()
const sceneInfo = reactive<ISceneDTO>({
  title: '',
  summary: '',
  status: ActiveStatus.Inactive,
  companyId: '',
  isOuterLink: false,
  content: ''
})

onMounted(async () => {
  if (id.value !== '-1') {
    const fetchedNewsDetailData = await getSceneAction(id.value)
    Object.assign(sceneInfo, mapISceneToISceneDTO(fetchedNewsDetailData))
    if (sceneInfo.companyId) {
      getCompanyOptionsByNameActionLoading.value = true
      companyOptions.value = [await getCompanyOptionsByIDAction(sceneInfo.companyId)]
      getCompanyOptionsByNameActionLoading.value = false
    }
    if (sceneInfo.coverImageUrl) {
      coverImage.value = {
        id: uuidv4(),
        url: sceneInfo.coverImageUrl,
        name: sceneInfo.coverImageUrl,
        raw: undefined
      }
    }
    if (sceneInfo.headerImageUrl) {
      headerImage.value = {
        id: uuidv4(),
        url: sceneInfo.headerImageUrl,
        name: sceneInfo.headerImageUrl,
        raw: undefined
      }
    }
  }
})

function mapISceneToISceneDTO(scene: IScene): ISceneDTO {
  const {
    title,
    summary,
    coverImageUrl,
    headerImageUrl,
    isOuterLink,
    link,
    content,
    status,
    company
  } = scene

  return {
    title,
    summary,
    coverImageUrl,
    headerImageUrl,
    isOuterLink,
    link: isOuterLink ? link : undefined,
    content: !isOuterLink ? content : undefined,
    status,
    companyId: company.id
  }
}

// 公司相关
import { useCompanyStore } from '@/stores/modules/company'
const {
  getCompanyOptionsByName: getCompanyOptionsByNameAction,
  getCompanyOptionsByID: getCompanyOptionsByIDAction
} = useCompanyStore()
const {
  state: companyOptions,
  isLoading: getCompanyOptionsByNameActionLoading,
  execute: executeGetCompanyOptionsByNameAction
} = useAsyncState(getCompanyOptionsByNameAction, [], {
  immediate: false,
  throwError: true
})

const remoteMethod = (query: string) => {
  if (query) {
    executeGetCompanyOptionsByNameAction(0, query)
  } else {
    companyOptions.value = []
  }
}

// 图片相关
const coverImage = ref<IUploadFile>()
const headerImage = ref<IUploadFile>()

import { useFileStore } from '@/stores/modules/file'
import { ActiveStatus } from '@/constants/mapData'
import type { IUploadFile } from '@/types/common'
const { uploadFile: uploadFileAction } = useFileStore()
const uploadImage = async () => {
  if (coverImage.value) {
    if (coverImage.value.raw) {
      const url = await uploadFileAction(coverImage.value.raw)
      coverImage.value.url = url
      coverImage.value.name = url
      coverImage.value.raw = undefined
      sceneInfo.coverImageUrl = url
    }
  }
  if (headerImage.value) {
    if (headerImage.value.raw) {
      const url = await uploadFileAction(headerImage.value.raw)
      headerImage.value.url = url
      headerImage.value.name = url
      headerImage.value.raw = undefined
      sceneInfo.headerImageUrl = url
    }
  }
}

import { activeStatusOptions } from '@/constants/mapData'

const submit = async () => {
  if (await form.value?.validate()) {
    await uploadImage()
    await upsertSceneAction(id.value, sceneInfo)
  }
}
</script>

<style scoped lang="scss">
.scene-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
