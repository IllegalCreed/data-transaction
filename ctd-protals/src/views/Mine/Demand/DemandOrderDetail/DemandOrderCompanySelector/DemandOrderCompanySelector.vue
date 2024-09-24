<template>
  <div class="demand-order-company-selector-root-container">
    <common-tabbar v-model="currentPage" :links="links" class="tabbar" />

    <div v-if="currentPage === 'tender'" class="company-list-container">
      <company-item
        v-for="(item, index) in tenderCompanies"
        :key="index"
        :company="item"
      ></company-item>
    </div>

    <div v-else class="company-list-container">
      <company-item
        v-for="(item, index) in recommendCompanies"
        :key="index"
        :company="item"
      ></company-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompanyItem from './DemandOrderCompanyItem.vue'
import CommonTabbar from '@/components/CommonTabbar.vue'
import type { ICompany } from '@/types/company'

const currentPage = ref('tender')

const links = ref([
  {
    id: 'tender',
    label: '投标商家'
  },
  {
    id: 'recommend',
    label: '推荐商家'
  }
])

const tenderCompanies: ICompany[] = [
  {
    id: '1',
    name: '数据科技有限公司',
    avatar: 'https://via.placeholder.com/100',
    tags: ['数据分析', '机器学习'],
    rating: 4.5
  },
  {
    id: '2',
    name: '视觉设计公司',
    avatar: 'https://via.placeholder.com/100',
    tags: ['UI设计', '用户体验'],
    rating: 4.8
  },
  {
    id: '3',
    name: '云计算服务商',
    avatar: 'https://via.placeholder.com/100',
    tags: ['云服务', '大数据'],
    rating: 4.2
  }
]

const recommendCompanies: ICompany[] = [
  {
    id: '4',
    name: '市场研究机构',
    avatar: 'https://via.placeholder.com/100',
    tags: ['市场分析', '数据挖掘'],
    rating: 4.7
  },
  {
    id: '5',
    name: '品牌营销公司',
    avatar: 'https://via.placeholder.com/100',
    tags: ['品牌战略', '广告'],
    rating: 4.6
  },
  {
    id: '6',
    name: '移动开发团队',
    avatar: 'https://via.placeholder.com/100',
    tags: ['移动应用', '产品开发'],
    rating: 4.3
  }
]
</script>

<style scoped lang="scss">
.demand-order-company-selector-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md gap-4;

  .tabbar {
    @apply self-center w-70;
  }

  .company-list-container {
    @apply flex flex-col gap-4 mt-5;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
