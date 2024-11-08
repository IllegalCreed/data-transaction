import { useDocumentFontSize } from './useDocumentFontSize'

export function usePxRemConverter() {
  const { documentFontSize } = useDocumentFontSize()

  /**
   * 将 px 转换为 rem
   * @param px - 需要转换的 px 值
   * @returns 转换后的 rem 数值和格式化后的字符串
   */
  const pxToRem = (px: number): { value: number; format: string } => {
    const value = px / documentFontSize.value
    return { value, format: `${value}rem` }
  }

  /**
   * 将 rem 转换为 px
   * @param rem - 需要转换的 rem 值
   * @returns 转换后的 px 数值
   */
  const remToPx = (rem: number): { value: number; format: string } => {
    const value = rem * documentFontSize.value
    return {
      value,
      format: `${value}px`,
    }
  }

  // 如果希望转换结果也是响应式的，可以将它们包装为 computed
  // 但通常情况下，直接使用函数即可

  return {
    pxToRem,
    remToPx,
  }
}
