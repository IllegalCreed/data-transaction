<template>
  <div class="history-tab-root-container" flex flex-row items-center h-12 ref="scrollContainer" @wheel="handleWheel">
    <HistoryTabItem v-for="item in visitedViews" :key="item.path" :data="item" @close="close"></HistoryTabItem>
  </div>
</template>

<script setup lang="ts">
import { useRouterStore } from "@/stores/modules/router";
import { onMounted, watch } from "vue";
import {
  useRoute,
  useRouter,
  type RouteLocationNormalizedLoaded,
} from "vue-router";
const { addView, visitedViews } = useRouterStore();

const route = useRoute();
const router = useRouter();

watch(route, () => {
  addView(route);
});

onMounted(() => {
  addView(route);
});

function close(view: RouteLocationNormalizedLoaded) {
  if (view.path === route.path) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      return router.push(latestView.fullPath);
    }
    return router.push("/admin/home/user");
  }
}

const scrollContainer = ref<HTMLDivElement | null>(null);
const handleWheel = (event: WheelEvent) => {
  if (scrollContainer.value) {
    event.preventDefault();
    scrollContainer.value.scrollLeft += event.deltaY;
  }
};
</script>

<style scoped>
.history-tab-root-container {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--border);
  overflow-x: scroll;
  white-space: nowrap;
}

.history-tab-root-container::-webkit-scrollbar {
  display: none;
}
</style>
