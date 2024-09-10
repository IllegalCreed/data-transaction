<template>
  <div
    flex
    flex-col
    justify-center
    items-center
    min-w-full
    py-20
    :class="[showBackground ? 'bg-slate-300' : 'bg-transparent']"
    data-aos="fade-up"
  >
    <div class="inner-wrap-container" :class="[imagePosition === 'right' ? '' : 'right']">
      <div class="text-container" :class="[imagePosition === 'right' ? '' : 'right']">
        <span class="title">{{ title }}</span>
        <span class="desc">{{ description }}</span>

        <div v-for="(sellingPoint, index) in sellingPoints" :key="index" class="slogan">
          <i-iconamoon:shield-yes-fill text-green-500 mr-2></i-iconamoon:shield-yes-fill>
          {{ sellingPoint }}
        </div>

        <el-button class="inner-btn" type="primary" size="large">立即咨询</el-button>
      </div>

      <!-- 图片部分 -->
      <img :src="imageUrl" />
    </div>
    <el-button class="outer-btn" type="primary" size="large" w-25 mt-10>立即咨询</el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  sellingPoints: string[]
  imageUrl: string
  showBackground?: boolean
  imagePosition?: 'left' | 'right'
}>()
</script>

<style scoped lang="scss">
.inner-wrap-container {
  @apply flex flex-row items-center w-260;

  &.right {
    @apply flex-row-reverse;
  }

  .text-container {
    @apply flex-1 flex flex-col mr-20;

    &.right {
      @apply mr-0 ml-20 items-end;
    }

    @media (max-width: 75rem) {
      @apply mr-10;

      &.right {
        @apply mr-0 ml-10 items-end;
      }
    }

    @media (max-width: 40rem) {
      @apply mr-0;

      &.right {
        @apply ml-0 items-start;
      }
    }
  }

  .title {
    @apply text-5xl font-bold;
  }

  .desc {
    @apply text-gray-500 mt-5 mb-10;
  }

  .slogan {
    @apply flex flex-row items-center text-lg mb-4;
  }

  img {
    @apply rounded-3xl h-100 w-100 object-cover;
  }

  @media (max-width: 75rem) {
    @apply w-135;

    .title {
      @apply text-3xl;
    }

    .desc {
      @apply text-xs;
    }

    .slogan {
      @apply text-sm;
    }

    img {
      @apply rounded-3xl h-60 w-60 object-cover;
    }
  }

  @media (max-width: 40rem) {
    @apply w-full px-10;

    .title {
      @apply text-4xl;
    }

    .desc {
      @apply text-base;
    }

    img {
      @apply hidden;
    }
  }

  @media (max-width: 30rem) {
    .title {
      @apply text-4xl;
    }

    .desc {
      @apply text-base;
    }

    .slogan {
      @apply text-xs;
    }

    img {
      @apply hidden;
    }
  }
}

.outer-btn,
.inner-btn {
  @apply w-25 mt-10;
}

.inner-btn {
  @media (max-width: 75rem) {
    @apply hidden;
  }
}

.outer-btn {
  @apply hidden;

  @media (max-width: 75rem) {
    @apply block w-50 mt-20;
  }
}
</style>
