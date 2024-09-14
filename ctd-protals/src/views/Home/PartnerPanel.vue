<template>
  <div class="partner-panel-container">
    <span text-4xl font-bold self-center>合作伙伴</span>
    <top-partner mt-10 />
    <div class="partner-list-container">
      <partner-item
        v-for="(item, index) of partner"
        :key="item.img"
        :data="item"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopPartner from './TopPartner.vue'
import PartnerItem from './PartnerItem.vue'

const partner = [
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  },
  {
    img: 'https://via.placeholder.com/200x100'
  }
]
</script>

<style lang="scss" scoped>
.partner-panel-container {
  @apply flex flex-col items-stretch w-260;

  .partner-list-container {
    @apply mt-10 grid grid-cols-4 gap-10;
  }

  @media (max-width: 75rem) {
    @apply w-125;

    .partner-list-container {
      @apply grid-cols-2;
    }
  }

  @media (max-width: 40rem) {
    @apply w-full px-10;

    .partner-list-container {
      @apply grid-cols-1;
    }
  }
}
</style>
