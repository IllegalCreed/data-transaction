import type {
  IProduct,
  IProductDetail,
  IProductSpecGroup,
} from '@/types/product'
export interface IProductFetchData {
  id: string
  userId: string
  nickName: string
  proLabelList: { prodLabel: string }[]
  proVersion: {
    prodName: string
    prodDescribe: string
    productCover: string
    prodDisplayPrice: number
    bizNumSwitch: string
    productImgs: string
    prodContent: string
  }
  saleNum: number
  proSpecificationsTypeList: {
    speTypeKey: string
    speTypeLabel: string
    proSpecificationsInfoList: {
      spePronKey: string
      spePronLabel: string
    }[]
  }[]
}

export const productsConvert = (raws: IProductFetchData[]): IProduct[] => {
  const result: IProduct[] = []
  for (const row of raws) {
    result.push({
      id: row.id,
      name: row.proVersion.prodName,
      description: row.proVersion.prodDescribe,
      sellerId: row.userId,
      sellerName: row.nickName,
      tags: row.proLabelList.map(
        (item: { prodLabel: string }) => item.prodLabel,
      ),
      imageUrl: row.proVersion.productCover,
      showPrice: row.proVersion.prodDisplayPrice,
    })
  }
  return result
}

export const productConvert = (raw: IProductFetchData): IProductDetail => {
  return {
    name: raw.proVersion.prodName,
    description: raw.proVersion.prodDescribe,
    sellerId: raw.userId,
    sellerName: raw.nickName,
    tags: raw.proLabelList.map((item: { prodLabel: string }) => item.prodLabel),
    imageUrl: raw.proVersion.productCover,
    soldCount: raw.saleNum,
    hasCount: raw.proVersion.bizNumSwitch === '1',
    specGroups: transformSpecifications(raw.proSpecificationsTypeList),
  }
}

function transformSpecifications(
  proSpecificationsTypeList: {
    speTypeKey: string
    speTypeLabel: string
    proSpecificationsInfoList: {
      spePronKey: string
      spePronLabel: string
    }[]
  }[],
): IProductSpecGroup[] {
  return proSpecificationsTypeList.map(type => ({
    key: type.speTypeKey,
    label: type.speTypeLabel,
    specs: type.proSpecificationsInfoList.map(info => ({
      key: info.spePronKey,
      label: info.spePronLabel,
    })),
  }))
}
