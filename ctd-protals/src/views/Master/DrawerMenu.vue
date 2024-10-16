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
    <div flex flex-row items-center mb-4>
      <img w-14 h-14 rounded-full :src="user.avatar" />
      <div flex flex-col ml-4 space-y-2>
        <span text-lg font-bold>{{ user.name }}</span>
        <el-tag>{{ user.role }}</el-tag>
      </div>
      <div flex-1></div>
      <i-material-symbols-light:close
        self-start
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
        v-for="(item, index) in systemSettings"
        :key="index"
        @click="handleSetting(item.action)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>

      <el-divider />

      <!-- 登出 -->
      <el-button type="danger" min-w-30 @click="logout">登出</el-button>
    </div>

    <setting-dialog v-model="isSettingDialogVisible" />
    <search-dialog v-model="isSearchDialogVisible" />
  </el-drawer>
</template>

<script setup lang="ts">
import SearchDialog from './Search/SearchDialog.vue'
import SettingDialog from './SettingDialog.vue'
import { useAccountStore } from '@/stores/modules/account'
const { logout: logoutAction } = useAccountStore()
import { useMenuStore } from '@/stores/modules/menu'
const menuStore = useMenuStore()
const { mainMenus, mineMenus } = storeToRefs(menuStore)
const { getMainMenus: getMainMenusAction, getMineMenus: getMineMenusAction } = menuStore

const model = defineModel<boolean>({ required: true })
const isSettingDialogVisible = ref(false)
const isSearchDialogVisible = ref(false)

// 用户信息模拟数据
const user = {
  avatar: 'https://via.placeholder.com/100',
  name: '张三',
  role: '普通用户'
}

// 系统设置
const systemSettings = [
  { label: '系统设置', icon: 'i-vaadin:cog', action: 'settings' },
  { label: '全局搜索', icon: 'i-vaadin:search', action: 'search' }
]

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
    default:
      break
  }
}

const closeDialog = () => {
  model.value = false
}

const logout = () => {
  closeDialog()
  logoutAction()
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
    @apply w-3 h-3 mx-4;
  }

  span {
    @apply text-sm;
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
</style>
