import type { ISolicit } from '@/types/scene'
import { solicit as mockSolicit } from '@/constants/mockData/scene/solicit'

export const useSolicit = () => {
  const solicit = ref<ISolicit>({
    content: '',
    link: '',
    companys: [],
    undertakes: [],
    email: '',
    phone: ''
  })

  const getSolicit = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      solicit.value = mockSolicit
      resolve()
    })
  }

  return {
    solicit,
    getSolicit
  }
}
