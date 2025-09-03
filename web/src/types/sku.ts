export enum SKUStatusEnum {
  PRE_CADASTRO = "PRÉ-CADASTRO",
  CADASTRO_COMPLETO = "CADASTRO COMPLETO",
  ATIVO = "ATIVO",
  DESATIVADO = "DESATIVADO",
  CANCELADO = "CANCELADO",
}

export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  brand: string;
}

export interface CompositionValueObject {
  formula: string;
  keyIngredients: string;
  compositionUniqueKey: string;
}

export interface VolumetryValueObject {
  value: number;
  unit: string;
  volumetryUniqueKey: string;
}

export interface PackagingValueObject {
  type: string;
  material: string;
  packagingUniqueKey: string;
}

export interface SKUEntity {
  id: string;
  skuCode: string;
  description: string;
  commercialDescription: string;
  status: string;
  product: ProductEntity;
  composition: CompositionValueObject;
  volumetry: VolumetryValueObject;
  packaging: PackagingValueObject;
  userCreate: string;
  userUpdate: string;
}
