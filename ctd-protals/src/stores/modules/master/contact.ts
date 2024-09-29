import type { IContact } from '@/types/master'
import { getContact as getContactAPI } from '@/apis/master/contact'

import { contact as mockContact } from '@/constants/mockData/master/contact'

export const useContact = () => {
  const settingsStore = useSettingsStore()

  const contact = ref<IContact>()

  const getContact = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          contact.value = mockContact
          resolve()
        }, 1000)
      } else {
        getContactAPI()
          .then((res: unknown) => {
            contact.value = res as IContact
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    contact,
    getContact
  }
}
