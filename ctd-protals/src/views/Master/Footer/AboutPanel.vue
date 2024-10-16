<template>
  <div class="about-panel-root-container">
    <span class="link-title">关于</span>
    <a
      class="link-item"
      cursor-pointer
      v-for="item of abouts"
      :key="item.id"
      @click="() => goLink(item.link)"
      >{{ item.title }}</a
    >
  </div>
</template>

<script setup lang="ts">
import { useMasterStore } from '@/stores/modules/master'
const masterStore = useMasterStore()
const { abouts } = storeToRefs(masterStore)
const { getAbouts: getAboutsAction } = masterStore

const router = useRouter()
const goLink = (url: string) => {
  router.push({
    name: url
  })
}

onMounted(() => {
  try {
    getAboutsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.about-panel-root-container {
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
