import * as javaDemand from './java/demand'
import * as nestDemand from './nest/demand'

interface IDemandAPI {
  getDemandOptionsByName: (searchQuery: string) => Promise<unknown>
  getDemandOptionsByID: (id: string | number) => Promise<unknown>
}

type DemandAPIType = IDemandAPI

const javaAPI: DemandAPIType = {
  ...javaDemand
}

const nestAPI: DemandAPIType = {
  ...nestDemand
}

const demandAPI: DemandAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getDemandOptionsByName, getDemandOptionsByID } = demandAPI
