<template>
  <div class="image-gallery-root-container">
    <div class="image-container">
      <img :src="currentImage" object-contain h-full w-full />
    </div>
    <div class="thumbnail-root-container">
      <i-icon-park-twotone:left-c
        class="thumbnail-control"
        mr-4
        @click="scrollThumbnails('prev')"
      ></i-icon-park-twotone:left-c>
      <div
        ref="thumbnailContainer"
        class="thumbnail-container"
        flex-1
        flex
        flex-row
        items-center
        space-x-2
        overflow-x-auto
        overflow-y-hidden
      >
        <div
          ref="thumbnails"
          v-for="(thumbnail, index) in images"
          :key="index"
          :class="['thumbnail', { selected: currentImageIndex === index }]"
          @click="selectImage(index)"
        >
          <img :src="thumbnail" object-cover h-full w-full />
        </div>
      </div>
      <i-icon-park-twotone:right-c
        class="thumbnail-control"
        ml-4
        @click="scrollThumbnails('next')"
      ></i-icon-park-twotone:right-c>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()

const currentImageIndex = ref(0)
const currentImage = computed(() => props.images[currentImageIndex.value])
const thumbnailContainer = ref<HTMLElement | null>(null)
const thumbnails = ref<HTMLElement[]>([])

const selectImage = (index: number) => {
  currentImageIndex.value = index
}

const scrollThumbnails = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    currentImageIndex.value =
      currentImageIndex.value === 0 ? props.images.length - 1 : currentImageIndex.value - 1
  } else if (direction === 'next') {
    currentImageIndex.value =
      currentImageIndex.value === props.images.length - 1 ? 0 : currentImageIndex.value + 1
  }
}

const scrollToCurrentThumbnail = () => {
  if (thumbnailContainer.value && thumbnails.value[currentImageIndex.value]) {
    const selectedThumbnail = thumbnails.value[currentImageIndex.value]
    const containerRect = thumbnailContainer.value.getBoundingClientRect()
    const thumbnailRect = selectedThumbnail.getBoundingClientRect()

    const offsetLeft = thumbnailRect.left - containerRect.left + thumbnailContainer.value.scrollLeft

    const thumbnailCenter = offsetLeft + selectedThumbnail.offsetWidth / 2
    const containerCenter = containerRect.width / 2

    thumbnailContainer.value.scrollTo({
      left: thumbnailCenter - containerCenter,
      behavior: 'smooth'
    })
  }
}

watch(currentImageIndex, () => {
  nextTick(() => {
    scrollToCurrentThumbnail()
  })
})

onMounted(() => {
  nextTick(() => {
    scrollToCurrentThumbnail()
  })
})
</script>

<style scoped lang="scss">
.image-gallery-root-container {
  @apply flex flex-col items-stretch;

  .image-container {
    @apply bg-gray-200 h-96 flex items-center justify-center;
  }

  @media (max-width: 40rem) {
    @apply mx--5 mt--10;

    .image-container {
      @apply h-64;
    }
  }
}

.thumbnail-root-container {
  @apply flex flex-row justify-stretch items-center py-2 px-4 bg-slate-100 mt-4;

  .thumbnail-container::-webkit-scrollbar {
    display: none;
  }

  .thumbnail {
    @apply bg-gray-300 h-24 w-24 flex-shrink-0 cursor-pointer border-2 border-solid border-transparent;

    &.selected {
      @apply border-blue-500 border-2 border-solid;
    }
  }

  .thumbnail-control {
    @apply w-10 h-10 cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-60;
  }

  @media (max-width: 40rem) {
    @apply mt-0 py-4;

    .thumbnail-control {
      @apply hidden;
    }
  }
}
</style>
