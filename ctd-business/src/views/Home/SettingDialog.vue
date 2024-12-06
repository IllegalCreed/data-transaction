<template>
  <el-dialog v-model="model" title="系统设置" :width="500" :lock-scroll="false">
    <!-- 语言选择 -->
    <div class="setting-item">
      <span>选择语言</span>
      <el-select v-model="currentLanguage" placeholder="请选择语言" max-w-30>
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
      <el-switch v-model="darkModeEnabled"></el-switch>
    </div>

    <!-- 模拟数据开关 -->
    <div class="setting-item">
      <span>模拟数据</span>
      <el-switch v-model="mockEnabled"></el-switch>
    </div>

    <!-- 水印开关 -->
    <div class="setting-item">
      <span>测试水印(debug)</span>
      <el-switch v-model="watermarkEnabled"></el-switch>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/modules/settings'
const settingStore = useSettingsStore()
const { currentLanguage, darkModeEnabled, watermarkEnabled, mockEnabled } =
  storeToRefs(settingStore)
const { getLanguageArray } = settingStore

const model = defineModel<boolean>({ required: true })

// 获取语言列表
const languages = getLanguageArray()
</script>

<style scoped lang="scss">
.setting-item {
  @apply flex flex-row items-center justify-between mb-4;
}
</style>
