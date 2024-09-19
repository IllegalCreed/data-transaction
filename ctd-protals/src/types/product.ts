export interface IProduct {
  id: number
  name: string
  description: string
  seller: string
  price: number
  tags: string[]
  imageUrl: string
}

export interface IOrderProduct {
  id: number
  productName: string
  productImageUrl: string
  type: string
  purchaseDate: string
  price: string
  status: string
  expectedDeliveryDate?: string
  actualDeliveryDate?: string
}
