<template>
  <div class="enterprise-detail-root-container">
    <span class="panel-title">企业用户详情</span>
    <div class="props-container" v-loading="getUserLoading">
      <div class="prop">
        <span class="label">场景标题：</span>
        <span class="value">{{ userInfo.title }}</span>
      </div>
      <div class="prop">
        <span class="label">阅读数量：</span>
        <span class="value">{{ userInfo.readCount }}</span>
      </div>
      <div class="prop" items-center>
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(userInfo.status)">{{ statusLabel(userInfo.status) }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">关联公司</span>
        <span class="value">{{ userInfo.company.name }}</span>
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
        <span class="label">摘要：</span>
        <span class="value">{{ userInfo.summary }}</span>
      </div>
      <div class="prop">
        <span class="label">场景封面：</span>
        <el-image
          class="w-30 h-30"
          :src="userInfo.coverImageUrl"
          :preview-src-list="userInfo.coverImageUrl ? [userInfo.coverImageUrl] : undefined"
          fit="cover"
        />
      </div>
      <div class="prop">
        <span class="label">场景头图：</span>
        <el-image
          class="w-30 h-30"
          :src="userInfo.headerImageUrl"
          :preview-src-list="userInfo.headerImageUrl ? [userInfo.headerImageUrl] : undefined"
          fit="cover"
        />
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">是否为外链：</span>
        <span class="value">{{ userInfo.isOuterLink ? '是' : '否' }}</span>
      </div>
      <div class="prop" grid-col-span-3 v-if="userInfo.isOuterLink">
        <span class="label">外部链接：</span>
        <span class="value">{{ userInfo.link }}</span>
      </div>
      <div class="prop" grid-col-span-3 v-else>
        <span class="label">场景正文：</span>
        <div v-html="userInfo.content"></div>
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

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]
</script>

<style scoped lang="scss">
.individual-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
