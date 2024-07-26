<div align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://cdn.pixabay.com/photo/2023/10/20/14/25/ai-generated-8329596_960_720.jpg" alt="Project logo"></a>
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
- [Requisitos](#requisitos)
- [Uso](#uso)
- [Autor](#autor)


## Sobre <a name="sobre"></a>
Desafio feito para a posição de Node Jr. na ProUnion. Apesar de eu lidar com NodeJS, faz tempo que não mexo diretamente com Express ou Vue, já tive experiêcias com eles mas atualmente estava lidando apenas com [NestJS](https://nestjs.com/) e [Svelte](https://kit.svelte.dev/) por serem, na minha opinião, ferramentas mais completas. Enquanto resolvia o desafio também reaprendi a utilizar essas ferramentas. Caso queira algo mais detalhado sobre o back ou frontend, leia o arquivo README na pasta raiz respectiva.


## Requisitos <a name="requisitos"></a>
- [Docker Composer 2.x](https://docs.docker.com/compose/install/)


## Uso <a name="uso"></a>
- Crie uma cópia dos arquivos ``database_url.txt.example`` e ``postgres_password.txt.example`` e retire o ``.example`` deles
- Utilize o comando ``docker compose up -d --build`` para subir os serviços
- Acesse http://localhost:3010 pelo navegador
- Usuário: admin@admin.com
- Senha: 12345678
- Utilize ``docker compose down -v`` para parar os serviços e remover os volumes associados.


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
