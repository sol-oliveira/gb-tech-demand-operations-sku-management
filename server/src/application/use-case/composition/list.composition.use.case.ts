import { ICompositionRepository } from "../../../domain/repositories/composition.interface";
import { CompositionValueObject } from "../../../domain/value_objects/composition.vo";

export class ListCompositionsUseCase {
  private readonly compositionepository: ICompositionRepository;

  constructor(compositionRepository: ICompositionRepository) {
    this.compositionepository = compositionRepository;
  }

  async execute(): Promise<CompositionValueObject[]> {
    console.log("Executando o caso de uso para buscar todas as Composições...");
    const composition = await this.compositionepository.getAll();
    return composition;
  }
}
