import { SKUEntity } from "../../../domain/entities/sku.entity";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { CompositionValueObject } from "../../../domain/value_objects/composition.vo";
import { VolumetryValueObject } from "../../../domain/value_objects/volumetry.vo";
import { PackagingValueObject } from "../../../domain/value_objects/packaging.vo";
import { SKUStatusEnum } from "../../../domain/enums/sku.enum";
import { ISKURepository } from "../../../domain/repositories/sku.repository.interface";
import { PrismaClient } from "@prisma/client";
import {
  SKUCreateInput,
  SKUCreateSchema,
  SKUUpdateInput,
  SKUUpdateSchema,
} from "../../../domain/validation/sku.schema";
import { console } from "inspector";

export class SKURepository implements ISKURepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getById(id: string): Promise<SKUEntity | null> {
    const skuData = await this.prisma.sKU.findUnique({
      where: { id },
      include: {
        product: true,
        composition: true,
        volumetry: true,
        packaging: true,
      },
    });

    if (!skuData) return null;

    const productEntity = new ProductEntity({ ...skuData.product });
    const compositionValueObject = new CompositionValueObject({
      ...skuData.composition,
      compositionUniqueKey: skuData.composition.compositionUniqueKey,
    });
    const volumetryValueObject = new VolumetryValueObject({
      ...skuData.volumetry,
      volumetryUniqueKey: skuData.volumetry.volumetryUniqueKey,
    });
    const packagingValueObject = new PackagingValueObject({
      ...skuData.packaging,
      packagingUniqueKey: skuData.packaging.packagingUniqueKey,
    });

    return new SKUEntity({
      ...skuData,
      status: (skuData.status as SKUStatusEnum) ?? SKUStatusEnum.PRE_CADASTRO,
      product: productEntity,
      composition: compositionValueObject,
      volumetry: volumetryValueObject,
      packaging: packagingValueObject,
    });
  }

  async update(id: string, skuData: SKUUpdateInput): Promise<boolean> {
    const data = SKUUpdateSchema.parse(skuData);

    try {
      await this.prisma.sKU.update({
        where: { id },
        data,
      });
      return true;
    } catch (error) {
      console.error("Error updating SKU:", error);
      return false;
    }
  }

  async create(skuData: SKUCreateInput): Promise<boolean> {
    console.log({ data: skuData });
    const data = SKUCreateSchema.parse(skuData);
    console.log({ data });

    try {
      await this.prisma.sKU.create({
        data: {
          ...data,
        },
      });
      return true;
    } catch (error) {
      console.error("Error creating SKU:", error);
      return false;
    }
  }

  async findAll(): Promise<SKUEntity[]> {
    const skusData = await this.prisma.sKU.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: true,
        composition: true,
        volumetry: true,
        packaging: true,
      },
    });

    return skusData.map((data) => {
      const productEntity = new ProductEntity({
        id: data.product.id,
        name: data.product.name,
        description: data.product.description,
        brand: data.product.brand,
        createdAt: data.product.createdAt,
        updatedAt: data.product.updatedAt ?? null,
        userCreate: data.product.userCreate,
        userUpdate: data.product.userUpdate ?? null,
      });

      const compositionValueObject = new CompositionValueObject({
        ...data.composition,
        compositionUniqueKey: data.composition.id,
      });

      const volumetryValueObject = new VolumetryValueObject({
        ...data.volumetry,
        volumetryUniqueKey: data.volumetry.id,
      });

      const packagingValueObject = new PackagingValueObject({
        ...data.packaging,
        packagingUniqueKey: data.packaging.id,
      });

      return new SKUEntity({
        id: data.id,
        skuCode: data.skuCode,
        description: data.description,
        commercialDescription: data.commercialDescription,
        status: data.status as SKUStatusEnum,
        product: productEntity,
        composition: compositionValueObject,
        volumetry: volumetryValueObject,
        packaging: packagingValueObject,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt ?? null,
        userCreate: data.userCreate,
        userUpdate: data.userUpdate ?? null,
      });
    });
  }
}
