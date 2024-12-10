<template>
  <el-drawer
    v-model="model"
    :direction="drawerDirection"
    :size="drawerSize"
    :with-header="false"
    :lock-scroll="drawerLockScroll"
    append-to-body
  >
    <!-- 用户信息部分 -->
    <div relative mb-4>
      <el-skeleton :loading="getUserInfoActionLoading" animated>
        <template #template>
          <div flex flex-row gap-4>
            <el-skeleton-item
              variant="circle"
              class="!w-14 !h-14"
            ></el-skeleton-item>
            <div flex flex-col gap-5>
              <el-skeleton-item variant="h1" class="!w-30"></el-skeleton-item>
              <el-skeleton-item variant="p" class="!w-15"></el-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <div v-if="userinfo" flex flex-row items-center>
            <el-avatar :size="60" :src="userinfo.avatar">
              <img :src="defaultUserAvatar" />
            </el-avatar>
            <div flex flex-col items-start ml-4 space-y-2>
              <span text-lg font-bold>{{
                userinfo.userType === UserType.Individual
                  ? userinfo.fullName
                  : userinfo.enterpriseName
              }}</span>
              <el-tag>{{ USER_TYPE_MAP[userinfo.userType] }}</el-tag>
            </div>
          </div>
          <div v-else>
            <el-button
              mt-5
              class="default-btn"
              type="default"
              size="large"
              round
              @click="navigateTo('/login')"
              >登录
              <i-solar:round-arrow-right-broken
                ml-2
                w-8
                h-8
              ></i-solar:round-arrow-right-broken
            ></el-button>
          </div>
        </template>
      </el-skeleton>

      <i-material-symbols-light:close
        absolute
        top-0
        right-0
        cursor-pointer
        select-none
        @click="closeDialog"
      ></i-material-symbols-light:close>
    </div>

    <el-divider />

    <div class="menu-container">
      <!-- 个人相关菜单 -->
      <div
        class="menu-item"
        v-for="(item, index) in mineMenus"
        :key="index"
        @click="navigateTo(item.path)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>

      <el-divider />

      <!-- 导航菜单 -->
      <div
        class="menu-item"
        v-for="(item, index) in mainMenus"
        :key="index"
        @click="navigateTo(item.path)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>

      <el-divider />

      <!-- 系统设置 -->
      <div
        class="menu-item"
        v-for="(item, index) in systemSettingMenus"
        :key="index"
        @click="handleSetting(item.path)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>

      <el-divider />

      <!-- 登出 -->
      <div class="menu-item logout" @click="handleSetting(logoutMenu.path)">
        <i :class="logoutMenu.icon"></i>
        <span>{{ logoutMenu.label }}</span>
      </div>
    </div>

    <setting-dialog v-model="isSettingDialogVisible" />
    <search-dialog v-model="isSearchDialogVisible" />
  </el-drawer>
</template>

<script setup lang="ts">
import SearchDialog from './Search/SearchDialog.vue'
import SettingDialog from './SettingDialog.vue'
import { useAccountStore } from '@/stores/modules/account'
import { UserType, USER_TYPE_MAP } from '@/types/register'
const defaultUserAvatar = new URL('@/assets/icon/user.png', import.meta.url)
  .href

const accountStore = useAccountStore()
const { userinfo } = storeToRefs(accountStore)
const { logout: logoutAction, getUserInfo: getUserInfoAction } = accountStore

import { useMenuStore } from '@/stores/modules/menu'
const menuStore = useMenuStore()
const { mainMenus, mineMenus, systemSettingMenus, logoutMenu } =
  storeToRefs(menuStore)
const {
  getMainMenus: getMainMenusAction,
  getMineMenus: getMineMenusAction,
  getSystemSettingMenus: getSystemSettingMenusAction,
  getLogoutMenu: getLogoutMenuAction,
} = menuStore

const {
  isLoading: getUserInfoActionLoading,
  execute: executeGetUserInfoAction,
} = useAsyncState(() => getUserInfoAction(), undefined, { immediate: false })

const model = defineModel<boolean>({ required: true })
const isSettingDialogVisible = ref(false)
const isSearchDialogVisible = ref(false)

const router = useRouter()
const navigateTo = (path: string) => {
  router.push(path)
  closeDialog()
}

const handleSetting = (action: string) => {
  switch (action) {
    case 'settings':
      isSettingDialogVisible.value = true
      break
    case 'search':
      isSearchDialogVisible.value = true
      break
    case 'logout':
      closeDialog()
      logoutAction()
    default:
      break
  }
}

const closeDialog = () => {
  model.value = false
}

const drawerSize = ref('300px')
const drawerDirection = ref<'rtl' | 'ltr' | 'ttb' | 'btt'>('rtl')
const drawerLockScroll = ref(false)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    drawerSize.value = '100%'
    drawerDirection.value = 'ttb'
    drawerLockScroll.value = true
  } else {
    drawerSize.value = '300px'
    drawerDirection.value = 'rtl'
    drawerLockScroll.value = false
  }
})

onMounted(() => {
  getMainMenusAction()
  getMineMenusAction()
  getSystemSettingMenusAction()
  getLogoutMenuAction()

  try {
    executeGetUserInfoAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.menu-container {
  @apply flex flex-col;

  @media (max-width: 40rem) {
    @apply items-center;
  }
}

.menu-item {
  @apply flex flex-row items-center my-2 cursor-pointer select-none hover:opacity-60;

  i {
    @apply w-5 h-5 mx-4;
  }

  span {
    @apply text-base;
  }

  @media (max-width: 40rem) {
    @apply my-1;

    i {
      @apply hidden;
    }

    span {
      @apply text-base;
    }
  }
}

.logout {
  @apply text-[var(--color-logout-text)];
}
</style>
