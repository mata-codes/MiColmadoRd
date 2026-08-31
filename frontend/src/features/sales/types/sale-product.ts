export type SaleProduct = {
  id: number
  name: string
  price: number
  category: string
  image?: string
}

export type SaleCartItem = SaleProduct & {
  quantity: number
}
