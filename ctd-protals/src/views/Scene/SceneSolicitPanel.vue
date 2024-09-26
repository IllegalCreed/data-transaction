<template>
  <div class="scene-solicit-panel-root-container">
    <span text-4xl font-bold self-center data-aos="fade-up">场景征集</span>
    <span mt-4 text-gray-600 data-aos="fade-up">文旅数据专区应用场景持续征集中</span>

    <div class="main-container" data-aos="fade-up">
      <div class="left-container">
        <span>
          我们正在持续征集关于文旅数据专区的应用场景，旨在发掘更丰富的使用案例和创新应用，以推动文旅行业的数字化转型和提升服务质量。欢迎各界人士积极分享您所见的应用场景，助力文旅数据的高效利用与发展
        </span>
        <div flex-1></div>
        <a href="http://wwww.baidu.com" text-base text-red-700 mt-5>详情请下载文件了解</a>
      </div>

      <div flex flex-col leading-normal>
        <strong>指导单位：</strong>
        <span>北京市通州区经济和信息化局</span>
        <strong mt-4>承办单位：</strong>
        <span>北京北投智慧城市科技有限公司</span>
        <span>北京文旅数据专区创新联合体</span>
        <strong mt-4>联系方式：</strong>
        <div flex flex-row>
          <i-mdi:email class="link-icon" />
          <a class="link-item" href="mailto:EMAIL">123123123@123.com</a>
        </div>
        <div flex flex-row>
          <i-mdi:phone class="link-icon" />
          <a class="link-item" href="tel:+1234567890">+1234567890</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.scene-solicit-panel-root-container {
  @apply flex flex-col items-center min-w-full bg-blueGray px-10 py-20;

  .main-container {
    @apply grid grid-cols-[auto_230px] gap-20 max-w-200 w-full mt-10 leading-loose;

    .left-container {
      @apply flex flex-col;
    }

    .link-item {
      @apply my-1 text-base text-gray-700 no-underline hover:underline break-all;
    }

    .link-icon {
      @apply flex-shrink-0 my-2 w-4 h-4 text-gray-700 mr-4;
    }

    @media (max-width: 40rem) {
      @apply grid-cols-1;
    }
  }
}
</style>
