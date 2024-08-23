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

    <div flex flex-row flex-wrap mt-4 w-260>
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
import type { IProduct } from '@/types/product';

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
const products = ref<IProduct[]>([
  {
    id: 1,
    name: '智能手表X100',
    tags: ['新款', '限量', '独家'],
    description: '先进的智能手表，支持多种健康监测功能。',
    seller: '智能科技有限公司',
    price: 2999,
    imageUrl: 'https://via.placeholder.com/600x400?text=Product+1'
  },
  {
    id: 2,
    name: '智能音箱V3',
    tags: ['热门', '推荐'],
    description: '高音质智能音箱，支持语音控制。',
    seller: '智能科技有限公司',
    price: 799,
    imageUrl: 'https://via.placeholder.com/600x400?text=Product+2'
  },
  {
    id: 3,
    name: '智能家居套装',
    tags: ['热门', '推荐'],
    description: '全屋智能家居解决方案，便捷、安全。',
    seller: '智能科技有限公司',
    price: 9999,
    imageUrl: 'https://via.placeholder.com/600x400?text=Product+3'
  },
  {
    id: 4,
    name: '智能跑步机F1',
    tags: ['热门', '推荐'],
    description: '支持实时心率监测的智能跑步机。',
    seller: '智能科技有限公司',
    price: 4999,
    imageUrl: 'https://via.placeholder.com/600x400?text=Product+4'
  },
  {
    id: 5,
    name: '智能门锁Pro',
    tags: ['热门', '推荐'],
    description: '高安全性的智能门锁，支持多种开锁方式。',
    seller: '智能科技有限公司',
    price: 1599,
    imageUrl: 'https://via.placeholder.com/600x400?text=Product+5'
  },
  {
    id: 6,
    name: '智能电视QLED 55寸',
    tags: ['热门', '推荐'],
    description: '超高清智能电视，支持HDR10+。',
    seller: '智能科技有限公司',
    price: 6999,
    imageUrl: 'https://via.placeholder.com/600x400?text=Product+6'
  },
]);
</script>

<style scoped lang="scss">
.product-root-container {
  @apply flex flex-col items-center;

}
</style>