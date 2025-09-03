import { PrismaClient } from "@prisma/client";
import { ICompositionRepository } from "../../../domain/repositories/composition.interface";
import { CompositionValueObject } from "../../../domain/value_objects/composition.vo";

export class CompositionRepository implements ICompositionRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async getAll(): Promise<CompositionValueObject[]> {
    const compositions = await this.prisma.composition.findMany();
    return compositions.map(
      (composition) => new CompositionValueObject(composition)
    );
  }
}
