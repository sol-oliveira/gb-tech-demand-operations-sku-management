import { SKUEntity } from "../../../domain/entities/sku.entity";
import { ISKURepository } from "../../../domain/repositories/sku.repository.interface";

export class SKUGetByIdUseCase {
  private readonly skuRepository: ISKURepository;

  constructor(skuRepository: ISKURepository) {
    this.skuRepository = skuRepository;
  }

  async execute(
    id: string
  ): Promise<SKUEntity | { success: boolean; message: string }> {
    try {
      const sku = await this.skuRepository.getById(id);
      return sku ? sku : { success: false, message: "Falha ao buscar o SKU" };
    } catch (error) {
      console.error("Erro no use case SKUGetByIdUseCase:", error);
      return { success: false, message: "Falha ao buscar o SKU" };
    }
  }
}
