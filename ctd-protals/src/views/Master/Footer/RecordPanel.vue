<template>
  <div class="record-panel-root-container">
    <div class="main-panel">
      <el-skeleton :loading="getRecordsActionLoading" animated class="!w-auto">
        <template #template>
          <div class="left-list">
            <el-skeleton-item variant="p" class="!w-50"></el-skeleton-item>
            <el-skeleton-item variant="p" class="!w-50"></el-skeleton-item>
          </div>
        </template>
        <template #default>
          <div class="left-list">
            <span class="item" v-for="item in records" :key="item">{{ item }}</span>
          </div>
        </template>
      </el-skeleton>
      <el-skeleton :loading="getCopyrightActionLoading" animated class="!w-auto">
        <template #template>
          <el-skeleton-item variant="p" class="!w-60"></el-skeleton-item>
        </template>
        <template #default>
          <span class="item">{{ copyright }}</span>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMasterStore } from '@/stores/modules/master'
const masterStore = useMasterStore()
const { records, copyright } = storeToRefs(masterStore)
const { getRecords: getRecordsAction, getCopyright: getCopyrightAction } = masterStore

const { isLoading: getRecordsActionLoading, execute: executeGetRecordsAction } = useAsyncState(
  getRecordsAction(),
  undefined
)

const { isLoading: getCopyrightActionLoading, execute: executeGetCopyrightAction } = useAsyncState(
  getCopyrightAction(),
  undefined
)

onMounted(() => {
  try {
    executeGetRecordsAction()
    executeGetCopyrightAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.record-panel-root-container {
  @apply flex flex-col items-center w-full bg-[var(--color-background-darkest)] text-[var(--color-text-reverse)];

  .main-panel {
    @apply flex flex-row flex-wrap gap-4 justify-between items-center w-full px-10 py-4;

    .left-list {
      @apply flex flex-row flex-wrap gap-4;
    }

    .item {
      @apply text-sm;
    }
  }

  @media (max-width: 40rem) {
    .main-panel {
      @apply px-5;
    }
  }
}
</style>
