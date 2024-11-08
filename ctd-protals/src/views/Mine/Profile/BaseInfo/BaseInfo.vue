<template>
  <div class="basic-info-root-container">
    <span class="title">基本信息</span>
    <el-skeleton :loading="getUserInfoActionLoading" animated>
      <template #template>
        <div flex flex-row items-center justify-between pt-6>
          <el-skeleton-item variant="p" class="!w-60"></el-skeleton-item>
          <div flex flex-row items-center gap-4>
            <el-skeleton-item
              v-for="n in 2"
              :key="n"
              variant="rect"
              class="!h-8 !w-30"
            ></el-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div class="content" mt-6>
          <div flex>
            <span class="label">用户名：</span> {{ userinfo?.userName }}
          </div>
          <div class="btn-container">
            <el-button
              type="primary"
              size="default"
              @click="changePasswordDialogVisiable = true"
              >修改密码</el-button
            >
            <el-button
              type="default"
              size="default"
              @click="changeEmailDialogVisiable = true"
              >修改验证邮箱</el-button
            >
          </div>
        </div>

        <change-password-dialog v-model="changePasswordDialogVisiable" />
        <change-email-dialog v-model="changeEmailDialogVisiable" />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import ChangePasswordDialog from './ChangePasswordDialog.vue'
import ChangeEmailDialog from './ChangeEmailDialog.vue'
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { userinfo } = storeToRefs(accountStore)
const { getUserInfo: getUserInfoAction } = accountStore

const changePasswordDialogVisiable = ref(false)
const changeEmailDialogVisiable = ref(false)

const {
  isLoading: getUserInfoActionLoading,
  execute: executeGetUserInfoAction,
} = useAsyncState(() => getUserInfoAction(), undefined, { immediate: false })

onMounted(() => {
  try {
    executeGetUserInfoAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.basic-info-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .label {
    @apply text-[--color-text-lighter] min-w-30;
  }

  .content {
    @apply flex flex-row items-center gap-y-4 justify-between;

    .btn-container {
      @apply flex flex-row gap-x-2;

      button {
        @apply w-30;
      }
    }

    @media (max-width: 40rem) {
      @apply flex-col items-start;

      .btn-container {
        @apply self-end flex-col mt-4 gap-x-0 gap-y-2;

        button {
          @apply ml-0 w-30;
        }
      }
    }
  }
}
</style>
