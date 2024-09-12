<template>
  <div ref="tabBar" :class="['tab-bar-root-container', { 'sticky-active': isSticky }]">
    <nav flex flex-row justify-around space-x-8>
      <span
        v-for="link in links"
        :key="link.id"
        :class="['tab-item', { active: activeSection === link.id }]"
        @click="scrollToSection(link.id)"
      >
        {{ link.label }}
      </span>
    </nav>
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
  @apply sticky top-20 bg-white z-10 rounded-full;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  @media (max-width: 40rem) {
    @apply top-15 w-full;
  }
}

.sticky-active {
  @apply rounded-t-0 rounded-b-6;
}

.tab-item {
  @apply py-4 font-bold hover:opacity-60 cursor-pointer select-none;
}

.tab-item.active {
  @apply text-blue-600;
}
</style>
