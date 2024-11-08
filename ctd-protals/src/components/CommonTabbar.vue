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
  @apply flex flex-row justify-start px-5 bg-[var(--color-background-alternating)] z-10 rounded shadow overflow-x-auto;

  &::-webkit-scrollbar {
    @apply hidden;
  }

  @media (max-width: 40rem) {
    @apply sticky top-15;
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
