import { ISKURepository } from "../../../domain/repositories/sku.repository.interface.js";
import { SKUUpdateInput } from "../../../domain/validation/sku.schema.js";

export class SKUUpdateUseCase {
  private readonly skuRepository: ISKURepository;

  constructor(skuRepository: ISKURepository) {
    this.skuRepository = skuRepository;
  }

  async execute(
    id: string,
    skuInput: SKUUpdateInput 
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.skuRepository.update(id, skuInput);
      return {
        success: result,
        message: result ? "SKU atualizado com sucesso" : "Falha ao atualizar o SKU",
      };
    } catch (error) {
      console.error("Erro no use case SKUUpdateUseCase:", error);
      return { success: false, message: "Erro interno ao atualizar o SKU" };
    }
  }
}
