import { FastifyInstance } from "fastify";
import { IVolumetryRepository } from "../../domain/repositories/volumetry.interface";
import { ListVolumetryUseCase } from "../../application/use-case/volumetry/list.volumetries.use.case";

export async function volumetryRoutes(
  app: FastifyInstance,
  deps: { volumetryRepository: IVolumetryRepository }
) {
  app.get("/volumetries", async (request, reply) => {
    try {
      const listVolumetriesUseCase = new ListVolumetryUseCase(
        deps.volumetryRepository
      );
      const volumetries = await listVolumetriesUseCase.execute();
      return reply.code(200).send(volumetries);
    } catch (error) {
      request.log.error(error, "Erro ao buscar Volumetrias");
      return reply
        .code(500)
        .send({ message: "Erro interno ao buscar Volumetrias" });
    }
  });
}
