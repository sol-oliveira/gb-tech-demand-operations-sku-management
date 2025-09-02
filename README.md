<img width="800" alt="image" height="400" src="NLW Spacetime.gif"/>

## 📋 Sobre 
<p>
 Sistema de gerenciamento de SKUs para o Grupo Boticário.
</p>

### 🛠 Tecnologias Front

- [Next.js](https://nextjs.org/) - Framework React

- [NextAuth.js](https://next-auth.js.org/) - Provedor de autenticação

- [TypeScript](https://www.typescriptlang.org/) - Extensão do JavaScript (suporte a módulos, interface, classe e tipagem)

- [Tailwindcss](https://tailwindcss.com/docs/installation) - Framework css


### 🛠 Tecnologias Back

- [Node.js](https://nodejs.org/en/) - Ambiente de execução back-end JavaScript

- [TypeScript](https://www.typescriptlang.org/) - Extensão do JavaScript (suporte a módulos, interface, classe e tipagem)

- [Prisma](https://www.prisma.io/) - ORM (Object-Relational Mapping) de banco de dados

- [Fastify](https://www.fastify.io/) - Servidor Web
 
- [Zod](https://github.com/colinhacks/zod)- Biblioteca para validação de dados do TypeScript.

### 🖥️ Rodando o Frond End 

```bash
# Clonar repositório
$ git clone https://github.com/sol-oliveira/spacetime.git

# Acesse a pasta do projeto no terminal/cmd
$ cd web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```


### 🎲 Rodando o Back End (servidor)

```bash

# Acesse a pasta do projeto no terminal/cmd
$ cd server

# Instale as dependências
$ npm install

# Renomei arquivo env.example para .env (para Linux/macOS)
$ mv .env.example .env

# Gerar o código do Prisma Client
$ npx prisma generate

# Visualisar banco de dados - Prisma Studio
$ npx prisma studio

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

```






