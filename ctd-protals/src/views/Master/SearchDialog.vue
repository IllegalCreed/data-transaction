<template>
  <el-dialog v-model="model" :show-close="false" destroy-on-close append-to-body close-on-press-escape
    :lock-scroll="false" @closed="resetSearch">
    <div flex flex-col>
      <div flex flex-row items-center w-full>
        <el-input v-model="searchQuery" size="large" placeholder="请输入搜索内容" clearable @input="debouncedSearch">
          <template #prefix>
            <i :class="isLoading ? 'i-eos-icons:loading' : 'i-vaadin:search'"></i>
          </template>
        </el-input>
        <el-button ml-10 type="danger" size="large" @click="closeDialog">ESC</el-button>
      </div>
      <div v-if="!searchQuery">
        <p class="mt-4">历史记录...</p>
      </div>
      <div v-if="searchQuery">
        <p class="mt-4">搜索结果...</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true })

const searchQuery = ref('');
const isLoading = ref(false);

const handleSearch = () => {
  isLoading.value = true;
  setTimeout(() => {
    console.log(`Searching for: ${searchQuery.value}`);
    isLoading.value = false;
  }, 1000);
};

const debouncedSearch = useDebounceFn(handleSearch, 1000);

const resetSearch = () => {
  searchQuery.value = '';
  isLoading.value = false;
};

const closeDialog = () => {
  model.value = false;
};
</script>
