<template>
  <service-item
    v-for="(item, index) in services"
    :key="item.id"
    :service="item"
    :imagePosition="index % 2 === 0 ? 'right' : 'left'"
  ></service-item>
</template>

<script setup lang="ts">
import ServiceItem from './ServiceItem.vue'
import { useServiceStore } from '@/stores/modules/service'

const serviceStore = useServiceStore()
const { services } = storeToRefs(serviceStore)
const { getServices: getServicesAction } = serviceStore

onMounted(() => {
  getServicesAction()
})
</script>

<style scoped lang="scss"></style>
