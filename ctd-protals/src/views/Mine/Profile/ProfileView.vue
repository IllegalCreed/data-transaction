<template>
  <div class="profile-root-container">
    <!-- 基本信息 -->
    <div class="basic-info">
      <span class="title">基本信息</span>
      <div class="content" mt-4>
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

    <div v-if="isPersonal" class="personal-info">
      <div flex flex-row justify-between mb-4>
        <span class="title">个人信息</span>
        <el-button type="primary" @click="openEditPersonalInfo">编辑个人信息</el-button>
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
    </div>
    <div v-else class="company-info">
      <span class="title">企业信息</span>
      <p>
        您当前的账号为企业用户，请前往
        <el-link href="http://www.baidu.com" type="primary">企业管理端</el-link>
        进行信息编辑。
      </p>
    </div>

    <div class="security-info" gap-4>
      <span class="title">安全信息</span>
      <div><strong>最后登录日期：</strong> {{ lastLoginDate }}</div>
      <div><strong>登录设备：</strong> {{ lastLoginDevice }}</div>
      <div><strong>登录位置：</strong> {{ lastLoginLocation }}</div>
    </div>

    <div class="payment-info">
      <span class="title">支付日志</span>
      <div class="payment-list">
        <div v-for="(log, index) in paymentLogs" :key="index" class="payment-item">
          <div><strong>日期：</strong>{{ log.date }}</div>
          <div class="item-content">
            <div><strong>描述：</strong>{{ log.description }}</div>
            <div><strong>金额：</strong>{{ log.amount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('user@example.com')
const isPersonal = ref(true)

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

.personal-info {
  .content {
    @apply grid grid-cols-2 gap-4;

    img {
      @apply ml-2 w-24 h-24 rounded-full object-cover;
    }

    @media (max-width: 40rem) {
      @apply grid-cols-1;
    }
  }
}

.payment-info {
  .payment-list {
    @apply flex flex-col gap-4 mt-4;
  }

  .payment-item {
    @apply flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded bg-gray-50;

    .item-content {
      @apply flex flex-row justify-between gap-2;

      @media (max-width: 40rem) {
        @apply flex-col;
      }
    }
  }
}

.title {
  @apply text-xl font-bold;
}
</style>
