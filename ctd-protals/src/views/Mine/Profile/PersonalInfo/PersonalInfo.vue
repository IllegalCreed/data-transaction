<template>
  <div class="personal-info-root-container">
    <div flex flex-row justify-between mb-4>
      <span class="title">个人信息</span>
      <el-button
        type="primary"
        w-30
        @click="editPersonalInfoDialogVisible = true"
        >编辑个人信息</el-button
      >
    </div>

    <div
      class="content"
      v-if="userinfo && userinfo.userType === UserType.Individual"
    >
      <div flex><span class="label">姓名：</span> {{ userinfo.fullName }}</div>
      <div flex>
        <span class="label">身份证号：</span>
        {{ userinfo.identificationNumber }}
      </div>
      <div flex>
        <span class="label">联系电话：</span> {{ userinfo.phoneNumber }}
      </div>
      <div flex>
        <span class="label">性别：</span>
        {{
          userinfo.gender
            ? GENDER_TYPE_MAP[userinfo.gender]
            : GENDER_TYPE_MAP[GenderType.Other]
        }}
      </div>
      <div flex>
        <span class="label">出生日期：</span> {{ userinfo.dateOfBirth }}
      </div>
      <div flex>
        <span class="label">住址：</span> {{ userinfo.residentialAddress }}
      </div>
      <div flex flex-row>
        <span class="label">头像：</span>
        <el-avatar
          class="!bg-transparent"
          :size="100"
          :src="userinfo.avatarUrl"
        >
          <img :src="defaultUserAvatar" />
        </el-avatar>
      </div>
    </div>

    <edit-personal-info-dialog v-model="editPersonalInfoDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import EditPersonalInfoDialog from './EditPersonalInfoDialog.vue'
import { UserType } from '@/types/register'
import { GENDER_TYPE_MAP, GenderType } from '@/types/register'
import { useAccountStore } from '@/stores/modules/account'

const defaultUserAvatar = new URL('@/assets/icon/user.png', import.meta.url)
  .href

const accountStore = useAccountStore()
const { userinfo } = storeToRefs(accountStore)

const editPersonalInfoDialogVisible = ref(false)
</script>

<style scoped lang="scss">
.personal-info-root-container {
  @apply flex flex-col;

  .title {
    @apply text-lg font-bold;
  }

  .label {
    @apply text-[--color-text-lighter] min-w-30;
  }

  .content {
    @apply grid grid-cols-2 gap-4 mt-4;

    @media (max-width: 40rem) {
      @apply grid-cols-1;
    }
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}
</style>
