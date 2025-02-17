<template>
  <div class="banner-detail-root-container">
    <span class="panel-title">横幅详情</span>
    <div class="props-container" v-loading="getBannerLoading">
      <div class="prop">
        <span class="label">横幅标题：</span>
        <span class="value">{{ bannerInfo.title }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">链接类型:</span>
        <el-tag :type="linkTypeColor(bannerInfo.linkType)">{{
          linkTypeLabel(bannerInfo.linkType)
        }}</el-tag>
      </div>
      <div class="prop" v-if="bannerInfo.linkType === LinkTypes.OuterLink">
        <span class="label">链接：</span>
        <span class="value">{{ bannerInfo.data }}</span>
      </div>
      <div class="prop" v-if="bannerInfo.linkType === LinkTypes.Scene">
        <span class="label">场景名称：</span>
        <span class="value">{{ bannerInfo.data.name }}</span>
      </div>
      <div class="prop" v-if="bannerInfo.linkType === LinkTypes.News">
        <span class="label">资讯名称：</span>
        <span class="value">{{ bannerInfo.data.name }}</span>
      </div>
      <div class="prop" v-if="bannerInfo.linkType === LinkTypes.Product">
        <span class="label">产品名称：</span>
        <span class="value">{{ bannerInfo.data.name }}</span>
      </div>
      <div class="prop" v-if="bannerInfo.linkType === LinkTypes.Demand">
        <span class="label">需求名称：</span>
        <span class="value">{{ bannerInfo.data.name }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(bannerInfo.status)">{{ statusLabel(bannerInfo.status) }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ dayjs(bannerInfo.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ dayjs(bannerInfo.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">图片：</span>
        <el-image
          class="w-30 h-30"
          :src="bannerInfo.imageUrl"
          :preview-src-list="bannerInfo.imageUrl ? [bannerInfo.imageUrl] : undefined"
          fit="cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'banner-detail'
})

import dayjs from 'dayjs'
const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetBannerAction()
// })

import { useBannerStore } from '@/stores/modules/banner'
const { getBanner: getBannerAction } = useBannerStore()
const {
  state: bannerInfo,
  isLoading: getBannerLoading,
  execute: executeGetBannerAction
} = useAsyncState(
  () => getBannerAction(id.value),
  {
    id: id.value,
    title: '',
    imageUrl: '',
    status: ActiveStatus.Inactive,
    linkType: LinkTypes.None,
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

onMounted(async () => {
  await executeGetBannerAction()
})

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]
import { LINK_TYPES_COLOR_MAP, LINK_TYPES_MAP, LinkTypes } from '@/constants/mapData/banner'
const linkTypeColor = (linkType: LinkTypes) => LINK_TYPES_COLOR_MAP[linkType]
const linkTypeLabel = (linkType: LinkTypes) => LINK_TYPES_MAP[linkType]
</script>

<style scoped lang="scss">
.banner-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
