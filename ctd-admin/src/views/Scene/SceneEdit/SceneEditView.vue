<template>
  <div class="scene-edit-root-container">
    <span class="panel-title">{{ id > 0 ? '编辑场景' : '新建场景' }}</span>
    <el-form
      @submit.prevent
      :model="sceneInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="场景标题" prop="title" max-w-120>
        <el-input v-model="sceneInfo.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary" max-w-120>
        <el-input
          v-model="sceneInfo.summary"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
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
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" max-w-120>
        <el-select v-model="sceneInfo.status" placeholder="请选择">
          <el-option
            v-for="item in activeStatusOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="场景封面" prop="coverImageUrl">
        <image-picker v-model="coverImageRef" />
      </el-form-item>
      <el-form-item label="场景头图" prop="headerImageUrl">
        <image-picker v-model="headerImageRef" />
      </el-form-item>
      <el-form-item label="是否为外链" prop="isOuterLink">
        <el-switch v-model="sceneInfo.isOuterLink" />
      </el-form-item>
      <el-form-item v-if="sceneInfo.isOuterLink" label="外部链接" prop="link" max-w-120>
        <el-input v-model="sceneInfo.link" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-else label="场景正文" prop="content">
        <scene-rich-edit-panel v-model="sceneInfo.content" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'scene-edit'
})

import { type FormInstance, type FormRules } from 'element-plus'
import ImagePicker from '@/components/ImagePicker.vue'
import SceneRichEditPanel from './SceneRichEditPanel.vue'
import { ActiveStatus } from '@/constants/mapData'
import type { IScene, ISceneDTO } from '@/types/scene'

const id = useRouteParams<number>('id', -1, { transform: Number })
const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<ISceneDTO>>({
  title: [{ required: true, message: '请输入场景名称', trigger: 'blur' }],
  summary: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }]
})

import { useSceneStore } from '@/stores/modules/scene'
const { getScene: getSceneAction, upsertScene: upsertSceneAction } = useSceneStore()
const sceneInfo = reactive<ISceneDTO>({
  title: '',
  summary: '',
  coverImageUrl: undefined,
  headerImageUrl: undefined,
  status: ActiveStatus.Inactive,
  companyId: undefined,
  isOuterLink: false,
  content: '',
  link: ''
})

onMounted(async () => {
  if (id.value > 0) {
    const fetchedNewsDetailData = await getSceneAction(id.value)
    Object.assign(sceneInfo, mapISceneToISceneDTO(fetchedNewsDetailData))
    if (sceneInfo.companyId) {
      getCompanyOptionsByNameActionLoading.value = true
      companyOptions.value = await getCompanyOptionsByIDAction(sceneInfo.companyId)
      getCompanyOptionsByNameActionLoading.value = false
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
    companyId: company?.id
  }
}

// 图片相关
import { useSingleImage } from '@/composables/useSingleImage'
const { imageRef: coverImageRef, uploadImage: uploadCoverImage } = useSingleImage(
  computed(() => sceneInfo.coverImageUrl)
)
const { imageRef: headerImageRef, uploadImage: uploadHeaderImage } = useSingleImage(
  computed(() => sceneInfo.headerImageUrl)
)

// 选项相关
import { activeStatusOptions } from '@/constants/mapData'

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

// 提交
const submit = async () => {
  if (await form.value?.validate()) {
    const newCoverUrl = await uploadCoverImage()
    if (newCoverUrl) {
      sceneInfo.coverImageUrl = newCoverUrl
    }
    const newHeaderUrl = await uploadHeaderImage()
    if (newHeaderUrl) {
      sceneInfo.headerImageUrl = newHeaderUrl
    }
    try {
      await upsertSceneAction(id.value, sceneInfo)
      ElMessage.success('提交成功')
      goBack()
    } catch (error: unknown) {
      if (error instanceof Error) {
        ElMessage.error('提交失败')
      }
    }
  }
}

// 返回
import { useRouterStore } from '@/stores/modules/router'
const { deleteView } = useRouterStore()
const router = useRouter()
const route = useRoute()
const goBack = () => {
  router.push({
    name: 'scene'
  })
  deleteView(route)
}
</script>

<style scoped lang="scss">
.scene-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
