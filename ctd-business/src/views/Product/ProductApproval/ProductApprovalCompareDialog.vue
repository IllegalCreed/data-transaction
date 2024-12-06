<template>
  <el-dialog
    v-model="model"
    title="版本比较"
    width="80%"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <product-approval-compare-panel :product-id="productId" :source="source" :target="target" />
    <template #footer>
      <div>
        <el-button @click="model = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import ProductApprovalComparePanel from './ProductApprovalComparePanel.vue'

defineProps<{
  productId: number | string
  source: number | string
  target: number | string
}>()

const model = defineModel<boolean>()
</script>

<style scoped lang="scss"></style>
