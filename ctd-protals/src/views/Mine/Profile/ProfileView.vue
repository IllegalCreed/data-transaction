<template>
  <div class="profile-root-container">
    <!-- <el-button
      w-50
      self-end
      type="primary"
      size="small"
      @click="handleSetMockInfoType"
      >测试按钮，切换个人/企业</el-button
    > -->

    <base-info :loading="getUserInfoActionLoading" />
    <el-divider></el-divider>
    <el-skeleton :loading="getUserInfoActionLoading" animated>
      <template #template></template>
      <template #default>
        <personal-info
          v-if="userinfo?.userType === UserType.Individual"
        ></personal-info>
        <company-info v-else></company-info>
      </template>
    </el-skeleton>
    <el-divider></el-divider>
    <security-info />
    <el-divider></el-divider>
    <payment-info />
  </div>
</template>

<script setup lang="ts">
import BaseInfo from './BaseInfo/BaseInfo.vue'
import PersonalInfo from './PersonalInfo/PersonalInfo.vue'
import CompanyInfo from './CompanyInfo/CompanyInfo.vue'
import SecurityInfo from './SecurityInfo/SecurityInfo.vue'
import PaymentInfo from './Payment/PaymentInfo.vue'
import { UserType } from '@/types/register'

import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { userinfo } = storeToRefs(accountStore)
const { getUserInfo: getUserInfoAction } = accountStore

// const { mockInfoType } = storeToRefs(accountStore)
// const { setMockInfoType: setMockInfoTypeAction } = accountStore
// const handleSetMockInfoType = () => {
//   setMockInfoTypeAction(
//     mockInfoType.value === UserType.Individual
//       ? UserType.Enterprise
//       : UserType.Individual,
//   )
//   executeGetUserInfoAction()
// }

const {
  isLoading: getUserInfoActionLoading,
  execute: executeGetUserInfoAction,
} = useAsyncState(getUserInfoAction, undefined, {
  immediate: false,
  throwError: true,
})

onMounted(() => {
  try {
    executeGetUserInfoAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.profile-root-container {
  @apply flex flex-col p-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
