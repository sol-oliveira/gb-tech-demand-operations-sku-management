import fastify from 'fastify' 
import { PrismaClient } from '@prisma/client'
 
const app = fastify() 
const prisma = new PrismaClient()
 
app.get('/ping', () => { 
    return 'Fastify is running!'; 
}) 

app.get('/products', () => {
  const products = prisma.product.findMany()
  return products
})
 
app.listen({ 
    port: 3333, 
    host: '0.0.0.0', 
  }) 
  .then(() => { 
    console.log('🚀 HTTP server running on port http://localhost:3333') 
  })