export interface SKUEntity {
  id: string
  productId: number
  skuCode: string
  description: string
  commercialDescription: string
  status: string
  compositionId: number
  volumetryId: number
  packagingId: number
  createdAt: Date
  updatedAt?: Date
  userCreate: string
  userUpdate?: string
}