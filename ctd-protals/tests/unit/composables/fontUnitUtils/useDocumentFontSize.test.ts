import type { MockedFunction } from 'vitest'

// 模拟 @vueuse/core 模块
vi.mock('@vueuse/core', () => ({
  useCssVar: vi.fn(),
}))

import { useDocumentFontSize } from '@/composables/fontUnitUtils/useDocumentFontSize'
import { useCssVar } from '@vueuse/core'

describe('useDocumentFontSize', () => {
  const mockUseCssVar = useCssVar as MockedFunction<typeof useCssVar>

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return default font size when fontSizeVar is undefined', () => {
    mockUseCssVar.mockReturnValue(ref(undefined))

    const { documentFontSize } = useDocumentFontSize()

    expect(documentFontSize.value).toBe(16)
  })

  it('should parse valid font size string correctly', () => {
    mockUseCssVar.mockReturnValue(ref('20px'))

    const { documentFontSize } = useDocumentFontSize()

    expect(documentFontSize.value).toBe(20)
  })

  it('should return default font size for invalid font size string', () => {
    mockUseCssVar.mockReturnValue(ref('invalid'))

    const { documentFontSize } = useDocumentFontSize()

    expect(documentFontSize.value).toBe(16)
  })

  it('should handle null font size value', () => {
    mockUseCssVar.mockReturnValue(ref(null))

    const { documentFontSize } = useDocumentFontSize()

    expect(documentFontSize.value).toBe(16)
  })

  it('should handle numeric font size without unit', () => {
    mockUseCssVar.mockReturnValue(ref('18'))

    const { documentFontSize } = useDocumentFontSize()

    expect(documentFontSize.value).toBe(18)
  })
})
