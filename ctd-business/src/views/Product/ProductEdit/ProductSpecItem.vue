<template>
  <div class="product-spec-item-root-container">
    <el-form-item label="规格名称" prop="label">
      <el-input v-model="modelLabel" placeholder="请输入" :validate-event="false" />
    </el-form-item>
    <el-form-item label="价格项" prop="children">
      <div flex flex-row flex-wrap gap-2>
        <el-tag
          v-for="item in modelChildren"
          :key="item.id"
          closable
          @close="handleTagDelete(item.id)"
        >
          {{ item.label }}
        </el-tag>
        <el-input
          class="!w-20"
          v-if="tagInputVisible"
          ref="tagInputRef"
          v-model="customTag"
          size="small"
          @keyup.enter="addCustomTag"
          @blur="addCustomTag"
        />
        <el-button v-if="!tagInputVisible" type="primary" size="small" @click="showTagInput">
          + 添加项
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="价格相关" prop="affectsPrice" v-if="modelChildren.length > 0">
      <el-switch v-model="modelAffectsPrice" />
    </el-form-item>
    <el-button self-end type="danger" class="w-20" @click="handleDelete">删除</el-button>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { IProductSpec } from '@/types/product'

const { id } = defineProps<{ id: number | string }>()

const modelLabel = defineModel<string>('label')
const modelAffectsPrice = defineModel<boolean>('affectsPrice')
const modelChildren = defineModel<IProductSpec[]>('children', { default: [] })

const customTag = ref('')
const tagInputVisible = ref(false)
const tagInputRef = ref()
const showTagInput = () => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value!.focus()
  })
}

const addCustomTag = () => {
  const tag = customTag.value.trim()
  if (tag) {
    if (!modelChildren.value.some((item) => item.label === tag)) {
      modelChildren.value.push({
        id: uuidv4(),
        label: tag
      })
      tagInputVisible.value = false
      customTag.value = ''
    } else {
      ElMessage.warning('该项已存在')
    }
  } else {
    ElMessage.warning('不能为空')
  }
  tagInputVisible.value = false
  customTag.value = ''
}

const handleTagDelete = (id: string) => {
  const index = modelChildren.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    if (modelChildren.value.length === 1 && modelAffectsPrice.value === true) {
      ElMessage.warning('当价格相关时，最后一个规格项不能删除')
    } else {
      modelChildren.value.splice(index, 1)
    }
  }
}

const emit = defineEmits<{
  (e: 'delete', id: number | string): void
}>()
const handleDelete = () => {
  emit('delete', id)
}
</script>

<style scoped lang="scss">
.product-spec-item-root-container {
  @apply flex flex-col p-5 max-w-120 rounded border border-dashed border-[var(--border-color)];
}
</style>
