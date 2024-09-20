<template>
  <div class="comment-root-container">
    <common-tabbar v-model="currentPage" :links="links" class="tabbar" />
  </div>
</template>

<script setup lang="ts">
import CommonTabbar from '@/components/CommonTabbar.vue'

const currentPage = ref('product')

const links = ref([
  {
    id: 'product',
    label: '产品'
  },
  { id: 'demand', label: '需求' }
])
</script>

<style lang="scss" scoped>
.comment-root-container {
  @apply flex flex-col p-10;

  .tabbar {
    @apply self-center w-50;

    @media (max-width: 40rem) {
      @apply self-start m--5 w-[calc(100%+40px)];
    }
  }

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
