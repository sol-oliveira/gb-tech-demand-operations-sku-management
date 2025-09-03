import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { skuRoutes } from "./routes/sku.routes";
import { SKURepository } from "../infrastructure/repository/sku/sku.repository";
import cors from "@fastify/cors";
import { productRoutes } from "./routes/product.routes";
import { ProductRepository } from "../infrastructure/repository/product/product.repository";
import { compositionRoutes } from "./routes/composition.routes";
import { CompositionRepository } from "../infrastructure/repository/composition/composition.repository";
import { packagingRoutes } from "./routes/packaging.routes";
import { PackagingRepository } from "../infrastructure/repository/packaging/packaging.repository";
import { VolumetryRepository } from "../infrastructure/repository/volumetry/volumetry";
import { volumetryRoutes } from "./routes/volumetry.routes";

const app: FastifyInstance = Fastify({ logger: true });

app.register(cors, {
  origin: true,
});

const prisma = new PrismaClient();

app.get("/health", async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "Fastify is running!", db: "ok" };
  } catch (err: any) {
    return { status: "Fastify is running!", db: "error", error: err.message };
  }
});

app.register(skuRoutes, { skuRepository: new SKURepository(prisma) });
app.register(productRoutes, {
  productRepository: new ProductRepository(prisma),
});
app.register(compositionRoutes, {
  compositionRepository: new CompositionRepository(prisma),
});
app.register(packagingRoutes, {
  packagingRepository: new PackagingRepository(prisma),
});
app.register(volumetryRoutes, {
  volumetryRepository: new VolumetryRepository(prisma),
});

const start = async () => {
  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    app.log.info("HTTP server running on http://localhost:3333");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const shutdown = async () => {
  app.log.info("Shutting down server...");
  await prisma.$disconnect();
  process.exit();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
