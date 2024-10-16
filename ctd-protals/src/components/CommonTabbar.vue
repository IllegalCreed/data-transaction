<template>
  <div class="tab-bar-root-container">
    <span
      v-for="link in links"
      :key="link.id"
      class="tab-item"
      :class="{ active: model === link.id }"
      @click="model = link.id"
    >
      {{ link.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  links: { id: string; label: string }[]
}>()
const model = defineModel()
</script>

<style scoped lang="scss">
.tab-bar-root-container {
  @apply flex flex-row justify-start px-5 bg-white z-10 rounded-full overflow-x-auto;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  &::-webkit-scrollbar {
    @apply hidden;
  }

  @media (max-width: 40rem) {
    @apply sticky top-15 w-full rounded-none;
  }
}

.tab-item {
  @apply block p-4 font-bold hover:opacity-60 cursor-pointer select-none whitespace-nowrap mx-auto;

  &.active {
    @apply text-blue-500;
  }

  @media (max-width: 40rem) {
    @apply text-base;
  }
}
</style>
