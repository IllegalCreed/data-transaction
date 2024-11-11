import * as javaProduct from './java/product'
import * as nestPruduct from './nest/product'

interface IProductAPI {
  getProducts: (
    title: string,
    status: string,
    sellerId: string | number,
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
}

type ProductAPIType = IProductAPI

const javaAPI: ProductAPIType = {
  ...javaProduct
}

const nestAPI: ProductAPIType = {
  ...nestPruduct
}

const productAPI: ProductAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getProducts } = productAPI
