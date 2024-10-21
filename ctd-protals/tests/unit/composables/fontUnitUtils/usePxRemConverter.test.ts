import type { MockedFunction } from 'vitest'

vi.mock('@/composables/fontUnitUtils/useDocumentFontSize', () => ({
  useDocumentFontSize: vi.fn(),
}))

import { usePxRemConverter } from '@/composables/fontUnitUtils/usePxRemConverter'
import { useDocumentFontSize } from '@/composables/fontUnitUtils/useDocumentFontSize'

describe('usePxRemConverter', () => {
  const mockUseDocumentFontSize = useDocumentFontSize as MockedFunction<
    typeof useDocumentFontSize
  >

  beforeEach(() => {
    // 重置所有模拟
    vi.resetAllMocks()

    mockUseDocumentFontSize.mockReturnValue({
      documentFontSize: {
        value: 16,
      } as ComputedRef<number>,
    })
  })

  it('pxToRem should convert px to rem with default font size', () => {
    const { pxToRem } = usePxRemConverter()
    const rem = pxToRem(32)
    expect(rem).toBe('2rem')
  })

  it('pxToRem should convert px to rem with custom font size', () => {
    mockUseDocumentFontSize.mockReturnValue({
      documentFontSize: {
        value: 20,
      } as ComputedRef<number>,
    })
    const { pxToRem } = usePxRemConverter()
    const rem = pxToRem(40)
    expect(rem).toBe('2rem')
  })

  it('pxToRem should handle zero px value', () => {
    const { pxToRem } = usePxRemConverter()
    const rem = pxToRem(0)
    expect(rem).toBe('0rem')
  })

  it('pxToRem should handle negative px values', () => {
    const { pxToRem } = usePxRemConverter()
    const rem = pxToRem(-16)
    expect(rem).toBe('-1rem')
  })

  it('remToPx should convert rem to px with default font size', () => {
    const { remToPx } = usePxRemConverter()
    const px = remToPx(2)
    expect(px).toBe(32)
  })

  it('remToPx should convert rem to px with custom font size', () => {
    mockUseDocumentFontSize.mockReturnValue({
      documentFontSize: {
        value: 20,
      } as ComputedRef<number>,
    })
    const { remToPx } = usePxRemConverter()
    const px = remToPx(2)
    expect(px).toBe(40)
  })

  it('remToPx should handle zero rem value', () => {
    const { remToPx } = usePxRemConverter()
    const px = remToPx(0)
    expect(px).toBe(0)
  })

  it('remToPx should handle negative rem values', () => {
    const { remToPx } = usePxRemConverter()
    const px = remToPx(-1)
    expect(px).toBe(-16)
  })
})
