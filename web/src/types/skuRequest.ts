export interface SKURequest {
  skuCode: string;
  description: string;
  commercialDescription: string;
  status: string;
  productId: string;
  compositionId: string;
  volumetryId: string;
  packagingId: string;
  userCreate: string;
  userUpdate?: string;
}

export interface SKUUpdateRequest {
  id: string;
  skuCode: string;
  description: string;
  commercialDescription: string;
  status: string;
  productId: string;
  compositionId: string;
  volumetryId: string;
  packagingId: string;
  userUpdate?: string;
}
