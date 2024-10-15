<template>
  <el-dialog
    class="setting-dialog-container"
    v-model="model"
    title="系统设置"
    :width="dialogWidth"
    :lock-scroll="false"
  >
    <!-- 语言选择 -->
    <div class="setting-item">
      <span>选择语言</span>
      <el-select
        v-model="selectedLanguage"
        placeholder="请选择语言"
        @change="changeLanguage"
        max-w-30
      >
        <el-option
          v-for="lang in languages"
          :key="lang.key"
          :label="lang.content"
          :value="lang.key"
        ></el-option>
      </el-select>
    </div>

    <!-- 深色模式开关 -->
    <div class="setting-item">
      <span>深色模式</span>
      <el-switch v-model="isDarkMode" @change="toggleDarkMode"></el-switch>
    </div>

    <!-- 深色模式开关 -->
    <div class="setting-item">
      <span>模拟数据</span>
      <el-switch v-model="isMock" @change="toggleMock"></el-switch>
    </div>

    <!-- 水印开关 -->
    <div class="setting-item">
      <span>测试水印(debug)</span>
      <el-switch v-model="isWatermark" @change="toggleWatermark"></el-switch>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/modules/settings'
const {
  currentLanguage,
  setLanguage,
  getLanguageArray,
  darkModeEnabled,
  setDarkMode,
  watermarkEnabled,
  setWatermark,
  mockEnabled,
  setMock
} = useSettingsStore()

const model = defineModel<boolean>({ required: true })

// 获取语言列表
const languages = getLanguageArray()

const isMock = ref(mockEnabled)
const isDarkMode = ref(darkModeEnabled)
const isWatermark = ref(watermarkEnabled)
const selectedLanguage = ref(currentLanguage)

// 切换深色模式
const toggleMock = (val: unknown) => {
  setMock(val as boolean)
}

// 切换深色模式
const toggleDarkMode = (val: unknown) => {
  setDarkMode(val as boolean)
}

// 切换水印
const toggleWatermark = (val: unknown) => {
  setWatermark(val as boolean)
}

// 切换语言
const changeLanguage = (val: unknown) => {
  setLanguage(val as string)
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const dialogWidth = ref('30rem')
// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    dialogWidth.value = '100%'
  } else {
    dialogWidth.value = '30rem'
  }
})
</script>

<style scoped lang="scss">
:global(.setting-dialog-container) {
  @media (max-width: 40rem) {
    @apply fixed left-0 right-0 bottom-0 mb-0 min-w-80;
  }
}

.setting-item {
  @apply flex flex-row items-center justify-between mb-4;
}
</style>
