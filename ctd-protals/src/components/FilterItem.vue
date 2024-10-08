<template>
  <div class="filter-item-root-container">
    <label class="title">{{ data.label }}：</label>
    <div class="content" ref="contentRef">
      <div v-for="item in data.items" :key="item.id" @click="selectItem(item.id)">
        <span :class="{ selected: model === item.id }">{{ item.label }}</span>
      </div>
    </div>
    <el-link v-if="isToggleVisible" @click="toggle" :underline="false" class="toggle-button">
      {{ isCollapsed ? '收起' : '展开' }}
      <i-mingcute:down-line v-if="!isCollapsed" ml-2></i-mingcute:down-line>
      <i-mingcute:up-line v-else ml-2></i-mingcute:up-line>
    </el-link>
  </div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/types/filter'

defineProps<{
  data: IFilter
}>()

const model = defineModel<string>({
  required: true
})

const isCollapsed = ref(false)
const isToggleVisible = ref(false)
const contentRef = ref<HTMLElement | null>(null)

const toggle = () => {
  isCollapsed.value = !isCollapsed.value
  if (contentRef.value) {
    if (isCollapsed.value) {
      contentRef.value.style.maxHeight = `${contentRef.value.scrollHeight}px`
    } else {
      contentRef.value.style.maxHeight = '3rem'
    }
  }
}

const checkToggleVisibility = () => {
  if (contentRef.value) {
    isToggleVisible.value = contentRef.value.scrollHeight > remToPx(3)
  }
}

const selectItem = (id: string) => {
  model.value = id
}

onMounted(() => {
  nextTick(() => {
    checkToggleVisibility()
  })
})

const { width } = useElementSize(contentRef)
watch(width, checkToggleVisibility)
</script>

<style scoped lang="scss">
.filter-item-root-container {
  @apply flex flex-row;

  .title {
    @apply flex flex-row items-center w-25 h-12 text-[var(--color-text-lighter)];
  }

  .content {
    @apply flex flex-row flex-1 flex-wrap items-center overflow-hidden transition-[max-height] duration-300 ease-in-out;
    max-height: 3rem;

    div {
      @apply flex justify-center items-center h-12 p-2 cursor-pointer;

      span {
        @apply px-3 py-1 border-2 border-solid border-transparent;
      }

      .selected {
        @apply text-[var(--color-primary)] font-bold;
      }
    }
  }

  .toggle-button {
    @apply mt-4 pl-4 self-start;
  }
}
</style>
