<template>
  <div class="news-detail-root-container">
    <span class="panel-title">资讯详情</span>
    <div class="props-container" v-loading="getNewsLoading">
      <div class="prop">
        <span class="label">资讯标题：</span>
        <span class="value">{{ newsInfo.title }}</span>
      </div>
      <div class="prop">
        <span class="label">阅读数量：</span>
        <span class="value">{{ newsInfo.readCount }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(newsInfo.status)">{{ statusLabel(newsInfo.status) }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">发布日期：</span>
        <span class="value">{{ newsInfo.publishedAt }}</span>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ newsInfo.createTime }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ newsInfo.updateTime }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">摘要：</span>
        <span class="value">{{ newsInfo.summary }}</span>
      </div>
      <div class="prop">
        <span class="label">资讯封面：</span>
        <el-image
          class="w-30 h-30"
          :src="newsInfo.coverImageUrl"
          :preview-src-list="newsInfo.coverImageUrl ? [newsInfo.coverImageUrl] : undefined"
          fit="cover"
        />
      </div>
      <div class="prop">
        <span class="label">资讯头图：</span>
        <el-image
          class="w-30 h-30"
          :src="newsInfo.headerImageUrl"
          :preview-src-list="newsInfo.headerImageUrl ? [newsInfo.headerImageUrl] : undefined"
          fit="cover"
        />
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">资讯正文：</span>
        <div v-html="newsInfo.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'news-detail'
})
const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetNewsDetailAction()
// })

import { useNewsStore } from '@/stores/modules/news'
const { getNewsDetail: getNewsDetailAction } = useNewsStore()
const {
  state: newsInfo,
  isLoading: getNewsLoading,
  execute: executeGetNewsDetailAction
} = useAsyncState(
  () => getNewsDetailAction(id.value),
  {
    id: id.value,
    title: '',
    summary: '',
    content: '',
    status: ActiveStatus.Inactive,
    readCount: 0,
    publishedAt: '',
    createTime: '',
    updateTime: ''
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    }
  }
)

onMounted(() => {
  executeGetNewsDetailAction()
})

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]
</script>

<style scoped lang="scss">
.news-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
