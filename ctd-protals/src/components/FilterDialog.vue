<template>
  <el-dialog
    class="filter-dialog-container"
    v-model="showModel"
    width="100%"
    :lock-scroll="true"
    title="筛选"
  >
    <div class="tab-container">
      <div
        v-for="(filter, index) in source"
        :key="filter.id"
        class="tab-item"
        :class="{ active: activeTab === String(index) }"
        @click="activeTab = String(index)"
      >
        {{ filter.label }}
      </div>
    </div>
    <div class="filter-items-container">
      <div
        v-for="item in selectedFilterItems"
        :key="item.id"
        class="filter-item"
        :class="{ selected: modelValue[source[parseInt(activeTab)].id] === item.id }"
        @click="onSelectFilterItem(item.id)"
      >
        {{ item.label }}
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/filter'

const { source } = defineProps<{
  source: IFilter[]
}>()
const showModel = defineModel<boolean>('show', { required: true })

// 这里是model，用于存储选中的筛选项，key是IFilter的id，value是选中的IFilterItem的id
const modelValue = defineModel<Record<string, string>>({ required: true })

// 当前激活的 tab
const activeTab = ref<string>('0')

// 获取选中的大分类下的筛选项
const selectedFilterItems = computed(() => {
  return source[parseInt(activeTab.value)]?.items || []
})

// 处理筛选项点击
const onSelectFilterItem = (itemId: string) => {
  modelValue.value[source[parseInt(activeTab.value)].id] = itemId
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (!isMobileDevice.value) {
    showModel.value = false
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  :global(.filter-dialog-container) {
    @apply flex flex-col fixed left-0 right-0 bottom-0 mb-0 h-80%;
  }

  :global(.filter-dialog-container .el-dialog__body) {
    @apply flex flex-row h-full;
  }
}

.tab-container {
  @apply flex flex-col w-25 ml--4 bg-gray-100;
}

.tab-item {
  @apply cursor-pointer text-center transition-colors p-4;
}

.tab-item.active {
  @apply bg-red-500 text-white;
}

.filter-items-container {
  @apply flex-1 self-start flex flex-row items-start justify-start flex-wrap gap-2 pl-4 overflow-y-auto;
}

.filter-item {
  @apply px-3 py-1 border-1 border-solid border-gray-300 rounded cursor-pointer text-sm;
}

.filter-item.selected {
  @apply bg-red-500 text-white;
}
</style>
