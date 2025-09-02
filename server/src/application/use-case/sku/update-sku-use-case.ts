import { ISKURepository } from "../../../domain/repositories/sku.repository.interface.js";
import { SKUUpdateInput } from "../../../domain/validation/sku.schema.js";

import { SKUStatusEnum } from "../../../domain/enums/sku.enum.js";
import { SKUStateMachine } from "../../../domain/services/sku.state.machine.service";

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
      const currentSKU = await this.skuRepository.getById(id);

      if (!currentSKU) {
        return { success: false, message: "SKU não encontrado" };
      }

      const nextStatus = this.computeNextStatusV2(
        currentSKU.status,
        skuInput,
        currentSKU.commercialDescription
      );

      this.validateTransitionOrThrow(
        currentSKU.status as SKUStatusEnum,
        nextStatus as SKUStatusEnum
      );

      const updateData: SKUUpdateInput = {
        ...skuInput,
        status: nextStatus,
      };

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

  // Lógica de negócio para determinar o próximo status
  private computeNextStatusV2(
    currentStatus: SKUStatusEnum,
    input: Partial<SKUUpdateInput>,
    currentCommercialDescription?: string
  ): SKUStatusEnum {
    const requested = input.status ?? currentStatus;

    const isCadastroCompleto =
      currentStatus === SKUStatusEnum.CADASTRO_COMPLETO;
    const commercialChanged =
      input.commercialDescription !== undefined &&
      input.commercialDescription !== currentCommercialDescription;

    if (isCadastroCompleto && commercialChanged) {
      return SKUStatusEnum.PRE_CADASTRO;
    }
    return requested;
  }

  // Validação de transição via state machine
  private validateTransitionOrThrow(
    from: SKUStatusEnum,
    to: SKUStatusEnum
  ): void {
    if (to === from) return;
    SKUStateMachine.getNextState(from, to); // lança se inválido
  }
}
