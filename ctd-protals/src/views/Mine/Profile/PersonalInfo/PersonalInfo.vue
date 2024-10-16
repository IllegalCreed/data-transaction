<template>
  <div class="personal-info-root-container">
    <div flex flex-row justify-between mb-4>
      <span class="title">个人信息</span>
      <el-button type="primary" @click="editPersonalInfoDialogVisible = true"
        >编辑个人信息</el-button
      >
    </div>

    <div class="content">
      <div><strong>姓名：</strong> {{ personalInfo.name }}</div>
      <div><strong>身份证号：</strong> {{ personalInfo.idCard }}</div>
      <div><strong>联系电话：</strong> {{ personalInfo.phone }}</div>
      <div><strong>性别：</strong> {{ personalInfo.gender }}</div>
      <div><strong>出生日期：</strong> {{ personalInfo.birthDate }}</div>
      <div><strong>住址：</strong> {{ personalInfo.address }}</div>
      <div flex flex-row>
        <strong>头像：</strong>
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
  avatar: 'https://via.placeholder.com/150'
})
</script>

<style scoped lang="scss">
.personal-info-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md;

  .title {
    @apply text-xl font-bold;
  }

  .content {
    @apply grid grid-cols-2 gap-4;

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
