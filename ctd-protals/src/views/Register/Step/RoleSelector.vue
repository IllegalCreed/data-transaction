<template>
  <div flex flex-col>
    <span text-2xl font-bold>请选择您的注册身份</span>
    <p text-sm text-slate-500 mb-10>
      为了更好地为您提供定制化的服务，请选择您的身份。不同的身份将影响您在平台上的使用体验
    </p>

    <identity-item
      icon="i-carbon:user"
      title="个人用户"
      description="如果您是个人用户，可以在平台上浏览、发布个人数据需求，享受数据交易和服务"
      tag="适合个人数据消费者和数据分析师"
      :isSelected="registerStore.userIdentity === 'personal'"
      @click="selectIdentity('personal')"
      mb-4
    ></identity-item>

    <identity-item
      mb-8
      icon="i-carbon:enterprise"
      title="企业用户"
      description="企业用户可以利用平台进行数据服务交易，管理企业数据资产，发布企业级数据需求"
      tag="适合数据供应商、服务商和需求承接方"
      :isSelected="registerStore.userIdentity === 'enterprise'"
      @click="selectIdentity('enterprise')"
    ></identity-item>

    <el-button class="step-btn" type="primary" @click="handleNextStep">下一步</el-button>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import IdentityItem from './IdentityItem.vue'
import { useRegisterStore } from '@/stores/modules/register'

const emit = defineEmits(['nextStep'])
const handleNextStep = () => {
  if (registerStore.userIdentity) {
    emit('nextStep')
  } else {
    ElMessage.error('请选择一个身份')
  }
}

const registerStore = useRegisterStore()

const selectIdentity = (identity: string) => {
  registerStore.setUserIdentity(identity)
}
</script>
<style lang="scss" scoped>
.step-btn {
  @apply self-start ml-90 w-30 mb-10;

  @media (max-width: 80rem) {
    @apply ml-70;
  }

  @media (max-width: 50rem) {
    @apply ml-50;
  }

  @media (max-width: 40rem) {
    @apply self-center w-80 ml-0 mt-10;
  }

  @media (max-width: 30rem) {
    @apply w-70;
  }
}
</style>
