// sku.schema.ts
import { z } from 'zod';
import { SKUStatusEnum } from '../enums/sku.enum.js';

export const SKUCreateSchema = z.object({
  description: z.string().min(3).max(255),
  commercialDescription: z.string().min(3).max(255),
  skuCode: z.string().min(3).max(100),
  status: z.nativeEnum(SKUStatusEnum).default(SKUStatusEnum.PRE_CADASTRO),
  productId: z.string().uuid(),
  compositionId: z.string().uuid(),
  volumetryId: z.string().uuid(),
  packagingId: z.string().uuid(),
  userCreate: z.string().min(3).max(100),
});

export type SKUCreateInput = z.infer<typeof SKUCreateSchema>;