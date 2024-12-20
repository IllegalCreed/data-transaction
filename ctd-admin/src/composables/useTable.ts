import type { IFilter, IFilterDTO, ISort, ITableColumn } from '@/types/table'

export const useTable = <T>(
  initialSortList: ISort<T>[],
  initialFilterList: IFilter<T>[],
  initialColumnList: ITableColumn<T>[]
) => {
  const sortList = ref<ISort<T>[]>(initialSortList)
  const filterList = ref<IFilter<T>[]>(initialFilterList)
  const columnList = ref<ITableColumn<T>[]>(initialColumnList)

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
    columnList,
    filterDTO
  }
}
