import { SKUStateMachine } from "../services/sku.state.machine.service";
import { SKUStatusEnum } from "../enums/sku.enum";

describe("SKUStateMachine", () => {
  it("permite transições válidas", () => {
    expect(
      SKUStateMachine.getNextState(
        SKUStatusEnum.PRE_CADASTRO,
        SKUStatusEnum.CADASTRO_COMPLETO
      )
    ).toBe(SKUStatusEnum.CADASTRO_COMPLETO);
    expect(
      SKUStateMachine.getNextState(
        SKUStatusEnum.CADASTRO_COMPLETO,
        SKUStatusEnum.ATIVO
      )
    ).toBe(SKUStatusEnum.ATIVO);
    expect(
      SKUStateMachine.getNextState(
        SKUStatusEnum.ATIVO,
        SKUStatusEnum.DESATIVADO
      )
    ).toBe(SKUStatusEnum.DESATIVADO);
    expect(
      SKUStateMachine.getNextState(
        SKUStatusEnum.DESATIVADO,
        SKUStatusEnum.ATIVO
      )
    ).toBe(SKUStatusEnum.ATIVO);
  });

  it("lança exceção para transições inválidas", () => {
    expect(() =>
      SKUStateMachine.getNextState(
        SKUStatusEnum.PRE_CADASTRO,
        SKUStatusEnum.ATIVO
      )
    ).toThrow();
    expect(() =>
      SKUStateMachine.getNextState(
        SKUStatusEnum.ATIVO,
        SKUStatusEnum.CADASTRO_COMPLETO
      )
    ).toThrow();
    expect(() =>
      SKUStateMachine.getNextState(
        SKUStatusEnum.CANCELADO,
        SKUStatusEnum.PRE_CADASTRO
      )
    ).toThrow();
  });
});
