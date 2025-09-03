import { ProductEntity } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class ListProductsUseCase {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<ProductEntity[]> {
    console.log("Executando o caso de uso para buscar todos os produtos...");
    const products = await this.productRepository.getAll();
    return products;
  }
}
