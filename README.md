
## 📋 Sobre 
<p>
 Este projeto consiste em um sistema para gerenciar o cadastro e o fluxo de estados de Stock Keeping Units (SKUs), 
 que representam cada combinação específica de variações de produtos.
</p>

## 🎯 Objetivo

O principal objetivo é fornecer uma plataforma para:
-  Permitir o cadastro e a alteração de SKUs.
- Controlar a alteração do fluxo (status) de um SKU, seguindo um conjunto de regras de negócio predefinidas.

## 🔄 Fluxo de Estados dos SKUs

O ciclo de vida de um SKU é regido por um fluxo de estados com transições específicas e campos editáveis.            
A lógica de transição de status é encapsulada em um serviço SKUStateMachine, garantindo que apenas transições válidas sejam permitidas.

## 🎬 Demonstração

<p align="center">
  <img src="SKUs.gif" alt="Demonstração do projeto" width="800" height="400"/>
</p>


## 📈 Melhorias

- Criação de uma tela específica para clonar um SKU e gerar uma nova versão. 



## 🛠 Tecnologias Front

- [Next.js](https://nextjs.org/) - Framework React

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


## 📄 Currículo

🔗 https://sol-oliveira.github.io/curriculo



