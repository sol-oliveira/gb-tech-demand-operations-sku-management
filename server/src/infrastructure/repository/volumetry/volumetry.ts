import { PrismaClient } from "@prisma/client";
import { IVolumetryRepository } from "../../../domain/repositories/volumetry.interface";
import { VolumetryValueObject } from "../../../domain/value_objects/volumetry.vo";

export class VolumetryRepository implements IVolumetryRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  async getAll(): Promise<VolumetryValueObject[]> {
    const volumetries = await this.prisma.volumetry.findMany();
    return volumetries.map((volumetry) => new VolumetryValueObject(volumetry));
  }
}
