import '@/assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router'
import store from '@/stores'
import i18n from '@/locales'

const app = createApp(App)

/* 所有插件use要在mount之前注册*/
app.use(store)
app.use(router)
app.use(i18n)

app.mount('#app')
