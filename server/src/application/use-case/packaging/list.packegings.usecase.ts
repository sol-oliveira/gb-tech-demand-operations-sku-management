import { IPackagingRepository } from "../../../domain/repositories/packaging.interface";
import { PackagingValueObject } from "../../../domain/value_objects/packaging.vo";

export class ListPackagingsUseCase {
  private readonly packagingRepository: IPackagingRepository;

  constructor(packagingRepository: IPackagingRepository) {
    this.packagingRepository = packagingRepository;
  }

  async execute(): Promise<PackagingValueObject[]> {
    console.log("Executando o caso de uso para buscar todas as Embalagens...");
    const packaging = await this.packagingRepository.getAll();
    return packaging;
  }
}
