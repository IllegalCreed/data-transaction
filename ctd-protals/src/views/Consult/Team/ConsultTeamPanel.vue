<template>
  <div class="consult-team-panel-root-container">
    <span class="title">我们的明星咨询团队</span>
    <el-skeleton :loading="getTeamsActionLoading" animated>
      <template #template>
        <div class="grid-panel" mx-auto>
          <el-skeleton-item
            v-for="n in 4"
            :key="n"
            variant="rect"
            class="!w-full !h-90"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="grid-panel">
          <consult-team-item
            v-for="(item, index) in teams"
            :key="item.id"
            :data="item"
            data-aos="fade-up"
            :data-aos-delay="aosDelay(index)"
          >
          </consult-team-item>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import ConsultTeamItem from './ConsultTeamItem.vue'
import { useConsultStore } from '@/stores/modules/consult'

const consultStore = useConsultStore()
const { teams } = storeToRefs(consultStore)
const { getTeams: getTeamsAction } = consultStore

const { isLoading: getTeamsActionLoading, execute: executeGetTeamsAction } = useAsyncState(
  getTeamsAction(),
  undefined
)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')
const aosDelay = (index: number) => {
  return isMobileDevice.value ? 0 : index * 100
}

onMounted(() => {
  try {
    executeGetTeamsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.consult-team-panel-root-container {
  @apply flex flex-col items-center mt-20 w-full;

  .title {
    @apply relative text-4xl font-bold;

    &::before {
      @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-40 h-1 rounded bg-[var(--color-primary)];
    }

    @media (max-width: 25rem) {
      @apply text-3xl;
    }
  }

  .grid-panel {
    @apply grid grid-cols-4 gap-4 mt-20 max-w-300 px-10;

    @media (max-width: 60rem) {
      @apply grid-cols-2;
    }

    @media (max-width: 40rem) {
      @apply px-5;
    }

    @media (max-width: 30rem) {
      @apply grid-cols-1;
    }
  }
}
</style>
