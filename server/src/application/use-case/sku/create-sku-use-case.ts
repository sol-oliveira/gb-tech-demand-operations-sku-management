import { ISKURepository } from "../../../domain/repositories/sku.repository.interface";
import { SKUCreateInput } from "../../../domain/validation/sku.schema";

export class SKUCreateUseCase {
  private readonly skuRepository: ISKURepository;

  constructor(skuRepository: ISKURepository) {
    this.skuRepository = skuRepository;
  }

  async execute(
    skuInput: SKUCreateInput
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.skuRepository.create(skuInput);
      return {
        success: result,
        message: result ? "SKU criado com sucesso" : "Falha ao criar o SKU",
      };
    } catch (error) {
      console.error("Erro no use case SKUCreateUseCase:", error);
      return { success: false, message: "Erro interno ao criar o SKU" };
    }
  }
}
