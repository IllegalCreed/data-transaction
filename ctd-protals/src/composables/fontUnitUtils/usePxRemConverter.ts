import { useDocumentFontSize } from './useDocumentFontSize'

export function usePxRemConverter() {
  const { documentFontSize } = useDocumentFontSize()

  /**
   * 将 px 转换为 rem
   * @param px - 需要转换的 px 值
   * @returns 转换后的 rem 字符串
   */
  const pxToRem = (px: number): string => {
    return `${px / documentFontSize.value}rem`
  }

  /**
   * 将 rem 转换为 px
   * @param rem - 需要转换的 rem 值
   * @returns 转换后的 px 数值
   */
  const remToPx = (rem: number): number => {
    return rem * documentFontSize.value
  }

  // 如果希望转换结果也是响应式的，可以将它们包装为 computed
  // 但通常情况下，直接使用函数即可

  return {
    pxToRem,
    remToPx,
  }
}
