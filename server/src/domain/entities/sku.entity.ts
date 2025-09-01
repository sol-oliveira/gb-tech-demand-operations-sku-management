import { ProductEntity } from './product.entity.js'
import { CompositionValueObject } from '../value_objects/composition.vo.js'
import { VolumetryValueObject } from '../value_objects/volumetry.vo.js'
import { PackagingValueObject } from '../value_objects/packaging.vo.js'
import { SKUStatusEnum } from '../enums/sku.enum.js'


export class SKUEntity {
    id: string;
    skuCode: string;
    description: string;
    commercialDescription: string;
    status: SKUStatusEnum;
    product: ProductEntity; 
    composition: CompositionValueObject 
    volumetry: VolumetryValueObject 
    packaging: PackagingValueObject 
    createdAt: Date;
    updatedAt: Date | null;
    userCreate: string ; 
    userUpdate: string | null;
    
    constructor(data: {
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
    }) {
        this.id = data.id;
        this.skuCode = data.skuCode;
        this.description = data.description;
        this.commercialDescription = data.commercialDescription;
        this.status = data.status;
        this.product = data.product;
        this.composition = data.composition;
        this.volumetry = data.volumetry;
        this.packaging = data.packaging;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || null;
        this.userCreate = data.userCreate;
        this.userUpdate = data.userUpdate || null;
    }    
}