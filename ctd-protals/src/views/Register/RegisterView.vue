<template>
  <div class="register-root-container">
    <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" :options="options" />
    <ad-panel z-10 />
    <control-panel z-10 />
  </div>
</template>
<script setup lang="ts">
import type { Container } from '@tsparticles/engine'
import ControlPanel from './ControlPanel.vue'
import AdPanel from './AdPanel.vue'

const particlesLoaded = async (container: Container) => {
  console.log('Particles container loaded', container)
}

const options = {
  background: {
    color: {
      value: 'transparent'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  particles: {
    color: {
      value: '#386ce1'
    },
    links: {
      enable: false,
      distance: 200,
      color: '#ffffff',
      opacity: 1,
      width: 2
    },
    move: {
      enable: true,
      direction: 'none',
      outModes: 'out',
      random: false,
      straight: false,
      bounce: false,
      speed: 1.5,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    },
    number: {
      value: 6,
      density: {
        enable: true,
        value_area: 800
      }
    },
    opacity: {
      value: 0.3,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    size: {
      value: 160,
      random: false,
      anim: {
        enable: true,
        speed: 10,
        size_min: 40,
        sync: false
      }
    }
  },
  detectRetina: true,
  fpsLimit: 120
}
</script>
<style lang="scss" scoped>
.register-root-container {
  @apply flex flex-row min-h-100vh min-w-full bg-gradient-to-b from-[var(--color-module-gradient-from)] to-[var(--color-module-gradient-to)];

  #tsparticles {
    @apply z-0;
  }
}
</style>
