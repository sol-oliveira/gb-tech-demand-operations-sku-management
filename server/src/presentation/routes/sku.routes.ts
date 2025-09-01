import { FastifyInstance } from 'fastify';  
import { ListSKUsUseCase } from '../../application/use-case/sku/find-all-skus-use-case.js'
import { ISKURepository } from '../../domain/repositories/sku.repository.interface.js';

export async function skuRoutes(app: FastifyInstance, deps: { skuRepository: ISKURepository }) {
  const findAllSKUsUseCase = new ListSKUsUseCase(deps.skuRepository);

  app.get('/skus', async (request, reply) => {
    try {
      const skus = await findAllSKUsUseCase.execute();
      return reply.code(200).send(skus);
    } catch (error) {
      request.log.error(error, 'Erro ao buscar SKUs');
      return reply.code(500).send({ message: 'Erro interno ao buscar SKUs' });
    }
  });
}