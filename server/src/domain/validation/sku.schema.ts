import { z } from "zod";
import { SKUStatusEnum } from "../enums/sku.enum";

export const SKUIdSchema = z.object({
  id: z.string().uuid(),
});

export const SKUCreateSchema = z.object({
  description: z.string().min(3).max(255),
  commercialDescription: z.string().min(3).max(255),
  skuCode: z.string().min(3).max(100),
  status: z.nativeEnum(SKUStatusEnum).default(SKUStatusEnum.PRE_CADASTRO),
  productId: z.string().uuid(),
  compositionId: z.string(),
  volumetryId: z.string(),
  packagingId: z.string(),
  userCreate: z.string().min(3).max(100),
});

export const SKUUpdateSchema = z.object({
  description: z.string().min(3).max(255),
  commercialDescription: z.string().min(3).max(255),
  status: z.nativeEnum(SKUStatusEnum),
  productId: z.string().uuid(),
  compositionId: z.string(),
  volumetryId: z.string(),
  packagingId: z.string(),
  userUpdate: z.string().min(3).max(100),
});

export type SKUCreateInput = z.infer<typeof SKUCreateSchema>;

export type SKUUpdateInput = z.infer<typeof SKUUpdateSchema>;

export type SKUIdParams = z.infer<typeof SKUIdSchema>;
