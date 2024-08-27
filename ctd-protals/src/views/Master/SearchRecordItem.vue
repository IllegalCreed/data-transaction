<template>
  <el-card
    shadow="hover"
    class="search-record-item"
    body-class="search-record-item-body-container"
    @click="navigateToDetail"
  >
    <div class="icon-container">
      <i :class="iconClass" w-5 h-5></i>
    </div>
    <div flex-1 flex flex-col>
      <div flex flex-row items-center justify-between space-x-4>
        <span class="title">{{ title }}</span>
        <el-tag :type="tagType">{{ moduleTag }}</el-tag>
      </div>
      <span class="description">{{ description }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  module:
    | 'data-trading'
    | 'data-services'
    | 'asset-catalog'
    | 'asset-consulting'
    | 'data-ecosystem'
    | 'community'
  title: string
  description: string
}>()

// const router = useRouter();

const moduleConfig = {
  'data-trading': { icon: 'i-vaadin:exchange', tag: '数据交易', tagType: 'success' as const },
  'data-services': { icon: 'i-vaadin:cog', tag: '数据服务', tagType: 'warning' as const },
  'asset-catalog': { icon: 'i-vaadin:book', tag: '资产目录', tagType: 'info' as const },
  'asset-consulting': { icon: 'i-vaadin:comment', tag: '资产咨询', tagType: 'danger' as const },
  'data-ecosystem': { icon: 'i-vaadin:tree', tag: '数据生态', tagType: 'primary' as const },
  community: { icon: 'i-vaadin:users', tag: '社区', tagType: 'success' as const }
}

const iconClass = computed(() => moduleConfig[props.module].icon)
const moduleTag = computed(() => moduleConfig[props.module].tag)
const tagType = computed(() => moduleConfig[props.module].tagType)

const navigateToDetail = () => {
  // router.push(`/details/${props.module}`);
}
</script>

<style scoped lang="scss">
.search-record-item {
  @apply cursor-pointer my-2;

  &:hover {
    @apply bg-blue-500 text-white;
    /* 背景变为蓝色，文字变为白色 */
  }

  .icon-container {
    @apply flex items-center justify-center;
  }

  .title {
    @apply font-bold text-lg;
  }

  .description {
    @apply mt-2 text-sm text-gray-600;
  }

  &:hover .description {
    @apply text-white;
  }
}

.wrap {
  :global(.search-record-item-body-container) {
    @apply flex flex-row items-center space-x-6 py-2 px-6;
  }
}
</style>
