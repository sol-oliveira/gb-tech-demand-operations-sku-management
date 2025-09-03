import { FastifyInstance } from "fastify";
import { IProductRepository } from "../../domain/repositories/product.repository.interface";
import { ListProductsUseCase } from "../../application/use-case/product/list.products.use.case";

export async function productRoutes(
  app: FastifyInstance,
  deps: { productRepository: IProductRepository }
) {
  app.get("/products", async (request, reply) => {
    try {
      const listProductSKUUseCase = new ListProductsUseCase(
        deps.productRepository
      );
      const skus = await listProductSKUUseCase.execute();
      return reply.code(200).send(skus);
    } catch (error) {
      request.log.error(error, "Erro ao buscar Produtos");
      return reply
        .code(500)
        .send({ message: "Erro interno ao buscar Produtos" });
    }
  });
}
