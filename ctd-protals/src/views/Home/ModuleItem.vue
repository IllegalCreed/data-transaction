<template>
  <div class="module-item-container">
    <img absolute w-50 h-50 z--1 :src="data.backgroundImage" rounded-full object-cover />
    <span pl-20 pt-10 text-4xl font-bold>{{ data.title }}</span>
    <p pl-20 text-xl text-gray-500 leading-relaxed>
      {{ data.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    title: string
    description: string
    backgroundImage: string
  }
}>()
</script>

<style scoped lang="scss">
.module-item-container {
  @apply relative flex flex-col w-120 h-90 p-4;
}

@media (max-width: 40rem) {
  .module-item-container {
    @apply w-120 h-100;

    img {
      @apply hidden;
    }

    span {
      @apply px-10;
    }

    p {
      @apply px-10;
    }
  }
}

@media (max-width: 30rem) {
  .module-item-container {
    @apply w-80 h-100;

    img {
      @apply hidden;
    }

    span {
      @apply px-10;
    }

    p {
      @apply px-10;
    }
  }
}
</style>
