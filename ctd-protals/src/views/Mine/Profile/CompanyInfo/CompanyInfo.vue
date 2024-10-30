<template>
  <div class="company-info-root-container">
    <div flex flex-row justify-between mb-4>
      <span class="title">企业信息</span>
      <el-button type="primary" w-30 @click="openEditCompanyInfo"
        >编辑企业信息</el-button
      >
    </div>

    <div class="content">
      <div flex>
        <span class="label">企业名称：</span> {{ companyInfo.companyName }}
      </div>
      <div flex>
        <span class="label">统一社会信用代码：</span>
        {{ companyInfo.companyCode }}
      </div>
      <div flex>
        <span class="label">联系人姓名：</span> {{ companyInfo.contactName }}
      </div>
      <div flex>
        <span class="label">联系人职位：</span>
        {{ companyInfo.contactPosition }}
      </div>
      <div flex>
        <span class="label">联系人电话：</span> {{ companyInfo.contactPhone }}
      </div>
      <div flex>
        <span class="label">企业地址：</span> {{ companyInfo.companyAddress }}
      </div>
      <div flex>
        <span class="label">行业类别：</span> {{ companyInfo.industryCategory }}
      </div>
      <div flex>
        <span class="label">企业规模：</span> {{ companyInfo.companySize }}
      </div>
      <div flex>
        <span class="label">企业简介：</span>
        {{ companyInfo.companyDescription }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const companyInfo = reactive({
  companyName: '创智科技有限公司',
  companyDescription:
    '一家专注于人工智能和大数据分析的高科技企业，致力于为客户提供创新的技术解决方案。',
  companyCode: 'CN-110108-123456',
  contactName: '王小明',
  contactPosition: '市场部经理',
  contactPhone: '13812345678',
  companyAddress: '北京市海淀区中关村东路66号',
  industryCategory: '信息技术',
  companySize: '200-500人',
})

const openEditCompanyInfo = () => {
  ElMessage.warning('企业用户请前往 企业管理端 进行编辑')
}
</script>

<style scoped lang="scss">
.company-info-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .label {
    @apply text-[--color-text-lighter] min-w-30;
  }

  .content {
    @apply grid grid-cols-2 gap-4 mt-4;

    img {
      @apply ml-2 w-24 h-24 rounded-full object-cover;
    }

    @media (max-width: 40rem) {
      @apply grid-cols-1;
    }
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
