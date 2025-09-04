import { ProductEntity } from "./product.entity";
import { CompositionValueObject } from "../value_objects/composition.vo";
import { VolumetryValueObject } from "../value_objects/volumetry.vo";
import { PackagingValueObject } from "../value_objects/packaging.vo";
import { SKUStatusEnum } from "../enums/sku.enum";

export type SKUEntityType = {
  id: string;
  skuCode: string;
  description: string;
  commercialDescription: string;
  status: SKUStatusEnum;
  product: ProductEntity;
  composition: CompositionValueObject;
  volumetry: VolumetryValueObject;
  packaging: PackagingValueObject;
  createdAt?: Date;
  updatedAt?: Date | null;
  userCreate: string;
  userUpdate?: string | null;
};

export class SKUEntity {
  id: string;
  skuCode: string;
  description: string;
  commercialDescription: string;
  status: SKUStatusEnum;
  product: ProductEntity;
  composition: CompositionValueObject;
  volumetry: VolumetryValueObject;
  packaging: PackagingValueObject;
  createdAt: Date;
  updatedAt: Date | null;
  userCreate: string;
  userUpdate: string | null;

  constructor(props: SKUEntityType) {
    this.id = props.id;
    this.skuCode = props.skuCode;
    this.description = props.description;
    this.commercialDescription = props.commercialDescription;
    this.status = props.status;
    this.product = props.product;
    this.composition = props.composition;
    this.volumetry = props.volumetry;
    this.packaging = props.packaging;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
    this.userCreate = props.userCreate;
    this.userUpdate = props.userUpdate ?? null;
  }

  static generateSkuCode(): string {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `SKU-${random}`;
  }
}
