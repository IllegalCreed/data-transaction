<template>
  <el-card class="service-item-container" body-class="service-item-body-container" shadow="hover">
    <img :src="data.icon" alt="服务图标" rounded mr-4 />

    <div flex-1 flex flex-col>
      <span class="title" text-xl font-bold mb-4>{{ data.title }}</span>
      <span text-sm text-gray-600>{{ data.description }}</span>
    </div>

    <i-ep:top-right class="icon" />
  </el-card>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    icon: string
    title: string
    description: string
  }
}>()
</script>

<style lang="scss" scoped>
:deep(.service-item-body-container) {
  @apply flex flex-row h-full items-center;
}

.service-item-container {
  @apply cursor-pointer select-none;

  .icon {
    @apply ml-20 mr-5 h-8 w-8 text-gray;
  }

  @media (max-width: 40rem) {
    img {
      @apply hidden;
    }
  }

  @media (max-width: 30rem) {
    .icon {
      @apply hidden;
    }

    .title {
      @apply self-center;
    }
  }
}
</style>
