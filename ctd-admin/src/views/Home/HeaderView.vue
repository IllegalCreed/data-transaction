<template>
  <div class="header-root-container">
    <span class="logo">LOGO</span>
    <div flex flex-row items-center space-x-4>
      <div flex justify-center items-center h-12 w-12 rounded-full class="bg-white/80">
        <i-fa-solid:user h-6 w-6 color-white></i-fa-solid:user>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div flex flex-row items-center space-x-2>
          <span class="user-text" cursor-pointer>欢迎，管理员 </span>
          <i-mingcute:down-line color-white></i-mingcute:down-line>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="change">修改密码</el-dropdown-item>
            <el-dropdown-item command="setting">外观设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-switch v-model="darkModeEnabled">
        <template #active-action>
          <i-material-symbols-light:dark-mode />
        </template>
        <template #inactive-action>
          <i-material-symbols-light:light-mode color-yellow />
        </template>
      </el-switch>
    </div>
  </div>

  <reset-password-dialog v-model="isResetPasswordDialogVisible" />
  <setting-dialog v-model="isSettingDialogVisible" />
</template>

<script setup lang="ts">
import ResetPasswordDialog from './ResetPasswordDialog.vue'
import SettingDialog from './SettingDialog.vue'
import { useAccountStore } from '@/stores/modules/account'

const { logout } = useAccountStore()
const isSettingDialogVisible = ref(false)
const isResetPasswordDialogVisible = ref(false)

const handleCommand = (command: string) => {
  switch (command) {
    case 'logout':
      logout()
      break
    case 'change':
      isResetPasswordDialogVisible.value = true
      break
    case 'setting':
      isSettingDialogVisible.value = true
      break
    default:
  }
}
import { useSettingsStore } from '@/stores/modules/settings'
const settingStore = useSettingsStore()
const { darkModeEnabled } = storeToRefs(settingStore)
</script>

<style scoped lang="scss">
.header-root-container {
  @apply: flex flex-row items-center justify-between px-10 h-20 relative bg-[var(--background-header-color)];

  :deep(.el-switch.is-checked .el-switch__core) {
    background-color: var(--el-switch-off-color);
    border-color: var(--el-switch-border-color, var(--el-switch-off-color));
  }

  .logo {
    @apply text-4xl font-bold text-[var(--text-white-color)];
  }

  .user-text {
    @apply text-[var(--text-white-color)];
  }

  .user-text:hover {
    @apply text-[var(--text-white-highlight-color)];
  }
}
</style>
