<template>
  <div class="module-panel-container">
    <module-item
      v-for="(module, index) in modules"
      :key="module.title"
      :data="module"
      data-aos="fade-up"
      :data-aos-delay="index * 100"
    />
  </div>
</template>

<script setup lang="ts">
import ModuleItem from './ModuleItem.vue'

const modules = [
  {
    title: '数据交易',
    description:
      '通过数据交易平台，企业和个人可以方便、安全地发布和获取数据，推动数据的共享与流通。这不仅有助于充分发挥数据的商业价值，还能促进各行业的数字化转型与创新发展，为社会创造更多的经济效益和价值。',
    backgroundImage: 'https://via.placeholder.com/200x200?text=placeholder'
  },
  {
    title: '数据服务',
    description:
      '通过专业技术和工具，帮助企业和机构有效地整理和优化数据，提升数据的质量和利用效率。通过数据处理服务，用户可以更准确地进行市场分析、预测业务趋势、优化决策过程，从而实现更高的运营效率和竞争优势。',
    backgroundImage: 'https://via.placeholder.com/200x200?text=placeholder'
  },
  {
    title: '咨询与代办',
    description:
      '致力于为客户提供全方位的数据相关咨询服务与委托代理业务。依托我们丰富的行业资源和专业团队快速、准确地为客户提供信息。帮助客户深入了解数据的应用场景、挖掘数据价值，助力企业保持竞争优势。',
    backgroundImage: 'https://via.placeholder.com/200x200?text=placeholder'
  },
  {
    title: '需求中心',
    description:
      '旨在为企业和个人提供一个高效便捷的数据需求发布和对接平台。我们将利用广泛的行业网络和丰富的数据资源，为用户匹配最合适的数据供应方。同时确保数据需求从沟通到交付的每个环节都能高效、安全地完成。',
    backgroundImage: 'https://via.placeholder.com/200x200?text=placeholder'
  }
]
</script>

<style scoped lang="scss">
.module-panel-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 默认两列 */
  gap: 2rem; /* 设置网格之间的间距 */

  @media (max-width: 75rem) {
    grid-template-columns: 1fr; /* 当屏幕宽度小于 260px 时，变为一列 */
  }
}
</style>
