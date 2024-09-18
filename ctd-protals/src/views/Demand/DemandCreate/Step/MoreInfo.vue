<template>
  <div class="tag-selector">
    <!-- 已选择的标签 -->
    <div class="selected-tags">
      <el-tag v-for="tag in selectedTags" :key="tag" closable @close="removeTag(tag)">
        {{ tag }}
      </el-tag>
    </div>

    <!-- 热门标签选择 -->
    <div class="popular-tags">
      <span>热门标签：</span>
      <el-checkbox-group v-model="checkedPopularTags" @change="updateSelectedTags">
        <el-checkbox
          v-for="tag in popularTags"
          :key="tag"
          :label="tag"
          :disabled="isTagLimitReached && !checkedPopularTags.includes(tag)"
        >
          {{ tag }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 自定义标签添加 -->
    <div class="custom-tag-input">
      <el-input
        v-model="customTag"
        placeholder="输入自定义标签后按回车添加"
        @keyup.enter="addCustomTag"
        :disabled="isTagLimitReached"
      ></el-input>
    </div>

    <div class="step-btn-container">
      <el-button class="step-btn" type="primary" @click="handlePrevStep">上一步</el-button>
      <el-button class="step-btn" type="primary" @click="handleComplete">提交申请</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTag, ElCheckboxGroup, ElCheckbox, ElInput } from 'element-plus'

// 热门标签列表
const popularTags = [
  'JavaScript',
  'Vue.js',
  'Element Plus',
  'CSS',
  'HTML',
  'TypeScript',
  'Node.js',
  'Webpack'
]

// 已选择的标签
const selectedTags = ref<string[]>([])

// 选中的热门标签
const checkedPopularTags = ref<string[]>([])

// 自定义标签输入
const customTag = ref('')

// 标签数量限制
const maxTags = 5

// 计算属性：是否达到标签数量限制
const isTagLimitReached = computed(() => selectedTags.value.length >= maxTags)

// 更新已选择的标签列表
const updateSelectedTags = () => {
  selectedTags.value = [...new Set([...checkedPopularTags.value, ...customTags.value])]
}

// 自定义标签列表
const customTags = ref<string[]>([])

// 添加自定义标签
const addCustomTag = () => {
  const tag = customTag.value.trim()
  if (tag && !selectedTags.value.includes(tag)) {
    if (selectedTags.value.length < maxTags) {
      customTags.value.push(tag)
      updateSelectedTags()
      customTag.value = ''
    }
  } else {
    customTag.value = ''
  }
}

// 移除标签
const removeTag = (tag: string) => {
  // 从已选择的标签中移除
  selectedTags.value = selectedTags.value.filter((t) => t !== tag)

  // 更新热门标签的选择状态
  checkedPopularTags.value = checkedPopularTags.value.filter((t) => t !== tag)

  // 从自定义标签中移除
  customTags.value = customTags.value.filter((t) => t !== tag)
}

const emit = defineEmits(['complete', 'prevStep'])
const handleComplete = () => {
  emit('complete')
}

const handlePrevStep = () => {
  emit('prevStep')
}
</script>

<style lang="scss" scoped>
.tag-selector {
  .selected-tags {
    margin-bottom: 20px;
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .popular-tags {
    margin-bottom: 20px;
    .el-checkbox {
      margin-right: 10px;
      margin-top: 10px;
    }
  }
  .custom-tag-input {
    max-width: 300px;
  }
}

.step-btn-container {
  @apply flex flex-row items-center self-center mt-10;

  .step-btn {
    @apply w-30 mb-10;
  }
}
</style>
