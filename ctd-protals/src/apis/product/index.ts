import type { ISortValue } from '@/types/sorting'
import * as javaProduct from './java/product'
import * as nestProduct from './nest/product'

interface IProductAPI {
  getProducts: (
    pageNum: number,
    pageSize: number,
    searchType: string,
    searchValue: string,
    filters: Record<string, string>,
    sorts: ISortValue,
  ) => Promise<unknown>
  getProduct: (id: number | string) => Promise<unknown>
  getProductImages: (id: number | string) => Promise<unknown>
  getProductContent: (id: number | string) => Promise<unknown>
}

type ProductAPIType = IProductAPI

const javaAPI: ProductAPIType = {
  ...javaProduct,
}

const nestAPI: ProductAPIType = {
  ...nestProduct,
}

const productAPI: ProductAPIType =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getProducts, getProduct, getProductImages, getProductContent } =
  productAPI
