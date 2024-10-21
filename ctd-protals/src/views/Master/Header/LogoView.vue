<template>
  <div class="logo-root-container">
    <img :src="icon" alt="logo" />
  </div>
</template>

<script setup lang="ts">
const icon = ref(
  new URL('@/assets/icon/logoWithName.png', import.meta.url).href,
)

const isMobileDevice = useMediaQuery('(max-width: 60rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    icon.value = new URL('@/assets/icon/logo.png', import.meta.url).href
  } else {
    icon.value = new URL('@/assets/icon/logoWithName.png', import.meta.url).href
  }
})
</script>

<style scoped lang="scss">
.logo-root-container {
  @apply flex flex-row items-center gap-4;

  img {
    @apply h-18 object-contain;
  }

  @media (max-width: 40rem) {
    img {
      @apply h-10;
    }
  }
}

// .title {
//   @apply text-2xl font-bold tracking-widest text-[var(--color-primary)];

//   @media (max-width: 60rem) {
//     @apply hidden;
//   }
// }
</style>
