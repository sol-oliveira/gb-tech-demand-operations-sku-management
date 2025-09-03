import { PrismaClient } from "@prisma/client";
import { IPackagingRepository } from "../../../domain/repositories/packaging.interface";
import { PackagingValueObject } from "../../../domain/value_objects/packaging.vo";

export class PackagingRepository implements IPackagingRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async getAll(): Promise<PackagingValueObject[]> {
    const packagings = await this.prisma.packaging.findMany();
    return packagings.map((packaging) => new PackagingValueObject(packaging));
  }
}
