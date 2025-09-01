import { SKUEntity } from '../entities/sku.entity.js';
import { SKUCreateInput, SKUUpdateInput } from '../validation/sku.schema.js';

export interface ISKURepository {
    findAll(): Promise<SKUEntity[]>; 
    create(skuData: SKUCreateInput ): Promise<boolean>;
    update(id: string, skuData: SKUUpdateInput ): Promise<boolean>;
}