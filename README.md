<div align="center">
  <img src="./web/src/assets/logo_ng_cash.gif" width="180" alt="Logo ng cash" />
</div>


# Desafio Técnico NG

Este projeto é uma aplicação web fullstack, cujo objetivo é possibilitar que usuários da NG consigam realizar transferências internas entre si.

Você pode acessar o projeto aqui: [deploy link](https://www.ng-franklin.cf/).

<br>

<details>
  <summary>Backend</summary>
  
  ### Rotas
  
  | Rota                    | Método http                                  | Descrição                                                            |
  | ----------------------- | -------------------------------------------- | -------------------------------------------------------------------- |
  | /register               | POST                                         | Cria uma conta                                                       |
  | /login                  | POST                                         | Realiza login                                                        |
  | /user                   | GET                                          | Pega os dados do usuário logado                                      |
  | /transfer               | POST                                         | Realiza uma transferência para outro usuário                         |
  | /transfer               | GET                                          | Pega o histórico de transferências do usuário                        |
  | /transfer/cashIn        | GET                                          | Pega o histórico de transferências do usuário filtrado por entradas  |
  | /transfer/cashOut       | GET                                          | Pega o histórico de transferências do usuário filtrado por saídas    |

  
  ### Autenticação
  
  Este projeto utiliza a estratégia JWT para autenticação de seus usuários, a estratégia é utilizada para gerenciar o estado autenticado dos usuários logados. 
  
  ### Arquitetura
  
  Este projeto usa a arquitetura MSC que divide a aplicação em 3 partes como:
  - Model: tudo relacionado à conexão com o banco de dados;
  - Service: tudo relacionado às regras de negócio da aplicação;
  - Controller: lida com a entrada do usuário;
  
  ### Técnologias usadas
  - [TypeScript](https://www.typescriptlang.org/) como linguagem;
  - [JWT](https://jwt.io/introduction) para autenticação com nome de usuário e senha;
  - [PostgreSQL](https://www.postgresql.org/) como banco de dados, usando:
    - [Prisma](https://www.prisma.io/) como ORM;

 
</details>

<details>
  <summary>Frontend</summary>
  
  Login | Cadastro
   - É feita a validação do nome de usuário e senha, sendo que o botão para acessar o aplicativo fica habilitado apenas após a inserção de dados válidos;
  
  Conta digital
   - Mostra o saldo da conta e é possível fazer transferências para outros usuários;
   - Tabela com os detalhes de todas as transações que o usuário participou;
   - Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo cash-in/cash-out;
  
  ### Técnologias usadas
  - [TypeScript](https://www.typescriptlang.org/) como linguagem;
  - [Axios](https://axios-http.com/ptbr/) para realizar a integração com o backend;
  - [React](https://reactjs.org/) para construir as telas, usando:
    - ContextAPI como gerenciador de estados;
  - [Styled Components](https://styled-components.com/) para estilização;
 
</details>

## Como baixar e executar a aplicação

```bash
    git clone git@github.com:franklinrms/ng.git
    cd ng
``` 

<br>

> Para rodar este método você precisa estar com o ``Docker`` instalado em seu computador

```bash
    npm run compose:up
``` 

<details>
  <summary>Sem Docker</summary>
  
  <br>
  
> Para rodar este método você precisa estar com o ``node`` instalado em seu computador e acesso a um banco de dados ``PostgreSQL``

- Para instalar dependências do Backend:

```bash
    cd server && npm install
``` 
Você deverá configurar as variáveis de ambiente em um arquivo ``.env``

>`env.example`
  ```env
    APP_PORT=3001
    DATABASE_URL=postgres://postgres:SENHA@localhost:5432/ng
    JWT_SECRET=secret
  ```
 - Para gerar as tabelas:
   ```bash
      npm run db:reset
    ``` 
  
 - Para executar a api:
     ```bash
      npm start
     ``` 
 <br>

 - Para instalar dependências do Frontend:
  ```bash
      cd web && npm install
  ``` 
  
  - Para executar o projeto:
  ```bash
      npm start
  ``` 

</details>


## Contato 
 
[![Linkedin Badge](https://img.shields.io/badge/-Franklin%20Ramos-0D1117?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/franklinrms/)](https://www.linkedin.com/in/franklinrms/) 


