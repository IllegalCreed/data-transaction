<template>
  <div class="product-tag-panel-root-container">
    <el-tag v-for="tag in tags" :key="tag" closable @close="handleTagClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input
      class="!w-20"
      v-if="tagInputVisible"
      ref="TagInputRef"
      v-model="customTag"
      size="small"
      @keyup.enter="addCustomTag"
      @blur="addCustomTag"
    />
    <el-button
      v-if="!tagInputVisible && !isTagLimitReached"
      type="primary"
      size="small"
      @click="showTagInput"
    >
      + 添加标签
    </el-button>
  </div>
</template>

<script setup lang="ts">
const tags = defineModel('tags', { default: [] as string[] })
const { maxTags = 5 } = defineProps<{ maxTags: number }>()

const customTag = ref('')
const tagInputVisible = ref(false)
const tagInputRef = useTemplateRef('TagInputRef')
const isTagLimitReached = computed(() => tags.value.length >= maxTags)
const showTagInput = () => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value!.input!.focus()
  })
}
const addCustomTag = () => {
  const tag = customTag.value.trim()
  if (tag) {
    if (!tags.value.includes(tag)) {
      if (tags.value.length < maxTags) {
        tags.value.push(tag)
        tagInputVisible.value = false
        customTag.value = ''
      }
    } else {
      ElMessage.warning('该标签已存在')
    }
  } else {
    ElMessage.warning('请输入标签')
  }
  tagInputVisible.value = false
  customTag.value = ''
}
const handleTagClose = (tag: string) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}
</script>

<style lang="scss" scoped>
.product-tag-panel-root-container {
  @apply flex flex-row flex-wrap gap-2;
}
</style>
