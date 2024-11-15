import type { apiListResult } from '@/types/common'

export function usePager<T>(
  getList: () => Promise<apiListResult<T>>,
  options?: {
    initPageNum?: number
    initPageSize?: number
    initTotal?: number
  }
) {
  const pageNum = ref<number>(options?.initPageNum ?? 1)
  const pageSize = ref<number>(options?.initPageSize ?? 10)
  const total = ref<number>(options?.initTotal ?? 0)

  onMounted(() => {
    refresh()
  })

  const refresh = async () => {
    const result = await getList()
    total.value = result.total
  }

  watch([pageNum, pageSize], refresh)

  return { pageNum, pageSize, total, refresh }
}
