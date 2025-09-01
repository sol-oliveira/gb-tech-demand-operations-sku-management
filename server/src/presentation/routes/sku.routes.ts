import { FastifyInstance } from "fastify";
import { ListSKUsUseCase } from "../../application/use-case/sku/find-all-skus-use-case.js";
import { ISKURepository } from "../../domain/repositories/sku.repository.interface.js";
import { SKUCreateUseCase } from "../../application/use-case/sku/create-sku-use-case.js";
import {
  SKUCreateInput,
  SKUCreateSchema,
} from "../../domain/validation/sku.schema.js";

export async function skuRoutes(
  app: FastifyInstance,
  deps: { skuRepository: ISKURepository }
) {
  const findAllSKUsUseCase = new ListSKUsUseCase(deps.skuRepository);

  app.get("/skus", async (request, reply) => {
    try {
      const skus = await findAllSKUsUseCase.execute();
      return reply.code(200).send(skus);
    } catch (error) {
      request.log.error(error, "Erro ao buscar SKUs");
      return reply.code(500).send({ message: "Erro interno ao buscar SKUs" });
    }
  });

  app.post("/skus", async (request, reply) => {
    try {
      const skuInputValidation = SKUCreateSchema.safeParse(request.body);     
           
      if (!skuInputValidation.success) {
        return reply.status(400).send({
          message: "Erro de validação nos dados enviados",
          errors: skuInputValidation.error,
        });
      }

      const skuInput = skuInputValidation.data;

      const createSKUUseCase = new SKUCreateUseCase(deps.skuRepository);
      const result = await createSKUUseCase.execute(skuInput);
      return reply.code(result.success ? 201 : 400).send(result);
    } catch (error) {
      request.log.error(error, "Erro ao criar SKU");
      return reply.code(500).send({ message: "Erro interno ao criar SKU" });
    }
  });
}
