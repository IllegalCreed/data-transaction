<template>
  <el-drawer
    v-model="model"
    :direction="drawerDirection"
    :size="drawerSize"
    :with-header="false"
    :lock-scroll="drawerLockScroll"
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
        v-for="(item, index) in personalMenuItems"
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
        v-for="(item, index) in moduleMenuLinks"
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
      <el-button type="danger" @click="logout">登出</el-button>
    </div>

    <setting-dialog v-model="isSettingDialogVisible" />
    <search-dialog v-model="isSearchDialogVisible" />
  </el-drawer>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/modules/menu'
import { useAccountStore } from '@/stores/modules/account'
import SearchDialog from './SearchDialog.vue'
import SettingDialog from './SettingDialog.vue'

const { logout: logoutAction } = useAccountStore()

const model = defineModel<boolean>({ required: true })
const isSettingDialogVisible = ref(false)
const isSearchDialogVisible = ref(false)

const { moduleMenuLinks } = useMenuStore()

// 用户信息模拟数据
const user = {
  avatar: 'https://via.placeholder.com/100',
  name: '张三',
  role: '普通用户'
}

// 个人相关菜单
const personalMenuItems = [
  { path: '/profile', label: '个人资料', icon: 'i-vaadin:user' },
  { path: '/cart', label: '我的购物车', icon: 'i-vaadin:cart' },
  { path: '/orders', label: '我的订单', icon: 'i-mdi:clipboard-list-outline' },
  { path: '/addresses', label: '我的需求', icon: 'i-mdi:map-marker-outline' },
  { path: '/favorites', label: '我的收藏', icon: 'i-vaadin:star' },
  { path: '/comments', label: '我的评论', icon: 'i-vaadin:comment' }
]

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

// 监听窗口大小变化
const handleResize = () => {
  if (window.matchMedia('(max-width: 40rem)').matches) {
    drawerSize.value = '100%'
    drawerDirection.value = 'ttb'
    drawerLockScroll.value = true
  } else {
    drawerSize.value = '300px'
    drawerDirection.value = 'rtl'
    drawerLockScroll.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
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
    i {
      @apply hidden;
    }

    span {
      @apply text-xl;
    }
  }
}
</style>
