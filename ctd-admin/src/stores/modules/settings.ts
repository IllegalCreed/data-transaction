import type { ITreeNode } from '@/types/common'
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

  const mockTree = useLocalStorage<ITreeNode[]>('app-mock-tree', [
    { key: 'login', value: false, children: [] },
    { key: 'admin', value: false, children: [] },
    { key: 'file', value: false, children: [] },
    { key: 'user', value: false, children: [] },
    { key: 'company', value: false, children: [] }
  ])

  const findMockTreeValueByKey = (key: string) => {
    return findValueByKey(mockTree.value, key)
  }

  const findValueByKey = (tree: ITreeNode[], key: string): boolean | undefined => {
    for (const node of tree) {
      if (node.key === key) {
        return node.value
      }
      if (node.children && node.children.length > 0) {
        const value = findValueByKey(node.children, key)
        if (value !== undefined) {
          return value
        }
      }
    }
    return undefined
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
    setMock,
    mockTree,
    findMockTreeValueByKey
  }
})
