<template>
  <el-dialog v-model="model" title="驳回原因" width="500" :close-on-click-modal="false">
    <el-skeleton :loading="geReasonLoading" animated>
      <template #template>
        <div class="main-container">
          <span class="label">驳回原因：</span>
          <div flex flex-col gap-2 mt-1>
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" max-w-30 />
          </div>
          <span class="label">驳回时间：</span>
          <el-skeleton-item variant="text" max-w-30 mt-1 />
          <span class="label">附件列表：</span>
          <div flex flex-col gap-2 mt-1>
            <div v-for="n in 3" :key="n">
              <el-skeleton-item variant="text" max-w-60 />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="main-container">
          <span class="label">驳回原因：</span>
          <span class="value">{{ lastRejectReason.reason }}</span>
          <span class="label">驳回时间：</span>
          <span class="value">{{ lastRejectReason.createTime }}</span>
          <span class="label">附件列表：</span>
          <div flex flex-col gap-2>
            <div v-for="item in lastRejectReason.fileList" :key="item.url" flex flex-row gap-2>
              <i-pepicons-pencil:file />
              <span>{{ item.fileName }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-dialog>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id: string | number }>()
const model = defineModel<boolean>()

watch(model, (val) => {
  if (val) {
    executeGetLastRejectReasonAction()
  }
})

import { useProductStore } from '@/stores/modules/product'
const { getLastRejectReason: getLastRejectReasonAction } = useProductStore()
const {
  state: lastRejectReason,
  isLoading: geReasonLoading,
  execute: executeGetLastRejectReasonAction
} = useAsyncState(
  () => getLastRejectReasonAction(id),
  {
    id: '',
    reason: '',
    fileList: [],
    createTime: ''
  },
  {
    immediate: false,
    throwError: true
  }
)
</script>

<style scoped lang="scss">
.main-container {
  @apply grid grid-cols-[100px_1fr] gap-4;

  .label {
    @apply text-sm text-[var(--text-label-color)];
  }

  .value {
    @apply text-sm;
  }
}
</style>
