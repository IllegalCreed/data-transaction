<template>
  <div
    class="scene-solicit-panel-root-container"
    :style="{ backgroundImage: `url('${bg}')` }"
    data-aos="fade-up"
  >
    <span class="title">场景征集</span>
    <span class="sub-title">文旅数据专区应用场景持续征集中</span>

    <div class="main-container">
      <div class="left-container">
        <span class="content">
          {{ solicit.content }}
        </span>
        <div flex-1></div>
        <a class="link" href="http://wwww.baidu.com">详情请下载文件了解</a>
      </div>

      <div class="right-container">
        <strong class="label">指导单位：</strong>
        <span v-for="(item, index) in solicit.companys" :key="index">{{ item }}</span>
        <strong class="label" mt-4>承办单位：</strong>
        <span v-for="(item, index) in solicit.undertakes" :key="index">{{ item }}</span>
        <strong class="label" mt-4>联系方式：</strong>
        <div flex flex-row>
          <i-mdi:email class="link-icon" />
          <a class="link-item" href="mailto:EMAIL">{{ solicit.email }}</a>
        </div>
        <div flex flex-row>
          <i-mdi:phone class="link-icon" />
          <a class="link-item" :href="`tel:${solicit.phone}`">{{ solicit.phone }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSceneStore } from '@/stores/modules/scene'

const bg = ref(new URL('@/assets/background/sceneBackground.png', import.meta.url).href)

const sceneStore = useSceneStore()
const { solicit } = storeToRefs(sceneStore)
const { getSolicit: getSolicitAction } = sceneStore

onMounted(() => {
  getSolicitAction()
})
</script>

<style scoped lang="scss">
.scene-solicit-panel-root-container {
  @apply flex flex-col items-center min-w-full bg-cover bg-center px-10 py-20;

  .title {
    @apply relative text-4xl font-bold text-[var(--color-text-reverse)];

    &::before {
      @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-20 h-1 rounded bg-[var(--color-background-alternating)];
    }
  }

  .sub-title {
    @apply mt-10 text-[var(--color-text-primary-light)];
  }

  .main-container {
    @apply grid grid-cols-[auto_20rem] max-w-300 p-15 rounded-lg w-full mt-10 leading-loose bg-[var(--color-scene-solicit-background)] border-1 border-solid border-[var(--color-primary)];

    .left-container {
      @apply flex flex-col pr-15;

      .content {
        @apply text-base text-[var(--color-text-primary-light)] leading-loose;
      }

      .link {
        @apply self-center text-base text-[var(--color-text-reverse)] my-5;
      }
    }

    .right-container {
      @apply flex flex-col gap-2 pl-15 border-l-1 border-l-solid border-l-[var(--color-primary)];

      .label {
        @apply text-lg text-[var(--color-text-primary-light)];
      }

      span {
        @apply text-base text-[var(--color-text-reverse)];
      }

      .link-item {
        @apply my-1 text-base text-[var(--color-text-reverse)] no-underline hover:underline break-all;
      }

      .link-icon {
        @apply flex-shrink-0 my-2 w-4 h-4 text-[var(--color-text-reverse)] mr-2;
      }
    }

    @media (max-width: 60rem) {
      @apply grid-cols-1;

      .left-container {
        @apply pr-0;

        .link {
          @apply self-start;
        }
      }

      .right-container {
        @apply border-none pl-0 mt-10;
      }
    }

    @media (max-width: 40rem) {
      @apply p-10;
    }

    @media (max-width: 23rem) {
      @apply p-5;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
