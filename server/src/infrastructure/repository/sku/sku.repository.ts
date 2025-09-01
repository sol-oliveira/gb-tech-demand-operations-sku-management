import { SKUEntity } from '../../../domain/entities/sku.entity.js';
import { ProductEntity } from '../../../domain/entities/product.entity.js';
import { CompositionValueObject } from '../../../domain/value_objects/composition.vo.js';
import { VolumetryValueObject } from '../../../domain/value_objects/volumetry.vo.js';
import { PackagingValueObject } from '../../../domain/value_objects/packaging.vo.js';
import { SKUStatusEnum } from '../../../domain/enums/sku.enum.js';
import { ISKURepository } from '../../../domain/repositories/sku.repository.interface.js';
import { PrismaClient } from '@prisma/client';
import { SKUCreateInput, SKUCreateSchema, SKUUpdateInput, SKUUpdateSchema } from '../../../domain/validation/sku.schema.js';
import { console } from 'inspector';

export class SKURepository implements ISKURepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getById(id: string): Promise<SKUEntity | null> {
    const skuData = await this.prisma.sKU.findUnique({
    where: { id },
    include: { product: true, composition: true, volumetry: true, packaging: true },
  });

  if (!skuData) return null;

  const productEntity = new ProductEntity({ ...skuData.product });
  const compositionValueObject = new CompositionValueObject({ ...skuData.composition });
  const volumetryValueObject = new VolumetryValueObject({ ...skuData.volumetry });
  const packagingValueObject = new PackagingValueObject({ ...skuData.packaging });

  return new SKUEntity({
    ...skuData,
    status: skuData.status ?? SKUStatusEnum.PRE_CADASTRO,
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
    const data = SKUCreateSchema.parse(skuData);

    try {
      await this.prisma.sKU.create({ data });
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
        formula: data.composition.formula,
        keyIngredients: data.composition.keyIngredients,
      });

      const volumetryValueObject = new VolumetryValueObject({
        value: data.volumetry.value,
        unit: data.volumetry.unit,
      });

      const packagingValueObject = new PackagingValueObject({
        type: data.packaging.type,
        material: data.packaging.material,
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

