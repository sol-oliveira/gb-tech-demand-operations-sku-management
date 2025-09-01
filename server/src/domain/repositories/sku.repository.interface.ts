import { SKUEntity } from '../entities/sku.entity.js';

export interface ISKURepository {
    findAll(): Promise<SKUEntity[]>;   
}