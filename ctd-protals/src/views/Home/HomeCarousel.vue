<template>
  <el-carousel class="home-carousel-root-container" :arrow="carouselArrow">
    <el-carousel-item
      v-for="item in banners"
      :key="item.id"
      :class="{ 'cursor-pointer': item.type !== BannerType.None }"
      @click="item ? navigateTo(item) : null"
    >
      <img
        :src="item.imageUrl"
        alt="Banner"
        class="home-carousel-banner-image"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { BannerType } from '@/constants/mapData/banner'
import { useHomeStore } from '@/stores/modules/home'
import type { IBanner } from '@/types/home'
const homeStore = useHomeStore()
const { banners } = storeToRefs(homeStore)

const router = useRouter()
const navigateTo = (data: IBanner) => {
  switch (data.type) {
    case BannerType.None:
      break
    case BannerType.OuterLink:
      if (!data.payload) return
      window.open(data.payload, '_blank')
      break
    case BannerType.Scene:
      router.push({
        name: 'scene-detail',
        params: {
          id: data.payload,
        },
      })
      break
    case BannerType.Product:
      router.push({
        name: 'product-detail',
        params: {
          id: data.payload,
        },
      })
      break
    case BannerType.Demand:
      router.push({
        name: 'demand-detail',
        params: {
          id: data.payload,
        },
      })
      break
  }
}

const carouselArrow = ref<'always' | 'hover' | 'never'>('hover')
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    carouselArrow.value = 'never'
  } else {
    carouselArrow.value = 'hover'
  }
})

onMounted(() => {
  homeStore.getBanners()
})
</script>

<style scoped lang="scss">
.home-carousel-root-container {
  @apply w-full bg-[var(--color-background-darkest)];

  :deep(.el-carousel__container) {
    @apply h-120;

    .el-carousel__item {
      @apply flex flex-col items-center justify-center;
    }

    .home-carousel-banner-image {
      @apply max-w-300 w-full object-contain;

      @media (min-width: 75rem) {
        mask-image: radial-gradient(
          circle,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 1) 70%,
          rgba(0, 0, 0, 0) 90%
        );
        -webkit-mask-image: radial-gradient(
          circle,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 1) 70%,
          rgba(0, 0, 0, 0) 90%
        );
      }
    }

    @media (max-width: 75rem) {
      @apply w-full h-auto aspect-[5/2];
    }
  }
}
</style>
