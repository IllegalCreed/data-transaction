<template>
  <div class="link-panel-root-container">
    <span class="link-title">友情链接</span>
    <el-skeleton :loading="getLinksActionLoading" animated>
      <template #template>
        <div flex flex-col>
          <el-skeleton-item
            v-for="n in 8"
            :key="n"
            variant="p"
            mt-2
            class="!max-w-50"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <a
          class="link-item"
          v-for="item of links"
          :key="item.id"
          :href="item.link"
          >{{ item.title }}</a
        >
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useMasterStore } from '@/stores/modules/master'
const masterStore = useMasterStore()
const { links } = storeToRefs(masterStore)
const { getLinks: getLinksAction } = masterStore

const { isLoading: getLinksActionLoading, execute: executeGetLinksAction } =
  useAsyncState(getLinksAction(), undefined, {
    immediate: false,
    throwError: true,
  })

onMounted(async () => {
  try {
    await executeGetLinksAction()
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error('获取友情链接失败')
    }
  }
})
</script>

<style scoped lang="scss">
.link-panel-root-container {
  @apply flex flex-col;

  .link-title {
    @apply text-2xl font-bold mb-3;
  }

  .link-item {
    @apply text-base text-[var(--color-text-light)] no-underline hover:underline break-all my-1;
  }

  @media (max-width: 40rem) {
    .link-title {
      @apply text-lg;
    }

    .link-item {
      @apply text-sm;
    }
  }
}
</style>
