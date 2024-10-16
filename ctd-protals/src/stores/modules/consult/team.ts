import { useSettingsStore } from '@/stores/modules/settings'
import type { ITeam } from '@/types/consult'
import { getTeams as getTeamsAPI } from '@/apis/consult/team'
import { teams as mockTeams } from '@/constants/mockData/consult/team'

export const useTeams = () => {
  const settingsStore = useSettingsStore()

  const teams = ref<ITeam[]>()

  const getTeams = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          teams.value = mockTeams
          resolve()
        }, 1000)
      } else {
        getTeamsAPI()
          .then((res: unknown) => {
            teams.value = res as ITeam[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    teams,
    getTeams
  }
}
