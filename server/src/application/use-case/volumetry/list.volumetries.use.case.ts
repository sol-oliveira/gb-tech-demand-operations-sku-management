import { IVolumetryRepository } from "../../../domain/repositories/volumetry.interface";
import { VolumetryValueObject } from "../../../domain/value_objects/volumetry.vo";

export class ListVolumetryUseCase {
  private readonly volumetryRepository: IVolumetryRepository;

  constructor(volumetryRepository: IVolumetryRepository) {
    this.volumetryRepository = volumetryRepository;
  }

  async execute(): Promise<VolumetryValueObject[]> {
    console.log("Executando o caso de uso para buscar todas as Volumetrias...");
    const volumetries = await this.volumetryRepository.getAll();
    return volumetries;
  }
}
