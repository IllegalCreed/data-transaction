<template>
  <div class="moreinfo-root-container">
    <span text-2xl font-bold mb-5>请选择您的标签</span>

    <span text-lg font-bold mb-4>已选择的标签</span>
    <div class="selected-tags">
      <el-tag v-for="tag in selectedTags" :key="tag" closable @close="removeTag(tag)">
        {{ tag }}
      </el-tag>
    </div>

    <span text-lg font-bold mb-4>热门标签</span>

    <el-checkbox-group class="popular-tags" v-model="checkedPopularTags">
      <el-checkbox
        v-for="tag in popularTags"
        :key="tag"
        :value="tag"
        :disabled="isTagLimitReached && !checkedPopularTags.includes(tag)"
      >
        {{ tag }}
      </el-checkbox>
    </el-checkbox-group>

    <span text-lg font-bold mb-4>自定义标签</span>
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
import { ElMessage } from 'element-plus'
import { useDemandStore } from '@/stores/modules/demand'
const { customTags, checkedPopularTags, selectedTags } = storeToRefs(useDemandStore())

const popularTags = ['开发', '技术', '人工智能', '机器学习', '数据', '咨询', '营销', '培训']
const customTag = ref('')
const maxTags = 5

// 计算属性：是否达到标签数量限制
const isTagLimitReached = computed(() => selectedTags.value.length >= maxTags)

// 添加自定义标签
const addCustomTag = () => {
  const tag = customTag.value.trim()
  if (tag && !selectedTags.value.includes(tag)) {
    if (selectedTags.value.length < maxTags) {
      customTags.value.push(tag)
      customTag.value = ''
    }
  } else {
    ElMessage.warning('该标签已存在')
    customTag.value = ''
  }
}

// 移除标签
const removeTag = (tag: string) => {
  // 从热门标签中移除
  const indexInPopular = checkedPopularTags.value.indexOf(tag)
  if (indexInPopular !== -1) {
    checkedPopularTags.value.splice(indexInPopular, 1)
  }

  // 从自定义标签中移除
  const indexInCustom = customTags.value.indexOf(tag)
  if (indexInCustom !== -1) {
    customTags.value.splice(indexInCustom, 1)
  }
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
.moreinfo-root-container {
  @apply flex flex-col;

  .selected-tags {
    @apply flex flex-row flex-wrap gap-2 mb-5 bg-gray-100 w-full min-h-14 p-4;
  }

  .popular-tags {
    @apply flex flex-row flex-wrap gap-4 mb-5;
  }

  .custom-tag-input {
    @apply max-w-60;
  }
}

.step-btn-container {
  @apply flex flex-row items-center self-center mt-10;

  .step-btn {
    @apply w-30 mb-10;
  }
}
</style>
