<template>
  <div class="company-info-root-container">
    <div flex flex-row justify-between mb-4>
      <span class="title">企业信息</span>
      <el-button
        data-testid="edit-button"
        type="primary"
        w-30
        @click="openEditCompanyInfo"
        >编辑企业信息</el-button
      >
    </div>

    <div
      class="content"
      v-if="userinfo && userinfo.userType === UserType.Enterprise"
    >
      <div flex>
        <span class="label">企业名称：</span>
        <span data-testid="enterprise-name-span">{{
          userinfo.enterpriseName
        }}</span>
      </div>
      <div flex>
        <span class="label">统一社会信用代码：</span>
        <span data-testid="registration-number-span">{{
          userinfo.registrationNumber
        }}</span>
      </div>
      <div flex>
        <span class="label">联系人姓名：</span>
        <span data-testid="contact-person-name-span">{{
          userinfo.contactPersonName
        }}</span>
      </div>
      <div flex>
        <span class="label">联系人职位：</span>
        <span data-testid="contact-person-title-span">{{
          userinfo.contactPersonTitle
        }}</span>
      </div>
      <div flex>
        <span class="label">联系人电话：</span>
        <span data-testid="contact-phone-number-span">{{
          userinfo.contactPhoneNumber
        }}</span>
      </div>
      <div flex>
        <span class="label">企业地址：</span>
        <span data-testid="enterprise-address-span">{{
          userinfo.enterpriseAddress
        }}</span>
      </div>
      <div flex>
        <span class="label">行业类别：</span>
        <span data-testid="industry-type-span">
          {{ INDUSTRY_TYPE_MAP[userinfo.industryType] }}
        </span>
      </div>
      <div flex>
        <span class="label">企业规模：</span>
        <span data-testid="company-size-span">
          {{
            userinfo.companySize
              ? COMPANY_SIZE_TYPE_MAP[userinfo.companySize]
              : '--'
          }}
        </span>
      </div>
      <div flex>
        <span class="label">企业简介：</span>
        <span data-testid="enterprise-description-span">
          {{ userinfo.enterpriseDescription }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
