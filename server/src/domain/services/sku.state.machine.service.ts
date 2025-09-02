import { SKUStatusEnum } from "../enums/sku.enum";

export class SKUStateMachine {
  private static transitions: Record<SKUStatusEnum, SKUStatusEnum[]> = {
    [SKUStatusEnum.PRE_CADASTRO]: [
      SKUStatusEnum.CADASTRO_COMPLETO,
      SKUStatusEnum.CANCELADO,
    ],
    [SKUStatusEnum.CADASTRO_COMPLETO]: [
      SKUStatusEnum.PRE_CADASTRO,
      SKUStatusEnum.ATIVO,
      SKUStatusEnum.CANCELADO,
    ],
    [SKUStatusEnum.ATIVO]: [SKUStatusEnum.DESATIVADO],
    [SKUStatusEnum.DESATIVADO]: [
      SKUStatusEnum.ATIVO,
      SKUStatusEnum.PRE_CADASTRO,
    ],
    [SKUStatusEnum.CANCELADO]: [],
  };

  static getNextState(
    current: SKUStatusEnum,
    next: SKUStatusEnum
  ): SKUStatusEnum {
    const allowed = SKUStateMachine.transitions[current] || [];
    if (!allowed.includes(next)) {
      throw new Error(`Transição de estado inválida: ${current} - ${next}`);
    }
    return next;
  }
}
