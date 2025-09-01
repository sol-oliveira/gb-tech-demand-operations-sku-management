import { SKUEntity } from '../../../domain/entities/sku.entity.js';
import { ISKURepository } from '../../../domain/repositories/sku.repository.interface.js';

export class ListSKUsUseCase  {
  private readonly skuRepository: ISKURepository;

  constructor(skuRepository: ISKURepository) {    
    this.skuRepository = skuRepository;
  }

  async execute(): Promise<SKUEntity[]> {    
    console.log('Executando o caso de uso para buscar todos os skus...');
    const skus = await this.skuRepository.findAll();
    return skus;
  }
}