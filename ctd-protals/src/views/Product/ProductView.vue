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

    <div flex flex-row flex-wrap mt-10 w-260>
      <product-item v-for="(product, index) in products" :key="index" :product="product" />
    </div>

    <div flex flex-row justify-end mt-10 w-260>
      <el-pagination background :total="1000" layout="total, prev, pager, next" />
    </div>

  </div>
</template>

<script setup lang="ts">
import FilterListView from './FilterListView.vue';
import SortListView from './SortListView.vue';
import ProductItem from './ProductItem.vue';

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

// 示例商品数据
const products = ref([
  {
    id: 1,
    name: '虚拟艺术品',
    description: '一件非常独特的虚拟艺术品。一件非常独特的虚拟艺术品。一件非常独特的虚拟艺术品。一件非常独特的虚拟艺术品。一件非常独特的虚拟艺术品。',
    seller: '虚拟商店123123123123123123123123123123123123123123123123',
    price: 199.99,
  },
  {
    id: 2,
    name: '高级课程',
    description: '一门提升技能的高级课程。',
    seller: '教育机构',
    price: 299.99,
  },
]);
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex flex-col items-center;

}
</style>