<template>
  <div class="profile-root-container">
    <base-info />
    <personal-info v-if="isPersonal"></personal-info>
    <company-info v-else></company-info>
    <security-info />
    <payment-info />
  </div>
</template>

<script setup lang="ts">
import BaseInfo from './BaseInfo.vue'
import PersonalInfo from './PersonalInfo.vue'
import CompanyInfo from './CompanyInfo.vue'
import SecurityInfo from './SecurityInfo.vue'
import PaymentInfo from './PaymentInfo.vue'

const isPersonal = ref(false)
</script>

<style lang="scss" scoped>
.profile-root-container {
  @apply flex flex-col p-10 gap-10;

  @media (max-width: 40rem) {
    @apply p-5;
  }
}
</style>
