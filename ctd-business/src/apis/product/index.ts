import * as javaProduct from './java/product'
import * as nestPruduct from './nest/product'
import * as javaApproval from './java/approval'
import * as nestApproval from './nest/approval'

interface IProductAPI {
  getProducts: (
    searchQuery: string,
    status: string,
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getProduct: (id: string | number) => Promise<unknown>
  delProducts: (ids: (string | number)[]) => Promise<unknown>
  getVersion: (productId: string | number, version: string | number) => Promise<unknown>
  getPriceDefinition: (productId: string | number, version: string | number) => Promise<unknown>
}

interface IApprovalAPI {
  getProductRejectReason: (id: string | number) => Promise<unknown>
  getProductApprovalLogs: (productId: string | number) => Promise<unknown>
}

type ProductAPIType = IProductAPI & IApprovalAPI

const javaAPI: ProductAPIType = {
  ...javaProduct,
  ...javaApproval
}

const nestAPI: ProductAPIType = {
  ...nestPruduct,
  ...nestApproval
}

const productAPI: ProductAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  getProducts,
  getProduct,
  delProducts,
  getVersion,
  getPriceDefinition,
  getProductRejectReason,
  getProductApprovalLogs
} = productAPI
