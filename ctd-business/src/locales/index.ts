import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
// import messages from '@intlify/unplugin-vue-i18n/messages'
import en_us from './en-US'
import zh_cn from './zh-CN'
import zh_tw from './zh-TW'

const i18n = createI18n({
  legacy: false, // for Vue 3, set to false
  locale: 'zh-CN', // 默认显示语言
  fallbackLocale: 'zh-CN', // 默认回退语言
  globalInjection: false, // 禁止指令注入
  messages: {
    'en-US': en_us,
    'zh-CN': zh_cn,
    'zh-TW': zh_tw
  }
})

export default i18n
