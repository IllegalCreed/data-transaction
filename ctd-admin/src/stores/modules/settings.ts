import { useI18n } from 'vue-i18n'

export const useSettingsStore = defineStore('settings', () => {
  // 水印相关
  const watermarkEnabled = ref(true)
  const setWatermark = (value: boolean) => {
    watermarkEnabled.value = value
  }

  // 深色模式相关
  const darkModeEnabled = useDark()
  const setDarkMode = (value: boolean) => {
    darkModeEnabled.value = value
  }

  // 语言相关
  const { messages, locale } = useI18n()
  const currentLanguage = useLocalStorage('app-locale', 'zh-CN')
  watch(
    currentLanguage,
    (newLang) => {
      locale.value = newLang
    },
    { immediate: true }
  )

  const getLanguageArray = () => {
    return Object.entries(messages.value).map(([key, value]) => ({
      key,
      content: value.language as string
    }))
  }

  const setLanguage = (lang: string) => {
    currentLanguage.value = lang
  }

  return {
    watermarkEnabled,
    setWatermark,

    darkModeEnabled,
    setDarkMode,

    currentLanguage,
    getLanguageArray,
    setLanguage
  }
})
