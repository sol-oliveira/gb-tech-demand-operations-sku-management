import { FastifyInstance } from "fastify";
import { ListSKUsUseCase } from "../../application/use-case/sku/find-all-skus-use-case";
import { ISKURepository } from "../../domain/repositories/sku.repository.interface";
import { SKUCreateUseCase } from "../../application/use-case/sku/create-sku-use-case";
import {
  SKUCreateSchema,
  SKUIdSchema,
  SKUUpdateSchema,
} from "../../domain/validation/sku.schema";
import { SKUUpdateUseCase } from "../../application/use-case/sku/update-sku-use-case";
import { SKUGetByIdUseCase } from "../../application/use-case/sku/get-sku-by-id-use-case";

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

  app.patch("/skus/:id", async (request, reply) => {
    try {
      const skuParamsValidation = SKUIdSchema.safeParse(request.params);
      const skuBodyValidation = SKUUpdateSchema.safeParse(request.body);

      if (!skuBodyValidation.success || !skuParamsValidation.success) {
        return reply.status(400).send({
          message: "Erro de validação nos dados enviados",
          errors: [skuBodyValidation.error, skuParamsValidation.error],
        });
      }

      const skuInput = skuBodyValidation.data;
      const { id: skuId } = skuParamsValidation.data;

      const updateSKUUseCase = new SKUUpdateUseCase(deps.skuRepository);
      const result = await updateSKUUseCase.execute(skuId, skuInput);
      return reply.code(result.success ? 204 : 400).send(result);
    } catch (error) {
      request.log.error(error, "Erro ao atualizar SKU");
      return reply.code(500).send({ message: "Erro interno ao atualizar SKU" });
    }
  });

  app.get("/skus/:id", async (request, reply) => {
    try {
      const skuParamsValidation = SKUIdSchema.safeParse(request.params);

      if (!skuParamsValidation.success) {
        return reply.status(400).send({
          message: "Erro de validação nos dados enviados",
          errors: skuParamsValidation.error,
        });
      }

      const { id: skuId } = skuParamsValidation.data;
      const getByIdUseCase = new SKUGetByIdUseCase(deps.skuRepository);
      const result = await getByIdUseCase.execute(skuId);
      return reply.code(result ? 200 : 404).send(result);
    } catch (error) {
      request.log.error(error, "Erro ao buscar SKUs");
      return reply.code(500).send({ message: "Erro interno ao buscar SKUs" });
    }
  });
}
