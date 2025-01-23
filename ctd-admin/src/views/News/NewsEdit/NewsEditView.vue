<template>
  <div class="news-edit-root-container">
    <span class="panel-title">{{ id === '-1' ? '新建资讯' : '编辑资讯' }}</span>
    <el-form
      @submit.prevent
      :model="newsInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="资讯标题" prop="title" max-w-120>
        <el-input v-model="newsInfo.title" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary" max-w-120>
        <el-input
          v-model="newsInfo.summary"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="publicDate" max-w-120>
        <el-date-picker
          v-model="newsInfo.publicDate"
          type="date"
          placeholder="请选择"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status" max-w-120>
        <el-select v-model="newsInfo.status" placeholder="请选择">
          <el-option
            v-for="item in activeStatusOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资讯封面" prop="coverImageUrl">
        <image-picker v-model="coverImage" />
      </el-form-item>
      <el-form-item label="资讯头图" prop="headerImageUrl">
        <image-picker v-model="headerImage" />
      </el-form-item>
      <el-form-item label="资讯正文" prop="content">
        <news-rich-edit-panel v-model:content="newsInfo.content" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'news-edit'
})

import ImagePicker from '@/components/ImagePicker.vue'
import NewsRichEditPanel from './NewsRichEditPanel.vue'
import { v4 as uuidv4 } from 'uuid'
import { type FormInstance, type FormRules } from 'element-plus'
import type { INews } from '@/types/news'

const id = useRouteParams<string>('id')
const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<INews>>({
  title: [{ required: true, message: '请输入资讯名称', trigger: 'blur' }],
  summary: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
  publicDate: [{ required: true, message: '请选择发布时间', trigger: 'blur' }],
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }]
})

import { useNewsStore } from '@/stores/modules/news'
const { getNewsDetail: getNewsDetailAction, upsertNews: upsertNewsAction } = useNewsStore()
const newsInfo = reactive<INews>({
  id: id.value,
  title: '',
  summary: '',
  content: '',
  status: ActiveStatus.Inactive,
  readCount: 0,
  publicDate: '',
  createTime: '',
  updateTime: ''
})

onMounted(async () => {
  if (id.value !== '-1') {
    const fetchedNewsDetailData = await getNewsDetailAction(id.value)
    Object.assign(newsInfo, fetchedNewsDetailData)
    if (newsInfo.coverImageUrl) {
      coverImage.value = {
        id: uuidv4(),
        url: newsInfo.coverImageUrl,
        name: newsInfo.coverImageUrl,
        raw: undefined
      }
    }
    if (newsInfo.headerImageUrl) {
      headerImage.value = {
        id: uuidv4(),
        url: newsInfo.headerImageUrl,
        name: newsInfo.headerImageUrl,
        raw: undefined
      }
    }
  }
})

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
      newsInfo.coverImageUrl = url
    }
  }
  if (headerImage.value) {
    if (headerImage.value.raw) {
      const url = await uploadFileAction(headerImage.value.raw)
      headerImage.value.url = url
      headerImage.value.name = url
      headerImage.value.raw = undefined
      newsInfo.headerImageUrl = url
    }
  }
}

import { activeStatusOptions } from '@/constants/mapData'

const submit = async () => {
  if (await form.value?.validate()) {
    await uploadImage()
    await upsertNewsAction(id.value, newsInfo)
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
    name: 'news'
  })
  deleteView(route)
}
</script>

<style scoped lang="scss">
.news-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
