import { ProductEntity } from "../../../domain/entities/product.entity";
import { PrismaClient } from "@prisma/client";
import { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async getAll(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product) => new ProductEntity(product));
  }
}
