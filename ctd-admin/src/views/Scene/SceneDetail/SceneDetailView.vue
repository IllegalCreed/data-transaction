<template>
  <div class="scene-detail-root-container">
    <span class="panel-title">场景详情</span>
    <div class="props-container" v-loading="getSceneLoading">
      <div class="prop">
        <span class="label">场景标题：</span>
        <span class="value">{{ sceneInfo.title }}</span>
      </div>
      <div class="prop">
        <span class="label">阅读数量：</span>
        <span class="value">{{ sceneInfo.readCount }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(sceneInfo.status)">{{ statusLabel(sceneInfo.status) }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">关联公司</span>
        <span class="value">{{ sceneInfo.company?.name }}</span>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ dayjs(sceneInfo.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ dayjs(sceneInfo.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">摘要：</span>
        <span class="value">{{ sceneInfo.summary }}</span>
      </div>
      <div class="prop">
        <span class="label">场景封面：</span>
        <el-image
          class="w-30 h-30"
          :src="convertFileUrl(sceneInfo.coverImageUrl)"
          :preview-src-list="
            sceneInfo.coverImageUrl
              ? [convertFileUrl(sceneInfo.coverImageUrl) as string]
              : undefined
          "
          fit="cover"
        />
      </div>
      <div class="prop">
        <span class="label">场景头图：</span>
        <el-image
          class="w-30 h-30"
          :src="convertFileUrl(sceneInfo.headerImageUrl)"
          :preview-src-list="
            sceneInfo.headerImageUrl
              ? [convertFileUrl(sceneInfo.headerImageUrl) as string]
              : undefined
          "
          fit="cover"
        />
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">是否为外链：</span>
        <span class="value">{{ sceneInfo.isOuterLink ? '是' : '否' }}</span>
      </div>
      <div class="prop" grid-col-span-3 v-if="sceneInfo.isOuterLink">
        <span class="label">外部链接：</span>
        <span class="value">{{ sceneInfo.link }}</span>
      </div>
      <div class="prop" grid-col-span-3 v-else>
        <span class="label">场景正文：</span>
        <div v-html="sceneInfo.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'scene-detail'
})
import { convertFileUrl } from '@/utils/convertUrl'
import dayjs from 'dayjs'
const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetSceneAction()
// })

import { useSceneStore } from '@/stores/modules/scene'
const { getScene: getSceneAction } = useSceneStore()
const {
  state: sceneInfo,
  isLoading: getSceneLoading,
  execute: executeGetSceneAction
} = useAsyncState(
  () => getSceneAction(id.value),
  {
    id: id.value,
    title: '',
    summary: '',
    status: ActiveStatus.Inactive,
    readCount: 0,
    company: {
      id: 0,
      name: ''
    },
    isOuterLink: false,
    content: '',
    createdAt: '',
    updatedAt: ''
  },
  {
    immediate: false,
    onError: (error) => {
      if (error instanceof Error) {
        ElMessage.error('获取详情失败')
      }
    }
  }
)

onMounted(() => {
  executeGetSceneAction()
})

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]
</script>

<style scoped lang="scss">
.scene-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
