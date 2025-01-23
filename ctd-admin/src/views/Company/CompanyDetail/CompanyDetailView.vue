<template>
  <div class="company-detail-root-container">
    <span class="panel-title">公司详情</span>
    <div class="props-container" v-loading="getCompanyLoading">
      <div class="prop">
        <span class="label">公司标题：</span>
        <span class="value">{{ companyInfo.name }}</span>
      </div>
      <div class="prop">
        <span class="label">公司链接</span>
        <span class="value">{{ companyInfo.link }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(companyInfo.status)">{{
          statusLabel(companyInfo.status)
        }}</el-tag>
      </div>
      <div class="prop" items-center>
        <span class="label">合作伙伴:</span>
        <el-tag :type="partnerTypesColor(companyInfo.partnerType)">{{
          partnerTypesLabel(companyInfo.partnerType)
        }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ dayjs(companyInfo.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ dayjs(companyInfo.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="prop">
        <span class="label">友情链接：</span>
        <span class="value">{{ companyInfo.isShowInFooter ? '是' : '否' }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">公司简介：</span>
        <span class="value">{{ companyInfo.description }}</span>
      </div>
      <div class="prop">
        <span class="label">公司商标：</span>
        <el-image
          class="w-30 h-30"
          :src="convertFileUrl(companyInfo.logoUrl)"
          :preview-src-list="
            companyInfo.logoUrl ? [convertFileUrl(companyInfo.logoUrl) as string] : undefined
          "
          fit="cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'company-detail'
})
import { convertFileUrl } from '@/utils/convertUrl'
import dayjs from 'dayjs'
const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetCompanyAction()
// })

import { useCompanyStore } from '@/stores/modules/company'
const { getCompany: getCompanyAction } = useCompanyStore()
const {
  state: companyInfo,
  isLoading: getCompanyLoading,
  execute: executeGetCompanyAction
} = useAsyncState(
  () => getCompanyAction(id.value),
  {
    id: id.value,
    name: '',
    description: '',
    link: '',
    status: ActiveStatus.Inactive,
    partnerType: PartnerTypes.None,
    isShowInFooter: false,
    createdAt: '',
    updatedAt: ''
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
  executeGetCompanyAction()
})

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]
import {
  PARTNER_TYPES_COLOR_MAP,
  PARTNER_TYPES_MAP,
  PartnerTypes
} from '@/constants/mapData/company'
const partnerTypesColor = (partnerType: PartnerTypes) => PARTNER_TYPES_COLOR_MAP[partnerType]
const partnerTypesLabel = (partnerType: PartnerTypes) => PARTNER_TYPES_MAP[partnerType]
</script>

<style scoped lang="scss">
.company-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
