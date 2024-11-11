import { useI18n } from 'vue-i18n'

export const useSettingsStore = defineStore('settings', () => {
  // 水印相关
  const watermarkEnabled = ref(true)
  const setWatermark = (value: boolean) => {
    watermarkEnabled.value = value
  }
  const watermarkContent = ref('开发中')

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

  // Mock 相关
  const mockEnabled = useLocalStorage('app-mock', true)

  const setMock = (value: boolean) => {
    mockEnabled.value = value
  }

  return {
    watermarkEnabled,
    setWatermark,
    watermarkContent,

    darkModeEnabled,
    setDarkMode,

    currentLanguage,
    getLanguageArray,
    setLanguage,

    mockEnabled,
    setMock
  }
})
