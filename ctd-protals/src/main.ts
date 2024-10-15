import '@/assets/main.scss'
import '@/styles/index.scss'
import 'virtual:uno.css'
import 'element-plus/theme-chalk/src/message.scss'
import 'aos/dist/aos.css'
import '@/assets/icons'

import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router'

import store from '@/stores'
import i18n from '@/locales'
import AOS from 'aos'

import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

const app = createApp(App)

/* 所有插件use要在mount之前注册*/
app.use(store)
app.use(router)
app.use(i18n)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  }
})

AOS.init({
  once: true
})

app.mount('#app')
