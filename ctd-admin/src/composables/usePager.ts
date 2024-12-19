import { debounce } from 'lodash-es'

export function usePager(
  getList: () => Promise<number>,
  options?: {
    initPageNum?: number
    initPageSize?: number
    initTotal?: number
  }
) {
  const pageNum = ref<number>(options?.initPageNum ?? 1)
  const pageSize = ref<number>(options?.initPageSize ?? 10)
  const total = ref<number>(options?.initTotal ?? 0)

  const refresh = async (resetPageNum: boolean = true) => {
    if (resetPageNum && pageNum.value !== 1) {
      pageNum.value = 1
    } else {
      fetchDate()
    }
  }

  const fetchDate = debounce(async () => {
    total.value = await getList()
  }, 500)

  onMounted(() => {
    refresh(false)
  })

  watch([pageNum, pageSize], () => {
    refresh(false)
  })

  return { pageNum, pageSize, total, refresh }
}
