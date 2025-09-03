import { CompositionValueObject } from "../value_objects/composition.vo";

export interface ICompositionRepository {
  getAll(): Promise<CompositionValueObject[]>;
}
