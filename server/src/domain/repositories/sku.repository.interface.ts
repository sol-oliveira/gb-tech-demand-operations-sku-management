import { SKUEntity } from '../entities/sku.entity';
import { SKUCreateInput, SKUUpdateInput } from '../validation/sku.schema';

export interface ISKURepository {
    findAll(): Promise<SKUEntity[]>; 
    create(skuData: SKUCreateInput ): Promise<boolean>;
    update(id: string, skuData: SKUUpdateInput ): Promise<boolean>;
    getById(id: string): Promise<SKUEntity | null>;
}