<template>
  <div class="header-root-container">
    <LogoView class="side"></LogoView>

    <header-menu></header-menu>

    <div flex flex-row justify-end items-center gap-8 class="side">
      <i-vaadin:search
        class="icon search-icon"
        @click="isSearchDialogVisible = true"
      ></i-vaadin:search>

      <i-vaadin:menu
        class="icon"
        @click="isDrawerMenuVisible = true"
      ></i-vaadin:menu>
    </div>

    <search-dialog v-model="isSearchDialogVisible"></search-dialog>

    <drawer-menu v-model="isDrawerMenuVisible" />
  </div>
</template>

<script setup lang="ts">
import LogoView from './LogoView.vue'
import HeaderMenu from './HeaderMenu.vue'
import SearchDialog from '../Search/SearchDialog.vue'
import DrawerMenu from '../DrawerMenu.vue'

const isSearchDialogVisible = ref(false)
const isDrawerMenuVisible = ref(false)
</script>

<style scoped lang="scss">
.header-root-container {
  @apply flex flex-row items-center h-20 w-full px-10 fixed bg-white shadow min-w-80;

  .side {
    @apply w-70;
  }

  .search-icon {
    @apply block;
  }

  .icon {
    @apply cursor-pointer h-5 w-5;
  }

  @media (max-width: 60rem) {
    .side {
      @apply w-30;
    }
  }

  @media (max-width: 40rem) {
    @apply justify-between px-5 h-15;

    .search-icon {
      @apply hidden;
    }
  }
}
</style>
