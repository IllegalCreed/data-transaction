import type { IFilter, IFilterDTO, ISort } from '@/types/table'

export const useSortAndFilter = <T>(
  initialSortList: ISort<T>[],
  initialFilterList: IFilter<T>[]
) => {
  const sortList = ref<ISort<T>[]>(initialSortList)
  const filterList = ref<IFilter<T>[]>(initialFilterList)

  const filterDTO = computed(() => convertToFilterDTO(filterList.value as IFilter<T>[]))

  const convertToFilterDTO = (filters: IFilter<T>[]): IFilterDTO<T>[] => {
    return filters.map((item) => ({
      prop: item.prop,
      type: item.type,
      value: item.value
    }))
  }

  return {
    sortList,
    filterList,
    filterDTO
  }
}
