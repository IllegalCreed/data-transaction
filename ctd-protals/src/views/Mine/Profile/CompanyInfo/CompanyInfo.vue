<template>
  <div class="company-info-root-container">
    <div flex flex-row justify-between mb-4>
      <span class="title">企业信息</span>
      <el-button type="primary" w-30 @click="openEditCompanyInfo"
        >编辑企业信息</el-button
      >
    </div>

    <div
      class="content"
      v-if="userinfo && userinfo.userType === UserType.Enterprise"
    >
      <div flex>
        <span class="label">企业名称：</span> {{ userinfo.enterpriseName }}
      </div>
      <div flex>
        <span class="label">统一社会信用代码：</span>
        {{ userinfo.registrationNumber }}
      </div>
      <div flex>
        <span class="label">联系人姓名：</span> {{ userinfo.contactPersonName }}
      </div>
      <div flex>
        <span class="label">联系人职位：</span>
        {{ userinfo.contactPersonTitle }}
      </div>
      <div flex>
        <span class="label">联系人电话：</span>
        {{ userinfo.contactPhoneNumber }}
      </div>
      <div flex>
        <span class="label">企业地址：</span> {{ userinfo.enterpriseAddress }}
      </div>
      <div flex>
        <span class="label">行业类别：</span>
        {{ INDUSTRY_TYPE_MAP[userinfo.industryType] }}
      </div>
      <div flex>
        <span class="label">企业规模：</span>
        {{
          userinfo.companySize
            ? COMPANY_SIZE_TYPE_MAP[userinfo.companySize]
            : '--'
        }}
      </div>
      <div flex>
        <span class="label">企业简介：</span>
        {{ userinfo.enterpriseDescription }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  UserType,
  INDUSTRY_TYPE_MAP,
  COMPANY_SIZE_TYPE_MAP,
} from '@/types/register'
import { useAccountStore } from '@/stores/modules/account'
const accountStore = useAccountStore()
const { userinfo } = storeToRefs(accountStore)

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
