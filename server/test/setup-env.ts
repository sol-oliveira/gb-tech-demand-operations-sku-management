// test/setup-env.ts
import { config } from 'dotenv';
import path from 'path';

// Carrega o .env.test antes dos testes
config({ path: path.resolve(__dirname, '../.env.test') });
