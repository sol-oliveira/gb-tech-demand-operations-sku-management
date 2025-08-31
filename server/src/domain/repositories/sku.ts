import { SKUEntity } from '../entities/sku.js';

export interface ISKURepository {
    findAll(): Promise<SKUEntity[]>;   
}