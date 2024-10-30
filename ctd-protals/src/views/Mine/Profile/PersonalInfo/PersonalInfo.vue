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

    <div class="content">
      <div flex><span class="label">姓名：</span> {{ personalInfo.name }}</div>
      <div flex>
        <span class="label">身份证号：</span> {{ personalInfo.idCard }}
      </div>
      <div flex>
        <span class="label">联系电话：</span> {{ personalInfo.phone }}
      </div>
      <div flex>
        <span class="label">性别：</span> {{ personalInfo.gender }}
      </div>
      <div flex>
        <span class="label">出生日期：</span> {{ personalInfo.birthDate }}
      </div>
      <div flex>
        <span class="label">住址：</span> {{ personalInfo.address }}
      </div>
      <div flex flex-row>
        <span class="label">头像：</span>
        <img :src="personalInfo.avatar" alt="头像" />
      </div>
    </div>

    <edit-personal-info-dialog v-model="editPersonalInfoDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import EditPersonalInfoDialog from './EditPersonalInfoDialog.vue'

const editPersonalInfoDialogVisible = ref(false)

const personalInfo = reactive({
  name: '张三',
  idCard: '123456789012345678',
  phone: '13800138000',
  gender: '男',
  birthDate: '1990-01-01',
  address: '北京市朝阳区',
  avatar: 'https://via.placeholder.com/150',
})
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
