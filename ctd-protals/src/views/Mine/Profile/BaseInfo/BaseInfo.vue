<template>
  <div class="basic-info-root-container">
    <span class="title">基本信息</span>
    <div class="content" mt-4>
      <div><strong>账号：</strong> {{ email }}</div>
      <div class="btn-container">
        <el-button type="primary" size="default" @click="changePasswordDialogVisiable = true"
          >修改密码</el-button
        >
        <el-button type="default" size="default" @click="changeEmailDialogVisiable = true"
          >修改验证邮箱</el-button
        >
      </div>
    </div>

    <change-password-dialog v-model="changePasswordDialogVisiable" />
    <change-email-dialog v-model="changeEmailDialogVisiable" />
  </div>
</template>

<script setup lang="ts">
import ChangePasswordDialog from './ChangePasswordDialog.vue'
import ChangeEmailDialog from './ChangeEmailDialog.vue'
const email = ref('user@example.com')

const changePasswordDialogVisiable = ref(false)
const changeEmailDialogVisiable = ref(false)
</script>

<style lang="scss" scoped>
.basic-info-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md;

  .title {
    @apply text-xl font-bold;
  }

  .content {
    @apply flex flex-row items-center gap-y-4 justify-between;

    .btn-container {
      @apply flex flex-row gap-x-2;
    }

    @media (max-width: 40rem) {
      @apply flex-col items-start;

      .btn-container {
        @apply flex-col gap-x-0 gap-y-2;

        button {
          @apply ml-0 w-40;
        }
      }
    }
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
