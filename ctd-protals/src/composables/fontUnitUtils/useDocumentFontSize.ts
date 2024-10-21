const DEFAULT_FONT_SIZE = 16

/**
 * 解析 font-size 字符串，确保返回有效的数值。
 * @param fontSize - CSS font-size 字符串
 * @returns 解析后的数值，或默认值
 */
function parseFontSize(fontSize: string | null | undefined): number {
  if (typeof fontSize === 'string') {
    const parsed = parseFloat(fontSize)
    return isNaN(parsed) ? DEFAULT_FONT_SIZE : parsed
  }
  return DEFAULT_FONT_SIZE
}

export function useDocumentFontSize() {
  // 使用 useCssVar 获取 <html> 元素的 'font-size'，并启用观察
  const fontSizeVar = useCssVar('font-size', document.documentElement, {
    observe: true,
  })

  // 计算根元素的字体大小，确保类型安全
  const documentFontSize = computed(() => parseFontSize(fontSizeVar.value))

  return {
    documentFontSize,
  }
}
