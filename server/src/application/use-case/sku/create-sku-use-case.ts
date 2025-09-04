import { SKUEntity } from "../../../domain/entities/sku.entity";
import { SKUStatusEnum } from "../../../domain/enums/sku.enum";
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
      const dataToCreate = {
        ...skuInput,
        skuCode: skuInput.skuCode ?? SKUEntity.generateSkuCode(),
        status: SKUStatusEnum.PRE_CADASTRO,
      };
      const result = await this.skuRepository.create(dataToCreate);
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
