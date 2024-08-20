<template>
  <div class="product-root-container">
    <div flex flex-col items-center bg-blueGray p-10 w-full>
      <el-input v-model="searchKey" size="large" placeholder="请输入" class="max-w-150">
        <template #prepend>
          <el-select v-model="select" placeholder="Select" size="large" style="width: 115px">
            <el-option label="商品名称" value="1" />
            <el-option label="商家名称" value="2" />
          </el-select>
        </template>
        <template #append>
          <el-button>
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>

      <div mt-10>
        <filter-list-view v-model="filters"></filter-list-view>
      </div>
    </div>

    <div flex flex-row mt-10 w-260>
      <sort-list-view v-model="sort"></sort-list-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterListView from './FilterListView.vue';
import SortListView from './SortListView.vue';

const sort = ref({ sortType: 'comprehensive', order: 'desc' as const });
watch(sort, (newValue) => {
  console.log(`Searching with sort type: ${newValue.sortType}, order: ${newValue.order}`);
  // 在这里触发搜索逻辑
}, { deep: true });

const filters = ref<string[]>(['全部', '全部', '全部', '全部', '全部', '全部']);
watch(filters, (newValue) => {
  console.log(`Searching with filters: ${newValue}`);
  // 在这里触发搜索逻辑
}, { deep: true });

const searchKey = ref('');
const select = ref('1');


</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex flex-col items-center;

}
</style>