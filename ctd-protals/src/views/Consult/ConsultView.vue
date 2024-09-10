<template>
  <div flex flex-col items-center>
    <div flex justify-center items-center min-w-full bg-blueGray min-h-100 text-8>
      咨询服务宣传图
    </div>

    <ad-panel mt-20></ad-panel>

    <consult-item-panel mt-20></consult-item-panel>

    <div flex flex-col items-center mt-20 w-300>
      <span text-4xl font-bold data-aos="fade-up">我们的明星咨询团队</span>
      <div flex flex-row self-stretch justify-around mt-20>
        <div
          v-for="(company, index) in companies"
          :key="index"
          flex
          flex-col
          items-center
          w-60
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- 公司logo -->
          <img :src="company.logo" alt="公司logo" rounded-xl />

          <!-- 公司信息 -->
          <span text-lg font-bold my-4>{{ company.name }}</span>
          <span text-gray-400>{{ company.description }}</span>
          <el-divider type="dashed" />
          <el-button self-end type="primary" text>了解更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdPanel from './AdPanel.vue'
import ConsultItemPanel from './ConsultItemPanel.vue'

const companies = [
  {
    logo: 'https://via.placeholder.com/240x240', // 替换为实际公司logo链接
    name: '数据治理专家有限公司',
    description: '专注于提供数据治理、数据管理解决方案的专业公司。'
  },
  {
    logo: 'https://via.placeholder.com/240x240', // 替换为实际公司logo链接
    name: '合规性审查咨询有限公司',
    description: '为客户提供全面的数据合规性审查服务，确保符合最新法规要求。'
  },
  {
    logo: 'https://via.placeholder.com/240x240', // 替换为实际公司logo链接
    name: '资产价值评估有限公司',
    description: '专门从事数据资产评估，帮助企业量化数据的商业价值。'
  },
  {
    logo: 'https://via.placeholder.com/240x240', // 替换为实际公司logo链接
    name: '安全审计与风险管理有限公司',
    description: '提供全方位的数据安全审计和风险管理服务，保障企业的数据安全。'
  }
]
</script>

<style scoped lang="scss"></style>
