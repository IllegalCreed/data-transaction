<template>
  <div flex flex-col items-center>
    <div flex justify-center items-center min-w-full bg-blueGray min-h-100 text-8>
      咨询服务宣传图
    </div>

    <div flex flex-row w-300 mt-20>
      <img
        src="https://via.placeholder.com/400x600?text=placeholder"
        rounded-3xl
        h-150
        w-100
        object-cover
        data-aos="fade-up"
      />
      <div flex flex-col ml-30>
        <span text-4xl font-bold data-aos="fade-up">为什么选择我们</span>
        <p text-base text-gray-400 data-aos="fade-up">
          我们的咨询服务致力于帮助企业实现数据驱动决策，提升数据治理水平，确保数据合规性，并最大化数据资产的商业价值。
        </p>
        <div flex-1></div>
        <div grid grid-cols-2 gap-6 data-aos="fade-up">
          <el-card
            v-for="(metric, index) in metrics"
            :key="index"
            body-class="quota-item-body-container"
            shadow="hover"
          >
            <span text-2xl font-bold text-center>{{ metric.title }}</span>
            <span text-orange-500 font-bold text-5xl my-5>{{ metric.value }}</span>
            <span text-sm text-center text-gray-400>{{ metric.description }}</span>
          </el-card>
        </div>
      </div>
    </div>

    <div flex flex-col items-center min-w-full bg-slate-300 py-15 mt-20>
      <span text-4xl font-bold data-aos="fade-up">我们提供哪些咨询服务</span>
      <div grid grid-cols-2 gap-10 mt-20 w-300>
        <el-card
          v-for="(service, index) in services"
          :key="index"
          body-class="service-item-body-container"
          shadow="hover"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div flex items-center>
            <img :src="service.icon" alt="服务图标" rounded />

            <div flex-1 flex flex-col ml-4>
              <span text-xl font-bold mb-4>{{ service.title }}</span>
              <span text-sm text-gray-600>{{ service.description }}</span>
            </div>

            <i-ep:top-right ml-20 mr-5 h-8 w-8 text-gray />
          </div>
        </el-card>
      </div>
    </div>

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
const metrics = [
  {
    title: '数据质量提升',
    value: '30%',
    description: '通过我们的数据治理和清洗服务，数据质量提升了30%以上。'
  },
  {
    title: '合规性合格率',
    value: '95%',
    description: '我们帮助客户的数据合规性审查通过率达到了95%以上。'
  },
  {
    title: '数据利用率',
    value: '40%',
    description: '优化的数据管理策略让数据利用率提高了40%。'
  },
  {
    title: '资产价值评估',
    value: '20%',
    description: '数据资产的商业价值评估增长了20%，助力企业战略决策。'
  }
]

const services = [
  {
    icon: 'https://via.placeholder.com/80', // 替换为实际图标链接
    title: '数据治理咨询',
    description: '提供全面的数据治理策略，帮助企业有效管理和利用数据资产。'
  },
  {
    icon: 'https://via.placeholder.com/80', // 替换为实际图标链接
    title: '数据合规性审查',
    description: '确保数据处理过程符合法律法规和行业标准，保障数据安全与隐私。'
  },
  {
    icon: 'https://via.placeholder.com/80', // 替换为实际图标链接
    title: '数据资产价值评估',
    description: '评估数据资产的商业价值，帮助企业制定数据投资策略。'
  },
  {
    icon: 'https://via.placeholder.com/80', // 替换为实际图标链接
    title: '数据安全审计',
    description: '审查数据安全性，识别潜在风险，制定安全增强措施。'
  }
]

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

<style scoped lang="scss">
.wrap {
  :global(.quota-item-body-container) {
    @apply flex flex-col h-full items-center bg-gray-100;
  }
}
.wrap {
  :global(.service-item-body-container) {
    @apply flex flex-row h-full items-center;
  }
}
</style>
