export class CompositionValueObject {
  
  public readonly formula: string;
  public readonly keyIngredients: string;
 
  constructor(data: {formula: string, keyIngredients: string}) {   
    this.formula = data.formula;
    this.keyIngredients = data.keyIngredients;
  }

}