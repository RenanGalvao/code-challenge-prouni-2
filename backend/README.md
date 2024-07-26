<div align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://cdn.pixabay.com/photo/2021/03/27/06/31/code-6127616_1280.png" alt="Project logo"></a>
</div>

<h1 align="center">Code Challenge ProUnion #2 - Backend</h1>
<h2 align="center">Sistema de Gerenciamento de Usuários</h2>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/RenanGalvao/code-challenge-prounion-2.svg)](https://github.com/RenanGalvao/code-challenge-prounion-2/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/RenanGalvao/code-challenge-prounion-2.svg)](https://github.com/RenanGalvao/code-challenge-prounion-2/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
  
</div>

---

## Tabela de Conteúdos
- [Sobre](#sobre)
- [Requisitos](#requisitos)
- [Uso](#uso)
- [Principais Tecnologias](#tec)
- [Autor](#autor)


## Sobre <a name="sobre"></a>
A API segue as orientações básicas do desafio. Procurei seguir as orientações do ExpressJS tanto na parte de [segurança](https://expressjs.com/en/advanced/best-practice-security.html) quanto na parte do [deploy](https://expressjs.com/en/advanced/best-practice-performance.html). Isso se traduziu em [Rate Limiting](https://www.cloudflare.com/pt-br/learning/bots/what-is-rate-limiting/) global e específico para rota de autenticação, [Logs](https://blog.vindi.com.br/logs-monitoramento/) espalhados pela aplicação, [Error Handling](https://www.tritondatacenter.com/node-js/production/design/errors) generalizado e outros ajustes menores. Para além disso, fiz um simples sistema de acesso onde apenas o ADMIN consegue criar/editar/remover usuários, paginação e validação em camadas anteriores à da regra de negócio. 

A organização da API foi inspirada nos projetos do NestJS onde existe módulo, controlador e serviço. As rotas são facilmente encontradas e o sufixo de muitos arquivos facilita a compreensão da função de cada um deles.

Comentei pouco pois tentei fazer o código o mais explícito o possível, certas partes vale o conhecimento da biblioteca em uso para uma compreensão melhor do que está sendo feito


## Requisitos <a name="requisitos"></a>
- [NodeJS 21.x](https://nodejs.org/en/download/prebuilt-installer/current)
- [Docker Composer 2.x](https://docs.docker.com/compose/install/)


## Uso <a name="uso"></a>
- URL: localhost:3000
- Usuário: admin@admin.com
- Senha: 12345678

### Desenvolvimento
- Crie uma cópia do arquivo ``.env.example`` com o nome de ``.env``
- Instale os pacotes necessários ``npm install``
- ``npm run dev``

### "Produção"
Inicie o projeto a partir do ``docker-compose.yml`` da pasta raiz.

### Rotas
- ``POST /auth/sign-in`` retorna dados sobre o usuário e token de autenticação, espera um JSON com as chaves: ``email`` e ``password``.
- ``GET /users`` retorna a lista de usuários cadastrados, aceita parâmetros de pesquisa ``page`` e ``itemsPerPage`` ambos valores númericos.
- ``GET /users/:id`` retorna dados do usuário associado ao id.
- ``POST /users`` cria um novo usuário e retorna seus dados, espera um JSON com as chaves: ``name``, ``email``, ``password`` e ``role`` (sendo o valor "USER" ou "ADMIN").
- ``PUT /users/:id`` atualiza os dados do usuário associado ao id e retorna seus dados, o JSON esperado contém as mesmas chaves que o da criação, no entanto todos os campos são opcionais.
- ``DELETE /users/:id`` remove o usuário associado ao id.


## Principais Tecnologias <a name="tec"></a>
- [Docker](https://www.docker.com/) - Virtualização
- [PostgreSQL](https://www.postgresql.org/) - Banco de Dados
- [NodeJs](https://nodejs.org/en/) - Runtime
- [Express](https://expressjs.com/) - Framework


## Autor <a name="autor"></a>
[@RenanGalvao](https://renangalvao.github.io/whoami/)


<style>
    h1 {
        border: 0;
        margin: 0;
    }
    h2 {
        margin-top: 0;
        border: 0;
    }
</style>
