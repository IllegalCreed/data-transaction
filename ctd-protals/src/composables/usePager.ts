import { debounce } from 'lodash-es'

export function usePager(
  getList: () => Promise<void>,
  options?: {
    initPageNum?: number
    initPageSize?: number
  },
) {
  const pageNum = ref<number>(options?.initPageNum ?? 1)
  const pageSize = ref<number>(options?.initPageSize ?? 10)

  const refresh = async () => {
    if (pageNum.value !== 1) {
      pageNum.value = 1
      return
    }
    await getList()
  }

  const debouncedRefresh = debounce(refresh, 1000)

  onMounted(() => {
    debouncedRefresh()
  })

  watch([pageNum, pageSize], () => {
    debouncedRefresh()
  })

  return { pageNum, pageSize, refresh: debouncedRefresh }
}
