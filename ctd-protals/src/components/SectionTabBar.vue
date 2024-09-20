<template>
  <div ref="tabBar" :class="['tab-bar-root-container', { 'sticky-active': isSticky }]">
    <span
      v-for="link in links"
      :key="link.id"
      :class="['tab-item', { active: activeSection === link.id }]"
      @click="scrollToSection(link.id)"
    >
      {{ link.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  links: { id: string; label: string }[]
}>()

const activeSection = ref<string>('details')
const isSticky = ref(false)
const tabBar = ref<HTMLElement | null>(null)

const offset = 150

const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    })
  }
}

const updateActiveSection = () => {
  props.links.forEach((link) => {
    const section = document.getElementById(link.id)
    if (section) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 151) {
        activeSection.value = link.id
      }
    }
  })

  if (tabBar.value) {
    isSticky.value = tabBar.value.getBoundingClientRect().top <= 80
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped lang="scss">
.tab-bar-root-container {
  @apply flex flex-row justify-start px-5 sticky top-20 bg-white z-10 rounded-full overflow-x-auto;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  &::-webkit-scrollbar {
    @apply hidden;
  }

  @media (max-width: 40rem) {
    @apply top-15;
  }
}

.sticky-active {
  @apply rounded-t-0 rounded-b-6;

  @media (max-width: 40rem) {
    @apply rounded-none ml--5 w-[calc(100%+40px)];
  }
}

.tab-item {
  @apply block p-4 font-bold hover:opacity-60 cursor-pointer select-none whitespace-nowrap mx-auto;

  &.isActive {
    @apply text-blue-500;
  }

  @media (max-width: 40rem) {
    @apply text-base;
  }
}
</style>
