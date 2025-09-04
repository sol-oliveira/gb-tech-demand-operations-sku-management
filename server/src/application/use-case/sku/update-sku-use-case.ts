import { ISKURepository } from "../../../domain/repositories/sku.repository.interface.js";
import { SKUUpdateInput } from "../../../domain/validation/sku.schema.js";
import { SKUStatusEnum } from "../../../domain/enums/sku.enum.js";
import { SKUStateMachine } from "../../../domain/services/sku.state.machine.service.js";

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
      // Busca o SKU atual para validar a transição de status
      const currentSKU = await this.skuRepository.getById(id);
      if (!currentSKU) {
        return { success: false, message: "SKU não encontrado" };
      }

      // Regra: Se estiver em CADASTRO_COMPLETO e editar commercialDescription, vai para PRÉ_CADASTRO
      let nextStatus = skuInput.status || currentSKU.status;
      const isCadastroCompleto =
        currentSKU.status === SKUStatusEnum.CADASTRO_COMPLETO;
      const isCommercialDescriptionChanged =
        skuInput.commercialDescription !== undefined &&
        skuInput.commercialDescription !== currentSKU.commercialDescription;

      if (isCadastroCompleto && isCommercialDescriptionChanged) {
        nextStatus = SKUStatusEnum.PRE_CADASTRO;
      }

      // Se o status for alterado, valida a transição
      if (nextStatus !== currentSKU.status) {
        try {
          SKUStateMachine.getNextState(
            currentSKU.status as SKUStatusEnum,
            nextStatus as SKUStatusEnum
          );
        } catch (e: any) {
          return { success: false, message: e.message };
        }
      }

      // Garante que o status será atualizado se necessário
      const updateData = { ...skuInput, status: nextStatus };
      const result = await this.skuRepository.update(id, updateData);
      return {
        success: result,
        message: result
          ? "SKU atualizado com sucesso"
          : "Falha ao atualizar o SKU",
      };
    } catch (error) {
      console.error("Erro no use case SKUUpdateUseCase:", error);
      return { success: false, message: "Erro interno ao atualizar o SKU" };
    }
  }
}
