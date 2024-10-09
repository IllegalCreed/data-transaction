<template>
  <el-input class="search-input" v-model="searchKey" size="large" :placeholder="searchPlaceholder">
    <template v-if="showSearchType" #prepend>
      <el-select v-model="searchType" placeholder="Select" size="large">
        <el-option label="产品名称" value="1" />
        <el-option label="商家名称" value="2" />
      </el-select>
    </template>
    <template #append>
      <el-button>
        <template v-slot:icon>
          <i-vaadin:search w-10 h-10></i-vaadin:search>
        </template>
      </el-button>
    </template>
  </el-input>
</template>

<script setup lang="ts">
const searchKey = ref('')
const searchType = ref('1')

const searchPlaceholder = ref('')
const showSearchType = ref(true)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    searchType.value = '1'
    showSearchType.value = false
    searchPlaceholder.value = '请输入商品名称'
  } else {
    showSearchType.value = true
    searchPlaceholder.value = '请输入'
  }
})
</script>

<style lang="scss" scoped>
.search-input {
  @apply flex flex-row max-w-220 h-15 rounded-full;

  :deep(.el-input-group__prepend) {
    @apply pl-5 pr-10 border-none shadow-none bg-[var(--color-background-alternating)] rounded-l-full;
  }

  :deep(.el-select__wrapper) {
    @apply border-r-1 border-r-solid !border-r-[var(--color-border)] !shadow-none w-32;
  }

  :deep(.el-input__wrapper) {
    @apply border-none shadow-none text-base;
  }

  :deep(.el-input-group__append) {
    @apply rounded-r-full w-20 bg-[var(--color-background-alternating)] border-none shadow-none;
  }

  :deep(.el-button) {
    @apply flex items-center justify-center;
  }

  :deep(.el-icon) {
    width: 1.2rem;
    height: 1.2rem;
  }

  :deep(.el-icon svg) {
    width: 1.2rem;
    height: 1.2rem;
  }

  @media (max-width: 40rem) {
    @apply h-10;

    :deep(.el-input__wrapper) {
      @apply rounded-l-full text-sm;
    }

    :deep(.el-input-group__append) {
      @apply w-15;
    }

    :deep(.el-icon) {
      width: 1rem;
      height: 1rem;
    }

    :deep(.el-icon svg) {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
