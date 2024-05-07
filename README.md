# Ticket Control

Este é um sistema simples de controle de tickets desenvolvido em [TypeScript](https://www.typescriptlang.org/) utilizando o framework [Next.js](https://nextjs.org/), como banco de dados optei pelo [MongoDB](https://www.mongodb.com/), junto com o [Prisma](https://www.prisma.io/) para interações com o database.

Para autenticação utilizei o [NextAuth](https://next-auth.js.org/) para logar com a conta do Google.

Esse projeto foi desenvolvido com o intuito de melhorar meus conhecimentos em React, utilizando o framework Next.js.

## Funcionalidades

- Login (API do Google);
- Módulo de clientes (adicionar, editar, excluir) clientes;
- Módulo de chamados (adicionar, editar, excluir) chamados;

## Como iniciar?

Estas instruções fornecerão uma cópia do projeto em funcionamento em sua máquina local para fins de desenvolvimento e teste. Consulte implantação para obter notas sobre como implantar o projeto em um sistema ativo.

### Pré-requisitos

O que você precisa para instalar o software e como instalá-lo

```
Nodejs v20+
TypeScript v5+
```

### Instalação

A step by step series of examples that tell you how to get a development env running

Clonando o projeto em sua máquina:

```
git clone <LINK DO PROJETO>
```
Acesse o projeto e abra ele no editor de código de sua preferência.

Instale as dependencias necessárias com NPM:
```
npm install
```
Crie um arquivo .env na raiz do projeto e adicione suas credenciais neccessárias.

Para iniciar o projeto, que será inicializado em (http://localhost:3000)
```
npm run dev
```
