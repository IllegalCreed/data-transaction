import { useSettingsStore } from '@/stores/modules/settings'
import type { ISearchResult } from '@/types/search'
import {
  historyRecords as mockHistoryRecords,
  searchResults as mockSearchResults,
} from '@/constants/mockData/master/search'
import {
  getHistoryRecords as getHistoryRecordsAPI,
  getSearchResults as getSearchResultsAPI,
} from '@/apis/master/search'

export const useSearch = () => {
  const settingsStore = useSettingsStore()

  const historyRecords = ref<ISearchResult[]>()

  const getHistoryRecords = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          historyRecords.value = mockHistoryRecords
          resolve()
        }, 1000)
      } else {
        getHistoryRecordsAPI()
          .then((res: unknown) => {
            historyRecords.value = res as ISearchResult[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const searchResults = ref<ISearchResult[]>()

  const getSearchResults = (keyword: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        searchResults.value = mockSearchResults
        resolve()
      } else {
        getSearchResultsAPI(keyword)
          .then((res: unknown) => {
            searchResults.value = res as ISearchResult[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    historyRecords,
    getHistoryRecords,
    searchResults,
    getSearchResults,
  }
}
