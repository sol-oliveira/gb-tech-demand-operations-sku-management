import { FastifyInstance } from "fastify";
import { ICompositionRepository } from "../../domain/repositories/composition.interface";
import { ListCompositionsUseCase } from "../../application/use-case/composition/list.composition.use.case";

export async function compositionRoutes(
  app: FastifyInstance,
  deps: { compositionRepository: ICompositionRepository }
) {
  app.get("/compositions", async (request, reply) => {
    try {
      const listCompositionsUseCase = new ListCompositionsUseCase(
        deps.compositionRepository
      );
      const compositions = await listCompositionsUseCase.execute();
      return reply.code(200).send(compositions);
    } catch (error) {
      request.log.error(error, "Erro ao buscar Composições");
      return reply
        .code(500)
        .send({ message: "Erro interno ao buscar Composições" });
    }
  });
}
