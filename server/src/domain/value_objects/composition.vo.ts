export class CompositionValueObject {
  public readonly formula: string;
  public readonly keyIngredients: string;
  public readonly compositionUniqueKey: string;

  constructor(data: {
    formula: string;
    keyIngredients: string;
    compositionUniqueKey: string;
  }) {
    this.formula = data.formula;
    this.keyIngredients = data.keyIngredients;
    this.compositionUniqueKey = data.compositionUniqueKey;
  }
}
