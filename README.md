<div align="center">
  <a href="" rel="noopener">
 <img width=auto height=200px src="https://i.imgur.com/wcdNWlz.png" alt="Project logo"></a>
</div>

<h1 align="center">Code Challenge ProUnion #2 - Visão Geral</h1>
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
- [Preview](#preview)
- [Requisitos](#requisitos)
- [Uso](#uso)
- [Autor](#autor)
- [Contribuições](#contrib)
- [Links](#links)


## Sobre <a name="sobre"></a>
Desafio feito para a posição de Node Jr. na [ProUnion](https://prounion.com.br/). Apesar de eu lidar com NodeJS, faz tempo que não mexo diretamente com Express ou Vue, já tive experiêcias com eles mas atualmente estava lidando apenas com [NestJS](https://nestjs.com/) e [Svelte](https://kit.svelte.dev/) por serem, na minha opinião, ferramentas mais completas. Enquanto resolvia o desafio também reaprendi a utilizar essas ferramentas. 

A aplicação possui uma página de login e outras páginas para o gerenciamento de cadastro dos usuários, paginação e validação dos dados na hora de enviar para o servidor. É simples, porém responsível.

Para informações mais detalhadas leia o README do [backend](./backend/README.md) ou [frontend](./frontend/README.md).

## Preview <a name="preview"></a>
<!-- PREVIEW VIDEO HERE -->


## Requisitos <a name="requisitos"></a>
- [Docker Composer 2.x](https://docs.docker.com/compose/install/)


## Uso <a name="uso"></a>
- Primeiro clone o projeto: ``git clone https://github.com/RenanGalvao/code-challenge-prounion-2.git``
- Acesse a pasta clonada ``code-challenge-prounion-2``
- Crie uma cópia dos arquivos ``database_url.txt.example`` e ``postgres_password.txt.example`` e retire o ``.example`` deles
- Utilize o comando ``docker compose up -d --build`` para subir os serviços
- Acesse [http://localhost:3010](http://localhost:3010) pelo navegador
- Usuário: ``admin@admin.com``
- Senha: ``12345678``
- Utilize ``docker compose down -v`` para parar os serviços e remover os volumes associados


## Autor <a name="autor"></a>
[@RenanGalvao](https://renangalvao.github.io/whoami/)


## Contribuições <a name="contrib"></a>
Como este projeto é um code challenge, as contribuições estarão desativadas.


## Links <a name="links"></a>
- [Repositório do challenge](https://github.com/prounion-software/code-challenge)
- [Backend](./backend)
- [Frontend](./backend)
