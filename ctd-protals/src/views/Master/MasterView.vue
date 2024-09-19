<template>
  <div class="master-root-container">
    <header-view z-20></header-view>
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer-view></footer-view>
  </div>
</template>

<script setup lang="ts">
import HeaderView from './HeaderView.vue'
import FooterView from './FooterView.vue'
</script>

<style scoped lang="scss">
.master-root-container {
  @apply flex flex-col;
  .router-view {
    @apply pt-20;
  }

  @media (max-width: 40rem) {
    .router-view {
      @apply pt-15;
    }
  }
}
</style>
