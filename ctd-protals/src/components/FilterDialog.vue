<template>
  <el-dialog
    class="filter-dialog-container"
    v-model="showModel"
    width="100%"
    :lock-scroll="true"
    title="筛选"
  >
    <div flex flex-row>
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
      <div class="filter-items-container flex-1">
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
</script>

<style lang="scss" scoped>
.wrap {
  :global(.filter-dialog-container) {
    @media (max-width: 40rem) {
      @apply fixed left-0 right-0 bottom-0 mb-0;
    }
  }
}

.tab-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tab-item {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
}

.tab-item.active {
  background-color: #409eff;
  color: white;
}

.filter-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 20px;
}

.filter-item {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
  text-align: center;
  width: 100px;
}

.filter-item.selected {
  background-color: #409eff;
  color: white;
}
</style>
