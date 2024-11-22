<template>
  <div class="product-spec-panel-root-container">
    <span text-sm>规格列表</span>
    <product-spec-item
      v-for="item in specs"
      :key="item.id"
      :id="item.id"
      @delete="handleSpecGroupDelete"
      v-model:children="item.children"
      v-model:label="item.label"
      v-model:affectsPrice="item.affectsPrice"
    />
    <div flex flex-row gap-4 max-w-120>
      <el-input
        v-model="newSpecGroupLabel"
        placeholder="输入规格名称回车添加"
        @keyup.enter="newSpecGroup"
      />
      <el-button type="primary" @click="newSpecGroup"> + 添加规格 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductSpecItem from './ProductSpecItem.vue'
import type { IProductSpecGroup } from '@/types/product'
import { v4 as uuidv4 } from 'uuid'

const specs = defineModel('specs', { default: [] as IProductSpecGroup[] })
const mainSpecGroupId = defineModel('mainSpecGroupId')

const newSpecGroupLabel = ref('')
const newSpecGroup = () => {
  if (newSpecGroupLabel.value) {
    specs.value.push({
      id: uuidv4(),
      label: newSpecGroupLabel.value,
      affectsPrice: false,
      children: []
    })
    newSpecGroupLabel.value = ''
  } else {
    ElMessage.warning('请输入规格名称')
  }
}

const handleSpecGroupDelete = (id: string | number) => {
  const index = specs.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    specs.value.splice(index, 1)

    // 检查被删除的规格组是否是当前的主规格
    if (mainSpecGroupId.value === id) {
      const nextMainSpecGroup = specs.value.find((item) => item.affectsPrice === true)
      if (nextMainSpecGroup) {
        mainSpecGroupId.value = nextMainSpecGroup.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-spec-panel-root-container {
  @apply flex flex-col gap-4 mb-5;
}
</style>
