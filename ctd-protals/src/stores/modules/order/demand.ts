import { useSettingsStore } from '@/stores/modules/settings'
import {
  orderDemands as mockOrderDemands,
  orderDemandDetails as mockOrderDemandDetails,
} from '@/constants/mockData/order/demand'
import {
  getDemandOrders as getDemandOrdersAPI,
  getDemandOrderDetail as getDemandOrderDetailAPI,
  getDemandOrderTenderCompanies as getDemandOrderTenderCompaniesAPI,
  getDemandOrderRecommendCompanies as getDemandOrderRecommendCompaniesAPI,
  getDemandOrderContract as getDemandOrderContractAPI,
  getDemandOrderReview as getDemandOrderReviewAPI,
} from '@/apis/order/demand'
import type { IOrderDemand, IOrderDemandDetail } from '@/types/demandOrder'
import type { IReview } from '@/types/review'
import type { IContract } from '@/types/productOrder'
import type { ICompany } from '@/types/company'

export const useOrderDemand = () => {
  const settingsStore = useSettingsStore()

  const demandOrders = ref<IOrderDemand[]>([])

  const getDemandOrders = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          demandOrders.value = mockOrderDemands
          resolve()
        }, 1000)
      } else {
        getDemandOrdersAPI()
          .then((res: unknown) => {
            demandOrders.value = res as IOrderDemand[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getDemandOrderDetail = (
    id: string | number,
  ): Promise<IOrderDemandDetail> => {
    return new Promise<IOrderDemandDetail>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const demandDetail = mockOrderDemandDetails.find(
            item => item.id === Number(id),
          )
          if (demandDetail) {
            resolve(demandDetail?.detailInfo)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getDemandOrderDetailAPI(id)
          .then((res: unknown) => {
            const demandOrderDetail = res as IOrderDemandDetail
            resolve(demandOrderDetail)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getDemandOrderTenderCompanies = (
    id: string | number,
  ): Promise<ICompany[]> => {
    return new Promise<ICompany[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const demandDetail = mockOrderDemandDetails.find(
            item => item.id === Number(id),
          )
          if (demandDetail) {
            resolve(demandDetail?.tenderCompanies)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getDemandOrderTenderCompaniesAPI(id)
          .then((res: unknown) => {
            const demandOrderTenderCompanies = res as ICompany[]
            resolve(demandOrderTenderCompanies)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getDemandOrderRecommendCompanies = (
    id: string | number,
  ): Promise<ICompany[]> => {
    return new Promise<ICompany[]>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const demandDetail = mockOrderDemandDetails.find(
            item => item.id === Number(id),
          )
          if (demandDetail) {
            resolve(demandDetail?.recommendCompanies)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getDemandOrderRecommendCompaniesAPI(id)
          .then((res: unknown) => {
            const demandOrderRecommendCompanies = res as ICompany[]
            resolve(demandOrderRecommendCompanies)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getDemandOrderContract = (id: string | number): Promise<IContract> => {
    return new Promise<IContract>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const DemandDetail = mockOrderDemandDetails.find(
            item => item.id === Number(id),
          )
          if (DemandDetail) {
            resolve(DemandDetail?.contract)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getDemandOrderContractAPI(id)
          .then((res: unknown) => {
            const DemandOrderContract = res as IContract
            resolve(DemandOrderContract)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const getDemandOrderReview = (id: string | number): Promise<IReview> => {
    return new Promise<IReview>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          const DemandDetail = mockOrderDemandDetails.find(
            item => item.id === Number(id),
          )
          if (DemandDetail) {
            resolve(DemandDetail?.review)
          } else {
            reject(new Error('Order not found'))
          }
        }, 1000)
      } else {
        getDemandOrderReviewAPI(id)
          .then((res: unknown) => {
            const DemandOrderReview = res as IReview
            resolve(DemandOrderReview)
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    demandOrders,
    getDemandOrders,
    getDemandOrderDetail,
    getDemandOrderTenderCompanies,
    getDemandOrderRecommendCompanies,
    getDemandOrderContract,
    getDemandOrderReview,
  }
}
