<template>
  <div class="profile-root-container">
    <!-- 基本信息 -->
    <div class="basic-info">
      <span class="title">基本信息</span>
      <div class="content">
        <div><strong>账号：</strong> {{ email }}</div>
        <div class="btn-container">
          <el-button type="primary" size="default" @click="handlePasswordChange"
            >修改密码</el-button
          >
          <el-button type="default" size="default" @click="handleManageEmail"
            >管理验证邮箱</el-button
          >
        </div>
      </div>
    </div>

    <!-- <div v-if="isPersonal" class="personal-info">
      <span class="title">个人信息</span>
      <div grid grid-cols-2 gap-4>
        <div><strong>姓名：</strong> {{ personalInfo.name }}</div>
        <div><strong>身份证号：</strong> {{ personalInfo.idCard }}</div>
        <div><strong>联系电话：</strong> {{ personalInfo.phone }}</div>
        <div><strong>性别：</strong> {{ personalInfo.gender }}</div>
        <div><strong>出生日期：</strong> {{ personalInfo.birthDate }}</div>
        <div><strong>住址：</strong> {{ personalInfo.address }}</div>
        <div class="col-span-2">
          <strong>头像：</strong>
          <img :src="personalInfo.avatar" alt="头像" class="w-24 h-24 rounded-full" />
        </div>
      </div>
      <div class="mt-4">
        <el-button type="primary" @click="openEditPersonalInfo">编辑个人信息</el-button>
      </div>
    </div>
    <div v-else class="company-info">
      <span class="title">企业信息</span>
      <p>
        您当前的账号为企业用户，请前往
        <el-link href="/company/manage" type="primary">企业管理端</el-link> 进行信息编辑。
      </p>
    </div>

    <div class="security-info">
      <span class="title">安全信息</span>
      <div><strong>最后登录日期：</strong> {{ lastLoginDate }}</div>
      <div><strong>登录设备：</strong> {{ lastLoginDevice }}</div>
      <div><strong>登录位置：</strong> {{ lastLoginLocation }}</div>
    </div>

    <div class="payment-info">
      <span class="title">支付日志</span>
      <el-table :data="paymentLogs" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="amount" label="金额" width="100" />
      </el-table>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const email = 'user@example.com'
const isPersonal = true

const personalInfo = reactive({
  name: '张三',
  idCard: '123456789012345678',
  phone: '13800138000',
  gender: '男',
  birthDate: '1990-01-01',
  address: '北京市朝阳区',
  avatar: 'https://via.placeholder.com/150'
})

const lastLoginDate = '2024-09-18'
const lastLoginDevice = 'iPhone 12'
const lastLoginLocation = '北京, 中国'

const paymentLogs = ref([
  { date: '2024-09-18', description: '支付订单 #1234', amount: '¥200' },
  { date: '2024-09-17', description: '支付订单 #1233', amount: '¥150' },
  { date: '2024-09-16', description: '支付订单 #1232', amount: '¥300' }
])

const handlePasswordChange = () => {
  // 调用修改密码的逻辑
  console.log('修改密码')
}

const handleManageEmail = () => {
  // 跳转到邮箱管理页面
  console.log('管理验证邮箱')
}

const openEditPersonalInfo = () => {
  // 打开编辑个人信息的页面或路由
  console.log('编辑个人信息')
}
</script>

<style lang="scss" scoped>
.profile-root-container {
  @apply flex flex-col p-10 gap-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }
}

.basic-info,
.security-info,
.personal-info,
.company-info,
.payment-info {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md;

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;
  }
}

.basic-info {
  .content {
    @apply flex flex-row items-center gap-y-4 justify-between;

    .btn-container {
      @apply flex flex-row gap-x-2;
    }

    @media (max-width: 40rem) {
      @apply flex-col items-start;

      .btn-container {
        @apply flex-col gap-x-0 gap-y-2;

        button {
          @apply ml-0 w-40;
        }
      }
    }
  }
}

.title {
  @apply text-lg font-bold mb-4;
}

.personal-info img {
  @apply w-24 h-24 rounded-full;
}
</style>
