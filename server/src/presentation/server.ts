import 'dotenv/config';
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

import { skuRoutes } from './routes/sku.routes.js';
import { SKURepository } from '../infrastructure/repository/sku/sku.repository.js';

const app = fastify({ logger: true });
const prisma = new PrismaClient();

app.get('/health', async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'Fastify is running!', db: 'ok' };
  } catch (err: any ) {
    return { status: 'Fastify is running!', db: 'error', error: err.message };
  }
});

app.register(skuRoutes, { skuRepository: new SKURepository() });

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' });
    app.log.info('HTTP server running on http://localhost:3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const shutdown = async () => {
  app.log.info('Shutting down server...');
  await prisma.$disconnect();
  process.exit();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
