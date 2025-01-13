<template>
  <div class="individual-detail-root-container">
    <span class="panel-title">个人用户详情</span>
    <div class="props-container" v-loading="getUserLoading">
      <div class="prop">
        <span class="label">邮箱：</span>
        <span class="value" break-all>{{ userInfo.email }}</span>
      </div>
      <div class="prop">
        <span class="label">姓名：</span>
        <span class="value">{{ userInfo.fullName }}</span>
      </div>
      <div class="prop">
        <span class="label">状态:</span>
        <el-tag :type="stautsColor(userInfo.status)">{{ statusLabel(userInfo.status) }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">身份证号</span>
        <span class="value">{{ userInfo.identificationNumber }}</span>
      </div>
      <div class="prop">
        <span class="label">电话</span>
        <span class="value">{{ userInfo.phoneNumber }}</span>
      </div>
      <div class="prop">
        <span class="label">性别</span>
        <el-tag :type="genderColor(userInfo.gender)">{{ genderLabel(userInfo.gender) }}</el-tag>
      </div>
      <div class="prop">
        <span class="label">生日</span>
        <span class="value">{{ userInfo.dateOfBirth }}</span>
      </div>
      <div class="prop">
        <span class="label">创建时间：</span>
        <span class="value">{{ userInfo.createdAt }}</span>
      </div>
      <div class="prop">
        <span class="label">更新时间：</span>
        <span class="value">{{ userInfo.updatedAt }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">住址</span>
        <span class="value">{{ userInfo.residentialAddress }}</span>
      </div>
      <div class="prop" grid-col-span-3>
        <span class="label">头像：</span>
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
defineOptions({
  name: 'individual-detail'
})
const id = useRouteParams<string | number>('id')
// watch(id, () => {
//   executeGetUserAction()
// })

import { useUserStore } from '@/stores/modules/user'
const { getIndividualUser: getIndividualUserAction } = useUserStore()
const {
  state: userInfo,
  isLoading: getUserLoading,
  execute: executeGetUserAction
} = useAsyncState(
  () => getIndividualUserAction(id.value),
  {
    id: id.value,
    email: '',
    userType: UserType.Individual,
    status: UserStatus.Active,
    createdAt: '',
    updatedAt: '',
    fullName: '',
    identificationNumber: '',
    phoneNumber: '',
    gender: GenderType.Male,
    dateOfBirth: '',
    residentialAddress: ''
  },
  {
    immediate: false,
    onError: (e) => {
      const error = e as Error
      ElMessage.error(error.message)
    }
  }
)

onMounted(async () => {
  await executeGetUserAction()
})

import {
  USER_STATUS_MAP,
  USER_STATUS_COLOR_MAP,
  UserStatus,
  UserType
} from '@/constants/mapData/user'
const stautsColor = (status: UserStatus) => USER_STATUS_COLOR_MAP[status]
const statusLabel = (status: UserStatus) => USER_STATUS_MAP[status]

import { GENDER_TYPES_MAP, GENDER_TYPES_COLOR_MAP, GenderType } from '@/constants/mapData/user'
const genderColor = (gender: GenderType) => GENDER_TYPES_COLOR_MAP[gender]
const genderLabel = (gender: GenderType) => GENDER_TYPES_MAP[gender]
</script>

<style scoped lang="scss">
.individual-detail-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];

  .props-container {
    @apply grid grid-cols-3 gap-4;
  }
}
</style>
