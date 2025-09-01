import { SKUEntity } from '../../../domain/entities/sku.entity.js';
import { ProductEntity } from '../../../domain/entities/product.entity.js';
import { CompositionValueObject } from '../../../domain/value_objects/composition.vo.js';
import { VolumetryValueObject } from '../../../domain/value_objects/volumetry.vo.js';
import { PackagingValueObject } from '../../../domain/value_objects/packaging.vo.js';
import { SKUStatusEnum } from '../../../domain/enums/sku.enum.js';
import { ISKURepository } from '../../../domain/repositories/sku.repository.interface.js';
import { prisma } from '../../database/prisma/lib/prisma.client.js';

export class SKURepository implements ISKURepository {
   async findAll(): Promise<SKUEntity[]> {      
        const skusData = await prisma.sKU.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {                
                product: true,              
                composition: true,                
                volumetry: true,               
                packaging: true,
            },
        });
        
        return skusData.map(data => {            
            const productEntity = new ProductEntity({
                id: data.product.id,
                name: data.product.name, 
                description: data.product.description,
                brand: data.product.brand,
                createdAt: data.product.createdAt,
                updatedAt: data.product.updatedAt ?? null, 
                userCreate: data.product.userCreate,
                userUpdate: data.product.userUpdate ?? null,
                
            });
            
            const compositionValueObject = new CompositionValueObject({
                formula: data.composition.formula,
                keyIngredients: data.composition.keyIngredients,
            });
            
            const volumetryValueObject = new VolumetryValueObject({
                value: data.volumetry.value,
                unit: data.volumetry.unit,
            });
            
            const packagingValueObject = new PackagingValueObject({
                type: data.packaging.type,
                material: data.packaging.material,                
            }
                
            );
           
            return new SKUEntity({
                id: data.id,
                skuCode: data.skuCode,
                description: data.description,
                commercialDescription: data.commercialDescription,
                status: data.status as SKUStatusEnum,
                product: productEntity,
                composition: compositionValueObject,
                volumetry: volumetryValueObject,
                packaging: packagingValueObject,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt ?? null,
                userCreate: data.userCreate,
                userUpdate: data.userUpdate ?? null,
            });
        });
    }
}

