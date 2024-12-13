<template>
  <div class="enterprise-detail-root-container">
    <span class="panel-title">企业用户详情</span>
    <div class="props-container" v-loading="getUserLoading">
      <div class="prop">
        <span class="label">邮箱：</span>
        <span class="value">{{ userInfo.email }}</span>
      </div>
      <div class="prop">
        <span class="label">企业名称：</span>
        <span class="value">{{ userInfo.enterpriseName }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(userInfo.status)">{{ statusLabel(userInfo.status) }}</el-tag>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">统一社会信用代码：</span>
        <span class="value">{{ userInfo.registrationNumber }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">企业简介：</span>
        <span class="value">{{ userInfo.enterpriseDescription }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">企业地址：</span>
        <span class="value">{{ userInfo.enterpriseAddress }}</span>
      </div>
      <div class="prop">
        <span class="label">联系人姓名：</span>
        <span class="value">{{ userInfo.contactPersonName }}</span>
      </div>
      <div class="prop">
        <span class="label">联系人职位：</span>
        <span class="value">{{ userInfo.contactPersonTitle }}</span>
      </div>
      <div class="prop">
        <span class="label">联系人电话：</span>
        <span class="value">{{ userInfo.contactPhoneNumber }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">行业类别:</span>
        <el-tag :type="industryTypeColor(userInfo.industryType)">{{
          industryTypeLabel(userInfo.industryType)
        }}</el-tag>
      </div>
      <div class="prop" items-center>
        <span class="label">企业规模:</span>
        <el-tag :type="companySizeColor(userInfo.companySize)">{{
          companySizeLabel(userInfo.companySize)
        }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ userInfo.createTime }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ userInfo.updateTime }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">企业商标：</span>
        <el-image
          class="w-30 h-30"
          :src="userInfo.avatarUrl"
          :preview-src-list="userInfo.avatarUrl ? [userInfo.avatarUrl] : undefined"
          fit="cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const id = useRouteParams<string | number>('id')
watch(id, () => {
  executeGetUserAction()
})

import { useUserStore } from '@/stores/modules/user'
const { getEnterpriseUser: getEnterpriseUserAction } = useUserStore()
const {
  state: userInfo,
  isLoading: getUserLoading,
  execute: executeGetUserAction
} = useAsyncState(
  () => getEnterpriseUserAction(id.value),
  {
    id: id.value,
    email: '',
    userType: UserType.Individual,
    status: UserStatus.Active,
    createTime: '',
    updateTime: '',
    enterpriseName: '',
    enterpriseDescription: '',
    registrationNumber: '',
    contactPersonName: '',
    contactPersonTitle: '',
    contactPhoneNumber: '',
    enterpriseAddress: '',
    industryType: IndustryType.InformationTechnology,
    companySize: CompanySizeType.Large
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
  executeGetUserAction()
})

import {
  USER_STATUS_MAP,
  USER_STATUS_COLOR_MAP,
  UserStatus,
  UserType
} from '@/constants/mapData/user'
const stautsColor = (status: UserStatus) => USER_STATUS_COLOR_MAP[status]
const statusLabel = (status: UserStatus) => USER_STATUS_MAP[status]

import { INDUSTRY_TYPE_MAP, INDUSTRY_TYPE_COLOR_MAP, IndustryType } from '@/constants/mapData/user'
const industryTypeColor = (industry: IndustryType) => INDUSTRY_TYPE_COLOR_MAP[industry]
const industryTypeLabel = (industry: IndustryType) => INDUSTRY_TYPE_MAP[industry]

import {
  COMPANY_SIZE_TYPE_MAP,
  COMPANY_SIZE_TYPE_COLOR_MAP,
  CompanySizeType
} from '@/constants/mapData/user'
const companySizeColor = (companySize: CompanySizeType) => COMPANY_SIZE_TYPE_COLOR_MAP[companySize]
const companySizeLabel = (companySize: CompanySizeType) => COMPANY_SIZE_TYPE_MAP[companySize]
</script>

<style scoped lang="scss">
.enterprise-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
