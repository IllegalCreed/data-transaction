import type { apiListResult } from '@/types/common'

export function usePager<T>(
  getList: (pageNum: number, pageSize: number) => Promise<apiListResult<T>>,
  options?: {
    initPageNum?: number
    initPageSize?: number
    initTotal?: number
  }
) {
  const pageNum = ref<number>(options?.initPageNum ?? 1)
  const pageSize = ref<number>(options?.initPageSize ?? 10)
  const total = ref<number>(options?.initTotal ?? 0)
  const data = ref<T[]>([])

  onMounted(() => {
    refresh()
  })

  const refresh = async () => {
    const result = await getList(pageNum.value, pageSize.value)
    total.value = result.total
    data.value = result.rows
  }

  watch([pageNum, pageSize], refresh)

  return { pageNum, pageSize, total, data }
}
