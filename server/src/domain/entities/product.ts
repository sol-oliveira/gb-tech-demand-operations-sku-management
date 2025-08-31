export interface ProductEntity {
  id: number
  name: string
  description: string
  brand: string
  createdAt: Date
  updatedAt?: Date
  userCreate: string
  userUpdate?: string
}