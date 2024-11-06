<template>
  <div class="security-info-root-container" gap-4>
    <span class="title">安全信息</span>
    <el-skeleton :loading="getSecurityInfoActionLoading" animated>
      <template #template>
        <div flex flex-col gap-4 mt-4>
          <el-skeleton-item
            v-for="n in 3"
            :key="n"
            variant="p"
            class="!w-50"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div mt-4 flex>
          <span class="label">最后登录日期：</span>
          {{ securityInfo.lastLoginDate }}
        </div>
        <div flex>
          <span class="label">登录设备：</span>
          {{ securityInfo.lastLoginDevice }}
        </div>
        <div flex>
          <span class="label">登录位置：</span>
          {{ securityInfo.lastLoginLocation }}
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { securityInfo } = storeToRefs(accountStore)
const { getSecurityInfo: getSecurityInfoAction } = accountStore

const {
  isLoading: getSecurityInfoActionLoading,
  execute: executeGetSecurityInfoAction,
} = useAsyncState(getSecurityInfoAction, undefined, {
  immediate: false,
  throwError: true,
})

onMounted(() => {
  try {
    executeGetSecurityInfoAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.security-info-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .label {
    @apply block text-[--color-text-lighter] min-w-30;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
