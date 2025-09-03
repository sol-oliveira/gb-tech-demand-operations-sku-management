import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  getAll(): Promise<ProductEntity[]>;
}
