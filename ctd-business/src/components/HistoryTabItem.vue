<template>
  <div :class="['history-tab-item-root-container', isActive ? 'active' : null]" flex flex-row items-center space-x-3.5
    px-5 cursor-pointer select-none @click="change">
    <span text-3.5>{{ props.data.title }}</span>
    <i-ion:close v-show="showDelete" @click.stop="close"></i-ion:close>
  </div>
</template>

<script setup lang="ts">
import { useRouterStore } from '@/stores/modules/router'
const { deleteView, visitedViews } = useRouterStore()
const router = useRouter()
const route = useRoute()

const props = defineProps(['data'])
const emit = defineEmits(['close'])

const isActive = computed(() => {
  if (route.path === props.data.path) {
    return true
  } else {
    return false
  }
})

const showDelete = computed(() => {
  return visitedViews.length > 1
})

function close() {
  deleteView(props.data)
  emit('close', props.data)
}

function change() {
  router.push({
    path: props.data.path,
    query: props.data.query
  })
}
</script>

<style scoped>
.history-tab-item-root-container {
  color: var(--text-disable);
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: var(--border);
}

.active {
  color: var(--el-color-primary);
}
</style>
