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

  onMounted(() => {
    refresh()
  })

  const refresh = async () => {
    total.value = await getList()
  }

  watch([pageNum, pageSize], refresh)

  return { pageNum, pageSize, total }
}
