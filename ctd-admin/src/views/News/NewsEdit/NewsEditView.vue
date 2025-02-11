<template>
  <div class="news-edit-root-container">
    <span class="panel-title">{{ id > 0 ? '新建资讯' : '编辑资讯' }}</span>
    <el-form
      @submit.prevent
      :model="newsInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="资讯标题" prop="title" max-w-120>
        <el-input v-model="newsInfo.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="作者" prop="author" max-w-120>
        <el-input v-model="newsInfo.author" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary" max-w-120>
        <el-input
          v-model="newsInfo.summary"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="publishedAt" max-w-120>
        <el-date-picker
          v-model="newsInfo.publishedAt"
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
        <image-picker v-model="coverImageRef" />
      </el-form-item>
      <el-form-item label="资讯头图" prop="headerImageUrl">
        <image-picker v-model="headerImageRef" />
      </el-form-item>
      <el-form-item label="资讯正文" prop="content">
        <news-rich-edit-panel v-model="newsInfo.content" />
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

import { type FormInstance, type FormRules } from 'element-plus'
import ImagePicker from '@/components/ImagePicker.vue'
import NewsRichEditPanel from './NewsRichEditPanel.vue'
import { ActiveStatus } from '@/constants/mapData'
import type { INews, INewsDTO } from '@/types/news'

const id = useRouteParams<number>('id', -1, { transform: Number })
const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<INewsDTO>>({
  title: [{ required: true, message: '请输入资讯名称', trigger: 'blur' }],
  summary: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
  publishedAt: [{ required: true, message: '请选择发布时间', trigger: 'blur' }],
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }]
})

import { useNewsStore } from '@/stores/modules/news'
const { getNewsDetail: getNewsDetailAction, upsertNews: upsertNewsAction } = useNewsStore()
const newsInfo = reactive<INewsDTO>({
  title: '',
  author: '',
  summary: '',
  content: '',
  status: ActiveStatus.Inactive,
  publishedAt: ''
})

onMounted(async () => {
  if (id.value > 0) {
    const fetchedNewsDetailData = await getNewsDetailAction(id.value)
    Object.assign(newsInfo, mapINewsToINewsDTO(fetchedNewsDetailData))
  }
})

function mapINewsToINewsDTO(scene: INews): INewsDTO {
  const { title, author, summary, coverImageUrl, headerImageUrl, content, status, publishedAt } =
    scene

  return {
    title,
    author,
    summary,
    coverImageUrl,
    headerImageUrl,
    content,
    status,
    publishedAt
  }
}

// 图片相关
import { useSingleImage } from '@/composables/useSingleImage'
const { imageRef: coverImageRef, uploadImage: uploadCoverImage } = useSingleImage(
  computed(() => newsInfo.coverImageUrl)
)
const { imageRef: headerImageRef, uploadImage: uploadHeaderImage } = useSingleImage(
  computed(() => newsInfo.headerImageUrl)
)

// 选项相关
import { activeStatusOptions } from '@/constants/mapData'

// 提交
const submit = async () => {
  if (await form.value?.validate()) {
    const newCoverUrl = await uploadCoverImage()
    if (newCoverUrl) {
      newsInfo.coverImageUrl = newCoverUrl
    }
    const newHeaderUrl = await uploadHeaderImage()
    if (newHeaderUrl) {
      newsInfo.headerImageUrl = newHeaderUrl
    }
    try {
      await upsertNewsAction(id.value, newsInfo)
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
