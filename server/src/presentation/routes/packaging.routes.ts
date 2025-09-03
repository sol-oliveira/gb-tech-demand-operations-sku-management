import { FastifyInstance } from "fastify";
import { IPackagingRepository } from "../../domain/repositories/packaging.interface";
import { ListPackagingsUseCase } from "../../application/use-case/packaging/list.packegings.usecase";

export async function packagingRoutes(
  app: FastifyInstance,
  deps: { packagingRepository: IPackagingRepository }
) {
  app.get("/packagings", async (request, reply) => {
    try {
      const listPackagingsUseCase = new ListPackagingsUseCase(
        deps.packagingRepository
      );
      const packagings = await listPackagingsUseCase.execute();
      return reply.code(200).send(packagings);
    } catch (error) {
      request.log.error(error, "Erro ao buscar Embalagens");
      return reply
        .code(500)
        .send({ message: "Erro interno ao buscar Composições" });
    }
  });
}
