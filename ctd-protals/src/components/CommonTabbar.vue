<template>
  <div class="tab-bar-root-container">
    <nav class="tab-bar-nav">
      <span
        v-for="link in links"
        :key="link.id"
        class="tab-item"
        :class="{ isActive: model === link.id }"
        @click="model = link.id"
      >
        {{ link.label }}
      </span>
    </nav>
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
  @apply bg-white z-10 rounded-full px-10;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  @media (max-width: 40rem) {
    @apply sticky top-15 right-0 left-0 w-full rounded-none;
  }
}

.tab-bar-nav {
  @apply flex flex-row justify-around space-x-8 px-4 overflow-x-auto whitespace-nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-item {
  @apply py-4 font-bold hover:opacity-60 cursor-pointer select-none;

  &.isActive {
    @apply text-blue-500;
  }

  @media (max-width: 40rem) {
    @apply text-base;
  }
}
</style>
